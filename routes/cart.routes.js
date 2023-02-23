const router = require("express").Router();
const cartController = require("../controllers/cart.controllers");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.post("/", verifyToken, cartController.addCart);
router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart);
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);
router.get("/find/:id", verifyTokenAndAuthorization, cartController.getCart);
router.get("/" , verifyTokenAndAdmin, cartController.getAllCarts);

module.exports = router;