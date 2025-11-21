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

export interface FundingTier {
  id: string;
  name: string;
  amount: number;
  badge?: string; // e.g., "Limited", "Most Popular"
  benefits: string[];
  estimatedBackers?: number; // For projection purposes
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

// $1 Reservation - Entry level
export const RESERVATION_OFFER: Offer = {
  id: 'reservation',
  title: '$1 VIP Reservation',
  description: 'Reserve your spot for just $1 and get $10 worth of in-game currency on launch',
  badge: 'Limited Time',
};

// Funding Tiers for Backers
export const FUNDING_TIERS: FundingTier[] = [
  {
    id: 'disciple',
    name: 'Disciple Tier',
    amount: 10,
    benefits: [
      'Your name in Supporters Wall',
      'Access to backer-only updates',
      '$10 worth of in-game currency on launch',
    ],
    estimatedBackers: 0, // Will be calculated
  },
  {
    id: 'early-builder',
    name: 'Early Builder Tier',
    amount: 25,
    benefits: [
      'Everything in Disciple Tier',
      'Early access playtest builds',
      'Vote on game features',
      '$25 worth of in-game currency on launch',
    ],
    estimatedBackers: 200,
  },
  {
    id: 'founder',
    name: 'Founder Tier',
    amount: 50,
    badge: 'Most Popular',
    benefits: [
      'Everything in Early Builder Tier',
      'Invite 1 friend to early access',
      'Access to Founder Discord',
      'Founder digital card (non-game item)',
      '$50 worth of in-game currency on launch',
    ],
    estimatedBackers: 40,
  },
  {
    id: 'kingdom-partner',
    name: 'Kingdom Partner Tier',
    amount: 100,
    benefits: [
      'Everything in Founder Tier',
      'Exclusive developer livestream',
      'Your name in gold on Supporters Wall',
      'Private Q&A session',
      '$100 worth of in-game currency on launch',
    ],
    estimatedBackers: 10,
  },
  {
    id: 'elder',
    name: 'Elder Tier',
    amount: 250,
    badge: 'Limited',
    benefits: [
      'Everything in Kingdom Partner Tier',
      'Help approve one mini-game',
      'Personalized thank-you video',
      'Access to early tournaments',
      '$250 worth of in-game currency on launch',
    ],
    estimatedBackers: 4,
  },
  {
    id: 'vision-bearer',
    name: 'Vision Bearer Tier',
    amount: 500,
    badge: 'Very Limited',
    benefits: [
      'Everything in Elder Tier',
      'Become an NPC name inspiration (e.g., "Elder Timothy" appears in a village)',
      '1:1 Zoom call with the team',
      '$500 worth of in-game currency on launch',
    ],
    estimatedBackers: 1,
  },
  {
    id: 'kingdom-founding-family',
    name: 'Kingdom Founding Family',
    amount: 1000,
    badge: '3 Spots Only',
    benefits: [
      'Everything in Vision Bearer Tier',
      'Permanent title: Patron of the Kingdom',
      'Logo/name featured on website',
      'Invitation to private dev council group',
      '$1,000 worth of in-game currency on launch',
    ],
    estimatedBackers: 1,
  },
];

// Legacy offers (kept for backward compatibility)
export const CURRENT_OFFERS: Offer[] = [
  RESERVATION_OFFER,
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
  reservationAmount: 1, // $1 - Entry level reservation
  currency: 'USD',
  // USDT TRC-20 Wallet Address
  usdtWalletAddress: 'TXNxp5psNN3dtXFM8ggPc9G56LxzLaQxdU', // UPDATE THIS with your actual USDT TRC-20 address
  // PayPal Configuration (update with your PayPal client ID)
  paypalClientId: 'YOUR_PAYPAL_CLIENT_ID', // UPDATE THIS
  // Stripe Configuration (update with your Stripe publishable key)
  stripePublishableKey: 'YOUR_STRIPE_PUBLISHABLE_KEY', // UPDATE THIS
};

// Funding projections helper
export const calculateProjectedFunding = (): number => {
  return FUNDING_TIERS.reduce((total, tier) => {
    return total + (tier.amount * (tier.estimatedBackers || 0));
  }, 0);
};

// Get tier by amount
export const getTierByAmount = (amount: number): FundingTier | undefined => {
  return FUNDING_TIERS.find(tier => tier.amount === amount);
};

// Get tier by ID
export const getTierById = (id: string): FundingTier | undefined => {
  return FUNDING_TIERS.find(tier => tier.id === id);
};

