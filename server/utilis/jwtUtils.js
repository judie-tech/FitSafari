import jwt from "jsonwebtoken";

function generateToken(res, user) {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  console.log("Setting token in cookie:", token);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });
  return token;
}

// function verifyToken(token) {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) reject(err);
//       else resolve(decoded);
//     });
//   });
// }
// console.log(verifyToken);

export { generateToken };
console.log(12);
