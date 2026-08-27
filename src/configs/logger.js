import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

// Define cores personalizadas
winston.addColors({
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
});

// Formato do log
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

const logger = winston.createLogger({
    level: "debug",
    format: combine(timestamp({ format: "DD/MM/YYYY HH:mm:ss" }), logFormat),
    transports: [
        // Logs de erro em arquivo separado
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),

        new winston.transports.File({
            filename: "logs/warn.log",
            level: "warn",
        }),

        // Todos os logs em um arquivo
        new winston.transports.File({
            filename: "logs/combined.log",
        }),
    ],
});

// Console colorido apenas em desenvolvimento
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }),
                timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
                logFormat
            ),
        })
    );
}

export default logger;
