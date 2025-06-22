 const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/api");
const path = require('path');

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
// Removed xss-clean due to incompatibility
const hpp = require("hpp");
const cors = require("cors");
const bodyParser = require("body-parser");
 

const app = express();

// Enable CORS
app.use(cors());

// Set secure HTTP headers
app.use(helmet());
 
// Prevent HTTP Parameter Pollution
app.use(hpp());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3000, // limit each IP to 3000 requests per window
});
app.use(limiter);

// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/crudmern";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mount API routes under /api/v1
// app.use("/api/v1", router);
 
app.use("/api/v1", router);

// Handle 404 for unknown routes (any route not handled above)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
 
 
 


module.exports = app;
