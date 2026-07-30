import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};