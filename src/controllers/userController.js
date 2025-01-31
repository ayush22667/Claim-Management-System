const userService = require("../services/userService");

// ✅ Register User
exports.registerUser = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// ✅ Update User
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete User (Soft Delete)
exports.deleteUser = async (req, res) => {
  try {
    const message = await userService.deleteUser(req.params.id);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get All Policies
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await userService.getAllPolicies();
    res.json(policies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Buy Policy (Stateful - MongoDB)
exports.buyPolicy = async (req, res) => {
  try {
    const message = await userService.buyPolicy(req.body.userId, req.body.policyId);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get Policies Purchased by User
exports.getUserPolicies = async (req, res) => {
  try {
    const userPolicies = await userService.getUserPolicies(req.params.userId);
    res.json(userPolicies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
