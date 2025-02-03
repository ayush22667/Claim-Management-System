// Load environment variables
require("dotenv").config();

// Import Dependencies
const express = require("express");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const setupSwagger = require("./swaggerConfig");
const connectDB = require("./config/database");
require("newrelic");

// Initialize Express
const app = express();

//Connect to MongoDB
connectDB();

// Middleware Order
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Enable reading cookies

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // ✅ Allow frontend to send cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"], // ✅ Ensures cookies can be accessed in frontend
}));

// ✅ Rate Limiting (Prevents Abuse)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Maximum 100 requests per window
    message: { error: "Too many requests, please try again later." },
    headers: true,
});
app.use(apiLimiter);

// ✅ Setup API Documentation (Swagger)
setupSwagger(app);

// ✅ Import Routes
const userRoutes = require("./routes/userRoutes");
const policyRoutes = require("./routes/policyRoutes");
const claimRoutes = require("./routes/claimRoutes");
const adminRoutes = require("./routes/adminRoutes");

// ✅ Register Routes
app.use("/users", userRoutes);
app.use("/policies", policyRoutes);
app.use("/claims", claimRoutes);
app.use("/admin", adminRoutes);

// ✅ Default Route (Root)
app.get("/", (req, res) => {
    res.send("Welcome to the Stateful Claims Management System!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
