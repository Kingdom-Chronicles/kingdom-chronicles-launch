/**
 * Example Backend API Endpoint for Email Notifications
 * 
 * This is an example Node.js/Express endpoint for handling email notifications.
 * 
 * Setup Instructions:
 * 1. Install dependencies: npm install express nodemailer dotenv
 * 2. Create a .env file with your email credentials
 * 3. Deploy this to a serverless function (Vercel, Netlify, AWS Lambda, etc.)
 * 
 * For Vercel: Place this in /api/send-email.js
 * For Netlify: Place this in /netlify/functions/send-email.js
 * For AWS Lambda: Use AWS SES SDK
 */

// Example using Nodemailer (Node.js)
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use SMTP settings
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your app password
  },
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { type, data, to } = req.body;

    const subject = type === 'reservation'
      ? `New VIP Reservation - ${data.name}`
      : `New Email Subscription - ${data.email}`;

    const html = type === 'reservation'
      ? `
        <h2>New VIP Reservation</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        <p><strong>Amount:</strong> $${data.amount}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `
      : `
        <h2>New Email Subscription</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to || 'masikotimo@gmail.com',
      subject,
      html,
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// For serverless functions (Vercel example)
module.exports = app;

// For Vercel, export as default handler:
/*
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // ... same email sending logic as above
}
*/

