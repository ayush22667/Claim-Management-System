const adminService = require("../services/adminService");

exports.createPolicy = (req, res) => {
  try {
    const newPolicy = adminService.createPolicy(req.body);
    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePolicy = (req, res) => {
  try {
    const updatedPolicy = adminService.updatePolicy(req.params.id, req.body);
    res.json(updatedPolicy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePolicy = (req, res) => {
  try {
    const message = adminService.deletePolicy(req.params.id);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPurchasedPolicies = (req, res) => {
  try {
    const purchasedPolicies = adminService.getAllPurchasedPolicies();
    res.json(purchasedPolicies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateClaimStatus = (req, res) => {
  try {
    const updatedClaim = adminService.updateClaimStatus(req.params.id, req.body.status);
    res.json(updatedClaim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPolicies = (req, res) => {
  try {
    const policies = adminService.getAllPolicies();
    res.json(policies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
