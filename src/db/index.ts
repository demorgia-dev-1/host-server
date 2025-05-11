import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
const sqlite = new Database("dev.db");
const db = drizzle(sqlite, { logger: false });
export default db;
