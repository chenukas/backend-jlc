const prodLogger = require("./prodLogger");
const devLogger = require("./devLogger");

let logger = null;

//logger is changing according to the environment
if (process.env.ENV === "production") {
    logger = prodLogger();
} else {
    logger = devLogger();
}

module.exports = logger;