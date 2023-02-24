const router = require("express").Router();
const orderController = require("../controllers/order.controllers");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.post("/", verifyToken, orderController.createOrder);
router.put("/:id", verifyTokenAndAdmin, orderController.updateOrder);
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);
router.get("/find/:id", verifyTokenAndAuthorization, orderController.getOrders);
router.get("/" , verifyTokenAndAdmin, orderController.getAllOrders);
router.get("/stats", verifyTokenAndAdmin, orderController.getOrderStats);

module.exports = router;