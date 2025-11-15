# Kingdom Chronicles - Pre-Launch Landing Page

A beautiful, modern landing page for Kingdom Chronicles pre-launch campaign. This is a completely standalone project that does not affect the main game application.

## 🎯 Features

- **Hero Section** with compelling CTA
- **About Section** explaining the game
- **Top 3 Mini-Games** showcase
- **Screenshot Carousel** with smooth animations
- **VIP Benefits** section
- **Exclusive Perks** list (easily configurable)
- **$1 Reservation System** with multiple payment methods:
  - Visa/Mastercard
  - Mobile Money
  - PayPal
  - USDT TRC-20
- **FAQ Section**
- **Email Subscription** box
- **Email Notifications** to masikotimo@gmail.com
- **Fully Responsive** design
- **Smooth Animations** and scroll-based transitions

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Navigate to the landing page directory:
```bash
cd landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The landing page will be available at `http://localhost:3001`

## ⚙️ Configuration

### Admin Configuration

Edit `src/config/offers.ts` to easily manage:

- **VIP Perks**: Add, modify, or remove perks
- **Current Offers**: Update promotional offers
- **Email Settings**: Configure notification email
- **Payment Settings**: Update payment amounts, wallet addresses, API keys

### Important: Update These Settings

1. **USDT Wallet Address** in `src/config/offers.ts`:
```typescript
usdtWalletAddress: 'TYourUSDTWalletAddressHere', // UPDATE THIS
```

2. **Payment API Keys** (if using Stripe/PayPal):
```typescript
paypalClientId: 'YOUR_PAYPAL_CLIENT_ID', // UPDATE THIS
stripePublishableKey: 'YOUR_STRIPE_PUBLISHABLE_KEY', // UPDATE THIS
```

3. **Email Service Endpoint**:
   - Set up an email service (see Email Setup below)
   - Update `VITE_EMAIL_API_ENDPOINT` in `.env` file

## 📧 Email Setup

The landing page sends email notifications to `masikotimo@gmail.com` when:
- Users subscribe to the email list
- Users make a reservation

### Option 1: EmailJS (Easiest - Client-side)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Add to `.env`:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Option 2: Backend API (Recommended for Production)

1. Create a backend endpoint (see `api/send-email.example.js`)
2. Deploy to Vercel, Netlify, or your server
3. Add to `.env`:
```env
VITE_EMAIL_API_ENDPOINT=https://your-api.com/api/send-email
```

### Option 3: Serverless Functions

**Vercel:**
- Create `api/send-email.js` in the project root
- Use the example code provided
- Deploy to Vercel

**Netlify:**
- Create `netlify/functions/send-email.js`
- Use the example code provided
- Deploy to Netlify

## 💳 Payment Integration

### Stripe (Visa/Mastercard)

1. Sign up at [Stripe](https://stripe.com/)
2. Get your publishable key
3. Update `stripePublishableKey` in `src/config/offers.ts`
4. Implement Stripe Checkout in `ReservationModal.tsx`

### PayPal

1. Sign up at [PayPal Developer](https://developer.paypal.com/)
2. Get your client ID
3. Update `paypalClientId` in `src/config/offers.ts`
4. Integrate PayPal SDK

### Mobile Money

You'll need to integrate with a mobile money provider API (e.g., Flutterwave, Paystack, etc.)

### USDT TRC-20

1. Update the wallet address in `src/config/offers.ts`
2. The modal will display the address and instructions
3. Users confirm after sending (manual verification)

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { ... },
  kingdom: {
    gold: '#FFD700',
    purple: '#5B21B6',
    // ... customize colors
  }
}
```

### Content

- Edit component files in `src/components/` to change text and content
- Update screenshots in `public/screenshots/`
- Modify FAQ questions in `src/components/FAQ.tsx`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🚢 Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or connect your GitHub repo to Vercel for automatic deployments.

### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Follow the prompts

Or drag and drop the `dist/` folder to Netlify.

### Other Platforms

The built `dist/` folder can be deployed to any static hosting service:
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting
- Your own server

## 📁 Project Structure

```
landing-page/
├── src/
│   ├── components/       # React components
│   ├── config/          # Configuration files
│   ├── services/        # Email service
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
│   ├── screenshots/     # Game screenshots
│   └── logo.jpg         # Logo
├── api/                 # Backend API examples
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## 🔒 Security Notes

- Never commit API keys or secrets to version control
- Use environment variables for sensitive data
- Implement proper validation on backend endpoints
- Use HTTPS in production
- Consider rate limiting for email endpoints

## 🆘 Troubleshooting

### Images not loading
- Ensure screenshots are in `public/screenshots/`
- Check image paths in `ScreenshotCarousel.tsx`

### Email not sending
- Verify email service configuration
- Check browser console for errors
- Ensure backend endpoint is accessible

### Payment not working
- Verify payment API keys are set
- Check payment provider documentation
- Test in sandbox mode first

## 📝 License

This is a standalone landing page project for Kingdom Chronicles.

## 🤝 Support

For issues or questions, contact: masikotimo@gmail.com

---

**Note:** This landing page is completely separate from the main Kingdom Chronicles game project and will not affect production users.

