const { policies } = require("../models/Policy");

exports.getAllPolicies = () => {
  return policies;
};

exports.getPolicyById = (policyId) => {
  const policy = policies.find(p => p.id === parseInt(policyId));
  if (!policy) throw new Error("Policy not found.");
  return policy;
};
