import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create transporter for Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Magna Partners - HQ Solution Architect" <${process.env.GMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const result = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const sendAdminCreationEmail = async (
  email: string,
  password: string,
  organizationName: string
): Promise<boolean> => {
  const subject = "Your Admin Account - Magna Admin System";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Admin Account</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: #000000;
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .content h2 {
          color: #333;
          margin-top: 0;
          font-size: 20px;
        }
        .content p {
          margin-bottom: 20px;
          color: #666;
        }
        .credentials-box {
          background: #f8f9fa;
          border: 2px solid #000000;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .credential-row {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          padding: 10px;
          background: white;
          border-radius: 4px;
        }
        .credential-label {
          font-weight: 600;
          color: #333;
        }
        .credential-value {
          font-family: 'Courier New', monospace;
          color: #000000;
          font-weight: 600;
        }
        .login-button {
          display: inline-block;
          background: #000000;
          color: white !important;
          text-decoration: none;
          padding: 12px 30px;
          border-radius: 6px;
          font-weight: 600;
          margin: 20px 0;
          text-align: center;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px 30px;
          border-top: 1px solid #e9ecef;
          font-size: 14px;
          color: #666;
        }
        .warning {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 4px;
          padding: 15px;
          margin: 20px 0;
          color: #856404;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to Magna Partners</h1>
        </div>
        
        <div class="content">
          <h2>Your Organization's Dashboard Has Been Prepared</h2>
          
          <p>Hello Leaders,</p>
          
          <p>An admin account has been created for you in the <strong>${organizationName}</strong> organization on the Magna Admin System.</p>
          
          <p>Here are your login credentials:</p>
          
          <div class="credentials-box">
            <div class="credential-row">
              <span class="credential-label">Email:</span>
              <span class="credential-value">${email}</span>
            </div>
            <div class="credential-row">
              <span class="credential-label">Password:</span>
              <span class="credential-value">${password}</span>
            </div>
            <div class="credential-row">
              <span class="credential-label">Organization:</span>
              <span class="credential-value">${organizationName}</span>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${
              process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/login" class="login-button">
              Login to Admin Panel
            </a>
          </div>
          
          <div class="warning">
            <strong>⚠️ Important Security Instructions:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Please change your password after your first login</li>
              <li>Keep your credentials secure and never share them</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>HQ Solution Architect</strong></p>
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>If you need assistance, please contact <a href="https://wa.me/6282236883438" style="color: #000000; text-decoration: none;">+6282236883438</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Welcome to Magna Partners
    
    Your admin account has been created for ${organizationName}.
    
    Login Credentials:
    Email: ${email}
    Password: ${password}
    Organization: ${organizationName}
    
    Login URL: ${process.env.NEXT_PUBLIC_BASE_URL}/login
    
    IMPORTANT:
    - Please change your password after your first login
    - Keep your credentials secure and never share them
    - If you didn't expect this email, please contact your system administrator
    
    ---
    HQ Solution Architect
    This is an automated message. Please do not reply to this email.
  `;

  return await sendEmail({
    to: email,
    subject,
    html,
    text,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string,
  userType: string
): Promise<boolean> => {
  const subject = "Reset Your Password - Magna Admin";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: #000000;
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .content h2 {
          color: #333;
          margin-top: 0;
          font-size: 20px;
        }
        .content p {
          margin-bottom: 20px;
          color: #666;
        }
        .reset-button {
          display: inline-block;
          background: #000000;
          color: white !important;
          text-decoration: none;
          padding: 12px 30px;
          border-radius: 6px;
          font-weight: 600;
          margin: 20px 0;
          transition: transform 0.2s;
        }
        .reset-button:hover {
          transform: translateY(-1px);
        }
        .footer {
          background: #f8f9fa;
          padding: 20px 30px;
          border-top: 1px solid #e9ecef;
          font-size: 14px;
          color: #666;
        }
        .warning {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 4px;
          padding: 15px;
          margin: 20px 0;
          color: #856404;
        }
        .code {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          padding: 10px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          word-break: break-all;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        
        <div class="content">
          <h2>Hello ${
            userType === "super-admin" ? "Super Admin" : "Admin"
          },</h2>
          
          <p>We received a request to reset your password for your Magna Admin account associated with <strong>${email}</strong>.</p>
          
          <p>Click the button below to reset your password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" class="reset-button">Reset My Password</a>
          </div>
          
          <p>Or copy and paste this link into your browser:</p>
          <div class="code">${resetUrl}</div>
          
          <div class="warning">
            <strong>⚠️ Important Security Information:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>This link will expire in <strong>30 minutes</strong></li>
              <li>This link can only be used once</li>
              <li>If you didn't request this reset, please ignore this email</li>
              <li>Never share this link with anyone</li>
            </ul>
          </div>
          
          <p>If you're having trouble clicking the button, copy and paste the URL above into your web browser.</p>
        </div>
        
        <div class="footer">
          <p><strong>HQ Solution Architect</strong></p>
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>If you need assistance, please contact <a href="https://wa.me/6282236883438" style="color: #000000; text-decoration: none;">+6282236883438</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Password Reset Request - Magna Admin
    
    Hello ${userType === "super-admin" ? "Super Admin" : "Admin"},
    
    We received a request to reset your password for your Magna Admin account associated with ${email}.
    
    Please click the following link to reset your password:
    ${resetUrl}
    
    IMPORTANT:
    - This link will expire in 30 minutes
    - This link can only be used once
    - If you didn't request this reset, please ignore this email
    - Never share this link with anyone
    
    If you're having trouble with the link, copy and paste it into your web browser.
    
    ---
    HQ Solution Architect
    This is an automated message. Please do not reply to this email.
  `;

  return await sendEmail({
    to: email,
    subject,
    html,
    text,
  });
};
