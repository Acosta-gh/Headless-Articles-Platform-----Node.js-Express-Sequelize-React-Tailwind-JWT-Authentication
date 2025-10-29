export const verifySubscriberEmail = (verificationLink) => `
  <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center;">
      <h2 style="margin: 0; font-size: 22px; color: #111827;">Confirm your subscription 📫</h2>
    </div>

    <!-- Body -->
    <div style="padding: 20px; color: #374151;">
      <p style="font-size: 16px; margin-bottom: 18px;">
        Hi! 👋 Thanks for subscribing. We're excited to have you here.
      </p>
      <p style="font-size: 16px; margin-bottom: 24px;">
        To start receiving updates and newsletters, please verify your email address by clicking the button below:
      </p>
      <a href="${verificationLink}" 
         style="display: inline-block; background-color: #111827; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
        Verify email address
      </a>
      <p style="margin: 20px 0 8px 0; font-size: 14px; color: #374151;">Or copy and paste this link into your browser:</p>
      <a href="${verificationLink}" style="font-size: 14px; color: #2563eb; word-break: break-all;">${verificationLink}</a>
      <p style="color: #71717a; font-size: 14px; margin-top: 24px;">
        This link will expire in 24 hours.
      </p>
      <p style="color: #71717a; font-size: 14px;">
        If you didn't request this, you can ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 12px 20px; text-align: center; font-size: 13px; color: #6b7280;">
      Thanks for subscribing to our newsletter 📬
    </div>
  </div>
`;