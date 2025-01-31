const { Claim, claims } = require("../models/Claim");
const { policies } = require("../models/Policy");
const { users } = require("../models/User");

exports.createClaim = (data) => {
  const { userId, policyId, claimNumber, amount, dateFiled } = data;

  if (!userId || !policyId || !claimNumber || !amount || !dateFiled) {
    throw new Error("All fields are required.");
  }

  const user = users.find(u => u.id === parseInt(userId));
  if (!user) throw new Error("User not found.");

  if (!user.policies.includes(parseInt(policyId))) {
    throw new Error("User does not own this policy and cannot file a claim.");
  }

  const policy = policies.find(p => p.id === parseInt(policyId));
  if (!policy) throw new Error("Policy not found.");

  if (parseFloat(amount) > policy.coverageAmount) {
    throw new Error(`Claim amount cannot exceed policy coverage amount (${policy.coverageAmount}).`);
  }

  const newClaim = new Claim(claims.length + 1, policyId, userId, claimNumber, amount, "Pending", dateFiled);
  claims.push(newClaim);
  return newClaim;
};

exports.getClaimsByUser = (userId) => {
  return claims.filter(c => c.userId === parseInt(userId));
};

exports.deleteClaim = (claimId, userId) => {
  const claimIndex = claims.findIndex(c => c.id === parseInt(claimId));
  if (claimIndex === -1) throw new Error("Claim not found.");

  const claim = claims[claimIndex];

  if (claim.userId !== parseInt(userId)) throw new Error("Unauthorized action.");
  if (claim.status !== "Pending") throw new Error("Cannot cancel an approved/rejected claim.");

  claims.splice(claimIndex, 1);
  return { message: "Claim canceled successfully." };
};
