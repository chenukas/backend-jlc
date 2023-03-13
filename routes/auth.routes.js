const router = require("express").Router();
const authController = require("../controllers/auth.controllers");
const { userDataValidation } = require("../middlewares/validations");

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *     tags: 
 *        - Auth
 *     description: Register user
 *     responses:
 *          '200': 
 *              description: User registered successfully
 *          '400':
 *              description: You've entered wrong details
 *          '500':
 *              description: Internal server error
 */
router.post("/register", userDataValidation, authController.registerUser);
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *     tags: 
 *        - Auth
 *     description: Login user
 *     responses:
 *          '200': 
 *              description: User logged in successfully
 *          '401':
 *              description: You've entered wrong credentials
 *          '500':
 *              description: Internal server error
 */
router.post("/login", authController.loginUser);

module.exports = router;