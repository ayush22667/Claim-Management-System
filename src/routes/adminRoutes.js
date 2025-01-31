const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/policies", adminController.createPolicy);
router.put("/policies/:id", adminController.updatePolicy);
router.delete("/policies/:id", adminController.deletePolicy);
router.get("/purchased-policies", adminController.getAllPurchasedPolicies);
router.put("/claims/:id/status", adminController.updateClaimStatus);
router.get("/policies", adminController.getAllPolicies);

module.exports = router;
