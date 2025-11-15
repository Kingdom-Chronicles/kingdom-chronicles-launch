import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is VIP Early Access?',
      answer: 'VIP Early Access gives you the opportunity to play Kingdom Chronicles before the public launch. You\'ll get exclusive perks, early access to features, and special rewards.',
    },
    {
      question: 'How much does the reservation cost?',
      answer: 'The reservation fee is just $1. This secures your spot on the VIP Early Access list and unlocks all VIP benefits.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Visa/Mastercard, Mobile Money (MTN, Airtel, etc.), PayPal, and USDT (TRC-20). All payments are secure and processed through trusted payment gateways.',
    },
    {
      question: 'When will the game launch?',
      answer: 'We\'re working hard to bring Kingdom Chronicles to you soon. VIP members will be notified first when we\'re ready to launch. Stay tuned for updates!',
    },
    {
      question: 'Can I cancel my reservation?',
      answer: 'Yes, you can cancel your reservation at any time. However, please note that cancellation policies may vary depending on the payment method used.',
    },
    {
      question: 'What happens after I reserve?',
      answer: 'After reserving, you\'ll receive a confirmation email. You\'ll be added to our VIP Early Access list and will receive updates, exclusive content, and early access when the game launches.',
    },
    {
      question: 'Are there any age restrictions?',
      answer: 'Kingdom Chronicles is designed for all ages. However, some payment methods may have age restrictions. Please check with your payment provider.',
    },
    {
      question: 'How do I get updates?',
      answer: 'We\'ll send updates to the email address you provide during reservation. You can also subscribe to our email list for additional updates and news.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about VIP Early Access
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 py-4 text-gray-600 border-t border-gray-100"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

