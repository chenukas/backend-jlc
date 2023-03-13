const router = require("express").Router();
const stripeController = require("../controllers/stripe.controllers");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../middlewares/verifyToken");

router.post("/checkout", verifyToken, stripeController.processPayment);
router.get("/", verifyTokenAndAdmin, stripeController.getAllPayments)

module.exports = router;