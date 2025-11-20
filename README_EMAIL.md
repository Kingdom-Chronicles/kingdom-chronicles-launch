# Email Setup - Quick Reference

## ✅ What's Configured

Your project is set up to use **Netlify Functions** for sending emails via Gmail.

### Files Created:
- ✅ `netlify/functions/send-email.js` - Serverless function for email sending
- ✅ `netlify.toml` - Netlify configuration with API redirect
- ✅ `src/services/emailService.ts` - Updated to use Netlify Functions

### How It Works:
1. Frontend calls `/api/send-email`
2. Netlify redirects to `/.netlify/functions/send-email`
3. Function sends email via Gmail SMTP

## 🚀 Quick Start

1. **Generate Gmail App Password** (see `NETLIFY_EMAIL_SETUP.md`)
2. **Deploy to Netlify** (push to GitHub and connect to Netlify)
3. **Set Environment Variables** in Netlify dashboard:
   - `EMAIL_USER` = `kingdomchroniclesug@gmail.com`
   - `EMAIL_PASS` = `your_16_char_app_password`
   - `NOTIFICATION_EMAIL` = `masikotimo@gmail.com`
4. **Redeploy** your site
5. **Test** the sign-up form

## 📖 Full Instructions

See **`NETLIFY_EMAIL_SETUP.md`** for detailed step-by-step instructions.

## 💻 Local Development

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create .env file with your credentials
# Then run:
npm run dev:netlify
```

## 🔍 Testing

1. Fill out the sign-up form on your site
2. Check `masikotimo@gmail.com` for the notification
3. Check browser console for any errors

## ❓ Need Help?

- See `NETLIFY_EMAIL_SETUP.md` for troubleshooting
- Check Netlify function logs in dashboard
- Verify environment variables are set correctly

