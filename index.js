require('dotenv').config();
const express = require("express");
const middlewares = require("./middlewares")
const connectDatabase = require("./config/database");
const logger = require("./utils");
const routes = require("./routes");
const swaggerDocs = require('./utils/swagger');

const app = express();

middlewares(app);

app.get("/api/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is healthy and working"
    })
});

routes(app);
swaggerDocs(app)

app.listen(process.env.PORT, () => {
    logger.info(`Server is running on ${process.env.PORT}`);
});

connectDatabase();

module.exports = app;