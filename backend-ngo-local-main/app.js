require('dotenv').config();
const cors = require('cors');
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const port = config.port;

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: config.filesize_limit }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf|docx|txt)$/)) {
      return cb(new Error('Only .pdf, .docx, or .txt files are allowed'));
    }
    cb(null, true);
  },
}).single('file');

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });
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

// Middleware to parse the body of the request
// Use CORS middleware
// app.use(
//   cors({
//     origin: '*', // Allows all origins, change this to specific origins in production
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'], // Add any other headers your client will send
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
//   })
// );
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? [process.env.APP_URL, process.env.APP_URL] : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.post('/api/contact-us', (req, res) => {
  try {
    const { name, email, message, phone, subject } = req.body;
    // Read the email template
    fs.readFile(path.join(__dirname, 'templates', 'contact-us.html'), 'utf8', (err, htmlTemplate) => {
      if (err) {
        console.error('Error reading email template:', err);
        return res.status(500).send('Error preparing email');
      }

      // Replace placeholders with dynamic values
      const emailContent = htmlTemplate
        .replace('{{name}}', name)
        .replace('{{email}}', email)
        .replace('{{subject}}', '')
        .replace('{{message}}', message)
        .replace('{{footerMsg}}', 'This email was sent from the contact form on your website.');

      const mailOptions = {
        from: `RG Care Contact Form <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: `${name}  <${email}>`,
        subject: `Message from ${name} via Contact Us Form`,
        html: emailContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Error sending email');
        }
        res.status(200).send('Message sent successfully');
      });
    });
  } catch (error) {
    return res.status(500).send('Error occur while submitting the form!');
  }
});

// Handle Volunteer form submission with resume file
app.post('/api/volunteer-with-us', upload, (req, res) => {
  try {
    const { name, email, note, subject } = req.body;

    fs.readFile(path.join(__dirname, 'templates', 'contact-us.html'), 'utf8', (err, htmlTemplate) => {
      if (err) {
        console.error('Error reading email template:', err);
        return res.status(500).send('Error preparing email');
      }
      const subjectHTML = `<p><span class="label">Subject:</span> ${subject}</p>`;
      // Replace placeholders with dynamic values
      const emailContent = htmlTemplate
        .replace('{{name}}', name)
        .replace('{{email}}', email)
        .replace('{{subject}}', subjectHTML)
        .replace('{{message}}', note)
        .replace('{{footerMsg}}', 'This email was sent from the becam a volunteer form.');

      const resumePath = req.file ? path.join(__dirname, req.file.path) : null;

      const mailOptions = {
        from: `RG Care Volunteer With Us Form <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: `${name}  <${email}>`,
        subject: `Become a Volunteer Inquiry from ${name}`,
        html: emailContent,
        attachments: resumePath ? [{ path: resumePath }] : [],
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send('Error sending email');
        }

        if (resumePath) {
          fs.unlinkSync(resumePath);
        }

        res.status(200).send('Volunteer form submitted successfully');
      });
    });
  } catch (error) {
    return res.status(500).send('Error occur while submitting the form!');
  }
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`Production mode enabled`);
    console.log(`CORS restricted to: https://rgcare.in`);
  }
});
