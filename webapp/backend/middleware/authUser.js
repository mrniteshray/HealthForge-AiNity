const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;   // ✅ consistent with your controller
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authUser;
