const policyService = require("../services/policyService");

exports.getAllPolicies = (req, res) => {
  try {
    const policies = policyService.getAllPolicies();
    res.json(policies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPolicyById = (req, res) => {
  try {
    const policy = policyService.getPolicyById(req.params.id);
    res.json(policy);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
