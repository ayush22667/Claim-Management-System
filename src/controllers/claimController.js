const claimService = require("../services/claimService");

exports.createClaim = (req, res) => {
  try {
    const newClaim = claimService.createClaim(req.body);
    res.status(201).json(newClaim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClaimsByUser = (req, res) => {
  try {
    const claims = claimService.getClaimsByUser(req.params.userId);
    res.json(claims);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteClaim = (req, res) => {
  try {
    const message = claimService.deleteClaim(req.params.id, req.query.userId);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
