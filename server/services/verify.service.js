const jwt = require("jsonwebtoken");
const { User } = require("@/models/index");

const EMAIL_SECRET_KEY = process.env.EMAIL_SECRET_KEY || "your_email_secret_key";

const verifyUserEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, EMAIL_SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.verified) {
      return { message: "Email already verified" };
    }

    user.verified = true;
    await user.save();

    return { message: "Email verified successfully" };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Verification link has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid verification token");
    }
    throw new Error("Error verifying email: " + error.message);
  }
};

module.exports = {
  verifyUserEmail,
};