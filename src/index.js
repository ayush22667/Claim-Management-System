const express = require("express");
const app = express();


const connectDB = require("./config/database"); // Import MongoDB connection
require("dotenv").config();

// Connect to MongoDB
connectDB();


// Importing Routes
const userRoutes = require("./routes/userRoutes");
const policyRoutes = require("./routes/policyRoutes");
const claimRoutes = require("./routes/claimRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.json());

// Using Routes
app.use("/users", userRoutes);
app.use("/policies", policyRoutes);
app.use("/claims", claimRoutes);
app.use("/admin", adminRoutes);


//load config from env file
const PORT = process.env.PORT || 3000;

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the StateFull Claims Management System!");
});

// Start Server;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
