/**
 * Email Service
 * 
 * This service handles sending email notifications using Netlify Functions.
 * 
 * Setup:
 * 1. Set environment variables in Netlify dashboard:
 *    - EMAIL_USER: Your Gmail address
 *    - EMAIL_PASS: Your Gmail App Password
 *    - NOTIFICATION_EMAIL: Where to send notifications
 * 2. The function at netlify/functions/send-email.js handles email sending
 * 3. For local development, use: netlify dev
 * 
 * See NETLIFY_EMAIL_SETUP.md for detailed setup instructions.
 */

import { EMAIL_CONFIG } from '../config/offers';

export interface EmailData {
  type: 'email' | 'reservation';
  data: {
    email?: string;
    name?: string;
    phone?: string;
    paymentMethod?: string;
    amount?: number;
  };
}

/**
 * Send email notification
 * 
 * This function should be replaced with your actual email service implementation.
 * For now, it's a placeholder that logs the email data.
 */
export const sendEmailNotification = async (emailData: EmailData): Promise<void> => {
  try {
    // Use Netlify Functions API endpoint
    // The endpoint /api/send-email is automatically redirected to /.netlify/functions/send-email
    // via netlify.toml configuration
    const endpoint = import.meta.env.VITE_EMAIL_API_ENDPOINT || '/api/send-email';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...emailData,
        to: EMAIL_CONFIG.notificationEmail,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send email: ${errorText}`);
    }

    console.log('Email notification sent successfully via API');
  } catch (error) {
    console.error('Error sending email notification:', error);
    // In production, you might want to log this to an error tracking service
    throw error;
  }
};

/**
 * Format email message based on type
 * 
 * Note: This function is currently unused but kept for future EmailJS integration.
 * Uncomment the EmailJS code block above to use this function.
 */
// const formatEmailMessage = (emailData: EmailData): string => {
//   if (emailData.type === 'reservation') {
//     return `
// New VIP Reservation Received!
//
// Name: ${emailData.data.name}
// Email: ${emailData.data.email}
// Phone: ${emailData.data.phone || 'Not provided'}
// Payment Method: ${emailData.data.paymentMethod}
// Amount: $${emailData.data.amount}
//
// Timestamp: ${new Date().toISOString()}
//     `.trim();
//   } else {
//     return `
// New Email Subscription!
//
// Email: ${emailData.data.email}
//
// Timestamp: ${new Date().toISOString()}
//     `.trim();
//   }
// };

