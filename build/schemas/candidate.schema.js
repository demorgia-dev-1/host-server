"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitTheoryResponsesSchema = exports.loginCandidateSchema = void 0;
const zod_1 = require("zod");
exports.loginCandidateSchema = zod_1.z.object({
    body: zod_1.z.object({
        _id: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
exports.submitTheoryResponsesSchema = zod_1.z.object({
    body: zod_1.z.object({
        responses: zod_1.z.array(zod_1.z.object({
            questionId: zod_1.z.string(),
            answerId: zod_1.z.string(),
            startedAt: zod_1.z.string(),
            endedAt: zod_1.z.string(),
        })),
    }),
});
