import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { EMAIL_CONFIG } from '../config/offers';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Send email notification
      const response = await fetch(import.meta.env.VITE_EMAIL_API_ENDPOINT || '/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'email',
          data: { email },
          to: EMAIL_CONFIG.notificationEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      toast.success('Thank you for subscribing! We\'ll keep you updated.');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEtLjktMi0yLTJIMjZjLTEuMSAwLTIgLjktMiAydjJjMCAxLjEuOSAyIDIgMmg4YzEuMSAwIDItLjkgMi0ydi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay in the <span className="text-kingdom-gold">Loop</span>
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Subscribe to get updates, exclusive content, and early access notifications
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-kingdom-gold"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-4 bg-gradient-to-r from-kingdom-gold to-yellow-400 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Subscribe
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-300 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSubscription;

