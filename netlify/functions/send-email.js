/**
 * Netlify Serverless Function for Email Notifications
 * 
 * This function handles email sending using Gmail SMTP via Nodemailer
 * 
 * Setup:
 * 1. Set environment variables in Netlify dashboard:
 *    - EMAIL_USER: Your Gmail address
 *    - EMAIL_PASS: Your Gmail App Password
 *    - NOTIFICATION_EMAIL: Where to send notifications
 * 2. Deploy to Netlify
 * 
 * For local development:
 * - Create .env file with the same variables
 * - Run: netlify dev
 */

const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { type, data, to } = JSON.parse(event.body);

    // Validate required fields
    if (!type || !data) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Get email credentials from environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const recipientEmail = to || process.env.NOTIFICATION_EMAIL || 'masikotimo@gmail.com';

    if (!emailUser || !emailPass) {
      console.error('Email credentials not configured');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Email service not configured',
          message: 'Please set EMAIL_USER and EMAIL_PASS in Netlify environment variables'
        }),
      };
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

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        messageId: info.messageId 
      }),
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to send email',
        details: error.message 
      }),
    };
  }
};

