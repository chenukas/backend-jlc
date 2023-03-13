const router = require("express").Router();
const orderController = require("../controllers/order.controllers");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

/**
 * @swagger
 * /api/orders:
 *  post:
 *     tags: 
 *        - Order
 *     description: Create an order
 *     responses:
 *          '200': 
 *              description: Order is created successfully
 *          '403':
 *              description: Token is invalid
 *          '500':
 *              description: Internal server error
 */
router.post("/", verifyToken, orderController.createOrder);
/**
 * @swagger
 * /api/orders/:id:
 *  put:
 *     tags: 
 *        - Order
 *     description: Update order
 *     responses:
 *          '200': 
 *              description: Order is updated successfully
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.put("/:id", verifyTokenAndAdmin, orderController.updateOrder);
/**
 * @swagger
 * /api/orders/:id:
 *  delete:
 *     tags: 
 *        - Order
 *     description: Delete order
 *     responses:
 *          '200': 
 *              description: Order is deleted successfully
 *          '400':
 *              description: Order is not found
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);
/**
 * @swagger
 * /api/orders/find/:id:
 *  get:
 *     tags: 
 *        - Order
 *     description: Get orders by user
 *     responses:
 *          '200': 
 *              description: Orders are found/not found
 *          '403':
 *              description: Token is invalid
 *          '500':
 *              description: Internal server error
 */
router.get("/find/:id", verifyToken, orderController.getOrders);
/**
 * @swagger
 * /api/orders:
 *  get:
 *     tags: 
 *        - Order
 *     description: Get all orders
 *     responses:
 *          '200': 
 *              description: All orders are found/empty
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.get("/" , verifyTokenAndAdmin, orderController.getAllOrders);
/**
 * @swagger
 * /api/orders/stats:
 *  get:
 *     tags: 
 *        - Order
 *     description: Get sales stats
 *     responses:
 *          '200': 
 *              description: Order statistics are found
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.get("/stats", verifyTokenAndAdmin, orderController.getOrderStats);

module.exports = router;