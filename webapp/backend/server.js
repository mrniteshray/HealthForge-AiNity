const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require('fs');

// DB & Cloudinary
const connectDB = require("./config/db");
const connectCloudinary = require("./config/cloudinary");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// Connect to database and cloudinary
connectDB();
connectCloudinary();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "HealthForge API is running successfully! 🚀",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      user: "/api/user",
      available_routes: [
        "POST /api/auth/register",
        "POST /api/auth/login", 
        "GET /api/auth/profile (protected)",
        "PUT /api/auth/update-profile (protected)",
        "GET /api/user/get-profile (protected)",
        "POST /api/user/update-profile (protected, with file upload)"
      ]
    }
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global Error:', error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log(`🚀 HealthForge Backend Server Started`);
  console.log(`📍 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/`);
  console.log(`📁 File Upload Directory: ${uploadsDir}`);
  console.log('='.repeat(60));
});
