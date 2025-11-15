# Quick Start Guide

Get your Kingdom Chronicles landing page up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd landing-page
npm install
```

## Step 2: Configure Settings

Edit `src/config/offers.ts` and update:

1. **USDT Wallet Address** (line ~50):
```typescript
usdtWalletAddress: 'TYourActualUSDTWalletAddress',
```

2. **Email Service** - Choose one:

   **Option A: EmailJS (Easiest)**
   - Sign up at https://www.emailjs.com
   - Create a service and template
   - Create `.env` file:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

   **Option B: Backend API**
   - Set up a backend endpoint (see `api/send-email.example.js`)
   - Create `.env` file:
   ```env
   VITE_EMAIL_API_ENDPOINT=https://your-api.com/api/send-email
   ```

## Step 3: Add Assets

1. Copy logo to `public/logo.jpg`
2. Copy screenshots to `public/screenshots/`:
   - testament-quiz.png
   - scripture-sprint.png
   - bible-charades.png
   - kingdom-builders.png

## Step 4: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3001`

## Step 5: Customize (Optional)

- Edit perks in `src/config/offers.ts`
- Update FAQ in `src/components/FAQ.tsx`
- Change colors in `tailwind.config.js`
- Modify content in component files

## Step 6: Build for Production

```bash
npm run build
```

The `dist/` folder contains your production-ready files.

## Step 7: Deploy

See `DEPLOYMENT.md` for detailed deployment instructions.

**Quick Deploy Options:**

- **Vercel**: `npm i -g vercel && vercel`
- **Netlify**: `npm i -g netlify-cli && netlify deploy --prod`
- **Manual**: Upload `dist/` folder to any web hosting

## Need Help?

- Check `README.md` for detailed documentation
- Review `DEPLOYMENT.md` for deployment help
- Contact: masikotimo@gmail.com

---

**That's it!** Your landing page is ready to collect leads and reservations. 🚀

