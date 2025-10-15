// services/user.service.js
const { User } = require("@/models/index"); // Import User model

const { toSafeUser } = require("@/utils/toSafeUser"); // Exclude sensitive info

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10; // For bcrypt
const bcrypt = require("bcrypt"); // Hash passwords

const { jwtSecret, jwtExpiration } = require("@/configs/auth"); // JWT config
const jwt = require("jsonwebtoken"); // JWT handling

const { verifyEmail } = require("@/utils/templates/verifyEmail"); // Email template
const { sendEmail } = require("@/utils/emailUtils"); // Email sending utility

const EMAIL_SECRET_KEY = process.env.EMAIL_SECRET_KEY || "your_email_secret_key";

const registerUser = async (data) => {
  try {
    const existingUser = await User.findOne({ where: { email: data.email } });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const user = await User.create({
      ...data,
      password: hashedPassword,
      admin: false,
      verified: false,
    });

    const safeUser = toSafeUser(user);
    const token = jwt.sign({ id: user.id, admin: user.admin }, jwtSecret, {
      expiresIn: jwtExpiration,
    });

    const emailToken = jwt.sign({ id: user.id }, EMAIL_SECRET_KEY, { expiresIn: "1d" });
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${emailToken}`;
    const html = verifyEmail(user.name, verificationLink);
    await sendEmail(user.email, "Verify your email", html);

    return { user: safeUser, token };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user: " + error.message);
  }
};

const loginUser = async (data) => {
  try {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      return { error: "User not found" }; 
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return { error: "Incorrect password"}; 
    }

    if (!user.verified) {
      return { error: "Email not verified. Please check your inbox.", user: toSafeUser(user) }; 
    }

    const token = jwt.sign({ id: user.id, admin: user.admin }, jwtSecret, {
      expiresIn: jwtExpiration,
    });

    return { user: toSafeUser(user), token };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Internal server error" };
  }
};


const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    const safeUsers = users.map(user => toSafeUser(user));
    return safeUsers;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

const getUserById = async (id) => {
  console.log("Fetching user with ID:", id);
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return toSafeUser(user);
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(data);

    return toSafeUser(user);
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return true;
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
