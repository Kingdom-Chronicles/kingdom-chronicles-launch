import { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Wallet, Coins, CheckCircle2, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { PAYMENT_CONFIG, FundingTier } from '../config/offers';
import PaymentMethodCard from './PaymentMethodCard';
import USDTModal from './USDTModal';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preFilledData?: {
    name: string;
    email: string;
  };
  selectedTier?: FundingTier | null;
}

type PaymentMethod = 'card' | 'mobile-money' | 'paypal' | 'usdt' | null;

const VIP_PERKS = [
  'Early access to all game features',
  'Exclusive in-game content and rewards',
  'Priority customer support',
  'Beta testing opportunities',
  'VIP community access',
  'Special launch day bonuses',
];

const ReservationModal = ({ isOpen, onClose, preFilledData, selectedTier }: ReservationModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [showUSDTModal, setShowUSDTModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Calculate the amount based on selected tier or default to $1 reservation
  const reservationAmount = selectedTier?.amount || PAYMENT_CONFIG.reservationAmount;

  // Populate form data when preFilledData is provided
  useEffect(() => {
    if (preFilledData && isOpen) {
      setFormData(prev => ({
        ...prev,
        name: preFilledData.name || prev.name,
        email: preFilledData.email || prev.email,
      }));
    }
  }, [preFilledData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Visa / Mastercard',
      icon: CreditCard,
      description: 'Pay with your credit or debit card',
      isDisabled: true,
      comingSoonText: 'Coming Soon',
    },
    {
      id: 'mobile-money' as PaymentMethod,
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'Pay via mobile money (MTN, Airtel, etc.)',
      isDisabled: true,
      comingSoonText: 'Coming Soon',
    },
    {
      id: 'paypal' as PaymentMethod,
      name: 'PayPal',
      icon: Wallet,
      description: 'Pay securely with PayPal',
      isDisabled: true,
      comingSoonText: 'Coming Soon',
    },
    {
      id: 'usdt' as PaymentMethod,
      name: 'USDT (TRC-20)',
      icon: Coins,
      description: 'Pay with USDT cryptocurrency',
      isDisabled: false,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    // Prevent selection of disabled payment methods
    const selectedMethod = paymentMethods.find(m => m.id === paymentMethod);
    if (selectedMethod?.isDisabled) {
      toast.error('This payment method is not yet available');
      return;
    }

    // Handle different payment methods
    if (paymentMethod === 'usdt') {
      setShowUSDTModal(true);
      return;
    }

    // For other payment methods, process payment
    try {
      await processPayment(paymentMethod, formData);
      toast.success('Reservation successful! Check your email for confirmation.');
      onClose();
      resetForm();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      console.error('Payment error:', error);
    }
  };

  const processPayment = async (method: PaymentMethod, data: typeof formData) => {
    // Send email notification
    await sendEmailNotification('reservation', {
      ...data,
      paymentMethod: method,
      amount: reservationAmount,
      tier: selectedTier?.name || 'VIP Reservation',
    });

    // Here you would integrate with actual payment processors
    // For now, we'll just simulate the payment
    console.log('Processing payment:', { method, data });
  };

  const sendEmailNotification = async (type: 'email' | 'reservation', data: any) => {
    try {
      // Try to use the email service endpoint if configured
      const endpoint = import.meta.env.VITE_EMAIL_API_ENDPOINT || '/api/send-email';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data,
          to: 'masikotimo@gmail.com',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email notification error:', error);
      // Don't fail the reservation if email fails
      // In production, you might want to queue this for retry
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '' });
    setPaymentMethod(null);
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
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedTier ? selectedTier.name : 'Reserve Your VIP Spot'}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedTier ? `Support amount: $${reservationAmount}` : `For just $${reservationAmount}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {/* Tier Benefits Section */}
                {selectedTier ? (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Crown className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-lg font-bold text-gray-900">{selectedTier.name} Benefits</h3>
                    </div>
                    <div className="space-y-2">
                      {selectedTier.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Crown className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-lg font-bold text-gray-900">Exclusive VIP Perks</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {VIP_PERKS.map((perk, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="+1234567890"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Payment Method *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <PaymentMethodCard
                          key={method.id}
                          icon={Icon}
                          name={method.name}
                          description={method.description}
                          isSelected={paymentMethod === method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          isDisabled={method.isDisabled}
                          comingSoonText={method.comingSoonText}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      ${reservationAmount}
                    </span>
                  </div>
                </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Skip for Now
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                    >
                      Complete Reservation
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By reserving, you agree to our terms and conditions. You can cancel anytime.
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <USDTModal
        isOpen={showUSDTModal}
        onClose={() => {
          setShowUSDTModal(false);
          onClose();
        }}
        formData={formData}
        amount={reservationAmount}
        onConfirm={async () => {
          await sendEmailNotification('reservation', {
            ...formData,
            paymentMethod: 'usdt',
            amount: reservationAmount,
            tier: selectedTier?.name || 'VIP Reservation',
          });
          toast.success('Reservation confirmed! We will verify your USDT payment and send confirmation.');
          setShowUSDTModal(false);
          onClose();
          resetForm();
        }}
      />
    </>
  );
};

export default ReservationModal;

