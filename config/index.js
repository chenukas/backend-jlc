require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,
    ENV: process.env.ENV || 'development',
    //ENV: process.env.ENV || 'production'
}