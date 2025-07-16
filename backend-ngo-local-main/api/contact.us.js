require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, phone, subject } = req.body;

  try {
    const templatePath = path.join(process.cwd(), 'templates', 'contact-us.html');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    const emailContent = htmlTemplate
      .replace('{{name}}', name)
      .replace('{{email}}', email)
      .replace('{{subject}}', subject)
      .replace('{{message}}', message)
      .replace('{{footerMsg}}', 'This email was sent from the contact form on your website.');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      logger: true,
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_TO,
      subject: `Message from ${name} via Contact Us Form`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
}
