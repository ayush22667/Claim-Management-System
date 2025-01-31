const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");

// ✅ Create a new claim (Users Only)
router.post("/", claimController.createClaim);

// ✅ Get all claims for a specific user
router.get("/user/:userId", claimController.getClaimsByUser);

// ✅ Delete a claim (Users can cancel only "Pending" claims)
router.delete("/:id", claimController.deleteClaim);

module.exports = router;
