PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_batches` (
	`_id` text PRIMARY KEY NOT NULL,
	`assessor` text NOT NULL,
	`name` text,
	`type` text NOT NULL,
	`status` text NOT NULL,
	`noOfCandidates` integer NOT NULL,
	`durationInMin` integer NOT NULL,
	`no` text NOT NULL,
	`startDate` text NOT NULL,
	`endDate` text NOT NULL,
	`theoryQuestionBank` text,
	`practicalQuestionBank` text,
	`vivaQuestionBank` text,
	`isAssessorReached` integer DEFAULT false NOT NULL,
	`isCandidateVideoRequired` integer DEFAULT false NOT NULL,
	`isCandidatePhotosRequired` integer DEFAULT false NOT NULL,
	`isCandidateLocationRequired` integer DEFAULT false NOT NULL,
	`isCandidateAdharRequired` integer DEFAULT false NOT NULL,
	`isCandidateSelfieRequired` integer DEFAULT false NOT NULL,
	`isPracticalVisibleToCandidate` integer DEFAULT false NOT NULL,
	`isSuspiciousActivityDetectionRequired` integer DEFAULT false NOT NULL,
	`isAssessorEvidenceRequired` integer DEFAULT false NOT NULL,
	`assessorReachedAt` text,
	`assessorCoordinates` text,
	`assessorGroupPhoto` text
);
--> statement-breakpoint
INSERT INTO `__new_batches`("_id", "assessor", "name", "type", "status", "noOfCandidates", "durationInMin", "no", "startDate", "endDate", "theoryQuestionBank", "practicalQuestionBank", "vivaQuestionBank", "isAssessorReached", "isCandidateVideoRequired", "isCandidatePhotosRequired", "isCandidateLocationRequired", "isCandidateAdharRequired", "isCandidateSelfieRequired", "isPracticalVisibleToCandidate", "isSuspiciousActivityDetectionRequired", "isAssessorEvidenceRequired", "assessorReachedAt", "assessorCoordinates", "assessorGroupPhoto") SELECT "_id", "assessor", "name", "type", "status", "noOfCandidates", "durationInMin", "no", "startDate", "endDate", "theoryQuestionBank", "practicalQuestionBank", "vivaQuestionBank", "isAssessorReached", "isCandidateVideoRequired", "isCandidatePhotosRequired", "isCandidateLocationRequired", "isCandidateAdharRequired", "isCandidateSelfieRequired", "isPracticalVisibleToCandidate", "isSuspiciousActivityDetectionRequired", "isAssessorEvidenceRequired", "assessorReachedAt", "assessorCoordinates", "assessorGroupPhoto" FROM `batches`;--> statement-breakpoint
DROP TABLE `batches`;--> statement-breakpoint
ALTER TABLE `__new_batches` RENAME TO `batches`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_candidates` (
	`_id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`phone` text,
	`address` text,
	`batchId` text NOT NULL,
	`fatherName` text,
	`enrollmentNo` text NOT NULL,
	`isActive` integer DEFAULT true NOT NULL,
	`password` text NOT NULL,
	`gender` text,
	`adharNo` text,
	`isTheoryStarted` integer NOT NULL,
	`isEvidanceUploaded` integer NOT NULL,
	`isPresentInTheory` integer NOT NULL,
	`isPresentInPractical` integer NOT NULL,
	`isPresentInViva` integer NOT NULL,
	`isTheorySubmitted` integer NOT NULL,
	`theoryExamStatus` text NOT NULL,
	`practicalExamStatus` text NOT NULL,
	`vivaExamStatus` text NOT NULL,
	`multipleFaceDetectionCount` integer NOT NULL,
	`faceHiddenCount` integer NOT NULL,
	`tabSwitchCount` integer NOT NULL,
	`exitFullScreenCount` integer NOT NULL,
	`theoryStartedAt` text,
	`theorySubmittedAt` text,
	`candidateSelfieCoordinates` text,
	`candidateSelfieTakenAt` text,
	`candidateSelfie` text,
	`adharPicture` text,
	`resetedAt` text,
	`practicalStartedAt` text,
	`practicalSubmittedAt` text,
	FOREIGN KEY (`batchId`) REFERENCES `batches`(`_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_candidates`("_id", "name", "email", "phone", "address", "batchId", "fatherName", "enrollmentNo", "isActive", "password", "gender", "adharNo", "isTheoryStarted", "isEvidanceUploaded", "isPresentInTheory", "isPresentInPractical", "isPresentInViva", "isTheorySubmitted", "theoryExamStatus", "practicalExamStatus", "vivaExamStatus", "multipleFaceDetectionCount", "faceHiddenCount", "tabSwitchCount", "exitFullScreenCount", "theoryStartedAt", "theorySubmittedAt", "candidateSelfieCoordinates", "candidateSelfieTakenAt", "candidateSelfie", "adharPicture", "resetedAt", "practicalStartedAt", "practicalSubmittedAt") SELECT "_id", "name", "email", "phone", "address", "batchId", "fatherName", "enrollmentNo", "isActive", "password", "gender", "adharNo", "isTheoryStarted", "isEvidanceUploaded", "isPresentInTheory", "isPresentInPractical", "isPresentInViva", "isTheorySubmitted", "theoryExamStatus", "practicalExamStatus", "vivaExamStatus", "multipleFaceDetectionCount", "faceHiddenCount", "tabSwitchCount", "exitFullScreenCount", "theoryStartedAt", "theorySubmittedAt", "candidateSelfieCoordinates", "candidateSelfieTakenAt", "candidateSelfie", "adharPicture", "resetedAt", "practicalStartedAt", "practicalSubmittedAt" FROM `candidates`;--> statement-breakpoint
DROP TABLE `candidates`;--> statement-breakpoint
ALTER TABLE `__new_candidates` RENAME TO `candidates`;--> statement-breakpoint
CREATE TABLE `__new_exam_response` (
	`candidateId` text NOT NULL,
	`batchId` text NOT NULL,
	`questionId` text NOT NULL,
	`answerId` text NOT NULL,
	`startedAt` text NOT NULL,
	`endedAt` text NOT NULL,
	`type` text DEFAULT 'THEORY' NOT NULL,
	`marksObtained` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`questionId`, `candidateId`),
	FOREIGN KEY (`candidateId`) REFERENCES `candidates`(`_id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`batchId`) REFERENCES `batches`(`_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_exam_response`("candidateId", "batchId", "questionId", "answerId", "startedAt", "endedAt", "type", "marksObtained") SELECT "candidateId", "batchId", "questionId", "answerId", "startedAt", "endedAt", "type", "marksObtained" FROM `exam_response`;--> statement-breakpoint
DROP TABLE `exam_response`;--> statement-breakpoint
ALTER TABLE `__new_exam_response` RENAME TO `exam_response`;