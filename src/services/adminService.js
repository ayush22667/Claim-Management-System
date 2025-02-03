const Policy = require("../models/Policy");
const User = require("../models/User");
const Claim = require("../models/Claim");
const Policyholder = require("../models/Policyholder");

// Create a New Policy (Admin Only)
exports.createPolicy = async (data) => {
  const { policyNumber, type, coverageAmount, startDate, endDate } = data;

  if (!policyNumber || !type || !coverageAmount || !startDate || !endDate) {
    throw new Error("All fields are required.");
  }

  const newPolicy = new Policy({
    policyNumber,
    type,
    coverageAmount: parseFloat(coverageAmount),
    startDate,
    endDate
  });

  await newPolicy.save();
  return newPolicy;
};

//Update an Existing Policy (Admin Only)
exports.updatePolicy = async (policyId, data) => {
  const updatedPolicy = await Policy.findByIdAndUpdate(policyId, data, { new: true });
  if (!updatedPolicy) throw new Error("Policy not found.");
  return updatedPolicy;
};

//Delete a Policy (Admin Only) - Prevent deletion if purchased by users
exports.deletePolicy = async (policyId) => {
  const policy = await Policy.findById(policyId);
  if (!policy) throw new Error("Policy not found.");

  // Check if any user has purchased this policy
  const policyholder = await Policyholder.findOne({ policies: policyId });
  if (policyholder) {
    throw new Error("Policy cannot be deleted. It has been purchased by users.");
  }

  await Policy.deleteOne({ _id: policyId });
  return { message: "Policy deleted successfully." };
};

//Get All Purchased Policies (Admin Only)
exports.getAllPurchasedPolicies = async () => {
  const policyholders = await Policyholder.find().populate("userId").populate("policies");

  return policyholders.map(policyholder => ({
    userId: policyholder.userId._id,
    userName: policyholder.userId.name,
    purchasedPolicies: policyholder.policies
  }));
};

//Update Claim Status (Approve/Reject) (Admin Only)
exports.updateClaimStatus = async (claimId, status) => {
  if (!["Approved", "Rejected"].includes(status)) {
    throw new Error("Invalid status. Must be 'Approved' or 'Rejected'.");
  }

  const claim = await Claim.findById(claimId);
  if (!claim) throw new Error("Claim not found.");

  claim.status = status;
  await claim.save();
  return claim;
};

//Get All Policies (Admin View)
exports.getAllPolicies = async () => {
  return await Policy.find();
};
