const router = require("express").Router();
const authController = require("../controllers/auth.controllers");
const { userDataValidation } = require("../middlewares/validations");

router.post("/register", userDataValidation, authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;