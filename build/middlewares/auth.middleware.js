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
const AppError_1 = require("../utils/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticatedCandidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        if (!token) {
            throw new AppError_1.AppError("Unauthorized", 401, true);
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded._id) {
            throw new AppError_1.AppError("Unauthorized", 401, true);
        }
        req.headers["x-candidate-id"] = decoded._id;
        req.headers["x-batch-id"] = decoded.batchId;
        next();
    }
    catch (error) {
        next(error);
    }
});
const isAuthenticatedAssessor = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const localToken = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        if (!localToken) {
            throw new AppError_1.AppError("Unauthorized", 401, true);
        }
        const decoded = jsonwebtoken_1.default.verify(localToken, process.env.JWT_SECRET);
        if (!decoded || !decoded._id) {
            throw new AppError_1.AppError("Unauthorized", 401, true);
        }
        req.headers["x-assessor-id"] = decoded._id;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = { isAuthenticatedCandidate, isAuthenticatedAssessor };
