const express = require("express");
const router = express.Router();
const policyController = require("../controllers/policyController");
const { authenticateUser, isUser } = require("../middleware/auth");

//Get all policies (Available to everyone)
router.get("/", authenticateUser, isUser, policyController.getAllPolicies);

// Get a policy by ID (Available to everyone)
router.get("/:id", authenticateUser, isUser, policyController.getPolicyById);

module.exports = router;
