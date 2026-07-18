import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import prodSlip from '@/assets/images/prod-slip.jpg';
import prodKidsClassic from '@/assets/images/prod-kids-classic.jpg';
import prodMom from '@/assets/images/prod-mom.jpg';
import prodDad from '@/assets/images/prod-dad.jpg';
import prodFamily1 from '@/assets/images/prod-family1.jpg';
import prodFamily2 from '@/assets/images/prod-family2.jpg';

const slides = [
  { image: prodSlip, alt: 'Слип для малышей' },
  { image: prodKidsClassic, alt: 'Классическая пижама' },
  { image: prodMom, alt: 'Пижама для мамы' },
  { image: prodDad, alt: 'Пижама для папы' },
  { image: prodFamily1, alt: 'Family Look' },
  { image: prodFamily2, alt: 'Family Look' },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Слайды — смещены вниз на высоту шапки */}
      <div className="absolute top-[72px] left-0 right-0 bottom-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Текст поверх — ровно по центру видимой области */}
      <div className="absolute top-[72px] left-0 right-0 bottom-0 flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold text-white leading-tight mb-4 drop-shadow-lg">
          Уютные пижамы
          <br />
          <span className="text-white/90">для всей семьи</span>
        </h1>
        <p className="font-body text-[clamp(1rem,2.5vw,1.25rem)] text-white/90 max-w-[600px] mb-8 drop-shadow-md">
          Каждая пижама — ручная работа, сделана с любовью нашими швейями
        </p>
        <a
          href="#catalog"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[var(--color-dark)] font-body font-semibold hover:bg-white/90 transition-all duration-300"
        >
          Смотреть каталог
        </a>
      </div>

      {/* Стрелки */}
      <button onClick={prev} className="absolute left-4 top-[calc(50%+36px)] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-[calc(50%+36px)] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Точки */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)} className={`h-2 rounded-full transition-all ${index === current ? 'bg-white w-6' : 'bg-white/50 w-2'}`} />
        ))}
      </div>
    </section>
  );
}