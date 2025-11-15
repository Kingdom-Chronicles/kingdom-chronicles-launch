import { motion } from 'framer-motion';
import { BookOpen, Users, Trophy, Sparkles } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Bible-Inspired',
      description: 'Engaging games based on timeless Biblical stories and wisdom',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with friends and compete in exciting multiplayer challenges',
    },
    {
      icon: Trophy,
      title: 'Rewards & Achievements',
      description: 'Earn points, unlock achievements, and climb the leaderboards',
    },
    {
      icon: Sparkles,
      title: 'Multiple Mini-Games',
      description: 'Diverse game modes to keep you engaged and entertained',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What is <span className="gradient-text">Kingdom Chronicles</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kingdom Chronicles is an epic Bible-themed gaming platform that combines faith, fun, and community. 
            Experience interactive mini-games, compete with friends, and discover timeless wisdom through engaging gameplay.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

