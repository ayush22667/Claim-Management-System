const jwt = require("jsonwebtoken");

// Middleware to Verify Token from Cookie
exports.authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// Middleware to Allow Only Admins
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Middleware to Allow Only Users
exports.isUser = (req, res, next) => {
  if (!req.user || req.user.role !== "User") {
    return res.status(403).json({ message: "Access denied. Users only." });
  }
  next();
};
