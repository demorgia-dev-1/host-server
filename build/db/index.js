"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const better_sqlite3_2 = require("drizzle-orm/better-sqlite3");
const sqlite = new better_sqlite3_1.default("dev.db");
const db = (0, better_sqlite3_2.drizzle)(sqlite, { logger: false });
exports.default = db;
