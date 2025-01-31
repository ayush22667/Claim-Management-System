const { User, users } = require("../models/User");
const { policies } = require("../models/Policy");

const ADMIN_SECRET_KEY = "supersecureadminkey"; // Change this in production

exports.registerUser = (data) => {
  let { name, email, password, role, adminKey } = data;

  if (!name || !email || !password || !role) {
    throw new Error("All fields are required.");
  }

  name = name.trim();
  email = email.trim().toLowerCase();
  password = password.trim();
  role = role.trim().charAt(0).toUpperCase() + role.trim().slice(1).toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  if (users.find(user => user.email === email)) {
    throw new Error("User already exists.");
  }

  if (role === "Admin") {
    if (!adminKey || adminKey !== ADMIN_SECRET_KEY) {
      throw new Error("Invalid Admin registration key.");
    }
  } else if (role !== "User") {
    throw new Error("Invalid role. Must be 'User' or 'Admin'.");
  }

  const newUser = new User(users.length + 1, name, email, password, role);
  users.push(newUser);
  return newUser;
};

exports.loginUser = (email, password) => {
  email = email.trim().toLowerCase();
  password = password.trim();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid email or password.");

  return `Token_${user.id}_${Date.now()}`; // Mock authentication token
};

exports.updateUser = (userId, data) => {
  let user = users.find(u => u.id === parseInt(userId));
  if (!user) throw new Error("User not found.");

  if (data.name) user.name = data.name.trim();
  if (data.password && data.password.length >= 6) user.password = data.password.trim();
  else if (data.password) throw new Error("Password must be at least 6 characters long.");

  return user;
};

exports.deleteUser = (userId) => {
  let user = users.find(u => u.id === parseInt(userId));
  if (!user) throw new Error("User not found.");

  user.isDisabled = true;
  return { message: "User account disabled successfully." };
};

exports.getAllPolicies = () => {
  return policies;
};

exports.buyPolicy = (userId, policyId) => {
  let user = users.find(u => u.id === parseInt(userId));
  if (!user) throw new Error("User not found.");

  let policy = policies.find(p => p.id === parseInt(policyId));
  if (!policy) throw new Error("Policy does not exist.");

  if (!user.policies.includes(parseInt(policyId))) {
    user.policies.push(parseInt(policyId));
  }

  return { message: "Policy purchased successfully.", user };
};

exports.getUserPolicies = (userId) => {
  const user = users.find(u => u.id === parseInt(userId));
  if (!user) throw new Error("User not found.");

  return policies.filter(p => user.policies.includes(p.id));
};
