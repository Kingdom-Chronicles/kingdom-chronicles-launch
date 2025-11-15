import { motion } from 'framer-motion';
import { useState } from 'react';
import { Crown, ArrowRight } from 'lucide-react';
import ReservationModal from './ReservationModal';

const ReservationCTA = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEtLjktMi0yLTJIMjZjLTEuMSAwLTIgLjktMiAydjJjMCAxLjEuOSAyIDIgMmg4YzEuMSAwIDItLjkgMi0ydi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
              <Crown className="w-5 h-5 text-kingdom-gold" />
              <span className="font-semibold">Limited Time Offer</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Reserve Your VIP Spot
              <br />
              <span className="text-kingdom-gold">For Just $1</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Join the exclusive VIP Early Access list and unlock amazing perks. 
              Secure your place in gaming history today!
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="group px-8 py-4 bg-gradient-to-r from-kingdom-gold to-yellow-400 text-gray-900 font-bold text-lg rounded-lg shadow-2xl hover:shadow-kingdom-gold/50 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Reserve Now - $1
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <p className="mt-6 text-sm text-gray-200">
              ✓ Secure payment • ✓ Instant confirmation • ✓ Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <ReservationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default ReservationCTA;

