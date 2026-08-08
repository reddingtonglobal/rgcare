const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error processing form' });
    }

    const { name, email, note, subject } = fields;
    const resumePath = files.file?.filepath;

    try {
      const templatePath = path.join(process.cwd(), 'templates', 'contact-us.html');
      const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

      const emailContent = htmlTemplate
        .replace('{{name}}', name)
        .replace('{{email}}', email)
        .replace('{{subject}}', subject)
        .replace('{{message}}', note)
        .replace('{{footerMsg}}', 'This email was sent from the volunteer form.');

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
        subject: `Volunteer Inquiry from ${name}`,
        html: emailContent,
        attachments: resumePath ? [{ path: resumePath }] : [],
      };

      await transporter.sendMail(mailOptions);

      // Cleanup uploaded file
      if (resumePath) {
        fs.unlinkSync(resumePath);
      }

      res.status(200).json({ message: 'Volunteer form submitted successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  });
}
