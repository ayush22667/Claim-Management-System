const adminService = require("../services/adminService");

// Create a New Policy (Admin Only)
exports.createPolicy = async (req, res) => {
  try {
    const newPolicy = await adminService.createPolicy(req.body);
    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an Existing Policy (Admin Only)
exports.updatePolicy = async (req, res) => {
  try {
    const updatedPolicy = await adminService.updatePolicy(req.params.id, req.body);
    res.json(updatedPolicy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Policy (Admin Only)
exports.deletePolicy = async (req, res) => {
  try {
    const message = await adminService.deletePolicy(req.params.id);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Purchased Policies (Admin View)
exports.getAllPurchasedPolicies = async (req, res) => {
  try {
    const purchasedPolicies = await adminService.getAllPurchasedPolicies();
    res.json(purchasedPolicies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Claim Status (Admin Approve/Reject)
exports.updateClaimStatus = async (req, res) => {
  try {
    const updatedClaim = await adminService.updateClaimStatus(req.params.id, req.body.status);
    res.json(updatedClaim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get All Policies (Admin View)
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await adminService.getAllPolicies();
    res.json(policies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
