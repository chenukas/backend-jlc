const express = require("express");
const middlewares = require("./middlewares")
const connectDatabase = require("./config/database");
const config = require("./config");
const logger = require("./utils");
const routes = require("./routes");

const app = express();

middlewares(app);

app.get("/api/health", () => {
    console.log("Server is healthy and working");
});

routes(app);

app.listen(config.PORT, () => {
    logger.info(`Server is running on ${config.PORT}`);
});

connectDatabase();

module.exports = app;