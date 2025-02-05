const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const setupSwagger = require("./swaggerConfig");
require("newrelic");

const connectDB = require("./config/database");
require("dotenv").config();

// Connect to MongoDB
connectDB();

// 🚀 FIX 1: Allow Frontend URL (Update it in production)
app.use(cors({
    origin: [
        "http://localhost:3000"
    ],
    credentials: true, // Required for cookies to work
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
}));

// 🚀 FIX 2: Handle Preflight Requests (OPTIONS method)
app.options("*", cors()); 

// 🚀 FIX 3: Use JSON Parser and Cookie Parser
app.use(express.json());
app.use(cookieParser());

// Define a global rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
    message: { error: "Too many requests, please try again later." },
    headers: true,
});

// Apply rate limiting to all routes
app.use(apiLimiter);
setupSwagger(app);

// 🚀 FIX 4: Configure Cookies Correctly in Express
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Importing Routes
const userRoutes = require("./routes/userRoutes");
const policyRoutes = require("./routes/policyRoutes");
const claimRoutes = require("./routes/claimRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Using Routes
app.use("/users", userRoutes);
app.use("/policies", policyRoutes);
app.use("/claims", claimRoutes);
app.use("/admin", adminRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the StateFull Claims Management System!");
});

// Load config from env file
const PORT = process.env.PORT || 4000;

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
