import jwt, { decode } from "jsonwebtoken";
import User from "../model/userModel.js"

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Not Authenticated" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid Token" });
      }

      const user = await User.findOne({ email: decoded.email });
      if(!user){
        return res.status(401).json({ error: "User Not Found" });
      }
      req.user = {
        id:user._id,
        fname:user.fname,
        lname:user.lname,
        email:user.email,
      }
      next();
    });
  } catch (error) {
    console.log("Auth Middleware Error : ", error);
    return res.status(500).json({ error: error });
  }
};


export default authMiddleware;