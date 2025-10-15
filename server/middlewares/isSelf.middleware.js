const jwt = require("jsonwebtoken");
const { jwtSecret } = require("@/configs/auth");

// Middleware para asegurarse de que el usuario autenticado es el dueño del recurso
function isSelf(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header:", authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token received:", token);
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log("Decoded token in middleware:", decoded);
    const requestedId = req.params.id || req.body.id;
    console.log("Comparing decoded.id:", decoded.id, "with requestedId:", requestedId);

    if (String(decoded.id) !== String(requestedId)) {
      return res.status(403).json({ error: "Forbidden: not your resource" });
    }
    next();
  } catch (error) {
    console.error("JWT error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { isSelf };