const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Policy = require("../models/Policy");
const Policyholder = require("../models/Policyholder");

const ADMIN_SECRET_KEY = "supersecureadminkey"; // Change this in production

// ✅ Register User (With Password Hashing)
exports.registerUser = async (data) => {
  let { name, email, password, role, adminKey } = data;

  if (!name || !email || !password || !role) {
    throw new Error("All fields are required.");
  }

  email = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  if (await User.findOne({ email })) {
    throw new Error("User already exists.");
  }

  if (role === "Admin" && adminKey !== ADMIN_SECRET_KEY) {
    throw new Error("Invalid Admin registration key.");
  }

  // ✅ Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();
  return newUser;
};

// ✅ Login User (Compare Hashed Password)
exports.loginUser = async (email, password) => {
  email = email.trim().toLowerCase();

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password.");

  // ✅ Compare hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password.");

  return `Token_${user._id}_${Date.now()}`; // Mock authentication token
};

// ✅ Update User
exports.updateUser = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found.");

  if (data.name) user.name = data.name.trim();
  if (data.password && data.password.length >= 6) {
    user.password = await bcrypt.hash(data.password.trim(), 10);
  } else if (data.password) {
    throw new Error("Password must be at least 6 characters long.");
  }

  await user.save();
  return user;
};

// ✅ Soft Delete User (Instead of permanent deletion)
exports.deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found.");

  // Soft delete by marking `isDeleted: true`
  await User.findByIdAndUpdate(userId, { isDeleted: true });

  return { message: "User account disabled successfully." };
};

// ✅ Get All Policies
exports.getAllPolicies = async () => {
  return await Policy.find();
};

// ✅ Buy Policy (Fixed Policyholder Logic)
exports.buyPolicy = async (userId, policyId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found.");

  const policy = await Policy.findById(policyId);
  if (!policy) throw new Error("Policy does not exist.");

  // ✅ Check if the user is already a policyholder
  let policyholder = await Policyholder.findOne({ userId });

  if (policyholder) {
    // ✅ Convert ObjectId to string before checking
    const existingPolicies = policyholder.policies.map(p => p.toString());
    if (!existingPolicies.includes(policyId.toString())) {
      policyholder.policies.push(policyId);
      await policyholder.save();
    }
  } else {
    policyholder = new Policyholder({ userId, policies: [policyId] });
    await policyholder.save();
  }

  return { message: "Policy purchased successfully.", policyholder };
};

// ✅ Get User's Purchased Policies
exports.getUserPolicies = async (userId) => {
  const policyholder = await Policyholder.findOne({ userId }).populate("policies");
  if (!policyholder) throw new Error("User has not purchased any policies.");

  return policyholder.policies;
};
