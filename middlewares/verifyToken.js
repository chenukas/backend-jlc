const jwt = require("jsonwebtoken");
const { handleUnauthorizedRequest, handleForbiddenRequest } = require("../utils/responseHandler");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return handleForbiddenRequest(res, `Token is invalid`);
            }
            req.user = user;
            next();
        })
    } else {
        return handleUnauthorizedRequest(res, `You are not authenticated`);
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return handleUnauthorizedRequest(res, `You are not allowed`);
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return handleUnauthorizedRequest(res, `You are not allowed`);
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};