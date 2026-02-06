import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from '../config/nodemailer.js';


// controllers/authController.js
export const checkAuth = async (req, res) => {
  try {
    const user = await userModel.findById(req.user).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isAccountVerified,
         profilePic: user.profilePic
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//Registration controller

export const register = async (req, res) => {
  const { name, email, password, contact } = req.body;

  if (!name || !email || !password || !contact) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
     const user = await userModel.create({
      name,
      email,
      contact,
      password: hashedPassword,
    });

     res.status(201).json({
      success: true,
      message: "Registration successful. Please verify email.",
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


//Login controller

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 10 * 60 * 1000;

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = expiresAt;
    await user.save();

    // await transporter.sendMail({
    //   to: user.email,
    //   subject: "Your Verification OTP",
    //   text: `Your OTP is ${otp}`,
    // });

    res.json({ success: true, message: "OTP sent successfully",otp });

    
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


//Logout controller 


export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email & OTP required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Mark verified
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    // Now create token after verification
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Email verified successfully!" , user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isAccountVerified,
      },});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//send reset otp 

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000)).padStart(
      6,
      "0"
    );
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetOtp = otp;
    user.resetOtpExpiresAt = expiresAt;

    await user.save();

    const mailOptions = {
      from: `"Notes App" <${process.env.SENDER_EMAIL}>`,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Hi ${user.name},\n\nYour OTP for reseting your password: ${otp}\n\nIt expires in 10 minutes. Use this OTP to proceed with reseting your password.\n\n— Notes Team`,
      html: `<p>Hi <strong>${user.name}</strong>,</p><p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p><p>It expires in <strong>10 minutes</strong>.</p><p>— Notes Team</p>`,
    };

    await transporter.sendMail(mailOptions);

    console.log("Reset OTP sent to:", user.email);

    res.json({ success: true, message: " OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




// profile pic 

export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "File not uploaded" });
    }

    const userId = req.user;

    const imagePath = `uploads/profile/${req.file.filename}`;

    const user = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: imagePath },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Profile picture updated",
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
