import { Crown } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-kingdom-gold" />
              <span className="text-xl font-bold text-white">Kingdom Chronicles</span>
            </div>
            <p className="text-gray-400">
              An epic Bible-themed gaming platform combining faith, fun, and community.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-kingdom-gold transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#games" className="hover:text-kingdom-gold transition-colors">
                  Games
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-kingdom-gold transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Email: masikotimo@gmail.com</p>
            <p className="text-gray-400">For support and inquiries</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kingdom Chronicles. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-kingdom-gold transition-colors">Privacy Policy</a>
            {' • '}
            <a href="#" className="hover:text-kingdom-gold transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

