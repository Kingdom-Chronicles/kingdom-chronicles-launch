/**
 * Vercel Serverless Function for Email Notifications
 * 
 * This endpoint handles email sending using Gmail SMTP via Nodemailer
 * 
 * Setup:
 * 1. Install nodemailer: npm install nodemailer
 * 2. Set environment variables in Vercel dashboard or .env.local
 * 3. Deploy to Vercel
 */

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, data, to } = req.body;

    // Validate required fields
    if (!type || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get email credentials from environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const recipientEmail = to || process.env.NOTIFICATION_EMAIL || 'masikotimo@gmail.com';

    if (!emailUser || !emailPass) {
      console.error('Email credentials not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass, // This should be a Gmail App Password
      },
    });

    // Format email content based on type
    let subject, html, text;

    if (type === 'reservation') {
      subject = `New VIP Reservation - ${data.name || 'Unknown'}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New VIP Reservation Received! 🎉</h2>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1F2937; margin-top: 0;">Reservation Details:</h3>
            <p><strong>Name:</strong> ${data.name || 'Not provided'}</p>
            <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod || 'Not selected'}</p>
            <p><strong>Amount:</strong> $${data.amount || '0'}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #6B7280; font-size: 12px;">This is an automated notification from Kingdom Chronicles landing page.</p>
        </div>
      `;
      text = `
New VIP Reservation Received!

Name: ${data.name || 'Not provided'}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Payment Method: ${data.paymentMethod || 'Not selected'}
Amount: $${data.amount || '0'}
Timestamp: ${new Date().toLocaleString()}
      `.trim();
    } else {
      // Email subscription
      subject = `New Email Subscription - ${data.email || 'Unknown'}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New Email Subscription! 📧</h2>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
            ${data.name ? `<p><strong>Name:</strong> ${data.name}</p>` : ''}
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #6B7280; font-size: 12px;">This is an automated notification from Kingdom Chronicles landing page.</p>
        </div>
      `;
      text = `
New Email Subscription!

Email: ${data.email || 'Not provided'}
${data.name ? `Name: ${data.name}\n` : ''}
Timestamp: ${new Date().toLocaleString()}
      `.trim();
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"Kingdom Chronicles" <${emailUser}>`,
      to: recipientEmail,
      subject,
      text,
      html,
    });

    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}

