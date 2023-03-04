require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://user:dev123@development-jlc.ceu2qcl.mongodb.net/shop?retryWrites=true&w=majority',
    ENV: process.env.ENV || 'development',
    //ENV: process.env.ENV || 'production'
}