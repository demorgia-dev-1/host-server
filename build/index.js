"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ip_1 = __importDefault(require("ip"));
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const assessor_routes_1 = __importDefault(require("./routes/assessor.routes"));
const candidate_routes_1 = __importDefault(require("./routes/candidate.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const sync_assets_1 = __importDefault(require("./jobs/sync-assets"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    useTempFiles: false,
    createParentPath: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
console.log(path_1.default.join(__dirname, "..", "public"));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use("/auth", auth_routes_1.default);
app.use("/assessor", assessor_routes_1.default);
app.use("/candidate", candidate_routes_1.default);
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
    console.error(`❌ Missing required environment variables: ${missingEnv.join(", ")}`);
    process.exit(1);
}
app.use(error_middleware_1.errorHandler);
const server = app.listen(9090, "0.0.0.0", () => {
    const addressInfo = server.address();
    if (!fs_1.default.existsSync(path_1.default.join(__dirname, "..", "public/assets"))) {
        fs_1.default.mkdirSync(path_1.default.join(__dirname, "..", "public/assets"), {
            recursive: true,
        });
    }
    if (!fs_1.default.existsSync(path_1.default.join(__dirname, "..", "uploads", "batches"))) {
        fs_1.default.mkdirSync(path_1.default.join(__dirname, "..", "uploads", "batches"), {
            recursive: true,
        });
    }
    if (typeof addressInfo === "object" && (addressInfo === null || addressInfo === void 0 ? void 0 : addressInfo.port)) {
        const localIp = ip_1.default.address();
        const url = `http://${localIp}:${addressInfo.port}`;
        console.log(`\n✅ Server running at ${url}`);
        console.log("📱 Scan the QR code below to access it:\n");
        qrcode_terminal_1.default.generate(url, { small: true });
        (0, sync_assets_1.default)();
    }
    else {
        console.error("❌ Could not determine server address", addressInfo);
    }
});
