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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const logger_1 = __importDefault(require("../utils/logger"));
const loginAssessor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield auth_service_1.default.loginAssessor(req.body);
        logger_1.default.log("info", "Assessor logged in successfully", {
            layer: "auth.controller.loginAssessor",
            body: req.body,
            // @ts-ignore
            requuestId: req.requestId,
        });
        res.status(200).json(data);
        return;
    }
    catch (error) {
        logger_1.default.log("error", "Error logging in assessor", {
            layer: "auth.controller.loginAssessor",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            body: req.body,
            //  @ts-ignore
            requuestId: req.requestId,
        });
        return next(error);
    }
});
exports.loginAssessor = loginAssessor;
const loginCandidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield auth_service_1.default.loginCandidate(req.body);
        logger_1.default.log("info", "Candidate logged in successfully", {
            layer: "auth.controller.loginCandidate",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body,
            // @ts-ignore
            requuestId: req.requestId,
        });
        res.status(200).json(Object.assign({}, response));
    }
    catch (error) {
        logger_1.default.log("error", "Error logging in candidate", {
            layer: "auth.controller.loginCandidate",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            body: req.body,
            // @ts-ignore
            requuestId: req.requestId,
        });
        next(error);
        return;
    }
});
exports.loginCandidate = loginCandidate;
exports.default = { loginAssessor: exports.loginAssessor, loginCandidate: exports.loginCandidate };
