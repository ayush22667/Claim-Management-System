const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// ✅ Create a new policy (Admin Only)
router.post("/policies", adminController.createPolicy);

// ✅ Update an existing policy (Admin Only)
router.put("/policies/:id", adminController.updatePolicy);

// ✅ Delete a policy (Admin Only)
router.delete("/policies/:id", adminController.deletePolicy);

// ✅ Get all policies (Admin View)
router.get("/policies", adminController.getAllPolicies);

// ✅ Get all purchased policies by users (Admin Only)
router.get("/purchased-policies", adminController.getAllPurchasedPolicies);

// ✅ Update claim status (Admin Approve/Reject)
router.put("/claims/:id/status", adminController.updateClaimStatus);

module.exports = router;
