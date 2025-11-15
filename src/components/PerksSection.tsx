import { motion } from 'framer-motion';
import { VIP_PERKS } from '../config/offers';

const PerksSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Exclusive <span className="gradient-text">Perks</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock amazing benefits when you join the VIP Early Access list
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIP_PERKS.map((perk, index) => (
            <motion.div
              key={perk.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                {perk.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{perk.title}</h3>
              <p className="text-gray-600">{perk.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerksSection;

