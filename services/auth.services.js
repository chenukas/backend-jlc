const User = require("../models/user.model");
const logger = require("../utils");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const registerUser = async (user) => {

    const newUser = new User({
        ...user,
        password: CryptoJS.AES.encrypt(user.password, process.env.PASS_SECRET).toString()
    });

    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        logger.error(`Saving user failed: ${err}`);
    }
};

const loginUser = async (currentUser) => {

    try {
        const user = await User.findOne({
            username: currentUser.username
        })

        if (!user) {
            return false;
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET).toString(CryptoJS.enc.Utf8);

        if (hashedPassword !== currentUser.password) {
            return false;
        }

        const accessToken = jwt.sign({
            id: user._id, 
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        });

        const { password, ...others } = user._doc;

        return { ...others, accessToken };

    } catch (err) {
        logger.error(`Login user failed: ${err}`);
    }
};

module.exports = {
    registerUser,
    loginUser
};