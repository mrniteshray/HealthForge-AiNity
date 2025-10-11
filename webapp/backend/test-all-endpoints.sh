#!/bin/bash

echo "🧪 Testing HealthForge Backend - All Endpoints"
echo "==============================================="

BASE_URL="http://localhost:4000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "\n${YELLOW}1. Testing Health Check...${NC}"
curl -s "$BASE_URL/" | python3 -m json.tool

echo -e "\n${YELLOW}2. Testing User Registration...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User Debug",
    "email": "testdebug@example.com",
    "password": "testpass123"
  }')
echo "$REGISTER_RESPONSE" | python3 -m json.tool

echo -e "\n${YELLOW}3. Testing User Login...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testdebug@example.com",
    "password": "testpass123"
  }')
echo "$LOGIN_RESPONSE" | python3 -m json.tool

# Extract token
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -n "$TOKEN" ]; then
  echo -e "\n${GREEN}✅ Token extracted successfully${NC}"
  
  echo -e "\n${YELLOW}4. Testing GET Auth Profile...${NC}"
  curl -s -X GET "$BASE_URL/api/auth/profile" \
    -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
  
  echo -e "\n${YELLOW}5. Testing PUT Auth Update Profile...${NC}"
  curl -s -X PUT "$BASE_URL/api/auth/update-profile" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{
      "fullName": "Updated Auth User",
      "phone": "+1234567890",
      "age": 25,
      "gender": "Male"
    }' | python3 -m json.tool
    
  echo -e "\n${YELLOW}6. Testing GET User Profile...${NC}"
  curl -s -X GET "$BASE_URL/api/user/get-profile" \
    -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
    
  echo -e "\n${YELLOW}7. Testing POST User Update Profile...${NC}"
  curl -s -X POST "$BASE_URL/api/user/update-profile" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{
      "fullName": "Updated User Profile",
      "phone": "+9876543210",
      "age": 30,
      "gender": "Female",
      "weight": 65,
      "height": 165
    }' | python3 -m json.tool
    
else
  echo -e "\n${RED}❌ Could not extract token${NC}"
fi

echo -e "\n${YELLOW}8. Testing Unauthorized Access...${NC}"
curl -s -X GET "$BASE_URL/api/auth/profile" | python3 -m json.tool

echo -e "\n${GREEN}🎯 Backend Testing Complete!${NC}"