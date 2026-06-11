const nodemailer = require('nodemailer');
require('dotenv').config();

const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'UniSmart Admin Portal - Your Login OTP',
      text: `Your One-Time Password (OTP) for UniSmart login is: ${otp}. It is valid for 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email successfully sent! Message ID:', info.messageId);
    return true;

  } catch (error) {
    console.error('CRITICAL ERROR: Failed to send email.');
    console.error(error); // This will print the exact reason it failed!
    return false;
  }
};

module.exports = sendOTP;