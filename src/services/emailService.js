
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendContactEmail = async (lead) => {
  const mailOptions = {
    from: `"Craftech CMS" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.ADMIN_EMAIL,
    subject: `New Project Inquiry: ${lead.projectType || 'General'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #1e293b; color: white; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">New Lead Captured</h2>
        </div>
        <div style="padding: 24px; color: #334155;">
          <p style="margin-bottom: 24px;">You have received a new project inquiry via the Craftech website.</p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${lead.name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${lead.email}</p>
            <p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${lead.phone}</p>
            <p style="margin: 0 0 10px 0;"><strong>Project Type:</strong> ${lead.projectType || 'Not specified'}</p>
          </div>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line; line-height: 1.6; color: #475569;">${lead.message}</p>
        </div>
        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
          This is an automated notification from your Craftech CMS.
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw here, we don't want to crash the lead submission if email fails
    return null;
  }
};
