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

const allowedOrigins = [
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins, 
  credentials: true // ✅ Allow sending cookies & authentication headers
}));


// Define a global rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: { error: "Too many requests, please try again later." },
    headers: true,
});

// Apply rate limiting to all routes
app.use(apiLimiter);
setupSwagger(app);

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
