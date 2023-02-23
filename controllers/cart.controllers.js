const CartService = require("../services/cart.services");
const { handleSuccessResponse, handleError } = require("../utils/responseHandler");

const addCart = async (req, res) => {
    try {
        const result = await CartService.addCart(req.body);

        return handleSuccessResponse(res, result, "Cart is saved successfully");
    } catch (err) {
        return handleError(res, err.message);
    }
};

const updateCart = async (req, res) => {
    try {
        const result = await CartService.updateCart(req.params.id, req.body);

        return handleSuccessResponse(res, result, "Cart is updated successfully");
    } catch (err) {
        return handleError(res, err.message);
    }
};

const deleteCart = async (req, res) => {
    try {
        const result = await CartService.deleteCart(req.params.id);

        if (result) {
            return handleSuccessResponse(res, null, "Cart is deleted successfully");
        } else {
            return handleBadRequest(res, "Cart is not found");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getCart = async (req, res) => {
    try {
        const result = await CartService.getCart(req.params.id);

        if (result) {
            return handleSuccessResponse(res, result, "Cart is found");
        } else {
            return handleBadRequest(res, "Cart is not found");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getAllCarts = async (req, res) => {
    try {
        const result = await CartService.getAllCarts();

        if (result && result.length !== 0) {
            return handleSuccessResponse(res, result, "Carts are found");
        } else {
            return handleSuccessResponse(res, [], "Carts are empty");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

module.exports = {
    addCart,
    updateCart,
    deleteCart,
    getCart,
    getAllCarts
}