const mongoose = require("mongoose");
const logger = require("../utils");

const connectDatabase = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URL);
        logger.info('Database is connected');
    } catch (error) {
        logger.error(`Database connection failed: ${error}`);
        process.exit(1);
    }
};

module.exports = connectDatabase;

