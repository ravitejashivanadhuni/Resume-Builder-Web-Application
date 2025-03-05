const senData = require("../config/mail");
const Auth = require("../models/authmodel");
const { hash } = require("../utils/hashpassword");
const { ForgotFormat } = require("../utils/resetpasswordui");
const OTP_EXPIRATION_TIME = 30 * 1000;
const otpGnerator = require("otp-generator");
const bcrypt = require("bcrypt");
const { generateToeken } = require("../utils/GenerateToken");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const { loginUi } = require("../utils/loginGoogleUi");
const otpStore = {};

//register
exports.register = async (req, res) => {
  try {
    const {
      first_Name,
      last_Name,
      email,
      birth_Date,
      gender,
      role,
      password,
      Cpassword,
    } = req.body;

    if (
      !first_Name ||
      !last_Name ||
      !email ||
      !birth_Date ||
      !gender ||
      !password ||
      !Cpassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (Cpassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Confirm password must be at least 6 characters",
      });
    }

    const existingUserByEmail = await Auth.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (password !== Cpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashpassword = await hash(password);

    const user = await Auth.create({
      first_Name,
      last_Name,
      email,
      birth_Date,
      gender,
      role,
      password,
      password: hashpassword,
      role: role || "user",
    });

    if (user) {
      res.status(200).json({
        success: true,
        message: "User Registration Completed...",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
// // Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    let user = await Auth.findOne({ email });
    let isRecruiter = false;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToeken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: "",
        userType: isRecruiter ? "recruiter" : "user",
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

exports.loginWithGoogle = async (req, res) => {
  try {
    const { email, users } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email are required",
      });
    }
    let user = await Auth.findOne({ email });

    if (!user) {
      function generatePassword(firstName) {
        const randomNumber = Math.floor(100 + Math.random() * 900);
        return `${firstName}@${randomNumber}`;
      }
      const generatedPassword = generatePassword(
        users.displayName?.split(" ")[0] || "User"
      );
      const hashPassword = await hash(generatedPassword, 10);

      user = await Auth.create({
        first_Name: users.displayName?.split(" ")[0] || "First",
        last_Name: users.displayName?.split(" ")[1] || "Last",
        email: email,
        // birth_Date: users.birthDate || null,
        // gender: users.gender || "other",
        phoneNumber: users.phoneNumber || null,
        address: users.address || "N/A",
        // role: "user",
        password: hashPassword,
        profilePhoto: { url: users.photoURL || null },
      });

      await senData(
        user.email,
        "Google login password",
        loginUi(user.email, generatedPassword)
      );
    }

    const token = generateToeken(user._id, res);
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: "",
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("interview_ai", {
      path: "/",
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.SendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please, enter an email address!",
      });
    }

    // Convert email to lowercase for case-insensitive comparison
    const normalizedEmail = email.toLowerCase().trim();
    
    const account = await Auth.findOne({ email: normalizedEmail });
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "This email is not registered. Please check your email address or sign up.",
      });
    }

    const currentTime = new Date();
    if (account.otpExpiration && account.otpExpiration > currentTime) {
      const remainingTime = Math.ceil(
        (account.otpExpiration - currentTime) / 1000
      );
      return res.status(429).json({
        success: false,
        message: `Please wait ${remainingTime} seconds before requesting another OTP.`,
      });
    }

    const otp = otpGnerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    account.otp = otp;
    account.otpExpiration = new Date(
      currentTime.getTime() + OTP_EXPIRATION_TIME
    );
    await account.save();

    try {
      await senData(
        account.email,
        "Reset Your Password",
        ForgotFormat(account.email, otp)
      );

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully to your email!",
      });
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      // Clear the OTP since email failed
      account.otp = undefined;
      account.otpExpiration = undefined;
      await account.save();

      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in SendOtp:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.SendEmailCode = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUserByEmail = await Auth.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exists",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please, enter an email address!",
      });
    }

    const otp = otpGnerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    otpStore[email] = { otp, expiresAt: Date.now() + 3 * 60 * 1000 };

    await senData(
      email,
      "Verify your Account",
      `<h1>
           ${email} 
       </h1>
       <h2>
           ${otp} 
       </h2>`
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email!",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.verifyEmailCode = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and OTP are required",
      });
    }

    const storedOtpInfo = otpStore[email];
    if (!storedOtpInfo || storedOtpInfo.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }
    if (otp === storedOtpInfo.otp) {
      delete otpStore[email];
      return res.status(200).json({ message: "OTP verified successfully!" });
    } else {
      return res.status(401).json({ message: "Invalid OTP" });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and OTP are required",
      });
    }

    let account;

    account = await Auth.findOne({ email: email });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (account.otp != otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//reset password
exports.ResetPassword = async (req, res) => {
  try {
    const { email, new_pass, confirm_pass } = req.body;

    if (new_pass.length < 6 || confirm_pass.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    if (new_pass !== confirm_pass) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    const account = await Auth.findOne({ email });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(new_pass, 10);

    account.password = hashedPassword;
    await account.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await Auth.findById(userId).select(
      "-password -otp -otpExpiration"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { first_Name, last_Name, birth_Date, gender, email } = req.body;

    let updateData = {
      first_Name,
      last_Name,
      birth_Date,
      gender,
      email,
    };

    // Handle profile photo upload
    if (req.file) {
      try {
        // Get current user to check for existing profile photo
        const currentUser = await Auth.findById(userId);
        
        // Delete old image from Cloudinary if it exists
        if (currentUser.profilePhoto && currentUser.profilePhoto.public_id) {
          await cloudinary.uploader.destroy(currentUser.profilePhoto.public_id);
        }

        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'user_profiles',
          width: 500,
          height: 500,
          crop: 'fill',
          gravity: 'face',
          quality: 'auto'
        });

        // Update user data with new image info
        updateData.profilePhoto = {
          public_id: result.public_id,
          url: result.secure_url
        };

        // Delete temporary file
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting temp file:', err);
        });
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading profile photo',
          error: uploadError.message
        });
      }
    }

    // Update user in database
    const updatedUser = await Auth.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password -otp -otpExpiration');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

exports.deleteProfilePhoto = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await Auth.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete photo from cloudinary if exists
    if (user.profilePhoto?.public_id) {
      await cloudinary.uploader.destroy(user.profilePhoto.public_id);
    }

    user.profilePhoto = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile photo deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//get all user
exports.getAllUser = async (req, res) => {
  try {
    const user = await Auth.find({ role: "user" });

    res.status(200).json({
      success: true,
      data: user,
      count: user.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
