const jwt = require("jsonwebtoken");
const { User, Subscriber } = require("@/models/index");

const { verifyEmail } = require("@/utils/templates/verifyEmail"); // Email template
const { sendEmail } = require("@/utils/emailUtils"); // Email sending utility

const EMAIL_SECRET_KEY =
  process.env.EMAIL_SECRET_KEY || "your_email_secret_key";

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

const verifySubscriberEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, EMAIL_SECRET_KEY);
    const suscriberId = decoded.id;

    const suscriber = await Subscriber.findByPk(suscriberId);
    if (!suscriber) {
      throw new Error("Subscriber not found");
    }

    if (suscriber.verified) {
      return { message: "Email already verified" };
    }

    suscriber.verified = true;
    await suscriber.save();

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

const resendVerificationEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.verified) {
      return { message: "Email already verified" };
    }

    const emailToken = jwt.sign({ id: user.id }, EMAIL_SECRET_KEY, {
      expiresIn: "1d",
    });
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${emailToken}`;
    
    const html = verifyEmail(user.name, verificationLink);
    await sendEmail(user.email, "Verify your email", html);

    return { message: "Verification email resent successfully" };
  } catch (error) {
    console.error("Error resending verification email:", error);
    throw new Error("Error resending verification email: " + error.message);
  }
};

module.exports = {
  verifyUserEmail,
  resendVerificationEmail,
  verifySubscriberEmail,
};
