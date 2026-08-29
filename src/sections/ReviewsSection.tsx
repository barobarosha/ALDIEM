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

const avatarGradients = [
  'from-[#CA8790] to-[#E5B5BC]',
  'from-[#AECEE5] to-[#CFE3F2]',
  'from-[#D9A5AC] to-[#F0CDD2]',
  'from-[#9FBFD9] to-[#C4D9EB]',
  'from-[#C97582] to-[#E3ABB4]',
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
    <section id="reviews" className="relative overflow-hidden bg-gradient-to-b from-[var(--color-beige)] via-[#FBF3F0] to-[var(--color-cream)] py-[clamp(60px,10vw,110px)]">
      {/* Декоративные пятна */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[var(--color-pink)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-blue)]/15 blur-3xl" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[var(--color-pink)]/20 mb-5">
            <Star className="w-3.5 h-3.5 fill-[#F5C542] text-[#F5C542]" />
            <span className="font-body text-xs font-medium tracking-wide text-[var(--color-dark-muted)] uppercase">
              5.0 — средняя оценка
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[var(--color-dark)]">
            Отзывы наших <span className="text-[var(--color-pink)]">клиентов</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-[var(--color-dark-muted)] mt-3 max-w-md mx-auto">
            Мамы делятся впечатлениями о наших пижамах
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={() => scroll('left')}
            aria-label="Предыдущий отзыв"
            className={`absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-dark)] transition-all duration-200 ${
              canScrollLeft
                ? 'opacity-100 hover:bg-[var(--color-pink)] hover:text-white'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Следующий отзыв"
            className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-dark)] transition-all duration-200 ${
              canScrollRight
                ? 'opacity-100 hover:bg-[var(--color-pink)] hover:text-white'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-6 pt-2 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, i) => (
              <div
                key={i}
                className="group relative flex-shrink-0 w-[300px] sm:w-[350px] snap-start bg-white/90 backdrop-blur rounded-3xl p-7 border border-white shadow-[0_6px_24px_rgba(202,135,144,0.10)] hover:shadow-[0_16px_40px_rgba(202,135,144,0.22)] hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Кавычка-декор */}
                <Quote className="absolute top-5 right-6 w-10 h-10 text-[var(--color-pink)]/15 group-hover:text-[var(--color-pink)]/25 transition-colors" />

                {/* Звёзды */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#F5C542] text-[#F5C542]" />
                  ))}
                </div>

                <p className="font-body text-sm text-[var(--color-dark)] leading-relaxed mb-6 min-h-[72px]">
                  {review.text}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-pink)]/10">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center shadow-inner`}
                  >
                    <span className="font-body text-sm font-bold text-white drop-shadow-sm">
                      {review.initials}
                    </span>
                  </div>
                  <div>
                    <span className="block font-body text-sm font-semibold text-[var(--color-dark)]">
                      {review.name}
                    </span>
                    <span className="block font-body text-xs text-[var(--color-dark-muted)]">
                      Покупатель ALDIEM
                    </span>
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
