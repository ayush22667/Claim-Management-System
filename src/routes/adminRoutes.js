const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateUser, isAdmin } = require("../middleware/auth");

// Admin routes
router.post("/policies",  authenticateUser, isAdmin,adminController.createPolicy);
router.put("/policies/:id",  authenticateUser, isAdmin,adminController.updatePolicy);
router.delete("/policies/:id",  authenticateUser, isAdmin,adminController.deletePolicy);
router.get("/policies",  authenticateUser, isAdmin,adminController.getAllPolicies);
router.get("/purchased-policies",  authenticateUser, isAdmin,adminController.getAllPurchasedPolicies);
router.put("/claims/:id/status",  authenticateUser, isAdmin,adminController.updateClaimStatus);

module.exports = router;
