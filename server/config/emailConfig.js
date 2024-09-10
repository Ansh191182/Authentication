const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for port 465 (SSL)
  auth: {
    user: process.env.EMAIL_USER, // Admin Gmail ID from .env
    pass: process.env.EMAIL_PASS, // App password from .env
  },
});

module.exports = transporter;
