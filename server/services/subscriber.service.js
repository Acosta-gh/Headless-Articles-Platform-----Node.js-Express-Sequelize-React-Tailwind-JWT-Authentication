const jwt = require("jsonwebtoken");

const { Subscriber } = require("@/models/index");

const { verifySubscriberEmail } = require("@/utils/templates/verifySubscriberEmail");
const { sendEmail } = require("@/utils/emailUtils");

const EMAIL_SECRET_KEY =
  process.env.EMAIL_SECRET_KEY || "your_email_secret_key";

const registerSubscriber = async (data) => {
  try {
    const existingSubscriber = await Subscriber.findOne({
      where: { email: data.email },
    });

    if (existingSubscriber) {
      throw new Error("Email already in use");
    }

    const subscriber = await Subscriber.create({
      ...data,
      verified: false,
    });

    const emailToken = jwt.sign({ id: subscriber.id }, EMAIL_SECRET_KEY, {
      expiresIn: "1d",
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verify-subscriber?token=${emailToken}`;
    const html = verifySubscriberEmail(verificationLink);
    await sendEmail(subscriber.email, "Verify your email", html);

    return { subscriber };
  } catch (error) {
    console.error("Error creating subscriber:", error);
    throw new Error("Error creating subscriber: " + error.message);
  }
};

module.exports = {
  registerSubscriber,
};