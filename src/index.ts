import express from "express";
import ip from "ip";
import qr from "qrcode-terminal";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/auth.routes";
import assessorRoutes from "./routes/assessor.routes";
import candidateRoutes from "./routes/candidate.routes";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";

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
app.use(errorHandler);
const requiredEnv = ["JWT_SECRET", "MAIN_SERVER_URL", "DATABASE_URL"];
const missingEnv = requiredEnv.filter((env) => !process.env[env]);
if (missingEnv.length > 0) {
  console.error(
    `❌ Missing required environment variables: ${missingEnv.join(", ")}`
  );
  process.exit(1);
}
const server = app.listen(0, "0.0.0.0", () => {
  const addressInfo = server.address();
  if (typeof addressInfo === "object" && addressInfo?.port) {
    let localIp: string;
    try {
      localIp = ip.address(); // Attempt to get the local IP address
    } catch (error) {
      console.log("error", error);
      console.error("❌ Failed to retrieve local IP address. Using localhost.");
      localIp = "localhost"; // Fallback to localhost
    }

    const url = `http://${localIp}:${addressInfo.port}`;

    console.log(`\n✅ Server running at ${url}`);
    console.log("📱 Scan the QR code below to access it:\n");

    qr.generate(url, { small: true });
  } else {
    console.error("❌ Could not determine server address");
  }
});
