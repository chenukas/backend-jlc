const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

//log functionality for the development environment
const devLogger = () => {
    const customFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
    });

    return createLogger({
        level: "debug",
        format: combine(
            format.colorize(),
            timestamp({ format: "HH:mm:ss" }),
            customFormat
        ),
        transports: [
            new transports.Console()
        ]
    });
};

module.exports = devLogger;