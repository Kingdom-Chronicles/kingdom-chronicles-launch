# Important Notes

## Assets to Add

1. **Logo**: Add `public/logo.jpg` (copy from main project's `public/logo.jpg`)
2. **Screenshots**: Already copied from main project to `public/screenshots/`

## Before First Deployment

1. ✅ Update USDT wallet address in `src/config/offers.ts`
2. ✅ Set up email service (EmailJS or backend API)
3. ✅ Add environment variables
4. ✅ Test all forms locally
5. ✅ Verify all images load correctly

## Payment Integration Status

- **USDT TRC-20**: ✅ Fully functional (just needs wallet address)
- **Visa/Mastercard**: ⚠️ UI ready, needs Stripe API integration
- **PayPal**: ⚠️ UI ready, needs PayPal SDK integration
- **Mobile Money**: ⚠️ UI ready, needs provider API integration

For production, you'll need to integrate actual payment processors. The UI is ready, you just need to add the payment processing logic in `ReservationModal.tsx`.

## Email Service

The email service is set up to send notifications to `masikotimo@gmail.com`. Choose one:

1. **EmailJS** (Easiest) - No backend needed
2. **Backend API** (Recommended) - More secure, use the example in `api/send-email.example.js`

## Testing

Before going live:
- [ ] Test email subscription form
- [ ] Test reservation flow (use test payment methods)
- [ ] Verify email notifications are received
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify FAQ accordion works
- [ ] Test USDT modal and instructions

## Customization

All content can be easily customized:
- Perks: `src/config/offers.ts`
- FAQ: `src/components/FAQ.tsx`
- Colors: `tailwind.config.js`
- Text: Edit component files directly

## Support

For issues or questions: masikotimo@gmail.com

