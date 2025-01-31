const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");

router.post("/", claimController.createClaim);
router.get("/user/:userId", claimController.getClaimsByUser);
router.delete("/:id", claimController.deleteClaim);

module.exports = router;
