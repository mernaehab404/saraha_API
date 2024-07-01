import { Router }from "express";
import { signin, signup } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { verifyOtp } from "./verifyOtp.controller.js";

const UserRouter= Router()

UserRouter.post('/signup',checkEmail,signup)
UserRouter.post('/signin',signin)
UserRouter.post('/verify-otp', verifyOtp);

export default UserRouter