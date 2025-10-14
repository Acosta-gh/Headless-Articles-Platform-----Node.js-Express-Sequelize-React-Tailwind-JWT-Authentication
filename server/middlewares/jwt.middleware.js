const jwt = require("jsonwebtoken");
const { jwtSecret } = require("@/configs/auth");

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Malformed token." });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload; 
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
  
}

module.exports = { verifyJWT };