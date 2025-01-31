const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser); 
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/policies", userController.getAllPolicies);
router.post("/buy-policy", userController.buyPolicy);
router.get("/my-policies", userController.getUserPolicies);

module.exports = router;
