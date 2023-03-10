const StripeService = require("../services/stripe.services");
const { handleSuccessResponse, handleError } = require("../utils/responseHandler");

const processPayment = async (req, res) => {
    try {
        const result = await StripeService.processPayment(req.body);

        return handleSuccessResponse(res, result, "Payment is processed successfully");
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getAllPayments = async (req, res) => {
    try {
        const result = await StripeService.getAllPayments();

        if (result && result.length !== 0) {
            return handleSuccessResponse(res, result, "All payments are found");
        } else {
            return handleSuccessResponse(res, [], "All payments are empty");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

module.exports = {
    processPayment,
    getAllPayments
}