import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type FabricType = 'all' | 'muslin' | 'satin' | 'flannel' | 'cotton';

interface Fabric {
  id: number;
  name: string;
  type: FabricType;
  typeLabel: string;
  description: string;
  image: string;
}

import prodSlip from '@/assets/images/prod-slip.jpg';
import prodKidsClassic from '@/assets/images/prod-kids-classic.jpg';
import prodMom from '@/assets/images/prod-mom.jpg';
import prodDad from '@/assets/images/prod-dad.jpg';

const fabrics: Fabric[] = [
  {
    id: 1,
    name: 'Пудровый розовый',
    type: 'muslin',
    typeLabel: 'Муслин',
    description: 'Нежный оттенок для малышей и мам. Мягкий, дышащий.',
    image: prodSlip,
  },
  {
    id: 2,
    name: 'Мятный',
    type: 'muslin',
    typeLabel: 'Муслин',
    description: 'Свежий цвет, идеален для летних пижам.',
    image: prodKidsClassic,
  },
  {
    id: 3,
    name: 'Кремовый',
    type: 'satin',
    typeLabel: 'Сатин',
    description: 'Классический бежевый, универсальный.',
    image: prodMom,
  },
  {
    id: 4,
    name: 'Лавандовый',
    type: 'satin',
    typeLabel: 'Сатин',
    description: 'Спокойный фиолетовый для детских снов.',
    image: prodDad,
  },
  {
    id: 5,
    name: 'Тёмно-синий',
    type: 'flannel',
    typeLabel: 'Фланель',
    description: 'Тёплый, плотный, для зимних пижам.',
    image: prodSlip,
  },
  {
    id: 6,
    name: 'Клетка красная',
    type: 'flannel',
    typeLabel: 'Фланель',
    description: 'Классическая клетка, Family Look.',
    image: prodKidsClassic,
  },
  {
    id: 7,
    name: 'Белый',
    type: 'cotton',
    typeLabel: 'Хлопок',
    description: 'Чистый белый, основа любой пижамы.',
    image: prodMom,
  },
  {
    id: 8,
    name: 'Серый меланж',
    type: 'cotton',
    typeLabel: 'Хлопок',
    description: 'Мягкий серый, практичный и стильный.',
    image: prodDad,
  },
];

const filters: { key: FabricType; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'muslin', label: 'Муслин' },
  { key: 'satin', label: 'Сатин' },
  { key: 'flannel', label: 'Фланель' },
  { key: 'cotton', label: 'Хлопок' },
];

export default function FabricsSection() {
  const [activeFilter, setActiveFilter] = useState<FabricType>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollAnimation('fade-up', true);

  const filtered =
    activeFilter === 'all'
      ? fabrics
      : fabrics.filter((f) => f.type === activeFilter);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.children[0]?.clientWidth || 400;
    el.scrollBy({ left: direction === 'left' ? -(cardWidth + 16) : cardWidth + 16, behavior: 'smooth' });
  };

  return (
    <section id="fabrics" className="bg-[var(--color-beige)] pt-0 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ЗАГОЛОВОК */}
        <div ref={headerRef} className="text-center mb-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 sm:w-20 bg-[var(--color-pink)]/30" />
            <div className="h-px w-12 sm:w-20 bg-[var(--color-pink)]/30" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold text-[var(--color-dark)] leading-tight">
            Ткани
          </h2>
        </div>

        {/* ПОДЗАГОЛОВОК */}
        <p className="font-body text-base sm:text-lg text-[var(--color-dark-muted)] text-center max-w-md mx-auto mb-6 leading-relaxed">
          Натуральные материалы для комфортного сна всей семьи
        </p>

        {/* СТАТИЧНЫЙ ТЕКСТ — призыв к действию */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-[0_2px_12px_rgba(202,135,144,0.15)]">
            <div className="w-2 h-2 rounded-full bg-[var(--color-pink)] animate-pulse" />
            <p className="font-body text-sm text-[var(--color-dark)]">
              Более 20 тканей в наличии — выберите и мы сшьём пижаму для вас
            </p>
          </div>
        </div>

        {/* ФИЛЬТРЫ */}
        <div className="flex flex-wrap items-center justify-center gap-1 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`relative px-4 py-2 font-body text-sm transition-all duration-300 ${
                activeFilter === f.key
                  ? 'text-[var(--color-dark)] font-semibold'
                  : 'text-[var(--color-dark-muted)] hover:text-[var(--color-dark)]'
              }`}
            >
              {f.label}
              {activeFilter === f.key && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[var(--color-pink)] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* КАРТОЧКИ */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-5"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {filtered.map((fabric) => (
              <div
                key={fabric.id}
                className="flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[32vw] xl:w-[28vw] aspect-[3/4] snap-start relative group overflow-hidden rounded-2xl cursor-pointer"
              >
                <img
                  src={fabric.image}
                  alt={fabric.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Текст поверх */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                    {fabric.typeLabel}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-2 leading-tight">
                    {fabric.name}
                  </h3>
                  <p className="font-body text-sm text-white/70 leading-relaxed max-w-[90%] mb-4">
                    {fabric.description}
                  </p>
                  
                  {/* КНОПКА ЗАКАЗАТЬ */}
                  <a
                    href="https://t.me/dilishik"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center w-full py-3 bg-white rounded-full font-body text-sm font-medium text-[var(--color-dark)] hover:bg-[var(--color-pink)] hover:text-white transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                  >
                    Заказать
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* СТРЕЛКИ */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] hover:shadow-xl transition-all duration-300 z-10"
            aria-label="Предыдущая ткань"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] hover:shadow-xl transition-all duration-300 z-10"
            aria-label="Следующая ткань"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}