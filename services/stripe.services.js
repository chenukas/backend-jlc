const logger = require("../utils");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const processPayment = async (payment) => {
    try {
        const charge = await stripe.charges.create({
            source: payment.tokenId,
            amount: payment.amount,
            currency: "aud"
        })

        if (charge.status === "succeeded") {
            return charge
        } else {
            logger.error(`Payment gateway failed`);
        }
    } catch (err) {
        logger.error(`Processing payment is failed: ${err}`);
    }
};

module.exports = {
    processPayment
}