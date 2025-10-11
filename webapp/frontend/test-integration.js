// Frontend-Backend Integration Test
// This can be used in browser console or as a test file

const BACKEND_URL = 'http://localhost:4000';

async function testIntegration() {
  console.log('🧪 Testing Frontend-Backend Integration...');
  
  try {
    // Test 1: Health Check
    console.log('\n1. Testing Health Check...');
    const healthResponse = await fetch(`${BACKEND_URL}/`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
    
    // Test 2: Login
    console.log('\n2. Testing Login...');
    const loginResponse = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testdebug@example.com',
        password: 'testpass123'
      })
    });
    
    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }
    
    const loginData = await loginResponse.json();
    console.log('✅ Login Success:', loginData);
    
    const token = loginData.token;
    
    // Test 3: Get Profile
    console.log('\n3. Testing Get Profile...');
    const profileResponse = await fetch(`${BACKEND_URL}/api/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!profileResponse.ok) {
      throw new Error(`Profile fetch failed: ${profileResponse.status}`);
    }
    
    const profileData = await profileResponse.json();
    console.log('✅ Profile Fetch Success:', profileData);
    
    // Test 4: Update Profile
    console.log('\n4. Testing Update Profile...');
    const updateResponse = await fetch(`${BACKEND_URL}/api/auth/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fullName: 'Frontend Test User',
        phone: '+1234567890',
        age: 28,
        gender: 'Other'
      })
    });
    
    if (!updateResponse.ok) {
      throw new Error(`Profile update failed: ${updateResponse.status}`);
    }
    
    const updateData = await updateResponse.json();
    console.log('✅ Profile Update Success:', updateData);
    
    console.log('\n🎉 All integration tests passed!');
    
    return {
      success: true,
      token: token,
      user: updateData.user
    };
    
  } catch (error) {
    console.error('❌ Integration test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Usage:
// testIntegration().then(result => console.log('Final Result:', result));

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testIntegration, BACKEND_URL };
}