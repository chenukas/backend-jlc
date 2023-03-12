const AuthService = require("../services/auth.services");
const { handleSuccessResponse, handleError, handleUnauthorizedRequest, handleBadRequest } = require("../utils/responseHandler");

const registerUser = async (req, res) => {
    try {
        const result = await AuthService.registerUser(req.body);
        if (result) {
            return handleSuccessResponse(res, result, "User registered successfully");
        } else {
            return handleBadRequest(res, `You've entered wrong details`)
        }

    } catch (err) {
        return handleError(res, err.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const result = await AuthService.loginUser(req.body);

        if (!result) {
            return handleUnauthorizedRequest(res, `You've entered wrong credentials`);
        }
        return handleSuccessResponse(res, result, "User logged in successfully");
    } catch (err) {
        return handleError(res, err.message);
    }
};

module.exports = {
    registerUser,
    loginUser
};