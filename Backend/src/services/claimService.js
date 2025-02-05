const Claim = require("../models/Claim");
const Policy = require("../models/Policy");
const Policyholder = require("../models/Policyholder");

// Create a New Claim
exports.createClaim = async ({
  userId,
  policyId,
  Document,
  amount,
  dateFiled,
}) => {
  if (!userId || !policyId || !Document || !amount || !dateFiled) {
    throw new Error("All fields are required.");
  }

  // Ensure user owns the policy
  const policyholder = await Policyholder.findOne({
    userId,
    policies: policyId,
  });
  if (!policyholder)
    throw new Error("User does not own this policy and cannot file a claim.");

  // Ensure policy exists
  const policy = await Policy.findById(policyId);
  if (!policy) throw new Error("Policy not found.");

  // Check claim amount
  if (amount > policy.coverageAmount) {
    throw new Error(
      `Claim amount cannot exceed policy coverage amount (${policy.coverageAmount}).`
    );
  }

  //Save claim in MongoDB
  const newClaim = new Claim({
    userId,
    policyId,
    Document,
    amount,
    status: "Pending",
    dateFiled,
  });
  return await newClaim.save();
};

// Get All Claims for a User
exports.getClaimsByUser = async (userId) => {
  return await Claim.find({ userId }).populate(
    "policyId",
    "policyNumber type coverageAmount"
  );
};

// Delete a Claim
exports.deleteClaim = async (claimId, userId) => {
  const claim = await Claim.findById(claimId);
  if (!claim) throw new Error("Claim not found.");
  if (claim.userId.toString() !== userId)
    throw new Error("Unauthorized action.");
  if (claim.status !== "Pending")
    throw new Error("Cannot delete a processed claim.");

  await Claim.deleteOne({ _id: claimId });
  return { message: "Claim canceled successfully." };
};
