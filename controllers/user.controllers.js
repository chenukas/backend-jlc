const UserService = require("../services/user.services");
const { handleSuccessResponse, handleBadRequest, handleError } = require("../utils/responseHandler");

const updateUser = async (req, res) => {
    try {
        const result = await UserService.updateUser(req.params.id, req.body);

        return handleSuccessResponse(res, result, "User is updated successfully");
    } catch (err) {
        return handleError(res, err.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await UserService.deleteUser(req.params.id);

        if (result) {
            return handleSuccessResponse(res, null, "User is deleted successfully");
        } else {
            return handleBadRequest(res, "User is not found");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getUser = async (req, res) => {
    try {
        const result = await UserService.getUser(req.params.id);

        if (result) {
            return handleSuccessResponse(res, result, "User is found");
        } else {
            return handleBadRequest(res, "User is not found");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const result = await UserService.getAllUsers(query);

        if (result && result.length !== 0) {
            return handleSuccessResponse(res, result, "Users are found");
        } else {
            return handleSuccessResponse(res, [], "Users are empty");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getUserStats = async (req, res) => {
    try {
        const result = await UserService.getUserStats();

        return handleSuccessResponse(res, result, "User statistics are found");
    } catch (err) {
        return handleError(res, err.message);
    }
};

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    getUserStats
}