import { User } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../../Email/email.js";
import Joi from "joi";

export const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  otp: Joi.string().required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signup = async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, otp } = req.body;

  try {
    await sendMail(email, otp);
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email" });
  }

  try {
    let user = await User.insertMany(req.body);
    user[0].password = undefined;
    res
      .status(201)
      .json({
        message: "User added successfully, please verify your email",
        user,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
const signin = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user || !bcrypt.compareSync(req.body.password, user.password))
      return res.status(401).json({ message: "incorrect password/email" });

    if (!user.confirmEmail) {
      return res.status(403).json({ message: "Email not verified" });
    }
    jwt.sign(
      { userId: user._id, name: user.username, role: user.role },
      "myNameMerna",
      (err, token) => {
        res.json({ message: "login successfully", token });
      }
    );
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Signin failed", error });
  }
};

export { signup, signin };
