import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import CollectionsSection from '@/sections/CollectionsSection';
import CatalogSection from '@/sections/CatalogSection';
import FabricsSection from '@/sections/FabricsSection';
import AboutSection from '@/sections/AboutSection';
import DeliveryReviewsSection from '@/sections/DeliveryReviewsSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <CollectionsSection />
        <CatalogSection />
        <FabricsSection />
        <AboutSection />
        <DeliveryReviewsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;