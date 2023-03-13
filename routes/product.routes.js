const router = require("express").Router();
const productController = require("../controllers/product.controllers");
const { productDataValidation } = require("../middlewares/validations");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.post("/", verifyTokenAndAdmin, productDataValidation, productController.addProduct);
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);
router.get("/find/:id", productController.getProduct);
router.get("/" , productController.getAllProducts);

module.exports = router;