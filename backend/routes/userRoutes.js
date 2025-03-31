import express from "express"
import { login, register } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const route = express.Router();

route.post("/login-check",login) 
route.post("/register",register)
route.get("/profile",authMiddleware, (req, res)=>{
    return res.json(req.user) // req.user  set by  middleware
})
route.post("/logout",authMiddleware,(req,res)=>{
    return res.clearCookie("token",{ httpOnly: true}).json({msg:"Logout successfully"})
})
export default route;