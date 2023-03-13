const router = require("express").Router();
const productController = require("../controllers/product.controllers");
const { productDataValidation } = require("../middlewares/validations");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

/**
 * @swagger
 * /api/products:
 *  post:
 *     tags: 
 *        - Product
 *     description: Add a product
 *     responses:
 *          '200': 
 *              description: Product is added successfully
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.post("/", verifyTokenAndAdmin, productDataValidation, productController.addProduct);
/**
 * @swagger
 * /api/products/:id:
 *  put:
 *     tags: 
 *        - Product
 *     description: Update product
 *     responses:
 *          '200': 
 *              description: Product is updated successfully
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);
/**
 * @swagger
 * /api/products/:id:
 *  delete:
 *     tags: 
 *        - Product
 *     description: Delete product
 *     responses:
 *          '200': 
 *              description: Product is deleted successfully
 *          '400': 
 *              description: Product is not found
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);
/**
 * @swagger
 * /api/products/find/:id:
 *  get:
 *     tags: 
 *        - Product
 *     description: Get a product by id
 *     responses:
 *          '200': 
 *              description: Product is found
 *          '400': 
 *              description: Product is not found
 *          '500':
 *              description: Internal server error
 */
router.get("/find/:id", productController.getProduct);
/**
 * @swagger
 * /api/products:
 *  get:
 *     tags: 
 *        - Product
 *     description: Get products
 *     responses:
 *          '200': 
 *              description: Products are found/empty
 *          '500':
 *              description: Internal server error
 */
router.get("/" , productController.getAllProducts);

module.exports = router;