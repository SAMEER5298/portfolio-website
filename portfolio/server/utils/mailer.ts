import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface ContactEmailParams {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export async function sendContactEmail({ name, email, projectType, message }: ContactEmailParams) {
  const contactEmail = process.env.CONTACT_EMAIL;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0D0D0F; color: #F1F5F9; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #141418; border-radius: 12px; padding: 30px; border: 1px solid #1E1E2E; }
        h1 { color: #6EE7B7; margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { color: #64748B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .value { color: #F1F5F9; font-size: 16px; margin-top: 5px; }
        .message { background-color: #0D0D0F; padding: 15px; border-radius: 8px; margin-top: 10px; color: #F1F5F9; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎯 New Contact Form Submission</h1>
        <div class="field">
          <div class="label">Name</div>
          <div class="value">${name}</div>
        </div>
        <div class="field">
          <div class="label">Email</div>
          <div class="value">${email}</div>
        </div>
        <div class="field">
          <div class="label">Project Type</div>
          <div class="value">${projectType}</div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="message">${message}</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: contactEmail,
    subject: `New Contact: ${projectType} - ${name}`,
    html: htmlContent,
  });

  const autoReplyHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0D0D0F; color: #F1F5F9; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #141418; border-radius: 12px; padding: 30px; border: 1px solid #1E1E2E; }
        h1 { color: #6EE7B7; margin-bottom: 20px; }
        p { color: #F1F5F9; line-height: 1.6; }
        .signature { color: #6EE7B7; margin-top: 20px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thanks, ${name}! 👋</h1>
        <p>I've received your message and will get back to you soon.</p>
        <p>In the meantime, feel free to check out my work on GitHub or connect with me on LinkedIn.</p>
        <p class="signature">— Sameer Khan</p>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Thanks for reaching out! — Sameer Khan',
    html: autoReplyHtml,
  });

  return { success: true };
}
