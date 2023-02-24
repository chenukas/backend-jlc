const Order = require("../models/order.model");
const logger = require("../utils");

const createOrder = async (order) => {

    const newOrder = new Order(order);

    try {
        const savedOrder = await newOrder.save();
        return savedOrder;
    } catch (err) {
        logger.error(`Saving order failed: ${err}`);
    }
};

const updateOrder = async (id, order) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, {
            $set: order
        }, { new: true });
        
        return updatedOrder;
    } catch (err) {
        logger.error(`Updating order failed: ${err}`);
    }
};

const deleteOrder = async (id) => {

    try {
        
        const result = await Order.findByIdAndDelete(id);
        if (result) {
            logger.info(`Order ${result._id} is deleted`);
            return true;
        }

        return false;
    } catch (err) {
        logger.error(`Deleting order failed: ${err}`);
    }
};

const getOrders = async (id) => {

    try {
        
        const orders = await Order.findOne({ userId: id });
        if (orders) {

            return orders;
        }

        return false;
    } catch (err) {
        logger.error(`Getting orders failed: ${err}`);
    }
};

const getAllOrders = async () => {
    try {
        
        const orders = await Order.find();

        if (orders) {
            return orders
        }

        return false;
    } catch (err) {
        logger.error(`Getting all orders failed: ${err}`);
    }
};

const getOrderStats = async () => {

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        
        const data = await Order.aggregate([{
            $match: { createdAt: { $gte: previousMonth }}
        }, {
            $project: { month: { $month: "$createdAt" },
                        sales: "$amount" }
        }, {
            $group: { _id: "$month", total: { $sum : "$sales" } }
        }])

        return data;
    } catch (err) {
        logger.error(`Getting order statistics failed: ${err}`);
    }
};

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderStats,
}