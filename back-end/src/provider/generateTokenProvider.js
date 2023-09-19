import jwt from "jsonwebtoken";

export async function generateToken(userId) {
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    subject: toString(userId),
    expiresIn: 60 * 60 * 24 * 8,
  });

  return token;
}
