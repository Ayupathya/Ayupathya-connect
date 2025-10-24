const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Use multer to handle multipart/form-data (from FormData)
const upload = multer();

// Route to handle contact form
app.post('/contact', upload.none(), (req, res) => {
  if (!req.body || !req.body.name) {
    console.error('Form data is missing or not parsed.');
    return res.status(400).send('Invalid form submission.');
  }

  const { name, email, mobile, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
      user: 'contact@ayupathya.com', // replace with your email
      pass: '@Ayupathya1998'             // replace with your password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: email,
    to: 'contact@ayupathya.com',
    subject: 'New Contact Form Submission – Ayupathya',
    text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).send('Failed to send message.');
    }
    console.log('Email sent:', info.response);
    res.send('Message sent successfully!');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});