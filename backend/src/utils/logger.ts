import fs from "fs";
import path from "path";

enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
}

class Logger {
    private logFilePath: string;

    constructor() {
        const logsDir = path.resolve(__dirname, "../../logs");
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }
        this.logFilePath = path.join(logsDir, "application.log");
    }

    private writeLog(level: LogLevel, message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${message}\n`;
        fs.appendFileSync(this.logFilePath, logMessage, { encoding: "utf8" });
        console.log(logMessage.trim());
    }

    info(message: string): void {
        this.writeLog(LogLevel.INFO, message);
    }

    warn(message: string): void {
        this.writeLog(LogLevel.WARN, message);
    }

    error(message: string): void {
        this.writeLog(LogLevel.ERROR, message);
    }

    debug(message: string): void {
        this.writeLog(LogLevel.DEBUG, message);
    }
}

export const logger = new Logger();
