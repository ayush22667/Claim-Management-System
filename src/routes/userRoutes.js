const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateUser, isUser } = require("../middleware/auth");


router.post("/register", userController.registerUser);

// Login user
router.post("/login", userController.loginUser);

// Update user details
router.put("/:id", authenticateUser, isUser, userController.updateUser);

// Soft delete user
router.delete("/:id", authenticateUser, isUser, userController.deleteUser);

// Get all available policies
router.get("/policies", authenticateUser, isUser, userController.getAllPolicies);

//Buy a policy (User becomes policyholder)
router.post("/buy-policy", authenticateUser, isUser, userController.buyPolicy);
router.get("/my-policies/:userId", authenticateUser, isUser, userController.getUserPolicies);

//Forgot Password Route (Send Email)
router.post("/forgot-password", userController.forgotPassword);

//Reset Password Route (Set New Password)
router.post("/reset-password", userController.resetPassword);

module.exports = router;
