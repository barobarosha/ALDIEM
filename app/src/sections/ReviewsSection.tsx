import { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Анна',
    initials: 'А',
    text: 'Пижама для дочки просто чудо! Ткань невероятно мягкая, швы аккуратные. Закажем ещё для себя ❤️',
    rating: 5,
  },
  {
    name: 'Елена',
    initials: 'Е',
    text: 'Индивидуальный пошив — это бомба! Наконец-то пижама, которая идеально сидит. Спасибо!',
    rating: 5,
  },
  {
    name: 'Марина',
    initials: 'М',
    text: 'Family look для всей семьи — лучшая покупка! Все довольны, качество на высоте.',
    rating: 5,
  },
  {
    name: 'Ольга',
    initials: 'О',
    text: 'Заказывала слип для сына. Качество ткани превосходное, ребёнку очень удобно. Буду заказывать ещё!',
    rating: 5,
  },
  {
    name: 'Дарина',
    initials: 'Д',
    text: 'Пижама для мамы — моя любимая! Цвет нежный, ткань дышащая. И пошив идеальный, как будто шили только для меня.',
    rating: 5,
  },
];

export default function ReviewsSection() {
  const titleRef = useScrollAnimation('fade-up');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="bg-[var(--color-beige)] py-[clamp(60px,10vw,100px)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[var(--color-dark)]">
            Отзывы наших <span className="text-[var(--color-pink)]">клиентов</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 ${
              canScrollLeft
                ? 'opacity-100 hover:bg-[var(--color-pink)] hover:text-white'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 ${
              canScrollRight
                ? 'opacity-100 hover:bg-[var(--color-pink)] hover:text-white'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[320px] sm:w-[360px] bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(202,135,144,0.12)]"
              >
                <Quote className="w-8 h-8 text-[var(--color-pink)]/30 mb-3" />
                <p className="font-body text-sm text-[var(--color-dark)] leading-relaxed italic mb-5">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-pink)]/15 flex items-center justify-center">
                      <span className="font-body text-sm font-semibold text-[var(--color-pink)]">
                        {review.initials}
                      </span>
                    </div>
                    <span className="font-body text-sm font-semibold text-[var(--color-dark)]">
                      {review.name}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-[#F5C542] text-[#F5C542]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
