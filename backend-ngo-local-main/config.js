require('dotenv').config();
const config = {
  port: process.env.PORT || 3000,
  filesize_limit: 5 * 1024 * 1024,
  
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  email: {
    to: process.env.EMAIL_TO,
  },
  node_env: process.env.NODE_ENV,
  app_url: process.env.APP_URL,
};

module.exports = config;
