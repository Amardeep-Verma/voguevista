import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided or incorrect format" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Must be admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied: Not an admin" });
    }

    // Save user info for routes
    req.user = decoded;
    next();

  } catch (err) {
    console.error("AdminAuth error:", err);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
