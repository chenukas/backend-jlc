const logger = require("../utils");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Payment = require('../models/payment.model');

const processPayment = async (payment) => {
    try {
        const charge = await stripe.charges.create({
            source: payment.tokenId,
            amount: payment.amount,
            currency: "aud"
        })
        if (charge.status === "succeeded") {
            const newPayment = new Payment({
                email: payment.email,
                paymentId: charge.id,
                amount: charge.amount,
                source: charge.source,
                currency: charge.currency,
                status: charge.status,
                receipt_url: charge.receipt_url
            })

            const savedPayment = await newPayment.save();
            return savedPayment;
        } else {
            logger.error(`Payment gateway failed`);
        }
    } catch (err) {
        logger.error(`Processing payment is failed: ${err}`);
    }
};

const getAllPayments = async () => {
    try {
        
        const payments = await Payment.find();

        if (payments) {
            return payments
        }

        return false;
    } catch (err) {
        logger.error(`Getting all payments failed: ${err}`);
    }
};

module.exports = {
    processPayment,
    getAllPayments
}