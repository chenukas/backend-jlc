const router = require("express").Router();
const cartController = require("../controllers/cart.controllers");
const { verifyToken } = require("../middlewares/verifyToken");

/**
 * @swagger
 * /api/carts:
 *  post:
 *     tags: 
 *        - Cart
 *     description: Save cart
 *     responses:
 *          '200': 
 *              description: Cart is saved successfully
 *          '403':
 *              description: Token is invalid
 *          '500':
 *              description: Internal server error
 */
router.post("/", verifyToken, cartController.addCart);
/**
 * @swagger
 * /api/carts/:id:
 *  put:
 *     tags: 
 *        - Cart
 *     description: Update cart
 *     responses:
 *          '200': 
 *              description: Cart is updated successfully
 *          '403':
 *              description: Token is invalid
 *          '500':
 *              description: Internal server error
 */
router.put("/:id", verifyToken, cartController.updateCart);
/**
 * @swagger
 * /api/carts/:id:
 *  delete:
 *     tags: 
 *        - Cart
 *     description: Delete cart
 *     responses:
 *          '200': 
 *              description: Cart is deleted successfully
 *          '400': 
 *              description: Cart is not found
 *          '403':
 *              description: Token is invalid
 *          '500':
 *              description: Internal server error
 */
router.delete("/:id", verifyToken, cartController.deleteCart);
/**
 * @swagger
 * /api/carts/find/:id:
 *  get:
 *     tags: 
 *        - Cart
 *     description: Get cart by user
 *     responses:
 *          '200': 
 *              description: Cart is found
 *          '400': 
 *              description: Cart is not found
 *          '403':
 *              description: Token is invalid
 *          '500':
 *              description: Internal server error
 */
router.get("/find/:id", verifyToken, cartController.getCart);

module.exports = router;