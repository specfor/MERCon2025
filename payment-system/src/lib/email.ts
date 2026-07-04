import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, code: string): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || "MERCon 2026 <no-reply@mercon.org>";
  const replyTo = process.env.SMTP_REPLY_TO;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const subject = "MERCon 2026 - Email Verification Code";
  const text = `Your email verification code for MERCon 2026 is: ${code}\n\nThis code will expire in 15 minutes. If you did not request this, please ignore this email.`;
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #10b981; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <!-- Dark Emerald Branded Header -->
      <div style="background-color: #081a12; padding: 30px 20px; text-align: center; border-bottom: 4px solid #10b981;">
        <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0; letter-spacing: 0.5px;">MERCon 2026</h1>
        <p style="color: #6ee7b7; font-size: 13px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px;">12th International Multidisciplinary Engineering Research Conference</p>
      </div>
      <!-- Content Body -->
      <div style="padding: 30px 25px; text-align: center; color: #1f2937;">
        <span style="display: inline-block; background-color: #d1fae5; color: #047857; font-size: 12px; font-weight: bold; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Email Verification</span>
        <h2 style="color: #111827; font-size: 22px; margin: 0 0 10px;">Verify Your Email Address</h2>
        <p style="color: #4b5563; font-size: 15px; line-height: 1.5; margin: 0 0 25px;">Please use the following 6-digit verification code to complete your MERCon 2026 registration:</p>
        <div style="display: inline-block; padding: 18px 36px; background-color: #f8fafc; border: 2px dashed #10b981; border-radius: 12px; font-size: 32px; font-weight: bold; font-family: monospace; letter-spacing: 6px; color: #047857; margin-bottom: 25px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
          ${code}
        </div>
        <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin: 0;">This verification code is valid for <strong>15 minutes</strong>.<br/>If you did not initiate this request, please ignore this message.</p>
      </div>
      <!-- Footer -->
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; line-height: 1.5;">
        <p style="margin: 0 0 5px;">This is an automated verification message from the MERCon 2026 Portal.</p>
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} MERCon. All rights reserved.</p>
      </div>
    </div>
  `;

  // If SMTP is not configured, log to console for development/testing
  if (!host || !user || !pass) {
    console.log("=================================================================");
    console.log(`📧 [SMTP FALLBACK - DEV MODE] Email to: ${email}`);
    console.log(`🔑 Verification Code: ${code}`);
    console.log("=================================================================");
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      tls: {
        // Fix for Node 18+ OpenSSL 3.0 "dh key too small" error when communicating with older SMTP servers
        ciphers: "DEFAULT@SECLEVEL=0",
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from,
      to: email,
      replyTo,
      subject,
      text,
      html,
    });

    return true;
  } catch (error) {
    console.error("❌ Failed to send verification email via SMTP:", error);
    throw new Error("Failed to send verification email. Please check your email address or try again later.");
  }
}

export async function sendPasswordResetEmail(email: string, code: string): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || '"MERCon 2026 Portal" <noreply-mercon@uom.lk>';
  const replyTo = process.env.SMTP_REPLY_TO || "mercon@uom.lk";
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const subject = "MERCon 2026 - Password Reset Verification Code";
  const text = `Your password reset code for MERCon 2026 is: ${code}\n\nThis code will expire in 15 minutes. If you did not request a password reset, please ignore this email and your password will remain unchanged.`;
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #10b981; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <!-- Dark Emerald Branded Header -->
      <div style="background-color: #081a12; padding: 30px 20px; text-align: center; border-bottom: 4px solid #10b981;">
        <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0; letter-spacing: 0.5px;">MERCon 2026</h1>
        <p style="color: #6ee7b7; font-size: 13px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px;">12th International Multidisciplinary Engineering Research Conference</p>
      </div>
      <!-- Content Body -->
      <div style="padding: 30px 25px; text-align: center; color: #1f2937;">
        <span style="display: inline-block; background-color: #fef3c7; color: #b45309; font-size: 12px; font-weight: bold; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Password Reset</span>
        <h2 style="color: #111827; font-size: 22px; margin: 0 0 10px;">Reset Your Password</h2>
        <p style="color: #4b5563; font-size: 15px; line-height: 1.5; margin: 0 0 25px;">You recently requested to reset your password for your MERCon 2026 account. Enter the 6-digit code below to proceed:</p>
        <div style="display: inline-block; padding: 18px 36px; background-color: #f8fafc; border: 2px dashed #b45309; border-radius: 12px; font-size: 32px; font-weight: bold; font-family: monospace; letter-spacing: 6px; color: #9a3412; margin-bottom: 25px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
          ${code}
        </div>
        <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin: 0;">This password reset code is valid for <strong>15 minutes</strong>.<br/>If you did not request a password reset, please ignore this email and your account will remain secure.</p>
      </div>
      <!-- Footer -->
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; line-height: 1.5;">
        <p style="margin: 0 0 5px;">This is an automated verification message from the MERCon 2026 Portal.</p>
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} MERCon. All rights reserved.</p>
      </div>
    </div>
  `;

  if (!host || !user || !pass) {
    console.log("=================================================================");
    console.log(`📧 [SMTP FALLBACK - DEV MODE] Password Reset Email to: ${email}`);
    console.log(`🔑 Reset Code: ${code}`);
    console.log("=================================================================");
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      tls: {
        ciphers: "DEFAULT@SECLEVEL=0",
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from,
      to: email,
      replyTo,
      subject,
      text,
      html,
    });

    return true;
  } catch (error) {
    console.error("❌ Failed to send password reset email via SMTP:", error);
    throw new Error("Failed to send password reset email. Please try again later.");
  }
}


