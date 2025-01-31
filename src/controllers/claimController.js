const claimService = require("../services/claimService");

// ✅ Create a New Claim
exports.createClaim = async (req, res) => {
  try {
    const newClaim = await claimService.createClaim(req.body);
    res.status(201).json(newClaim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get All Claims for a User
exports.getClaimsByUser = async (req, res) => {
  try {
    const claims = await claimService.getClaimsByUser(req.params.userId);
    res.json(claims);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete a Claim (Cancel by User)
exports.deleteClaim = async (req, res) => {
  try {
    const message = await claimService.deleteClaim(req.params.id, req.query.userId);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
