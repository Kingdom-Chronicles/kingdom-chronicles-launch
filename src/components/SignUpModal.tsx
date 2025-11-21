import { useState } from 'react';
import { X, Mail, User, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { EMAIL_CONFIG, FundingTier } from '../config/offers';
import ReservationModal from './ReservationModal';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: FundingTier | null;
}

const SignUpModal = ({ isOpen, onClose, selectedTier }: SignUpModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
        console.log('Sending email notification for sign-up');
        console.log('Email API endpoint:', import.meta.env.VITE_EMAIL_API_ENDPOINT);
        console.log('Email data:', {
          type: 'email',
          data: { 
            email: formData.email,
            name: formData.name,
          },
          to: EMAIL_CONFIG.notificationEmail,
        });
        console.log('Email API endpoint:', import.meta.env.VITE_EMAIL_API_ENDPOINT);
      // Send email notification for sign-up
      const response = await fetch(import.meta.env.VITE_EMAIL_API_ENDPOINT || '/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'email',
          data: { 
            email: formData.email,
            name: formData.name,
          },
          to: EMAIL_CONFIG.notificationEmail,
        }),
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      toast.success('Thank you for signing up!');
      
      // Close sign-up modal and open reservation modal
      onClose();
      setShowReservationModal(true);
    } catch (error) {
      console.error('Sign-up error:', error);
      toast.error('Sign-up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReservationClose = () => {
    setShowReservationModal(false);
    setFormData({ name: '', email: '' });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Join Kingdom Chronicles</h2>
                  {selectedTier && (
                    <p className="text-sm text-gray-500 mt-1">
                      Selected: {selectedTier.name} - ${selectedTier.amount}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                  <p className="text-gray-600 mb-6">
                    {selectedTier 
                      ? `Sign up to complete your ${selectedTier.name} backing and get exclusive access to all tier benefits.`
                      : 'Sign up to stay updated on Kingdom Chronicles and get exclusive access to early features and special offers.'
                    }
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    'Signing up...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Sign Up
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By signing up, you agree to our terms and conditions. We respect your privacy.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReservationModal
        isOpen={showReservationModal}
        onClose={handleReservationClose}
        preFilledData={formData}
        selectedTier={selectedTier}
      />
    </>
  );
};

export default SignUpModal;

