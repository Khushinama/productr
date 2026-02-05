import jwt from "jsonwebtoken";
// import userModel from "../models/userModel.js";

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // only ID
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


export default protect;