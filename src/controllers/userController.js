const userService = require("../services/userService");

exports.registerUser = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, userId, name, email: userEmail, role } = await userService.loginUser(email, password);

    // ✅ Send token and user details in JSON response
    res.status(200).json({
      message: "Login successful",
      token, // ✅ Token returned in response
      userId,
      name, // ✅ Added user name
      email: userEmail,
      role,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const message = await userService.deleteUser(req.params.id);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await userService.getAllPolicies();
    res.json(policies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.buyPolicy = async (req, res) => {
  try {
    const message = await userService.buyPolicy(req.body.userId, req.body.policyId);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserPolicies = async (req, res) => {
  try {
    const userPolicies = await userService.getUserPolicies(req.params.userId);
    res.json(userPolicies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Forgot Password Controller
exports.forgotPassword = async (req, res) => {
  try {
    const response = await userService.forgotPassword(req.body.email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Reset Password Controller
exports.resetPassword = async (req, res) => {
  try {
    const response = await userService.resetPassword(req.body.token, req.body.newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};