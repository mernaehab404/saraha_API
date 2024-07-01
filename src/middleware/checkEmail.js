import { User } from "../../database/models/user.model.js";
import bcrypt from "bcrypt";
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
export const checkEmail = async (req, res, next) => {
  let exist = await User.findOne({ email: req.body.email });
  if (exist) return res.status(409).json({ message: "email already exist" });
 const otp = generateOTP();
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  req.body.otp = otp;
  next();
};
