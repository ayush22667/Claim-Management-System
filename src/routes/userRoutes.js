const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ✅ Register a new user
router.post("/register", userController.registerUser);

// ✅ Login user
router.post("/login", userController.loginUser);

// ✅ Update user details
router.put("/:id", userController.updateUser);

// ✅ Soft delete user
router.delete("/:id", userController.deleteUser);

// ✅ Get all available policies
router.get("/policies", userController.getAllPolicies);

// ✅ Buy a policy (User becomes policyholder)
router.post("/buy-policy", userController.buyPolicy);

// ✅ Get all policies purchased by a user
router.get("/my-policies/:userId", userController.getUserPolicies);

module.exports = router;
