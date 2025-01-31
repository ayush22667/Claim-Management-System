const { policies } = require("../models/Policy");
const { users } = require("../models/User");
const { claims } = require("../models/Claim");

exports.createPolicy = (data) => {
  const { policyNumber, type, coverageAmount, startDate, endDate } = data;

  if (!policyNumber || !type || !coverageAmount || !startDate || !endDate) {
    throw new Error("All fields are required.");
  }

  const newPolicy = {
    id: policies.length + 1,
    policyNumber,
    type,
    coverageAmount: parseFloat(coverageAmount),
    startDate,
    endDate
  };

  policies.push(newPolicy);
  return newPolicy;
};

exports.updatePolicy = (policyId, data) => {
  const policy = policies.find(p => p.id === parseInt(policyId));
  if (!policy) throw new Error("Policy not found.");

  Object.assign(policy, data);
  return policy;
};

exports.deletePolicy = (policyId) => {
  const policyIndex = policies.findIndex(p => p.id === parseInt(policyId));
  if (policyIndex === -1) throw new Error("Policy not found.");

  // Check if any user has purchased this policy
  const isPurchased = users.some(user => user.policies.includes(parseInt(policyId)));
  if (isPurchased) throw new Error("Policy cannot be deleted. It has been purchased by users.");

  policies.splice(policyIndex, 1);
  return { message: "Policy deleted successfully." };
};

exports.getAllPurchasedPolicies = () => {
  let purchasedPolicies = [];

  users.forEach(user => {
    if (user.policies.length > 0) {
      let userPolicies = policies.filter(p => user.policies.includes(p.id));
      purchasedPolicies.push({ userId: user.id, userName: user.name, purchasedPolicies: userPolicies });
    }
  });

  return purchasedPolicies;
};

exports.updateClaimStatus = (claimId, status) => {
  const claim = claims.find(c => c.id === parseInt(claimId));
  if (!claim) throw new Error("Claim not found.");

  if (!["Approved", "Rejected"].includes(status)) {
    throw new Error("Invalid status. Must be 'Approved' or 'Rejected'.");
  }

  claim.status = status;
  return claim;
};

exports.getAllPolicies = () => {
  return policies;
};