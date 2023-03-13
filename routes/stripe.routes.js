const router = require("express").Router();
const stripeController = require("../controllers/stripe.controllers");
const { verifyTokenAndAdmin, verifyToken } = require("../middlewares/verifyToken");

/**
 * @swagger
 * /api/payments/checkout:
 *  post:
 *     tags: 
 *        - Payment
 *     description: Process payment
 *     responses:
 *          '200': 
 *              description: Payment is processed successfully
 *          '403':
 *              description: Token is invalid
 *          '500':
 *              description: Internal server error
 */
router.post("/checkout", verifyToken, stripeController.processPayment);
/**
 * @swagger
 * /api/payments:
 *  get:
 *     tags: 
 *        - Payment
 *     description: Get all payments
 *     responses:
 *          '200': 
 *              description: All payments are found/empty
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.get("/", verifyTokenAndAdmin, stripeController.getAllPayments)

module.exports = router;