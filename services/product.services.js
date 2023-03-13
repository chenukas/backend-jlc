const Product = require("../models/product.model");
const logger = require("../utils");

const addProduct = async (product) => {

    const newProduct = new Product(product);

    try {
        const savedProduct = await newProduct.save();
        return savedProduct;
    } catch (err) {
        logger.error(`Saving product failed: ${err}`);
    }
};

const updateProduct = async (id, product) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            $set: product
        }, { new: true });
        
        return updatedProduct;
    } catch (err) {
        logger.error(`Updating product failed: ${err}`);
    }
};

const deleteProduct = async (id) => {

    try {
        
        const result = await Product.findByIdAndDelete(id);
        if (result) {
            logger.info(`Product ${result.title} is deleted`);
            return true;
        }

        return false;
    } catch (err) {
        logger.error(`Deleting product failed: ${err}`);
    }
};

const getProduct = async (id) => {

    try {
        
        const product = await Product.findById(id);
        if (product) {

            return product;
        }

        return false;
    } catch (err) {
        logger.error(`Getting product failed: ${err}`);
    }
};

const getAllProducts = async (query = "") => {
    const queryNew = query.new;
    const queryCategory = query.category;
    try {
        let products = []

        if (queryNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (queryCategory) {
            products = await Product.find({ categories : {
                $in: [queryCategory]
            }});
        } else {
            products = await Product.find();
        }

        return products;
    } catch (err) {
        logger.error(`Getting products failed: ${err}`);
    }
};


module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
}