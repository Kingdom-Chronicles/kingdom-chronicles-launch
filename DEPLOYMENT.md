# Deployment Guide

This guide will help you deploy the Kingdom Chronicles landing page to various platforms.

## Pre-Deployment Checklist

1. ✅ Update USDT wallet address in `src/config/offers.ts`
2. ✅ Set up email service (EmailJS or backend API)
3. ✅ Add environment variables to your hosting platform
4. ✅ Test all forms and payment flows
5. ✅ Verify all images are in `public/screenshots/`
6. ✅ Update logo in `public/logo.jpg`

## Environment Variables

Set these in your hosting platform's environment variables section:

```
VITE_EMAIL_API_ENDPOINT=https://your-api.com/api/send-email
# OR for EmailJS:
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deployment Options

### 1. Vercel (Recommended)

**Option A: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to landing page directory
cd landing-page

# Deploy
vercel

# For production
vercel --prod
```

**Option B: Using GitHub**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set environment variables
5. Deploy!

**Vercel Configuration**

Create `vercel.json` in the landing-page directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### 2. Netlify

**Option A: Using Netlify CLI**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to landing page directory
cd landing-page

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

**Option B: Drag & Drop**

1. Build the project: `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag and drop the `dist` folder

**Netlify Configuration**

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```
3. Run: `npm run deploy`
4. Enable GitHub Pages in repository settings

### 4. AWS S3 + CloudFront

```bash
# Build the project
npm run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### 5. Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
npm run build
firebase deploy
```

## Email Service Setup

### For Vercel/Netlify Serverless Functions

1. Create the API endpoint file:
   - Vercel: `api/send-email.js`
   - Netlify: `netlify/functions/send-email.js`

2. Use the example code from `api/send-email.example.js`

3. Set up environment variables:
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your email app password

### For EmailJS (Client-side)

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create a service and template
3. Add environment variables to your hosting platform
4. No backend needed!

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

## Post-Deployment

1. ✅ Test the landing page on mobile and desktop
2. ✅ Test email subscription form
3. ✅ Test reservation flow (use test payment methods)
4. ✅ Verify email notifications are received
5. ✅ Check all links and navigation
6. ✅ Test FAQ accordion
7. ✅ Verify screenshots load correctly

## Monitoring

Consider setting up:
- Google Analytics
- Error tracking (Sentry, LogRocket)
- Uptime monitoring (UptimeRobot, Pingdom)

## Troubleshooting

### Build Fails
- Check Node.js version (needs 18+)
- Clear `node_modules` and reinstall
- Check for TypeScript errors

### Images Not Loading
- Verify images are in `public/screenshots/`
- Check image paths in components
- Ensure images are committed to git

### Email Not Sending
- Verify environment variables are set
- Check API endpoint is accessible
- Review browser console for errors
- Test email service independently

### Payment Issues
- Verify API keys are set correctly
- Test in sandbox/test mode first
- Check payment provider logs

## Support

For deployment issues, contact: masikotimo@gmail.com

