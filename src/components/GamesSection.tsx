import { motion } from 'framer-motion';
import { Book, Zap, Users } from 'lucide-react';

const GamesSection = () => {
  const games = [
    {
      name: 'Guess the Testament',
      description: 'Test your knowledge of Old and New Testament books in this quick-fire quiz game.',
      icon: Book,
      color: 'from-amber-500 to-orange-600',
    },
    {
      name: 'Scripture Sprint',
      description: 'Race against time to complete Bible verses from themed packs. Speed and accuracy matter!',
      icon: Zap,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      name: 'Bible Charades',
      description: 'Act out and guess Biblical stories in this exciting team-based charades game.',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Top 3 <span className="gradient-text">Mini-Games</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular games that combine faith, fun, and friendly competition
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${game.color} opacity-10 rounded-full blur-3xl`}></div>
                
                <div className={`relative w-16 h-16 bg-gradient-to-br ${game.color} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{game.name}</h3>
                <p className="text-gray-600 leading-relaxed">{game.description}</p>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-sm font-semibold text-indigo-600">Coming Soon</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;

