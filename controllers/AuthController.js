import bcrypt from "bcrypt";
import signUp from "../models/user.js";
import jwt from "jsonwebtoken";

const ERR_MSG = "Wrong password or email";

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await signUp.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new signUp({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup Successfully",
      success: true,
    });
  } catch (err) {
    console.error("Signup Error:", err.message || err); // Log the error message
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await signUp.findOne({ email });
    const role = await user.role;

    if (!user) {
      return res.status(403).json({
        message: ERR_MSG,
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        message: ERR_MSG,
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login Successfully",
      success: true,
      jwtToken,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    console.error("Login Error:", err.message || err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export { signup, login };