export interface PaymentConfirmationData {
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  invoiceId: string | null;
  amount: string | number;
  currency: string;
  registrationCategory: string;
  authorType: string;
  paidAt?: Date | string | null;
}

export async function sendPaymentConfirmationEmail(data: PaymentConfirmationData): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || "MERCon 2026 <no-reply@mercon.org>";
  const replyTo = process.env.SMTP_REPLY_TO;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const subject = `MERCon 2026 - Payment Confirmation [Invoice: ${data.invoiceId}]`;
  const formattedAmount = `${data.currency} ${Number(data.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  const formattedDate = data.paidAt ? new Date(data.paidAt).toLocaleDateString() : new Date().toLocaleDateString();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const receiptUrl = `${baseUrl}/dashboard/receipt`;

  const text = `Dear ${data.title} ${data.firstName} ${data.lastName},\n\nWe have successfully received your payment for MERCon 2026.\n\nInvoice ID: ${data.invoiceId}\nAmount Paid: ${formattedAmount}\nDate: ${formattedDate}\nCategory: ${data.registrationCategory.replace(/_/g, ' ')}\nAuthor Type: ${data.authorType.replace(/_/g, ' ')}\n\nYou can view and download your official PNG receipt online at any time by logging into your portal: ${receiptUrl}\n\nThank you for registering for MERCon 2026.`;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #10b981; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <!-- Dark Emerald Branded Header -->
      <div style="background-color: #081a12; padding: 30px 20px; text-align: center; border-bottom: 4px solid #10b981;">
        <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0; letter-spacing: 0.5px;">MERCon 2026</h1>
        <p style="color: #6ee7b7; font-size: 13px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px;">12th International Multidisciplinary Engineering Research Conference</p>
      </div>

      <!-- Content Body -->
      <div style="padding: 30px 25px; color: #1f2937;">
        <div style="text-align: center; margin-bottom: 25px;">
          <span style="display: inline-block; background-color: #d1fae5; color: #047857; font-size: 12px; font-weight: bold; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">Payment Successful</span>
          <h2 style="color: #111827; font-size: 22px; margin: 15px 0 5px;">Thank You for Your Registration!</h2>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">We have securely processed and verified your payment.</p>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
          Dear <strong>${data.title} ${data.firstName} ${data.lastName}</strong>,<br/>
          Your conference registration for <strong>MERCon 2026</strong> is now fully confirmed. Below is a summary of your transaction details for your records:
        </p>

        <!-- Receipt Box -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Invoice Reference:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-family: monospace; text-align: right; border-bottom: 1px solid #f1f5f9;">${data.invoiceId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Date Paid:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500; text-align: right; border-bottom: 1px solid #f1f5f9;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Registration Category:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500; text-align: right; border-bottom: 1px solid #f1f5f9;">${data.registrationCategory.replace(/_/g, ' ')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">Author Type:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500; text-align: right; border-bottom: 1px solid #e2e8f0;">${data.authorType.replace(/_/g, ' ')}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0 4px; color: #047857; font-weight: bold; font-size: 16px;">Total Amount Paid:</td>
              <td style="padding: 12px 0 4px; color: #047857; font-weight: bold; font-size: 18px; text-align: right;">${formattedAmount}</td>
            </tr>
          </table>
        </div>

        <!-- Action Button -->
        <div style="text-align: center; margin: 30px 0 20px;">
          <a href="${receiptUrl}" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 15px; padding: 14px 28px; border-radius: 8px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.25);">
            View &amp; Download Official Receipt →
          </a>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 10px;">You can download your digitally verified PNG receipt directly from your dashboard.</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; line-height: 1.5;">
        <p style="margin: 0 0 5px;">This is an automated confirmation from the MERCon 2026 Payment Portal.</p>
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} MERCon. All rights reserved.</p>
      </div>
    </div>
  `;

  // If SMTP is not configured, log to console for development/testing
  if (!host || !user || !pass) {
    console.log("=================================================================");
    console.log(`📧 [SMTP FALLBACK - DEV MODE] Payment Confirmation to: ${data.email}`);
    console.log(`💰 Invoice: ${data.invoiceId} | Amount: ${formattedAmount}`);
    console.log("=================================================================");
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      tls: {
        // Fix for Node 18+ OpenSSL 3.0 "dh key too small" error when communicating with older SMTP servers
        ciphers: "DEFAULT@SECLEVEL=0",
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from,
      to: data.email,
      replyTo,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.error("❌ Failed to send payment confirmation email via SMTP:", error);
    // Do not throw error here to avoid rolling back or failing a completed payment transaction
    return false;
  }
}

