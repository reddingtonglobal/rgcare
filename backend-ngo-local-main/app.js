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
const mongoose = require('mongoose');
const config = require('./config');

// ─── MongoDB Connection ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ─── Mongoose Schemas / Models ─────────────────────────────────────────────────
const contactSubmissionSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
}, { timestamps: true });

const donationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true },
  address:   { type: String, default: '' },
  note:      { type: String, default: '' },
  amount:    { type: Number, required: true },
  orderId:   { type: String, required: true },
  paymentId: { type: String, required: true },
  status:    { type: String, default: 'verified' },
}, { timestamps: true });

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);
const Donation = mongoose.model('Donation', donationSchema);

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

// ─── Email Transporter ────────────────────────────────────────────────────────
let transporter;
let sendMail;

async function initTransporter() {
  const prodTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 8000,
  });

  try {
    await prodTransport.verify();
    transporter = prodTransport;
    console.log('SMTP ready – connected to', process.env.SMTP_HOST);
  } catch (err) {
    // cPanel SMTP is only reachable from within the same server.
    // For local dev, fall back to Ethereal so email content can be previewed.
    console.warn('Production SMTP unreachable (' + err.message.split('\n')[0] + ')');
    console.warn('Falling back to Ethereal test email – preview URLs will be logged.');
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    console.log('Ethereal test inbox:', testAccount.user, '/ pass:', testAccount.pass);
  }

  // Promise wrapper
  sendMail = (opts) =>
    new Promise((resolve, reject) =>
      transporter.sendMail(opts, (err, info) => {
        if (err) return reject(err);
        // Log Ethereal preview URL in dev
        const preview = nodemailer.getTestMessageUrl(info);
        if (preview) console.log('Email preview:', preview);
        resolve(info);
      })
    );
}

initTransporter();

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
    origin: process.env.NODE_ENV === 'production'
      ? [
          process.env.APP_URL,                                   // https://rgcare.in
          process.env.APP_URL.replace('://', '://www.'),         // https://www.rgcare.in
          'https://rgcare.in',
          'https://www.rgcare.in',
        ]
      : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.post('/api/contact-us', async (req, res) => {
  try {
    const { name, email, message, phone = '', subject = '' } = req.body;
    if (!name || !email || !message) {
      return res.status(400).send('Name, email and message are required.');
    }

    // Persist to MongoDB
    await ContactSubmission.create({ name, email, phone, subject, message });

    // Read email template
    const htmlTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'contact-us.html'), 'utf8');
    const subjectHTML = subject ? `<p><span class="label">Subject:</span> ${subject}</p>` : '';
    const emailContent = htmlTemplate
      .replace('{{name}}', name)
      .replace('{{email}}', email)
      .replace('{{subject}}', subjectHTML)
      .replace('{{message}}', message)
      .replace('{{footerMsg}}', 'This email was sent from the contact form on your website.');

    await sendMail({
      from: `RG Care Contact Form <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: `${name} <${email}>`,
      subject: `Message from ${name} via Contact Us Form`,
      html: emailContent,
    });

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error.message);
    // Still 200 if data was saved but email failed, so the user isn't blocked
    if (error.code === 11000 || error.name === 'ValidationError') {
      return res.status(400).send('Invalid form data.');
    }
    res.status(200).json({ success: true, message: 'Message received' });
  }
});

// Handle Volunteer form submission with resume file
app.post('/api/volunteer-with-us', upload, async (req, res) => {
  try {
    const { name, email, note = '', subject = '' } = req.body;
    if (!name || !email) {
      return res.status(400).send('Name and email are required.');
    }

    // Persist to MongoDB
    await ContactSubmission.create({ name, email, subject, message: note });

    const htmlTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'contact-us.html'), 'utf8');
    const subjectHTML = subject ? `<p><span class="label">Subject:</span> ${subject}</p>` : '';
    const emailContent = htmlTemplate
      .replace('{{name}}', name)
      .replace('{{email}}', email)
      .replace('{{subject}}', subjectHTML)
      .replace('{{message}}', note)
      .replace('{{footerMsg}}', 'This email was sent from the Become a Volunteer form.');

    const resumePath = req.file ? path.join(__dirname, req.file.path) : null;

    await sendMail({
      from: `RG Care Volunteer Form <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: `${name} <${email}>`,
      subject: `Become a Volunteer Inquiry from ${name}`,
      html: emailContent,
      attachments: resumePath ? [{ path: resumePath }] : [],
    });

    if (resumePath && fs.existsSync(resumePath)) fs.unlinkSync(resumePath);

    res.status(200).json({ success: true, message: 'Volunteer form submitted successfully' });
  } catch (error) {
    console.error('Volunteer form error:', error.message);
    if (req.file && fs.existsSync(path.join(__dirname, req.file.path))) {
      fs.unlinkSync(path.join(__dirname, req.file.path));
    }
    res.status(500).send('Error submitting volunteer form.');
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
app.post('/api/verify-razorpay-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorDetails } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !donorDetails) {
      return res.status(400).json({ error: 'Missing payment fields.' });
    }

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed. Invalid signature.' });
    }

    const { firstName, lastName, email, address = '', note = '', amount } = donorDetails;
    const donorName = `${firstName} ${lastName}`;
    const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const noteSection = note
      ? `<div class="detail-row"><span class="label">Message / Note</span><span class="value">${note}</span></div>`
      : '';

    // Persist donation to MongoDB
    await Donation.create({
      firstName,
      lastName,
      email,
      address,
      note,
      amount: Number(amount),
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      status: 'verified',
    });

    // Load email templates
    const donorHtml = fs.readFileSync(path.join(__dirname, 'templates', 'donation-confirmation.html'), 'utf8');
    const adminHtml = fs.readFileSync(path.join(__dirname, 'templates', 'donation-admin-notify.html'), 'utf8');

    const fillTemplate = (tpl) =>
      tpl
        .replace(/{{donorName}}/g, donorName)
        .replace(/{{amount}}/g, amount)
        .replace(/{{email}}/g, email)
        .replace(/{{address}}/g, address || 'N/A')
        .replace(/{{orderId}}/g, razorpay_order_id)
        .replace(/{{paymentId}}/g, razorpay_payment_id)
        .replace(/{{date}}/g, date)
        .replace(/{{noteSection}}/g, noteSection);

    // Send donor confirmation email
    try {
      await sendMail({
        from: `RG Care Foundation <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Donation Confirmed – Thank You, ${firstName}! | RG Care Foundation`,
        html: fillTemplate(donorHtml),
      });
    } catch (mailErr) {
      console.error('Donor confirmation email failed:', mailErr.message);
    }

    // Send admin notification email
    try {
      await sendMail({
        from: `RG Care Donations <${process.env.SMTP_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: `${donorName} <${email}>`,
        subject: `New Donation of ₹${amount} from ${donorName}`,
        html: fillTemplate(adminHtml),
      });
    } catch (mailErr) {
      console.error('Admin donation notification email failed:', mailErr.message);
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified and confirmation emails sent.',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
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
