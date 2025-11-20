/**
 * Email Service
 * 
 * This service handles sending email notifications to masikotimo@gmail.com
 * 
 * You'll need to set up an email service provider. Options include:
 * - EmailJS (https://www.emailjs.com/) - Free tier available
 * - SendGrid (https://sendgrid.com/) - Free tier available
 * - AWS SES (https://aws.amazon.com/ses/) - Pay as you go
 * - Resend (https://resend.com/) - Free tier available
 * - Nodemailer with SMTP
 * 
 * For production, create a backend API endpoint that handles email sending securely.
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
    // Option 1: Use EmailJS (client-side) - No backend needed!
    // Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY
    // Note: Install @emailjs/browser if using EmailJS: npm install @emailjs/browser
    if (import.meta.env.VITE_EMAILJS_SERVICE_ID) {
      try {
        // @ts-ignore - Optional dependency, only loaded if EmailJS is configured
        const emailjs = await import('@emailjs/browser');
        
        // Prepare template parameters based on email type
        const templateParams: Record<string, string> = {
          to_email: EMAIL_CONFIG.notificationEmail,
          timestamp: new Date().toLocaleString(),
        };

        if (emailData.type === 'reservation') {
          templateParams.name = emailData.data.name || '';
          templateParams.email = emailData.data.email || '';
          templateParams.phone = emailData.data.phone || 'Not provided';
          templateParams.payment_method = emailData.data.paymentMethod || 'Not selected';
          templateParams.amount = `$${emailData.data.amount || '0'}`;
        } else {
          templateParams.email = emailData.data.email || '';
          templateParams.name = emailData.data.name || '';
        }

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        
        console.log('Email sent via EmailJS');
        return;
      } catch (emailjsError) {
        console.error('EmailJS error:', emailjsError);
        // Fall through to API endpoint if EmailJS fails
      }
    }

    // Option 2: Use backend API endpoint (Netlify Functions or Vercel)
    // Set VITE_EMAIL_API_ENDPOINT (defaults to /api/send-email)
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

