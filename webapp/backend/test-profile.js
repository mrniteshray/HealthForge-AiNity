// Test script for getProfile and updateProfile
const axios = require('axios');

const BASE_URL = 'http://localhost:4000';

async function testProfileEndpoints() {
  try {
    console.log('🧪 Testing Profile Endpoints...\n');

    // Step 1: Register a test user
    console.log('1. Registering test user...');
    const registerData = {
      fullName: "Profile Test User",
      email: `profile.test.${Date.now()}@example.com`,
      password: "testpass123"
    };

    const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, registerData);
    console.log('✅ Registration:', registerResponse.data.message);

    // Step 2: Login to get token
    console.log('\n2. Logging in...');
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: registerData.email,
      password: registerData.password
    });
    const token = loginResponse.data.token;
    console.log('✅ Login successful, token received');

    // Step 3: Test getProfile
    console.log('\n3. Testing GET /api/auth/profile...');
    const profileResponse = await axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('✅ Get Profile Success:', {
      success: profileResponse.data.success,
      fullName: profileResponse.data.user.fullName,
      email: profileResponse.data.user.email
    });

    // Step 4: Test updateProfile
    console.log('\n4. Testing PUT /api/auth/update-profile...');
    const updateData = {
      fullName: "Updated Profile User",
      phone: "+1234567890",
      age: 25,
      gender: "Male",
      weight: 70,
      height: 175,
      activityLevel: "Moderately Active",
      emergencyContact: "+9876543210",
      bloodGroup: "A+"
    };

    const updateResponse = await axios.put(`${BASE_URL}/api/auth/update-profile`, updateData, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Update Profile Success:', {
      success: updateResponse.data.success,
      message: updateResponse.data.message,
      updatedName: updateResponse.data.user.fullName,
      phone: updateResponse.data.user.phone,
      age: updateResponse.data.user.age
    });

    // Step 5: Verify update
    console.log('\n5. Verifying update...');
    const verifyResponse = await axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('✅ Verification Success:', {
      fullName: verifyResponse.data.user.fullName,
      phone: verifyResponse.data.user.phone,
      age: verifyResponse.data.user.age,
      gender: verifyResponse.data.user.gender
    });

    console.log('\n🎯 All Profile Endpoints Working! ✅');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testProfileEndpoints();