import express from "express";
import ip from "ip";
import qr from "qrcode-terminal";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import assessorRoutes from "./routes/assessor.routes";
import { errorHandler } from "./middlewares/error.middleware";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/assessor", assessorRoutes);
app.use(errorHandler);

const server = app.listen(9090, () => {
  const addressInfo = server.address();
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
