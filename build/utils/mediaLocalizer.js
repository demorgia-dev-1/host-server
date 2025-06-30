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
exports.downloadMediaAndReplaceUrls = downloadMediaAndReplaceUrls;
exports.replaceMediaUrlsWithArray = replaceMediaUrlsWithArray;
// parser.ts
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const LOCAL_SERVER_BASE_URL = "{{BASE_URL}}/static/assets";
const LOCAL_ASSET_DIR = path_1.default.join(__dirname, "..", "..", "public/assets");
function downloadMediaAndReplaceUrls(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlRegex = /https:\/\/s3\.ap-south-1\.amazonaws\.com\/[^"]+\.(jpg|jpeg|png|gif|mp4|webm|pdf)/gi;
        const matches = content.match(urlRegex);
        console.log("content :", content);
        console.log("Found URLs:", matches);
        if (!matches)
            return [];
        const localUrls = [];
        for (const url of matches) {
            try {
                const ext = path_1.default.extname(url);
                const filename = (0, uuid_1.v4)() + ext;
                const localPath = path_1.default.join(LOCAL_ASSET_DIR, filename);
                if (!fs_1.default.existsSync(LOCAL_ASSET_DIR)) {
                    fs_1.default.mkdirSync(LOCAL_ASSET_DIR, { recursive: true });
                }
                const localUrl = `${LOCAL_SERVER_BASE_URL}/${filename}`;
                const response = yield axios_1.default.get(url, { responseType: "arraybuffer" });
                fs_1.default.writeFileSync(localPath, response.data);
                // content = content.replace(new RegExp(url, "g"), localUrl);
                localUrls.push(localUrl);
            }
            catch (err) {
                console.error("Failed to download:", url, err.message);
            }
        }
        return localUrls;
    });
}
function replaceMediaUrlsWithArray(content, replacements) {
    if (replacements.length === 0)
        return content;
    const urlRegex = /https:\/\/s3\.ap-south-1\.amazonaws\.com\/[^"]+\.(jpg|jpeg|png|gif|mp4|webm|pdf)/gi;
    let index = 0;
    return content.replace(urlRegex, () => {
        const replacement = replacements[index];
        index++;
        return replacement || ""; // fallback to empty string if index is out of range
    });
}
