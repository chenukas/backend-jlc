const router = require("express").Router();
const cartController = require("../controllers/cart.controllers");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.post("/", verifyToken, cartController.addCart);
router.put("/:id", verifyToken, cartController.updateCart);
router.delete("/:id", verifyToken, cartController.deleteCart);
router.get("/find/:id", verifyToken, cartController.getCart);
router.get("/" , verifyTokenAndAdmin, cartController.getAllCarts);

module.exports = router;