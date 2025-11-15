import { Toaster } from 'react-hot-toast';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import GamesSection from './components/GamesSection';
import ScreenshotCarousel from './components/ScreenshotCarousel';
import VIPBenefits from './components/VIPBenefits';
import PerksSection from './components/PerksSection';
import ReservationCTA from './components/ReservationCTA';
import FAQ from './components/FAQ';
import EmailSubscription from './components/EmailSubscription';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      <Toaster position="top-center" />
      <Hero />
      <AboutSection />
      <GamesSection />
      <ScreenshotCarousel />
      <VIPBenefits />
      <PerksSection />
      <ReservationCTA />
      <FAQ />
      <EmailSubscription />
      <Footer />
    </div>
  );
}

export default App;

