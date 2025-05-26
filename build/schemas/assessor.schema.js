"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitPmkyChecklistSchema = exports.resetCandidateTheoryTestSchema = exports.markCandidateAttendanceSchema = exports.markAssessorAsReachedSchema = exports.loginAssessorSchema = void 0;
const zod_1 = require("zod");
exports.loginAssessorSchema = zod_1.z.object({
    body: zod_1.z.object({
        _id: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
exports.markAssessorAsReachedSchema = zod_1.z.object({
    body: zod_1.z.object({
        location: zod_1.z
            .object({
            lat: zod_1.z.number(),
            long: zod_1.z.number(),
        })
            .strict()
            .optional(),
    }),
});
exports.markCandidateAttendanceSchema = zod_1.z.object({
    body: zod_1.z.object({
        candidates: zod_1.z.array(zod_1.z.string()),
    }),
});
exports.resetCandidateTheoryTestSchema = zod_1.z.object({
    body: zod_1.z.object({
        candidates: zod_1.z.array(zod_1.z.string()),
    }),
});
exports.submitPmkyChecklistSchema = zod_1.z.object({
    body: zod_1.z.object({
        responses: zod_1.z.array(zod_1.z.object({
            questionId: zod_1.z.string(),
            yesOrNo: zod_1.z.boolean(),
            remarks: zod_1.z.string().optional(),
        })),
    }),
});
