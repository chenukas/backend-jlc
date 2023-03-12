const Cart = require("../models/cart.model");
const logger = require("../utils");

const addCart = async (cart) => {

    const newCart = new Cart(cart);

    try {
        const savedCart = await newCart.save();
        return savedCart;
    } catch (err) {
        logger.error(`Saving cart failed: ${err}`);
    }
};

const updateCart = async (id, cart) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(id, {
            $set: cart
        }, { new: true });
        
        return updatedCart;
    } catch (err) {
        logger.error(`Updating cart failed: ${err}`);
    }
};

const deleteCart = async (id) => {

    try {
        
        const result = await Cart.findByIdAndDelete(id);
        if (result) {
            logger.info(`Cart ${result._id} is deleted`);
            return true;
        }

        return false;
    } catch (err) {
        logger.error(`Deleting cart failed: ${err}`);
    }
};

const getCart = async (id) => {

    try {
        
        const cart = await Cart.findOne({ userId: id });
        if (cart) {

            return cart;
        }

        return false;
    } catch (err) {
        logger.error(`Getting cart failed: ${err}`);
    }
};

module.exports = {
    addCart,
    updateCart,
    deleteCart,
    getCart
}