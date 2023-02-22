const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json } = format;

//log functionality for the production environment
const prodLogger = () => {
    return createLogger({
        level: "info",
        format: combine(
            timestamp(),
            json()
        ),
        transports: [
            new transports.Console(),
            new transports.File({
                filename: "prod-logs.log"
            })
        ]
    });
};

module.exports = prodLogger;