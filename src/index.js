const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/database"); 
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Allow all origins
app.use(cors());

// Define a global rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: { error: "Too many requests, please try again later." },
    headers: true,
});

// Apply rate limiting to all routes
app.use(apiLimiter);

// Importing Routes
const userRoutes = require("./routes/userRoutes");
const policyRoutes = require("./routes/policyRoutes");
const claimRoutes = require("./routes/claimRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Using Routes
app.use("/users", userRoutes);
app.use("/policies", policyRoutes);
app.use("/claims", claimRoutes);
app.use("/admin", adminRoutes);

// Load config from env file
const PORT = process.env.PORT;

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the StateFull Claims Management System!");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
