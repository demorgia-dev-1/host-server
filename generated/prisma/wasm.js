
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.BatchScalarFieldEnum = {
  id: 'id',
  assessor: 'assessor',
  name: 'name',
  type: 'type',
  status: 'status',
  noOfCandidates: 'noOfCandidates',
  durationInMin: 'durationInMin',
  no: 'no',
  startDate: 'startDate',
  endDate: 'endDate',
  theoryQuestionBank: 'theoryQuestionBank',
  practicalQuestionBank: 'practicalQuestionBank',
  vivaQuestionBank: 'vivaQuestionBank',
  isAssessorReached: 'isAssessorReached',
  isCandidateVideoRequired: 'isCandidateVideoRequired',
  isCandidatePhotosRequired: 'isCandidatePhotosRequired',
  isCandidateLocationRequired: 'isCandidateLocationRequired',
  isCandidateAdharRequired: 'isCandidateAdharRequired',
  isCandidateSelfieRequired: 'isCandidateSelfieRequired',
  isPracticalVisibleToCandidate: 'isPracticalVisibleToCandidate',
  isSuspiciousActivityDetectionRequired: 'isSuspiciousActivityDetectionRequired',
  isAssessorEvidenceRequired: 'isAssessorEvidenceRequired',
  assessorReachedAt: 'assessorReachedAt',
  assessorCoordinates: 'assessorCoordinates',
  assessorGroupPhoto: 'assessorGroupPhoto'
};

exports.Prisma.CandidateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  address: 'address',
  batchId: 'batchId',
  fatherName: 'fatherName',
  enrollmentNo: 'enrollmentNo',
  isActive: 'isActive',
  password: 'password',
  gender: 'gender',
  adharNo: 'adharNo',
  isTheoryStarted: 'isTheoryStarted',
  isEvidanceUploaded: 'isEvidanceUploaded',
  isPresentInTheory: 'isPresentInTheory',
  isPresentInPractical: 'isPresentInPractical',
  isPresentInViva: 'isPresentInViva',
  isTheorySubmitted: 'isTheorySubmitted',
  theoryExamStatus: 'theoryExamStatus',
  practicalExamStatus: 'practicalExamStatus',
  vivaExamStatus: 'vivaExamStatus',
  multipleFaceDetectionCount: 'multipleFaceDetectionCount',
  faceHiddenCount: 'faceHiddenCount',
  tabSwitchCount: 'tabSwitchCount',
  exitFullScreenCount: 'exitFullScreenCount',
  theoryStartedAt: 'theoryStartedAt',
  theorySubmittedAt: 'theorySubmittedAt',
  candidateSelfieCoordinates: 'candidateSelfieCoordinates',
  candidateSelfieTakenAt: 'candidateSelfieTakenAt',
  candidateSelfie: 'candidateSelfie',
  adharPicture: 'adharPicture',
  resetedAt: 'resetedAt',
  practicalStartedAt: 'practicalStartedAt',
  practicalSubmittedAt: 'practicalSubmittedAt'
};

exports.Prisma.ExamResponseScalarFieldEnum = {
  candidateId: 'candidateId',
  batchId: 'batchId',
  questionId: 'questionId',
  answerId: 'answerId',
  startedAt: 'startedAt',
  endedAt: 'endedAt',
  type: 'type',
  marksObtained: 'marksObtained'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.ExamType = exports.$Enums.ExamType = {
  THEORY: 'THEORY',
  PRACTICAL: 'PRACTICAL',
  VIVA: 'VIVA'
};

exports.Prisma.ModelName = {
  Batch: 'Batch',
  Candidate: 'Candidate',
  ExamResponse: 'ExamResponse'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
