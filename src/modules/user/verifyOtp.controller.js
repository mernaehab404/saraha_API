import { User } from "../../../database/models/user.model.js";

export const verifyOtp = async (req, res) =>{
  const { email, otp } = req.body;

  try {
   

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.confirmEmail = true;
    user.otp = undefined; // Remove OTP after successful verification
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};
