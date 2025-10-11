const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;

const registerUser = async (req, res) => {
  res.json({ message: "User registered successfully" });
};

const loginUser = async (req, res) => {
  res.json({ message: "User logged in successfully" });
};

// Get user profile (using userId from token)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // userId comes from auth middleware

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // Get from auth middleware
    const {
      fullName, // Changed from 'name' to 'fullName' to match model
      phone,
      age,
      gender,
      weight,
      height,
      activityLevel,
      medicalCondition,
      allergies,
      emergencyContact,
      bloodGroup
    } = req.body;

    const imageFile = req.file;

    // Debug: Log received data
    console.log("Received data:", {
      userId,
      fullName,
      phone,
      age,
      gender,
      weight,
      height,
      activityLevel,
      medicalCondition,
      allergies,
      emergencyContact,
      bloodGroup
    });

    // Prepare update object (only include provided fields)
    const updateData = {};
    
    if (fullName && fullName.trim() !== "") updateData.fullName = fullName;
    if (phone && phone.trim() !== "") updateData.phone = phone;
    if (age) updateData.age = parseInt(age);
    if (gender && gender.trim() !== "") updateData.gender = gender;
    if (weight) updateData.weight = parseFloat(weight);
    if (height) updateData.height = parseFloat(height);
    if (activityLevel && activityLevel.trim() !== "") updateData.activityLevel = activityLevel;
    if (medicalCondition && medicalCondition.trim() !== "") updateData.medicalCondition = medicalCondition;
    if (allergies && allergies.trim() !== "") updateData.allergies = allergies;
    if (emergencyContact && emergencyContact.trim() !== "") updateData.emergencyContact = emergencyContact;
    if (bloodGroup && bloodGroup.trim() !== "") updateData.bloodGroup = bloodGroup;

    console.log('Update data:', updateData);

    // Update basic info
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // ✅ Upload image if available
    if (imageFile) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });

        const imageURL = imageUpload.secure_url;
        updatedUser.image = imageURL;
        await updatedUser.save();
      } catch (imageError) {
        console.error('Image upload error:', imageError);
        // Continue without failing the entire update
      }
    }

    res.json({ 
      success: true, 
      message: "Profile Updated Successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = { registerUser, loginUser, getProfile, updateProfile };
