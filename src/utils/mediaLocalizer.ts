// parser.ts
import axios from "axios";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const LOCAL_SERVER_BASE_URL = "{{BASE_URL}}/static/assets";
const LOCAL_ASSET_DIR = path.join(__dirname, "..", "..", "public/assets");

export async function downloadMediaAndReplaceUrls(
  content: string
): Promise<string> {
  const urlRegex =
    /https:\/\/s3\.ap-south-1\.amazonaws\.com\/[^"]+\.(jpg|jpeg|png|gif|mp4|webm|pdf)/gi;
  const matches = content.match(urlRegex);

  if (!matches) return content;

  for (const url of matches) {
    try {
      const ext = path.extname(url);
      const filename = uuid() + ext;
      const localPath = path.join(LOCAL_ASSET_DIR, filename);
      if (!fs.existsSync(LOCAL_ASSET_DIR)) {
        fs.mkdirSync(LOCAL_ASSET_DIR, { recursive: true });
      }
      const localUrl = `${LOCAL_SERVER_BASE_URL}/${filename}`;
      const response = await axios.get(url, { responseType: "arraybuffer" });
      fs.writeFileSync(localPath, response.data);
      content = content.replace(new RegExp(url, "g"), localUrl);
    } catch (err: any) {
      console.error("Failed to download:", url, err.message);
    }
  }

  return content;
}
