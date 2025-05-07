"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCandidate = exports.loginAssessor = void 0;
const axios_1 = __importDefault(require("axios"));
const AppError_1 = require("../utils/AppError");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const loginAssessor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.post(process.env.MAIN_SERVER_URL + "/assessor/login", data);
        const localToken = jsonwebtoken_1.default.sign({ _id: response.data.data.assessor._id }, process.env.JWT_SECRET);
        return {
            localToken,
            serverToken: response.data.data.token,
        };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
        }
        console.log("error", error);
        throw new AppError_1.AppError("internal server error", 500);
    }
});
exports.loginAssessor = loginAssessor;
const loginCandidate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidate = yield prisma.candidate.findFirst({
            where: {
                OR: [{ id: data._id }, { enrollmentNo: data._id }],
                password: data.password,
            },
            select: {
                id: true,
                batchId: true,
            },
        });
        if (!candidate) {
            throw new AppError_1.AppError("invalid  credentials", 401, true);
        }
        const token = jsonwebtoken_1.default.sign({ _id: candidate.id, batchId: candidate.batchId }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return token;
    }
    catch (error) {
        console.log("error", error);
        if (error instanceof AppError_1.AppError) {
            throw error;
        }
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new AppError_1.AppError("invalid  credentials", 401, true);
            }
        }
        throw new AppError_1.AppError("internal server error", 500);
    }
});
exports.loginCandidate = loginCandidate;
exports.default = { loginAssessor: exports.loginAssessor, loginCandidate: exports.loginCandidate };
