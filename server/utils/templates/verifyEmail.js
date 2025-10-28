export const verifyEmail = (name, verificationLink) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome aboard! 👋</h2>
    <p>Thanks for signing up. We're excited to have you here.</p>
    <p>To get started, please verify your email address by clicking the button below:</p>
    <a href="${verificationLink}"
       style="background-color: #18181b; color: white; padding: 10px 20px; border-radius: 6px;
              text-decoration: none; display: inline-block; margin-top: 10px;">
      Verify email address
    </a>
    <p style="color: #71717a; font-size: 14px; margin-top: 16px;">This link will expire in 24 hours.</p>
    <br/>
    <p style="color: #71717a; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
  </div>
`;
