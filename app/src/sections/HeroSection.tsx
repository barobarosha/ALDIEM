import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Send, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          '.hero-subtitle',
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          '.hero-buttons',
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          '.hero-image',
          {
            opacity: 0,
            y: 40,
            scale: 0.97,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-[72px]"
      style={{
        background: 'linear-gradient(135deg, var(--color-beige) 0%, var(--color-cream) 100%)',
      }}
    >
      {/* Floating decorations */}
      <svg
        className="absolute top-[15%] left-[8%] w-16 h-16 sm:w-24 sm:h-24 text-[var(--color-blue)] opacity-20 animate-float"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20,50 Q30,20 50,50 T80,50" strokeLinecap="round" />
        <path d="M30,60 Q40,30 60,60 T90,60" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute top-[25%] right-[10%] w-12 h-12 sm:w-20 sm:h-20 text-[var(--color-pink)] opacity-15 animate-float-delayed"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20,50 Q35,15 55,45 T85,50" strokeLinecap="round" />
        <path d="M15,65 Q30,35 50,65 T80,65" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute bottom-[20%] left-[15%] w-10 h-10 sm:w-16 sm:h-16 text-[var(--color-blue)] opacity-15 animate-float-slow"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M25,45 Q40,20 60,45 T90,45" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute bottom-[30%] right-[8%] w-14 h-14 sm:w-18 sm:h-18 text-[var(--color-pink)] opacity-15 animate-float"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M15,50 Q30,25 50,50 T85,50" strokeLinecap="round" />
      </svg>

      <div ref={contentRef} className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="hero-title font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold text-[var(--color-dark)] leading-tight mb-6">
          Уютные пижамы
          <br />
          <span className="text-[var(--color-pink)]">для всей семьи</span>
        </h1>

        <p className="hero-subtitle font-body text-[clamp(1rem,2.5vw,1.25rem)] text-[var(--color-dark-muted)] max-w-[560px] mx-auto mb-8 leading-relaxed">
          Ручной пошив из натуральных тканей. Для малышей, детей и мам.
          Индивидуальные мерки — без доплаты.
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#catalog"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--color-pink)] text-white font-body font-semibold shadow-[0_4px_16px_rgba(202,135,144,0.3)] hover:shadow-[0_6px_20px_rgba(202,135,144,0.4)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <ChevronDown className="w-5 h-5" />
            Смотреть каталог
          </a>
          <a
            href="https://t.me/dilishik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[var(--color-pink)] text-[var(--color-pink)] font-body font-semibold hover:bg-[var(--color-pink)] hover:text-white transition-all duration-300"
          >
            <Send className="w-5 h-5" />
            Написать в Telegram
          </a>
        </div>

        {/* Hero image */}
        <div className="hero-image relative max-w-[700px] mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(202,135,144,0.15)]">
            <img
              src="/images/hero-lifestyle.jpg"
              alt="Уютные пижамы ALDIEM"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
