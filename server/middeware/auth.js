import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  // Get token from Authorization header (Bearer token)
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  // const token = req.header("Authorization")?.replace("Bearer ", "");
  // console.log("Token from cookies:", req.cookies.token);
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach the decoded user (with userId) to req.user
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// console.log("Token from header:", req.header("Authorization"));

export default authMiddleware;
