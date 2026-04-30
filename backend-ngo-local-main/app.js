require('dotenv').config();
const cors = require('cors');
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const config = require('./config');

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

// ─────────────────────────────────────────────
//  RAZORPAY – Create Order
// ─────────────────────────────────────────────
app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { amount } = req.body; // amount expected in INR (e.g. 500)
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid donation amount.' });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // Razorpay expects paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    res.status(500).json({ error: 'Failed to create payment order.' });
  }
});

// ─────────────────────────────────────────────
//  RAZORPAY – Verify Payment & Send Emails
// ─────────────────────────────────────────────
app.post('/api/verify-razorpay-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorDetails } = req.body;

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed. Invalid signature.' });
    }

    const { firstName, lastName, email, address, note, amount } = donorDetails;
    const donorName = `${firstName} ${lastName}`;
    const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const noteSection = note
      ? `<div class="detail-row"><span class="label">Message / Note</span><span class="value">${note}</span></div>`
      : '';

    // Read and fill donor confirmation template
    fs.readFile(path.join(__dirname, 'templates', 'donation-confirmation.html'), 'utf8', (err, donorHtml) => {
      if (err) return res.status(500).json({ error: 'Error reading email template.' });

      const donorEmailContent = donorHtml
        .replace(/{{donorName}}/g, donorName)
        .replace(/{{amount}}/g, amount)
        .replace(/{{email}}/g, email)
        .replace(/{{address}}/g, address)
        .replace(/{{orderId}}/g, razorpay_order_id)
        .replace(/{{paymentId}}/g, razorpay_payment_id)
        .replace(/{{date}}/g, date)
        .replace(/{{noteSection}}/g, noteSection);

      // Read and fill admin notification template
      fs.readFile(path.join(__dirname, 'templates', 'donation-admin-notify.html'), 'utf8', (err2, adminHtml) => {
        if (err2) return res.status(500).json({ error: 'Error reading admin email template.' });

        const adminEmailContent = adminHtml
          .replace(/{{donorName}}/g, donorName)
          .replace(/{{amount}}/g, amount)
          .replace(/{{email}}/g, email)
          .replace(/{{address}}/g, address)
          .replace(/{{orderId}}/g, razorpay_order_id)
          .replace(/{{paymentId}}/g, razorpay_payment_id)
          .replace(/{{date}}/g, date)
          .replace(/{{noteSection}}/g, noteSection);

        // Send donor confirmation email
        const donorMailOptions = {
          from: `RG Care Foundation <${process.env.SMTP_USER}>`,
          to: email,
          subject: `Donation Confirmed – Thank You, ${firstName}! | RG Care Foundation`,
          html: donorEmailContent,
        };

        // Send admin notification email
        const adminMailOptions = {
          from: `RG Care Donations <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER,
          replyTo: `${donorName} <${email}>`,
          subject: `New Donation of ₹${amount} from ${donorName}`,
          html: adminEmailContent,
        };

        transporter.sendMail(donorMailOptions, (errDonor) => {
          if (errDonor) console.error('Error sending donor email:', errDonor);
        });

        transporter.sendMail(adminMailOptions, (errAdmin) => {
          if (errAdmin) console.error('Error sending admin email:', errAdmin);
        });

        res.status(200).json({
          success: true,
          message: 'Payment verified and confirmation emails sent.',
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        });
      });
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Internal server error during payment verification.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`Production mode enabled`);
    console.log(`CORS restricted to: https://rgcare.in`);
  }
});
