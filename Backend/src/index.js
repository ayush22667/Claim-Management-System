const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const setupSwagger = require("./swaggerConfig");
require("newrelic");
const connectDB = require("./config/database");
require("dotenv").config();

connectDB();


const whitelist = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",") 
  : ["*"];

app.use(
  cors({
    origin: whitelist,
    credentials: true,
    maxAge: 14400,
  })
);


app.use(express.json());
app.use(cookieParser());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests, please try again later." },
    headers: true,
});

app.use(apiLimiter);
setupSwagger(app);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const userRoutes = require("./routes/userRoutes");
const policyRoutes = require("./routes/policyRoutes");
const claimRoutes = require("./routes/claimRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/users", userRoutes);
app.use("/policies", policyRoutes);
app.use("/claims", claimRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the StateFull Claims Management System!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
