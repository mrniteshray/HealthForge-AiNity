const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log("✅ Database Connected Successfully!");
    //   console.log(`📊 Connected to MongoDB at: ${process.env.MONGODB_URI}/healthforge`);
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/healthforge`); // Changed database name to healthforge
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;