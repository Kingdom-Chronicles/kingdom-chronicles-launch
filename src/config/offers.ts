/**
 * Admin Configuration File
 * Easily add, modify, or remove perks and offers here
 */

export interface Perk {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  badge?: string; // Optional badge like "Limited Time"
}

export const VIP_PERKS: Perk[] = [
  {
    id: 'early-access',
    title: 'Early Access',
    description: 'Be among the first to play Kingdom Chronicles before public launch',
    icon: '🎮',
  },
  {
    id: 'exclusive-content',
    title: 'Exclusive Content',
    description: 'Access special game modes and content only available to VIP members',
    icon: '👑',
  },
  {
    id: 'bonus-rewards',
    title: 'Bonus Rewards',
    description: 'Start with extra coins, power-ups, and exclusive in-game items',
    icon: '💰',
  },
  {
    id: 'priority-support',
    title: 'Priority Support',
    description: 'Get priority customer support and direct feedback channels',
    icon: '💬',
  },
  {
    id: 'beta-features',
    title: 'Beta Features',
    description: 'Test and influence new features before they go live',
    icon: '🔬',
  },
  {
    id: 'community-access',
    title: 'VIP Community',
    description: 'Join an exclusive community of early supporters and game developers',
    icon: '🌟',
  },
];

export const CURRENT_OFFERS: Offer[] = [
  {
    id: 'reservation-bonus',
    title: '$1 Reservation Bonus',
    description: 'Reserve your spot for just $1 and get $10 worth of in-game currency on launch',
    badge: 'Limited Time',
  },
  {
    id: 'founder-badge',
    title: 'Founder Badge',
    description: 'Receive an exclusive "Founder" badge that will be permanently displayed on your profile',
  },
  {
    id: 'launch-day-prize',
    title: 'Launch Day Prize Pool',
    description: 'All VIP members are automatically entered into a special launch day prize draw',
  },
];

// Email notification settings
export const EMAIL_CONFIG = {
  notificationEmail: 'masikotimo@gmail.com',
  // Add your email service API endpoint here
  // For example: EmailJS, SendGrid, AWS SES, etc.
  emailServiceEndpoint: '/api/send-email', // Update this with your actual endpoint
};

// Payment configuration
export const PAYMENT_CONFIG = {
  reservationAmount: 1, // $1
  currency: 'USD',
  // USDT TRC-20 Wallet Address
  usdtWalletAddress: 'TXNxp5psNN3dtXFM8ggPc9G56LxzLaQxdU', // UPDATE THIS with your actual USDT TRC-20 address
  // PayPal Configuration (update with your PayPal client ID)
  paypalClientId: 'YOUR_PAYPAL_CLIENT_ID', // UPDATE THIS
  // Stripe Configuration (update with your Stripe publishable key)
  stripePublishableKey: 'YOUR_STRIPE_PUBLISHABLE_KEY', // UPDATE THIS
};

