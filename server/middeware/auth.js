const authMiddleware = (req, res, next) => {
  // Get token from Authorization header (Bearer token)
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach the decoded user (with userId) to req.user
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
