const router = require("express").Router();
const userController = require("../controllers/user.controllers");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);
router.get("/find/:id", verifyTokenAndAuthorization, userController.getUser);
router.get("/", verifyTokenAndAdmin, userController.getAllUsers);
router.get("/stats", verifyTokenAndAdmin, userController.getUserStats);

module.exports = router;