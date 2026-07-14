import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import CategoriesSection from '@/sections/CategoriesSection';
import CatalogSection from '@/sections/CatalogSection';
import AboutSection from '@/sections/AboutSection';
import WhyChooseSection from '@/sections/WhyChooseSection';
import DeliverySection from '@/sections/DeliverySection';
import ReviewsSection from '@/sections/ReviewsSection';
import ContactCTASection from '@/sections/ContactCTASection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all content is loaded
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeout);
    ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <CatalogSection />
        <AboutSection />
        <WhyChooseSection />
        <DeliverySection />
        <ReviewsSection />
        <ContactCTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
