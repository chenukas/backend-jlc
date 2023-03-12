const router = require("express").Router();
const cartController = require("../controllers/cart.controllers");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/", verifyToken, cartController.addCart);
router.put("/:id", verifyToken, cartController.updateCart);
router.delete("/:id", verifyToken, cartController.deleteCart);
router.get("/find/:id", verifyToken, cartController.getCart);

module.exports = router;