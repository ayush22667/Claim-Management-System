const userService = require("../services/userService");

exports.registerUser = (req, res) => {
  try {
    const newUser = userService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    const token = userService.loginUser(email, password);
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.updateUser = (req, res) => {
  try {
    const updatedUser = userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const message = userService.deleteUser(req.params.id);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPolicies = (req, res) => {
  try {
    const policies = userService.getAllPolicies();
    res.json(policies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.buyPolicy = (req, res) => {
  try {
    const message = userService.buyPolicy(req.body.userId, req.body.policyId);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserPolicies = (req, res) => {
  try {
    const userPolicies = userService.getUserPolicies(req.query.userId);
    res.json(userPolicies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
