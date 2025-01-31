const express = require("express");
const router = express.Router();
const policyController = require("../controllers/policyController");

router.get("/", policyController.getAllPolicies); 
router.get("/:id", policyController.getPolicyById);

module.exports = router;
