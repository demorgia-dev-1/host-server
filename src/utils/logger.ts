// src/utils/logger.ts
import dotenv from "dotenv";
dotenv.config();
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, printf, json, errors, splat } = format;

// Custom log format for console in development
const devFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const isProduction = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";

const logger = createLogger({
  level: isProduction ? "info" : "debug",
  format: combine(
    timestamp(),
    errors({ stack: true }), // capture stack trace
    splat(), // string interpolation
    isProduction ? json() : devFormat
  ),
  transports: [
    new transports.Console({
      silent: isTest,
      format: combine(
        timestamp(),
        errors({ stack: true }),
        splat(),
        isProduction ? json() : devFormat,
        format.prettyPrint()
      ),
    }),
    ...(isProduction
      ? [
          new DailyRotateFile({
            dirname: "logs",
            filename: "application-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            level: "info",
          }),
          new transports.DailyRotateFile({
            dirname: "logs",
            filename: "errors-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "10m",
            maxFiles: "30d",
            level: "error",
          }),
        ]
      : []),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export default logger;
