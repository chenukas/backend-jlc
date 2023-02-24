const ProductService = require("../services/product.services");
const { handleSuccessResponse, handleError } = require("../utils/responseHandler");

const addProduct = async (req, res) => {
    try {
        const result = await ProductService.addProduct(req.body);

        return handleSuccessResponse(res, result, "Product is added successfully");
    } catch (err) {
        return handleError(res, err.message);
    }
};

const updateProduct = async (req, res) => {
    try {
        const result = await ProductService.updateProduct(req.params.id, req.body);

        return handleSuccessResponse(res, result, "Product is updated successfully");
    } catch (err) {
        return handleError(res, err.message);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const result = await ProductService.deleteProduct(req.params.id);

        if (result) {
            return handleSuccessResponse(res, null, "Product is deleted successfully");
        } else {
            return handleBadRequest(res, "Product is not found");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getProduct = async (req, res) => {
    try {
        const result = await ProductService.getProduct(req.params.id);

        if (result) {
            return handleSuccessResponse(res, result, "Product is found");
        } else {
            return handleBadRequest(res, "Product is not found");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getAllProducts = async (req, res) => {
    const query = req.query;
    try {
        const result = await ProductService.getAllProducts(query);

        if (result && result.length !== 0) {
            return handleSuccessResponse(res, result, "Products are found");
        } else {
            return handleSuccessResponse(res, [], "Products are empty");
        }
    } catch (err) {
        return handleError(res, err.message);
    }
};

const getProductStats = async (req, res) => {
    try {
        const result = await ProductService.getProductStats();

        return handleSuccessResponse(res, result, "Product statistics are found");
    } catch (err) {
        return handleError(res, err.message);
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    getProductStats
}