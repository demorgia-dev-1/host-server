import express from "express";
import ip from "ip";
import qr from "qrcode-terminal";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/auth.routes";
import assessorRoutes from "./routes/assessor.routes";
import candidateRoutes from "./routes/candidate.routes";
import { errorHandler } from "./middlewares/error.middleware";
import fs from "fs";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: false,
    createParentPath: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(path.join(__dirname, "..", "public"));
app.use("/static", express.static(path.join(__dirname, "..", "public")));

app.use("/auth", authRoutes);
app.use("/assessor", assessorRoutes);
app.use("/candidate", candidateRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});
const requiredEnv = ["JWT_SECRET", "MAIN_SERVER_URL", "DATABASE_URL"];
const missingEnv = requiredEnv.filter((env) => !process.env[env]);
if (missingEnv.length > 0) {
  console.error(
    `❌ Missing required environment variables: ${missingEnv.join(", ")}`
  );
  process.exit(1);
}
app.use(errorHandler);

const server = app.listen(9090, "0.0.0.0", () => {
  const addressInfo = server.address();
  if (!fs.existsSync(path.join(__dirname, "..", "public/assets"))) {
    fs.mkdirSync(path.join(__dirname, "..", "public/assets"), {
      recursive: true,
    });
  }
  if (typeof addressInfo === "object" && addressInfo?.port) {
    const localIp = ip.address();
    const url = `http://${localIp}:${addressInfo.port}`;

    console.log(`\n✅ Server running at ${url}`);
    console.log("📱 Scan the QR code below to access it:\n");

    qr.generate(url, { small: true });
  } else {
    console.error("❌ Could not determine server address");
  }
});
