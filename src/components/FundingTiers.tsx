import { motion } from 'framer-motion';
import { useState } from 'react';
import { Crown, Star, Users, Zap, Award, Gem, Sparkles } from 'lucide-react';
import { FUNDING_TIERS, FundingTier } from '../config/offers';
import SignUpModal from './SignUpModal';

const tierIcons = {
  disciple: Users,
  'early-builder': Zap,
  founder: Crown,
  'kingdom-partner': Star,
  elder: Award,
  'vision-bearer': Gem,
  'kingdom-founding-family': Sparkles,
};

const FundingTiers = () => {
  const [selectedTier, setSelectedTier] = useState<FundingTier | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSelectTier = (tier: FundingTier) => {
    setSelectedTier(tier);
    setShowSignUpModal(true);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMS4xLS45LTItMi0ySDI2Yy0xLjEgMC0yIC45LTIgMnYyYzAgMS4xLjkgMiAyIDJoOGMxLjEgMCAyLS45IDItMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
              <Crown className="w-5 h-5 text-kingdom-gold" />
              <span className="font-semibold">Choose Your Tier</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Support <span className="text-kingdom-gold">Kingdom Chronicles</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Select a funding tier that matches your level of support. Every tier includes all benefits from lower tiers plus exclusive perks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {FUNDING_TIERS.map((tier, index) => {
              const Icon = tierIcons[tier.id as keyof typeof tierIcons] || Crown;
              const isPopular = tier.badge === 'Most Popular';
              const isLimited = tier.badge?.includes('Limited') || tier.badge?.includes('Spots');

              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 transition-all hover:scale-105 ${
                    isPopular
                      ? 'border-kingdom-gold shadow-2xl shadow-kingdom-gold/50'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-kingdom-gold to-yellow-400 text-gray-900 font-bold text-sm rounded-full">
                      Most Popular
                    </div>
                  )}
                  {isLimited && (
                    <div className="absolute -top-4 right-4 px-3 py-1 bg-red-500 text-white font-bold text-xs rounded-full">
                      {tier.badge}
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-4xl font-bold text-kingdom-gold mb-1">
                      ${tier.amount}
                    </div>
                    {tier.estimatedBackers && tier.estimatedBackers > 0 && (
                      <p className="text-sm text-gray-300">
                        ~{tier.estimatedBackers} backers
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6 min-h-[200px]">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-kingdom-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-kingdom-gold"></div>
                        </div>
                        <span className="text-gray-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectTier(tier)}
                    className={`w-full py-3 rounded-lg font-bold transition-all ${
                      isPopular
                        ? 'bg-gradient-to-r from-kingdom-gold to-yellow-400 text-gray-900 hover:shadow-lg hover:shadow-kingdom-gold/50'
                        : 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    Select This Tier
                  </button>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-kingdom-gold/20 backdrop-blur-md rounded-lg border border-kingdom-gold/30">
              <Star className="w-5 h-5 text-kingdom-gold" />
              <span className="font-semibold">
                All tiers include early access and exclusive VIP community access
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => {
          setShowSignUpModal(false);
          setSelectedTier(null);
        }}
        selectedTier={selectedTier}
      />
    </>
  );
};

export default FundingTiers;

