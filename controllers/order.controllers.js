const OrderService = require("../services/order.services");
const { handleSuccessResponse, handleError } = require("../utils/responseHandler");

const createOrder = async (req, res) => {
    try {
        const result = await OrderService.createOrder(req.body);

        return handleSuccessResponse(res, result, "Order is created successfully");
    } catch (err) {
        return handleError(res, err.message);
    }
};

const updateOrder = async (req, res) => {
    try {
        const result = await OrderService.updateOrder(req.params.id, req.body);

        return handleSuccessResponse(res, result, "Order is updated successfully");
    } catch (err) {
        return handleError(res, err.message);
    }
};

const deleteOrder = async (req, res) => {
    try {
        const result = await OrderService.deleteOrder(req.params.id);

        if (result) {
            return handleSuccessResponse(res, null, "Order is deleted successfully");
        } else {
            return handleBadRequest(res, "Order is not found");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getOrders = async (req, res) => {
    try {
        const result = await OrderService.getOrders(req.params.id);

        if (result) {
            return handleSuccessResponse(res, result, "Orders are found");
        } else {
            return handleSuccessResponse(res, [], "Orders are not found");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getAllOrders = async (req, res) => {
    try {
        const result = await OrderService.getAllOrders();

        if (result && result.length !== 0) {
            return handleSuccessResponse(res, result, "All orders are found");
        } else {
            return handleSuccessResponse(res, [], "All orders are empty");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getOrderStats = async (req, res) => {
    try {
        const result = await OrderService.getOrderStats();

        return handleSuccessResponse(res, result, "Order statistics are found");
    } catch (err) {
        return handleError(res, err.message);
    }
};

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getAllOrders,
    getOrderStats
}