import { useState } from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { PAYMENT_CONFIG } from '../config/offers';

interface USDTModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onConfirm: () => void;
}

const USDTModal = ({ isOpen, onClose, formData, onConfirm }: USDTModalProps) => {
  const [copied, setCopied] = useState(false);
  const [hasSent, setHasSent] = useState(false);

  const walletAddress = PAYMENT_CONFIG.usdtWalletAddress;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success('Wallet address copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    if (!hasSent) {
      toast.error('Please confirm that you have sent the USDT payment');
      return;
    }
    onConfirm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">USDT TRC-20 Payment</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 font-medium mb-2">
                  ⚠️ Important Instructions
                </p>
                <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                  <li>Send exactly <strong>${PAYMENT_CONFIG.reservationAmount} USDT</strong> to the address below</li>
                  <li>Make sure to use <strong>TRC-20 network</strong> only</li>
                  <li>Copy the wallet address carefully</li>
                  <li>After sending, click "I have sent the payment" below</li>
                </ol>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  USDT TRC-20 Wallet Address
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={walletAddress}
                    readOnly
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Amount to Send</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${PAYMENT_CONFIG.reservationAmount} USDT
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Network</span>
                  <span className="text-sm font-semibold text-indigo-600">TRC-20</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasSent"
                  checked={hasSent}
                  onChange={(e) => setHasSent(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="hasSent" className="text-sm text-gray-700">
                  I have sent the payment of ${PAYMENT_CONFIG.reservationAmount} USDT to the address above
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!hasSent}
                  className="flex-1 px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Reservation
                </button>
              </div>

              <div className="text-center">
                <a
                  href={`https://tronscan.org/#/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Verify on TronScan
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default USDTModal;

