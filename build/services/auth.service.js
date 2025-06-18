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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const loginAssessor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.post(process.env.MAIN_SERVER_URL + "/assessor/login", data);
        const localToken = jsonwebtoken_1.default.sign({ _id: response.data.data.assessor._id }, process.env.JWT_SECRET);
        yield promises_1.default.writeFile(path_1.default.join(__dirname, "..", "..", "token.txt"), response.data.data.token);
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
        // const candidate = await prisma.candidate.findFirst({
        //   where: {
        //     OR: [{ id: data._id }, { enrollmentNo: data._id }],
        //     password: data.password,
        //   },
        //   select: {
        //     id: true,
        //     batchId: true,
        //   },
        // });
        // if (!candidate) {
        //   throw new AppError("invalid  credentials", 401, true);
        // }
        const result = yield db_1.default
            .select({
            id: schema_1.candidates.id,
            batchId: schema_1.candidates.batchId,
            name: schema_1.candidates.name,
        })
            .from(schema_1.candidates)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(schema_1.candidates.id, data._id), (0, drizzle_orm_1.eq)(schema_1.candidates.enrollmentNo, data._id)), (0, drizzle_orm_1.eq)(schema_1.candidates.password, data.password)))
            .limit(1);
        const foundCandidate = result[0];
        if (!foundCandidate) {
            throw new AppError_1.AppError("invalid credentials", 401, true);
        }
        const token = jsonwebtoken_1.default.sign({ _id: foundCandidate.id, batchId: foundCandidate.batchId }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return { token, name: foundCandidate.name };
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            throw error;
        }
        throw new AppError_1.AppError("internal server error", 500);
    }
});
exports.loginCandidate = loginCandidate;
exports.default = { loginAssessor: exports.loginAssessor, loginCandidate: exports.loginCandidate };
