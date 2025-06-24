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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const mime_types_1 = __importDefault(require("mime-types"));
const node_cron_1 = __importDefault(require("node-cron"));
const dns_1 = __importDefault(require("dns"));
require("dotenv").config();
function getTokenFromFile(tokenFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield fs_1.default.promises.readFile(tokenFilePath, "utf-8");
            return token.trim();
        }
        catch (err) {
            console.error("❌ Failed to read token from file:", tokenFilePath);
            return null;
        }
    });
}
const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".flv", ".wmv"];
const photoExtensions = [".jpg", ".jpeg", ".png", ".gif"];
function getVideoFileNames(folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs_1.default.promises.readdir(folderPath);
        const videoFiles = files.filter((file) => videoExtensions.includes(path_1.default.extname(file).toLowerCase()));
        return videoFiles;
    });
}
function getPhotoFileNames(folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs_1.default.promises.readdir(folderPath);
        const photoFiles = files.filter((file) => photoExtensions.includes(path_1.default.extname(file).toLowerCase()));
        return photoFiles;
    });
}
// check metadata file is present or not
// async function isSomethingToUpload() {
//   const baseDir = path.join(__dirname, "..", "..", "uploads", "batches");
//   const batchDirs = await fs.promises.readdir(baseDir, {
//     withFileTypes: true,
//   });
//   for (const batchDir of batchDirs) {
//     if (batchDir.isDirectory()) {
//       const batchId = batchDir.name;
//       const candidatesDir = path.join(
//         baseDir,
//         batchId,
//         "evidences",
//         "candidates"
//       );
//       const candidateDirs = await fs.promises.readdir(candidatesDir, {
//         withFileTypes: true,
//       });
//       for (const candidateDir of candidateDirs) {
//         if (candidateDir.isDirectory()) {
//           const candidateId = candidateDir.name;
//           const theoryPhotosDir = path.join(
//             candidatesDir,
//             candidateId,
//             "photos",
//             "THEORY"
//           );
//           const theoryVideosDir = path.join(
//             candidatesDir,
//             candidateId,
//             "videos",
//             "THEORY"
//           );
//           const practicalPhotosDir = path.join(
//             candidatesDir,
//             candidateId,
//             "photos",
//             "PRACTICAL"
//           );
//           const practicalVideosDir = path.join(
//             candidatesDir,
//             candidateId,
//             "videos",
//             "PRACTICAL"
//           );
//           const vivaVideosDir = path.join(
//             candidatesDir,
//             candidateId,
//             "videos",
//             "VIVA"
//           );
//           const practicalOnboardingDir = path.join(
//             __dirname,
//             "..",
//             "..",
//             "uploads",
//             "batches",
//             batchId,
//             "evidences",
//             "candidates",
//             candidateId,
//             "practical-onboarding"
//           );
//           const pmkyChecklistDir = path.join(
//             __dirname,
//             "..",
//             "..",
//             "uploads",
//             "batches",
//             batchId,
//             "evidences",
//             "assessor",
//             "pmky-checklist"
//           );
//           if (fs.existsSync(theoryPhotosDir)) {
//             if (fs.existsSync(path.join(theoryPhotosDir, "meta.json"))) {
//               const metadata = JSON.parse(
//                 fs.readFileSync(
//                   path.join(theoryPhotosDir, "meta.json"),
//                   "utf-8"
//                 )
//               );
//               const files = metadata.files;
//               const fileNames =
//                 typeof files === "object" ? Object.keys(files) : [];
//               for (const fileName of fileNames) {
//                 if (!files[fileName].isUploaded) {
//                   return true;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   return false;
// }
function syncAssets() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = yield getTokenFromFile(path_1.default.join(__dirname, "..", "..", "token.txt"));
            if (!token) {
                console.error("❌ Token not found. please login again via assessor id and password");
                return;
            }
            const baseDir = path_1.default.join(__dirname, "..", "..", "uploads", "batches");
            if (!fs_1.default.existsSync(baseDir)) {
                console.error("❌ Base directory does not exist");
                return;
            }
            const batchDirs = yield fs_1.default.promises.readdir(baseDir, {
                withFileTypes: true,
            });
            for (const batchDir of batchDirs) {
                if (batchDir.isDirectory()) {
                    const batchId = batchDir.name;
                    const candidatesDir = path_1.default.join(baseDir, batchId, "evidences", "candidates");
                    const candidateDirs = yield fs_1.default.promises.readdir(candidatesDir, {
                        withFileTypes: true,
                    });
                    if (fs_1.default.existsSync(path_1.default.join(candidatesDir, "..", "assessor", "adhar"))) {
                        const adharDir = path_1.default.join(candidatesDir, "..", "assessor", "adhar");
                        if (fs_1.default.existsSync(path_1.default.join(adharDir, "meta.json"))) {
                            const metadata = JSON.parse(fs_1.default.readFileSync(path_1.default.join(adharDir, "meta.json"), "utf-8"));
                            const files = metadata.files;
                            const fileNames = typeof files === "object" ? Object.keys(files) : [];
                            let isNewFileUplaoded = false;
                            const filesInFolder = yield fs_1.default.promises.readdir(adharDir);
                            for (const fileName of filesInFolder) {
                                if (fileName === "meta.json") {
                                    continue;
                                }
                                if (!files[fileName]) {
                                    isNewFileUplaoded = true;
                                    break;
                                }
                            }
                            if (isNewFileUplaoded) {
                                const updateMetadata = Object.assign({}, metadata);
                                for (const fileName of filesInFolder) {
                                    if (fileName === "meta.json") {
                                        continue;
                                    }
                                    if (!files[fileName]) {
                                        // @ts-ignore
                                        updateMetadata.files[fileName] = {
                                            isUploaded: false,
                                            fileName: fileName,
                                        };
                                    }
                                }
                                fs_1.default.writeFileSync(path_1.default.join(adharDir, "meta.json"), JSON.stringify(updateMetadata, null, 2));
                                return;
                            }
                            for (const fileName of fileNames) {
                                if (files[fileName].isUploaded) {
                                    continue;
                                }
                                const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/sync-assessor-adhar?fileName=${fileName}&contentType=${mime_types_1.default.lookup(fileName)}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                });
                                const url = response.data.data.url;
                                if (!url) {
                                    continue;
                                }
                                const filePath = path_1.default.join(adharDir, fileName);
                                if (fs_1.default.existsSync(filePath)) {
                                    const buffer = fs_1.default.readFileSync(filePath);
                                    console.log("syncing adhar file of batch ", batchId, " file name ", fileName);
                                    yield axios_1.default.put(url, buffer, {
                                        headers: {
                                            "Content-Type": mime_types_1.default.lookup(fileName) || "application/octet-stream",
                                        },
                                    });
                                    metadata.files[fileName].isUploaded = true;
                                    fs_1.default.writeFileSync(path_1.default.join(adharDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                }
                            }
                        }
                        else {
                            const metadata = {
                                files: {},
                                isFolderSynced: false,
                            };
                            const files = yield getPhotoFileNames(adharDir);
                            for (const file of files) {
                                // @ts-ignore
                                metadata.files[file] = {
                                    isUploaded: false,
                                    fileName: file,
                                };
                            }
                            fs_1.default.writeFileSync(path_1.default.join(adharDir, "meta.json"), JSON.stringify(metadata, null, 2));
                        }
                    }
                    for (const candidateDir of candidateDirs) {
                        if (candidateDir.isDirectory()) {
                            const candidateId = candidateDir.name;
                            const theoryPhotosDir = path_1.default.join(candidatesDir, candidateId, "photos", "THEORY");
                            const theoryVideosDir = path_1.default.join(candidatesDir, candidateId, "videos", "THEORY");
                            const practicalPhotosDir = path_1.default.join(candidatesDir, candidateId, "photos", "PRACTICAL");
                            const practicalVideosDir = path_1.default.join(candidatesDir, candidateId, "videos", "PRACTICAL");
                            const vivaVideosDir = path_1.default.join(candidatesDir, candidateId, "videos", "VIVA");
                            const practicalOnboardingDir = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "practical-onboarding");
                            const pmkyChecklistDir = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "assessor", "pmky-checklist");
                            if (fs_1.default.existsSync(theoryPhotosDir)) {
                                if (fs_1.default.existsSync(path_1.default.join(theoryPhotosDir, "meta.json"))) {
                                    const metadata = JSON.parse(fs_1.default.readFileSync(path_1.default.join(theoryPhotosDir, "meta.json"), "utf-8"));
                                    const filesInFolder = yield fs_1.default.promises.readdir(theoryPhotosDir);
                                    const files = metadata.files;
                                    const fileNames = typeof files === "object" ? Object.keys(files) : [];
                                    let isNewFileUplaoded = false;
                                    for (const fileName of filesInFolder) {
                                        if (fileName === "meta.json") {
                                            continue;
                                        }
                                        if (!files[fileName]) {
                                            isNewFileUplaoded = true;
                                            break;
                                        }
                                    }
                                    if (isNewFileUplaoded) {
                                        const updateMetadata = Object.assign({}, metadata);
                                        for (const fileName of filesInFolder) {
                                            if (fileName === "meta.json") {
                                                continue;
                                            }
                                            if (!files[fileName]) {
                                                // @ts-ignore
                                                updateMetadata.files[fileName] = {
                                                    isUploaded: false,
                                                    fileName: fileName,
                                                };
                                            }
                                        }
                                        fs_1.default.writeFileSync(path_1.default.join(theoryPhotosDir, "meta.json"), JSON.stringify(updateMetadata, null, 2));
                                        return;
                                    }
                                    for (const fileName of fileNames) {
                                        if (files[fileName].isUploaded) {
                                            continue;
                                        }
                                        const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=theory&evidenceType=image&fileName=${fileName}`, {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        });
                                        const url = response.data.data.url;
                                        if (!url) {
                                            continue;
                                        }
                                        const filePath = path_1.default.join(theoryPhotosDir, fileName);
                                        if (fs_1.default.existsSync(filePath)) {
                                            const buffer = fs_1.default.readFileSync(filePath);
                                            console.log("syncing file of batch ", batchId, " candidate ", candidateId, " file name ", fileName);
                                            yield axios_1.default.put(url, buffer, {
                                                headers: {
                                                    "Content-Type": mime_types_1.default.lookup(fileName) || "application/octet-stream",
                                                },
                                            });
                                            metadata.files[fileName].isUploaded = true;
                                            fs_1.default.writeFileSync(path_1.default.join(theoryPhotosDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                        }
                                    }
                                }
                                else {
                                    const metadata = {
                                        files: {},
                                        isFolderSynced: false,
                                    };
                                    const files = yield getPhotoFileNames(theoryPhotosDir);
                                    for (const file of files) {
                                        // @ts-ignore
                                        metadata.files[file] = {
                                            isUploaded: false,
                                            fileName: file,
                                        };
                                    }
                                    fs_1.default.writeFileSync(path_1.default.join(theoryPhotosDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                }
                            }
                            if (fs_1.default.existsSync(theoryVideosDir)) {
                                if (fs_1.default.existsSync(path_1.default.join(theoryVideosDir, "meta.json"))) {
                                    const metadata = JSON.parse(fs_1.default.readFileSync(path_1.default.join(theoryVideosDir, "meta.json"), "utf-8"));
                                    const files = metadata.files;
                                    const fileNames = typeof files === "object" ? Object.keys(files) : [];
                                    let isNewFileUplaoded = false;
                                    const filesInFolder = yield fs_1.default.promises.readdir(theoryVideosDir);
                                    for (const fileName of filesInFolder) {
                                        if (fileName === "meta.json") {
                                            continue;
                                        }
                                        if (!files[fileName]) {
                                            isNewFileUplaoded = true;
                                            break;
                                        }
                                    }
                                    if (isNewFileUplaoded) {
                                        const updateMetadata = Object.assign({}, metadata);
                                        for (const fileName of filesInFolder) {
                                            if (fileName === "meta.json") {
                                                continue;
                                            }
                                            if (!files[fileName]) {
                                                // @ts-ignore
                                                updateMetadata.files[fileName] = {
                                                    isUploaded: false,
                                                    fileName: fileName,
                                                };
                                            }
                                        }
                                        fs_1.default.writeFileSync(path_1.default.join(theoryVideosDir, "meta.json"), JSON.stringify(updateMetadata, null, 2));
                                        return;
                                    }
                                    for (const fileName of fileNames) {
                                        if (files[fileName].isUploaded) {
                                            continue;
                                        }
                                        const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=theory&evidenceType=video&fileName=${fileName}`, {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        });
                                        const url = response.data.data.url;
                                        if (!url) {
                                            continue;
                                        }
                                        const filePath = path_1.default.join(theoryVideosDir, fileName);
                                        if (fs_1.default.existsSync(filePath)) {
                                            const buffer = fs_1.default.readFileSync(filePath);
                                            console.log("syncing file of batch ", batchId, " candidate ", candidateId, " file name ", fileName);
                                            yield axios_1.default.put(url, buffer, {
                                                headers: {
                                                    "Content-Type": mime_types_1.default.lookup(fileName) || "application/octet-stream",
                                                },
                                            });
                                        }
                                        metadata.files[fileName].isUploaded = true;
                                        fs_1.default.writeFileSync(path_1.default.join(theoryVideosDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                    }
                                }
                                else {
                                    const metadata = {
                                        files: {},
                                        isFolderSynced: false,
                                    };
                                    const files = yield getVideoFileNames(theoryVideosDir);
                                    for (const file of files) {
                                        // @ts-ignore
                                        metadata.files[file] = {
                                            isUploaded: false,
                                            fileName: file,
                                        };
                                    }
                                    fs_1.default.writeFileSync(path_1.default.join(theoryVideosDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                }
                            }
                            if (fs_1.default.existsSync(practicalPhotosDir)) {
                                if (fs_1.default.existsSync(path_1.default.join(practicalPhotosDir, "meta.json"))) {
                                    const metadata = JSON.parse(fs_1.default.readFileSync(path_1.default.join(practicalPhotosDir, "meta.json"), "utf-8"));
                                    const files = metadata.files;
                                    const fileNames = typeof files === "object" ? Object.keys(files) : [];
                                    let isNewFileUplaoded = false;
                                    const filesInFolder = yield fs_1.default.promises.readdir(practicalPhotosDir);
                                    for (const fileName of filesInFolder) {
                                        if (fileName === "meta.json") {
                                            continue;
                                        }
                                        if (!files[fileName]) {
                                            isNewFileUplaoded = true;
                                            break;
                                        }
                                    }
                                    if (isNewFileUplaoded) {
                                        const updateMetadata = Object.assign({}, metadata);
                                        for (const fileName of filesInFolder) {
                                            if (fileName === "meta.json") {
                                                continue;
                                            }
                                            if (!files[fileName]) {
                                                // @ts-ignore
                                                updateMetadata.files[fileName] = {
                                                    isUploaded: false,
                                                    fileName: fileName,
                                                };
                                            }
                                        }
                                        fs_1.default.writeFileSync(path_1.default.join(practicalPhotosDir, "meta.json"), JSON.stringify(updateMetadata, null, 2));
                                        return;
                                    }
                                    for (const fileName of fileNames) {
                                        if (files[fileName].isUploaded) {
                                            continue;
                                        }
                                        const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=image&fileName=${fileName}`, {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        });
                                        const url = response.data.data.url;
                                        if (!url) {
                                            continue;
                                        }
                                        const filePath = path_1.default.join(practicalPhotosDir, fileName);
                                        if (fs_1.default.existsSync(filePath)) {
                                            const buffer = fs_1.default.readFileSync(filePath);
                                            console.log("[PRACTICAL-PHOTOS]syncing file of batch ", batchId, " candidate ", candidateId, " file name ", fileName);
                                            yield axios_1.default.put(url, buffer, {
                                                headers: {
                                                    "Content-Type": mime_types_1.default.lookup(fileName) || "application/octet-stream",
                                                },
                                            });
                                        }
                                        metadata.files[fileName].isUploaded = true;
                                        fs_1.default.writeFileSync(path_1.default.join(practicalPhotosDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                    }
                                }
                                else {
                                    const metadata = {
                                        files: {},
                                        isFolderSynced: false,
                                    };
                                    const files = yield getPhotoFileNames(practicalPhotosDir);
                                    for (const file of files) {
                                        // @ts-ignore
                                        metadata.files[file] = {
                                            isUploaded: false,
                                            fileName: file,
                                        };
                                    }
                                    fs_1.default.writeFileSync(path_1.default.join(practicalPhotosDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                }
                            }
                            if (fs_1.default.existsSync(practicalVideosDir)) {
                                if (fs_1.default.existsSync(path_1.default.join(practicalVideosDir, "meta.json"))) {
                                    const metadata = JSON.parse(fs_1.default.readFileSync(path_1.default.join(practicalVideosDir, "meta.json"), "utf-8"));
                                    const files = metadata.files;
                                    const fileNames = typeof files === "object" ? Object.keys(files) : [];
                                    let isNewFileUplaoded = false;
                                    const filesInFolder = yield fs_1.default.promises.readdir(practicalVideosDir);
                                    for (const fileName of filesInFolder) {
                                        if (fileName === "meta.json") {
                                            continue;
                                        }
                                        if (!files[fileName]) {
                                            isNewFileUplaoded = true;
                                            break;
                                        }
                                    }
                                    if (isNewFileUplaoded) {
                                        const updateMetadata = Object.assign({}, metadata);
                                        for (const fileName of filesInFolder) {
                                            if (fileName === "meta.json") {
                                                continue;
                                            }
                                            if (!files[fileName]) {
                                                // @ts-ignore
                                                updateMetadata.files[fileName] = {
                                                    isUploaded: false,
                                                    fileName: fileName,
                                                };
                                            }
                                        }
                                        fs_1.default.writeFileSync(path_1.default.join(practicalVideosDir, "meta.json"), JSON.stringify(updateMetadata, null, 2));
                                        return;
                                    }
                                    for (const fileName of fileNames) {
                                        if (files[fileName].isUploaded) {
                                            continue;
                                        }
                                        const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=video&fileName=${fileName}`, {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        });
                                        const url = response.data.data.url;
                                        if (!url) {
                                            continue;
                                        }
                                        const filePath = path_1.default.join(practicalVideosDir, fileName);
                                        if (fs_1.default.existsSync(filePath)) {
                                            const buffer = fs_1.default.readFileSync(filePath);
                                            console.log("[PRACTICAL-VIDEOS]syncing file of batch ", batchId, " candidate ", candidateId, " file name ", fileName);
                                            yield axios_1.default.put(url, buffer, {
                                                headers: {
                                                    "Content-Type": mime_types_1.default.lookup(fileName) || "application/octet-stream",
                                                },
                                            });
                                        }
                                        metadata.files[fileName].isUploaded = true;
                                        fs_1.default.writeFileSync(path_1.default.join(practicalVideosDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                    }
                                }
                                else {
                                    const metadata = {
                                        files: {},
                                        isFolderSynced: false,
                                    };
                                    const files = yield getVideoFileNames(practicalVideosDir);
                                    for (const file of files) {
                                        // @ts-ignore
                                        metadata.files[file] = {
                                            isUploaded: false,
                                            fileName: file,
                                        };
                                    }
                                    fs_1.default.writeFileSync(path_1.default.join(practicalVideosDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                }
                            }
                            if (fs_1.default.existsSync(vivaVideosDir)) {
                                if (fs_1.default.existsSync(path_1.default.join(vivaVideosDir, "meta.json"))) {
                                    const metadata = JSON.parse(fs_1.default.readFileSync(path_1.default.join(vivaVideosDir, "meta.json"), "utf-8"));
                                    const files = metadata.files;
                                    const fileNames = typeof files === "object" ? Object.keys(files) : [];
                                    let isNewFileUplaoded = false;
                                    const filesInFolder = yield fs_1.default.promises.readdir(vivaVideosDir);
                                    for (const fileName of filesInFolder) {
                                        if (fileName === "meta.json") {
                                            continue;
                                        }
                                        if (!files[fileName]) {
                                            isNewFileUplaoded = true;
                                            break;
                                        }
                                    }
                                    if (isNewFileUplaoded) {
                                        const updateMetadata = Object.assign({}, metadata);
                                        for (const fileName of filesInFolder) {
                                            if (fileName === "meta.json") {
                                                continue;
                                            }
                                            if (!files[fileName]) {
                                                // @ts-ignore
                                                updateMetadata.files[fileName] = {
                                                    isUploaded: false,
                                                    fileName: fileName,
                                                };
                                            }
                                        }
                                        fs_1.default.writeFileSync(path_1.default.join(vivaVideosDir, "meta.json"), JSON.stringify(updateMetadata, null, 2));
                                        return;
                                    }
                                    for (const fileName of fileNames) {
                                        if (files[fileName].isUploaded) {
                                            continue;
                                        }
                                        const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=video&fileName=${fileName}`, {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        });
                                        if (response.status !== 200) {
                                            console.log("error in getting presigned url");
                                            continue;
                                        }
                                        const url = response.data.data.url;
                                        if (!url) {
                                            console.log("url not found");
                                            continue;
                                        }
                                        const filePath = path_1.default.join(vivaVideosDir, fileName);
                                        if (fs_1.default.existsSync(filePath)) {
                                            const buffer = fs_1.default.readFileSync(filePath);
                                            console.log("[VIVA-VIDEOS]syncing file of batch ", batchId, " candidate ", candidateId, " file name ", fileName);
                                            yield axios_1.default.put(url, buffer, {
                                                headers: {
                                                    "Content-Type": mime_types_1.default.lookup(fileName) || "application/octet-stream",
                                                },
                                            });
                                        }
                                        metadata.files[fileName].isUploaded = true;
                                        fs_1.default.writeFileSync(path_1.default.join(vivaVideosDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                    }
                                }
                                else {
                                    const metadata = {
                                        files: {},
                                        isFolderSynced: false,
                                    };
                                    const files = yield getVideoFileNames(vivaVideosDir);
                                    for (const file of files) {
                                        // @ts-ignore
                                        metadata.files[file] = {
                                            isUploaded: false,
                                            fileName: file,
                                        };
                                    }
                                    fs_1.default.writeFileSync(path_1.default.join(vivaVideosDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                }
                            }
                            if (fs_1.default.existsSync(practicalOnboardingDir)) {
                                if (fs_1.default.existsSync(path_1.default.join(practicalOnboardingDir, "meta.json"))) {
                                    const metadata = JSON.parse(fs_1.default.readFileSync(path_1.default.join(practicalOnboardingDir, "meta.json"), "utf-8"));
                                    const files = metadata.files;
                                    const fileNames = typeof files === "object" ? Object.keys(files) : [];
                                    let isNewFileUplaoded = false;
                                    const filesInFolder = yield fs_1.default.promises.readdir(practicalOnboardingDir);
                                    for (const fileName of filesInFolder) {
                                        if (fileName === "meta.json") {
                                            continue;
                                        }
                                        if (!files[fileName]) {
                                            isNewFileUplaoded = true;
                                            break;
                                        }
                                    }
                                    if (isNewFileUplaoded) {
                                        const updateMetadata = Object.assign({}, metadata);
                                        for (const fileName of filesInFolder) {
                                            if (fileName === "meta.json") {
                                                continue;
                                            }
                                            if (!files[fileName]) {
                                                // @ts-ignore
                                                updateMetadata.files[fileName] = {
                                                    isUploaded: false,
                                                    fileName: fileName,
                                                };
                                            }
                                        }
                                        fs_1.default.writeFileSync(path_1.default.join(practicalOnboardingDir, "meta.json"), JSON.stringify(updateMetadata, null, 2));
                                        return;
                                    }
                                    const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/batches/${batchId}/candidates/${candidateId}/presigned-url-to-candidate-practical-onboarding-files`, {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    });
                                    const adhar = response.data.data.adhar;
                                    const photo = response.data.data.photo;
                                    console.log("SYNCING ADHAR AND PHOTO PRACTICAL ONBOARDING");
                                    for (const fileName of fileNames) {
                                        if (files[fileName].isUploaded) {
                                            continue;
                                        }
                                        const filePath = path_1.default.join(practicalOnboardingDir, fileName);
                                        let isExists = false;
                                        if (fs_1.default.existsSync(filePath)) {
                                            isExists = true;
                                        }
                                        const buffer = fs_1.default.readFileSync(filePath);
                                        const fileType = mime_types_1.default.lookup(fileName);
                                        if (fileName.startsWith("adhar") && isExists) {
                                            yield axios_1.default.put(adhar, buffer, {
                                                headers: {
                                                    "Content-Type": fileType || "application/octet-stream",
                                                },
                                            });
                                        }
                                        else if (fileName.startsWith("photo") && isExists) {
                                            yield axios_1.default.put(photo, buffer, {
                                                headers: {
                                                    "Content-Type": fileType || "application/octet-stream",
                                                },
                                            });
                                        }
                                        metadata.files[fileName].isUploaded = true;
                                        fs_1.default.writeFileSync(path_1.default.join(practicalOnboardingDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                    }
                                }
                                else {
                                    const metadata = {
                                        files: {},
                                        isFolderSynced: false,
                                    };
                                    const files = yield getPhotoFileNames(practicalOnboardingDir);
                                    for (const file of files) {
                                        // @ts-ignore
                                        metadata.files[file] = {
                                            isUploaded: false,
                                            fileName: file,
                                        };
                                    }
                                    const videos = yield getVideoFileNames(practicalOnboardingDir);
                                    for (const file of videos) {
                                        // @ts-ignore
                                        metadata.files[file] = {
                                            isUploaded: false,
                                            fileName: file,
                                        };
                                    }
                                    fs_1.default.writeFileSync(path_1.default.join(practicalOnboardingDir, "meta.json"), JSON.stringify(metadata, null, 2));
                                }
                            }
                            if (fs_1.default.existsSync(pmkyChecklistDir)) {
                                const entries = yield fs_1.default.promises.readdir(pmkyChecklistDir, {
                                    withFileTypes: true,
                                });
                                const dirs = entries
                                    .filter((entry) => entry.isDirectory())
                                    .map((entry) => entry.name);
                                for (const dir of dirs) {
                                    if (fs_1.default.existsSync(path_1.default.join(pmkyChecklistDir, 
                                    // @ts-ignore
                                    dir.split("/").pop(), "meta.json"))) {
                                        const metadata = JSON.parse(fs_1.default.readFileSync(path_1.default.join(pmkyChecklistDir, 
                                        // @ts-ignore
                                        dir.split("/").pop(), "meta.json"), "utf-8"));
                                        const files = metadata.files;
                                        const fileNames = typeof files === "object" ? Object.keys(files) : [];
                                        let isNewFileUplaoded = false;
                                        const filesInFolder = yield fs_1.default.promises.readdir(path_1.default.join(pmkyChecklistDir, dir));
                                        for (const fileName of filesInFolder) {
                                            if (fileName === "meta.json") {
                                                continue;
                                            }
                                            if (!files[fileName]) {
                                                isNewFileUplaoded = true;
                                                break;
                                            }
                                        }
                                        if (isNewFileUplaoded) {
                                            const updateMetadata = Object.assign({}, metadata);
                                            for (const fileName of filesInFolder) {
                                                if (fileName === "meta.json") {
                                                    continue;
                                                }
                                                if (!files[fileName]) {
                                                    // @ts-ignore
                                                    updateMetadata.files[fileName] = {
                                                        isUploaded: false,
                                                        fileName: fileName,
                                                    };
                                                }
                                            }
                                            fs_1.default.writeFileSync(path_1.default.join(pmkyChecklistDir, 
                                            // @ts-ignore
                                            dir.split("/").pop(), "meta.json"), JSON.stringify(updateMetadata, null, 2));
                                            return;
                                        }
                                        for (const fileName of fileNames) {
                                            if (files[fileName].isUploaded) {
                                                continue;
                                            }
                                            const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/pmky-checklist-presigned-url?fileNames=${fileName}&questionId=${dir}`, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            });
                                            const url = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data[0];
                                            if (!url) {
                                                continue;
                                            }
                                            const filePath = path_1.default.join(pmkyChecklistDir, 
                                            // @ts-ignore
                                            dir.split("/").pop(), fileName);
                                            if (fs_1.default.existsSync(filePath)) {
                                                console.log("SYNCING PMKY CHECKLIST FILES");
                                                const buffer = fs_1.default.readFileSync(filePath);
                                                yield axios_1.default.put(url, buffer, {
                                                    headers: {
                                                        "Content-Type": mime_types_1.default.lookup(fileName) || "application/octet-stream",
                                                    },
                                                });
                                            }
                                            metadata.files[fileName].isUploaded = true;
                                            fs_1.default.writeFileSync(path_1.default.join(pmkyChecklistDir, 
                                            // @ts-ignore
                                            dir.split("/").pop(), "meta.json"), JSON.stringify(metadata, null, 2));
                                        }
                                    }
                                    else {
                                        const metadata = {
                                            files: {},
                                            isFolderSynced: false,
                                        };
                                        const photos = yield getPhotoFileNames(path_1.default.join(pmkyChecklistDir, dir));
                                        for (const file of photos) {
                                            // @ts-ignore
                                            metadata.files[file] = {
                                                isUploaded: false,
                                                fileName: file,
                                            };
                                        }
                                        const videos = yield getVideoFileNames(path_1.default.join(pmkyChecklistDir, dir));
                                        for (const file of videos) {
                                            // @ts-ignore
                                            metadata.files[file] = {
                                                isUploaded: false,
                                                fileName: file,
                                            };
                                        }
                                        fs_1.default.writeFileSync(path_1.default.join(pmkyChecklistDir, 
                                        // @ts-ignore
                                        dir.split("/").pop(), "meta.json"), JSON.stringify(metadata, null, 2));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (error) {
            console.error("❌ Error during sync:", error);
        }
    });
}
let isRunning = false;
const startJob = () => __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        if (isRunning) {
            console.log("⏳ Job is still running, skipping this cycle...");
            return;
        }
        isRunning = true;
        console.log("🚀 Job started at", new Date().toISOString());
        try {
            dns_1.default.lookup("google.com", (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err && err.code === "ENOTFOUND") {
                    console.log("no internet");
                }
                else {
                    yield syncAssets();
                }
            }));
        }
        catch (err) {
            if (err.code === "ENOTFOUND") {
                console.warn("⚠️ No internet connection");
            }
            else {
                console.error("❌ Error during scheduled job:", err);
            }
        }
        finally {
            isRunning = false;
        }
    }));
});
// const startJob = async () => {
//   cron.schedule("* * * * *", async () => {
//     try {
//       dns.lookup("google.com", async (err) => {
//         if (err && err.code === "ENOTFOUND") {
//           console.log("no internet");
//         } else {
//           await syncAssets();
//         }
//       });
//     } catch (error) {
//       console.error("❌ Error during scheduled job:", error);
//     }
//   });
// };
exports.default = startJob;
