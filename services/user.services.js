const User = require("../models/user.model");
const logger = require("../utils");

const updateUser = async (id, user) => {
    if (user.password) {
        user.password = CryptoJS.AES.encrypt(user.password, process.env.PASS_SECRET).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: user
        }, { new: true });
        
        return updatedUser;
    } catch (err) {
        logger.error(`Updating user failed: ${err}`);
    }
};

const deleteUser = async (id) => {

    try {
        
        const result = await User.findByIdAndDelete(id);
        if (result) {
            logger.info(`User ${result.email} is deleted`);
            return true;
        }

        return false;
    } catch (err) {
        logger.error(`Deleting user failed: ${err}`);
    }
};

const getUser = async (id) => {

    try {
        
        const user = await User.findById(id);
        if (user) {

            const { password, ...others } = user._doc;

            return others;
        }

        return false;
    } catch (err) {
        logger.error(`Getting user failed: ${err}`);
    }
};

const getAllUsers = async (query = "") => {

    try {
        
        const users = query 
            ? await User.find().sort({ _id: -1 }).limit(10)
            : await User.find();

        return users;
    } catch (err) {
        logger.error(`Getting users failed: ${err}`);
    }
};

const getUserStats = async (query = "") => {

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        
        const data = await User.aggregate([{
            $match: { createdAt: { $gte: lastYear }}
        }, {
            $project: { month: { $month: "$createdAt" }}
        }, {
            $group: { _id: "$month", total: { $sum : 1 } }
        }])

        return data;
    } catch (err) {
        logger.error(`Getting user statistics failed: ${err}`);
    }
};

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    getUserStats
};