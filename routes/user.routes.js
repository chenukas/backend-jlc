const router = require("express").Router();
const userController = require("../controllers/user.controllers");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

/**
 * @swagger
 * /api/users/:id:
 *  put:
 *     tags: 
 *        - User
 *     description: Update user
 *     responses:
 *          '200': 
 *              description: User is updated successfully
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);
/**
 * @swagger
 * /api/users/:id:
 *  delete:
 *     tags: 
 *        - User
 *     description: Delete user
 *     responses:
 *          '200': 
 *              description: User is deleted successfully
 *          '400': 
 *              description: User is not found
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);
/**
 * @swagger
 * /api/users/find/:id:
 *  get:
 *     tags: 
 *        - User
 *     description: Get user by id
 *     responses:
 *          '200': 
 *              description: User is found
 *          '400': 
 *              description: User is not found
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.get("/find/:id", verifyTokenAndAuthorization, userController.getUser);
/**
 * @swagger
 * /api/users:
 *  get:
 *     tags: 
 *        - User
 *     description: Get all users
 *     responses:
 *          '200': 
 *              description: Users are found/empty
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.get("/", verifyTokenAndAdmin, userController.getAllUsers);
/**
 * @swagger
 * /api/users/stats:
 *  get:
 *     tags: 
 *        - User
 *     description: Get active users stats
 *     responses:
 *          '200': 
 *              description: User statistics are found
 *          '401':
 *              description: You are not allowed
 *          '500':
 *              description: Internal server error
 */
router.get("/stats", verifyTokenAndAdmin, userController.getUserStats);

module.exports = router;