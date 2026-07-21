import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import prodSlip from '@/assets/images/prod-slip.jpg';
import prodKidsClassic from '@/assets/images/prod-kids-classic.jpg';
import prodMom from '@/assets/images/prod-mom.jpg';
import prodDad from '@/assets/images/prod-dad.jpg';
import prodFamily1 from '@/assets/images/prod-family1.jpg';
import catalogVideo from '@/assets/video/catalog.MP4';

type CollectionType = 'video' | 'image';

interface Collection {
  type: CollectionType;
  src: string;
  title: string;
  subtitle: string;
}

const collections: Collection[] = [
  {
    type: 'video',
    src: catalogVideo,
    title: 'Летняя коллаборация',
    subtitle: 'с консультантом по сну Екатериной Николаевой и ее брендом "SWEET SLEEP"',
  },
  {
    type: 'image',
    src: prodSlip,
    title: 'Пижамы слип для малышей',
    subtitle: 'от 62 до 80 размера',
  },
  {
    type: 'image',
    src: prodKidsClassic,
    title: 'Классические пижамы для детей',
    subtitle: 'от 92 до 128 размера',
  },
  {
    type: 'image',
    src: prodMom,
    title: 'Пижамы для мам и пап',
    subtitle: 'по индивидуальным меркам',
  },
  {
    type: 'image',
    src: prodFamily1,
    title: 'Халаты',
    subtitle: 'махровые и шёлковые для всей семьи',
  },
  {
    type: 'image',
    src: prodDad,
    title: 'Постельное белье',
    subtitle: 'коллаборация с консультантом по сну Екатериной Николаевой и ее брендом "SWEET SLEEP"',
  },
];

export default function CollectionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollAnimation('fade-up', true);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth / 2;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="collections" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ЗАГОЛОВОК */}
        <div ref={headerRef} className="text-center mb-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 sm:w-20 bg-[var(--color-pink)]/30" />
            <div className="h-px w-12 sm:w-20 bg-[var(--color-pink)]/30" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold text-[var(--color-dark)] leading-tight">
            Коллекции
          </h2>
        </div>
        <p className="font-body text-base sm:text-lg text-[var(--color-dark-muted)] text-center max-w-md mx-auto mb-10 leading-relaxed">
          Каждая коллекция — история для вашего сна
        </p>

        {/* Карусель */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {collections.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[32vw] xl:w-[28vw] snap-start cursor-pointer group relative aspect-square overflow-hidden rounded-2xl"
              >
                {item.type === 'video' ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6 right-6 z-10">
                  <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold text-white leading-tight mb-2 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="font-body text-[clamp(0.75rem,1.5vw,0.875rem)] text-white/80 leading-relaxed drop-shadow-md">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* СТРЕЛКИ */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] hover:shadow-xl transition-all duration-300 z-10"
            aria-label="Предыдущая коллекция"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] hover:shadow-xl transition-all duration-300 z-10"
            aria-label="Следующая коллекция"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}