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
const loginAssessor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield auth_service_1.default.loginAssessor(req.body);
        res.status(200).json(data);
        return;
    }
    catch (error) {
        return next(error);
    }
});
exports.loginAssessor = loginAssessor;
const loginCandidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield auth_service_1.default.loginCandidate(req.body);
        res.status(200).json({
            token,
        });
    }
    catch (error) {
        next(error);
        return;
    }
});
exports.loginCandidate = loginCandidate;
exports.default = { loginAssessor: exports.loginAssessor, loginCandidate: exports.loginCandidate };