export async function sendAdmin2faEmail(email: string, code: string): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || '"MERCon 2026 Admin" <noreply-mercon@uom.lk>';
  const replyTo = process.env.SMTP_REPLY_TO || "mercon@uom.lk";
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const subject = "MERCon 2026 - Admin Portal 2FA Verification Code";
  const text = `Your Admin Portal 2FA code is: ${code}\n\nThis code expires in 10 minutes. If you did not attempt to log in as an administrator, please report this immediately.`;
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #10b981; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <!-- Dark Emerald Branded Header -->
      <div style="background-color: #081a12; padding: 30px 20px; text-align: center; border-bottom: 4px solid #10b981;">
        <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0; letter-spacing: 0.5px;">MERCon 2026</h1>
        <p style="color: #6ee7b7; font-size: 13px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px;">Admin Security Portal</p>
      </div>
      <!-- Content Body -->
      <div style="padding: 30px 25px; text-align: center; color: #1f2937;">
        <span style="display: inline-block; background-color: #fef3c7; color: #b45309; font-size: 12px; font-weight: bold; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Admin Two-Factor Authentication</span>
        <h2 style="color: #111827; font-size: 22px; margin: 0 0 10px;">Admin Login Attempted</h2>
        <p style="color: #4b5563; font-size: 15px; line-height: 1.5; margin: 0 0 25px;">Please use the following 6-digit verification code to complete your admin login:</p>
        <div style="display: inline-block; padding: 18px 36px; background-color: #f8fafc; border: 2px dashed #b45309; border-radius: 12px; font-size: 32px; font-weight: bold; font-family: monospace; letter-spacing: 6px; color: #b45309; margin-bottom: 25px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
          ${code}
        </div>
        <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin: 0;">This security code is valid for <strong>10 minutes</strong>.<br/>If you did not initiate this login, please change your password immediately.</p>
      </div>
      <!-- Footer -->
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; line-height: 1.5;">
        <p style="margin: 0 0 5px;">MERCon 2026 Security Notification.</p>
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} MERCon. All rights reserved.</p>
      </div>
    </div>
  `;

  if (!host || !user || !pass) {
    console.log("=================================================================");
    console.log(`🛡️ [SMTP FALLBACK - DEV MODE] Admin 2FA Code to: ${email}`);
    console.log(`🔑 2FA Code: ${code}`);
    console.log("=================================================================");
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: { ciphers: "DEFAULT@SECLEVEL=0", rejectUnauthorized: false },
    });
    await transporter.sendMail({ from, to: email, replyTo, subject, text, html });
    return true;
  } catch (error) {
    console.error("❌ Failed to send admin 2FA email via SMTP:", error);
    throw new Error("Failed to send admin 2FA email.");
  }
}

