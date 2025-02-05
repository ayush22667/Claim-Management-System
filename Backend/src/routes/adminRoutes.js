const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateUser, isAdmin } = require("../middleware/auth");

// Admin routes
router.post("/policies",  adminController.createPolicy);
router.put("/policies/:id",  adminController.updatePolicy);
router.delete("/policies/:id",  adminController.deletePolicy);
router.get("/policies",  adminController.getAllPolicies);
router.get("/purchased-policies", adminController.getAllPurchasedPolicies);
router.get("/claims", adminController.getAllClaims);
router.put("/claims/:id/status",  adminController.updateClaimStatus);

module.exports = router;
