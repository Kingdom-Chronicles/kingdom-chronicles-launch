# Netlify Functions Email Setup Guide

This guide will help you set up Gmail email sending using Netlify Functions.

## 📋 Prerequisites

1. A Gmail account (`kingdomchroniclesug@gmail.com`)
2. A Netlify account
3. Netlify CLI installed (for local testing)

## 🔧 Step 1: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/security
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", find **2-Step Verification**
4. **Enable 2-Step Verification** if not already enabled (required!)
5. Go back to Security page
6. Under "Signing in to Google", find **App passwords**
7. Click on **App passwords**
8. Select **Mail** as the app
9. Select **Other (Custom name)** as the device
10. Enter: "Kingdom Chronicles Netlify"
11. Click **Generate**
12. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
13. **Important**: Remove all spaces - you need the 16 characters without spaces

## 🚀 Step 2: Deploy to Netlify

### Option A: Deploy via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [Netlify Dashboard](https://app.netlify.com)
3. Click **Add new site** → **Import an existing project**
4. Connect your GitHub repository
5. Netlify will auto-detect settings from `netlify.toml`
6. Click **Deploy site**

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## 🔐 Step 3: Set Environment Variables in Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Click **Add a variable**
4. Add these three variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `EMAIL_USER` | `kingdomchroniclesug@gmail.com` | All environments |
| `EMAIL_PASS` | `your_16_char_app_password` (no spaces) | All environments |
| `NOTIFICATION_EMAIL` | `masikotimo@gmail.com` | All environments |

5. **Important**: Make sure to select "All environments" or at least "Production"
6. Click **Save**

## 🔄 Step 4: Redeploy

After adding environment variables, you need to trigger a new deployment:

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete

## 🧪 Step 5: Test

1. Visit your deployed site
2. Fill out the sign-up form
3. Check `masikotimo@gmail.com` for the notification email
4. If it works, you're all set! 🎉

## 💻 Local Development

To test emails locally before deploying:

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Create `.env` file** in your project root:
   ```env
   EMAIL_USER=kingdomchroniclesug@gmail.com
   EMAIL_PASS=your_16_char_app_password
   NOTIFICATION_EMAIL=masikotimo@gmail.com
   ```

3. **Run Netlify Dev**:
   ```bash
   npm run dev:netlify
   ```
   Or:
   ```bash
   netlify dev
   ```

4. Your app will be available at `http://localhost:8888` (or the port shown)
5. The `/api/send-email` endpoint will work exactly like in production!

## 📁 File Structure

```
your-project/
├── netlify/
│   └── functions/
│       └── send-email.js    # Netlify serverless function
├── netlify.toml              # Netlify configuration
├── src/
│   └── services/
│       └── emailService.ts   # Frontend email service
└── .env                      # Local development (not committed)
```

## 🔍 How It Works

1. **Frontend** calls `/api/send-email` (from `src/services/emailService.ts`)
2. **Netlify redirects** `/api/send-email` → `/.netlify/functions/send-email` (via `netlify.toml`)
3. **Netlify Function** (`netlify/functions/send-email.js`) handles the email sending
4. **Nodemailer** sends email via Gmail SMTP using your App Password

## ❓ Troubleshooting

### Email not sending in production

1. **Check environment variables**:
   - Go to Netlify dashboard → Site settings → Environment variables
   - Verify all three variables are set
   - Make sure `EMAIL_PASS` has no spaces

2. **Check Netlify Function logs**:
   - Go to Netlify dashboard → Functions tab
   - Click on `send-email`
   - Check the logs for errors

3. **Verify Gmail App Password**:
   - Make sure 2-Step Verification is enabled
   - Generate a new App Password if needed
   - Remove all spaces from the password

### Email not sending locally

1. **Check `.env` file exists** in project root
2. **Verify environment variables** are set correctly
3. **Make sure Netlify CLI is running**: `netlify dev`
4. **Check terminal** for error messages

### "Email service not configured" error

- This means `EMAIL_USER` or `EMAIL_PASS` is missing
- Check environment variables in Netlify dashboard
- For local: check `.env` file

### CORS errors

- The function already handles CORS
- If you see CORS errors, check browser console for details
- Make sure you're calling `/api/send-email` (not the direct function URL)

## 📚 Additional Resources

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Nodemailer Docs](https://nodemailer.com/about/)

## ✅ Checklist

- [ ] 2-Step Verification enabled on Gmail
- [ ] Gmail App Password generated
- [ ] Code pushed to GitHub
- [ ] Site deployed to Netlify
- [ ] Environment variables set in Netlify
- [ ] Site redeployed after adding variables
- [ ] Tested sign-up form
- [ ] Received test email at `masikotimo@gmail.com`

---

**Need help?** Check the troubleshooting section or Netlify function logs for detailed error messages.

