const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    // Basic profile fields
    phone: {
      type: String,
      trim: true,
      default: "",
    },

    // ✅ Additional profile fields
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    weight: {
      type: Number,
      min: [0, "Weight cannot be negative"],
    },
    height: {
      type: Number,
      min: [0, "Height cannot be negative"],
    },
    activityLevel: {
      type: String,
      enum: [
        "Sedentary",
        "Lightly Active",
        "Moderately Active",
        "Very Active",
        "Extra Active",
      ],
    },
    medicalCondition: {
      type: String,
      trim: true,
    },
    allergies: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      type: String,
      trim: true,
    },
    bloodGroup: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
