const router = require("express").Router();
const stripeController = require("../controllers/stripe.controllers");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.post("/payment", verifyTokenAndAuthorization, stripeController.processPayment);

module.exports = router;