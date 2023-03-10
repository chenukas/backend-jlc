const router = require("express").Router();
const stripeController = require("../controllers/stripe.controllers");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.post("/checkout", verifyTokenAndAuthorization, stripeController.processPayment);
router.get("/", verifyTokenAndAdmin, stripeController.getAllPayments)

module.exports = router;