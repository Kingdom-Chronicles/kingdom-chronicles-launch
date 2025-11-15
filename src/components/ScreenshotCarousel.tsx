import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScreenshotCarousel = () => {
  const screenshots = [
    {
      id: 1,
      title: 'Testament Quiz',
      image: '/screenshots/testament-quiz.png',
      description: 'Test your knowledge of Biblical books',
    },
    {
      id: 2,
      title: 'Scripture Sprint',
      image: '/screenshots/scripture-sprint.png',
      description: 'Race to complete Bible verses',
    },
    {
      id: 3,
      title: 'Bible Charades',
      image: '/screenshots/bible-charades.png',
      description: 'Act out and guess Biblical stories',
    },
    {
      id: 4,
      title: 'Kingdom Builders',
      image: '/screenshots/kingdom-builders.png',
      description: 'Build and manage your Biblical kingdom',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [screenshots.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sneak <span className="gradient-text">Peek</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get a glimpse of what's coming in Kingdom Chronicles
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={screenshots[currentIndex].image}
                  alt={screenshots[currentIndex].title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600/4f46e5/ffffff?text=' + screenshots[currentIndex].title;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {screenshots[currentIndex].title}
                  </h3>
                  <p className="text-gray-200">{screenshots[currentIndex].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all z-10"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all z-10"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotCarousel;

