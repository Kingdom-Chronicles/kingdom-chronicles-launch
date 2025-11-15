import { motion } from 'framer-motion';
import { CheckCircle2, Crown, Star } from 'lucide-react';

const VIPBenefits = () => {
  const benefits = [
    'Early access to all game features',
    'Exclusive in-game content and rewards',
    'Priority customer support',
    'Beta testing opportunities',
    'VIP community access',
    'Special launch day bonuses',
  ];

  return (
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
            <span className="font-semibold">VIP Early Access</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Benefits of Joining <span className="text-kingdom-gold">VIP Early Access</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Get exclusive perks and be part of the Kingdom Chronicles journey from day one
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-kingdom-gold/20 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-kingdom-gold" />
                </div>
                <p className="text-lg font-medium text-white">{benefit}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-kingdom-gold/20 backdrop-blur-md rounded-lg border border-kingdom-gold/30">
            <Star className="w-5 h-5 text-kingdom-gold" />
            <span className="font-semibold">Limited spots available - Reserve yours today!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VIPBenefits;

