import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Truck, CreditCard, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

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
    text: 'Пижама для мамы — моя любимая! Цвет нежный, ткань дышащая. И пошив идеальный.',
    rating: 5,
  },
  {
    name: 'Ксения',
    initials: 'К',
    text: 'Второй раз заказываю, всё на высшем уровне. Особенно радует индивидуальный подход!',
    rating: 5,
  },
];

export default function DeliveryReviewsSection() {
  const headerRef = useScrollAnimation('fade-up', true);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(reviews.length / 2);
  const topReview = reviews[page * 2];
  const bottomReview = reviews[page * 2 + 1];

  const nextPage = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="delivery-reviews" className="bg-[var(--color-beige)] py-16 sm:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ЗАГОЛОВОК */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 sm:w-20 bg-[var(--color-pink)]/30" />
            <div className="h-px w-12 sm:w-20 bg-[var(--color-pink)]/30" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold text-[var(--color-dark)] leading-tight">
            Доставка и отзывы
          </h2>
          <p className="font-body text-base sm:text-lg text-[var(--color-dark-muted)] max-w-md mx-auto mt-4 leading-relaxed">
            Как получить заказ и что говорят наши клиенты
          </p>
        </div>

        {/* ДВЕ КОЛОНКИ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* ЛЕВАЯ КОЛОНКА — Доставка + Оплата */}
          <div className="space-y-6">
            {/* Доставка */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(202,135,144,0.08)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[var(--color-blue)]/15 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[var(--color-blue)]" />
                </div>
                <h3 className="font-body text-lg font-semibold text-[var(--color-dark)]">
                  Доставка
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[var(--color-beige)]/50 rounded-xl">
                  <h4 className="font-body text-sm font-semibold text-[var(--color-dark)] mb-1">
                    По России
                  </h4>
                  <p className="font-body text-sm text-[var(--color-dark-muted)]">
                    Почта России, Яндекс, СДЭК
                  </p>
                  <p className="font-body text-xs text-[var(--color-dark-muted)]/60 mt-1">
                    Стоимость и сроки рассчитываются индивидуально
                  </p>
                </div>

                <div className="p-4 bg-[var(--color-beige)]/50 rounded-xl">
                  <h4 className="font-body text-sm font-semibold text-[var(--color-dark)] mb-1">
                    Москва и область
                  </h4>
                  <p className="font-body text-sm text-[var(--color-dark-muted)]">
                    Курьером — Достависта, Яндекс Доставка
                  </p>
                  <p className="font-body text-xs text-[var(--color-dark-muted)]/60 mt-1">
                    Стоимость рассчитывается в день отправки
                  </p>
                </div>
              </div>
            </div>

            {/* Оплата */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(202,135,144,0.08)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[var(--color-pink)]/15 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[var(--color-pink)]" />
                </div>
                <h3 className="font-body text-lg font-semibold text-[var(--color-dark)]">
                  Оплата
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-pink)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-body text-xs font-semibold text-white">1</span>
                  </span>
                  <p className="font-body text-sm text-[var(--color-dark-muted)] leading-relaxed">
                    <strong className="text-[var(--color-dark)]">50% предоплата</strong> при оформлении заказа
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-pink)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-body text-xs font-semibold text-white">2</span>
                  </span>
                  <p className="font-body text-sm text-[var(--color-dark-muted)] leading-relaxed">
                    Присылаем <strong className="text-[var(--color-dark)]">фото готового изделия</strong> для проверки
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-pink)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-body text-xs font-semibold text-white">3</span>
                  </span>
                  <p className="font-body text-sm text-[var(--color-dark-muted)] leading-relaxed">
                    <strong className="text-[var(--color-dark)]">Оплата остатка</strong> перед отправкой
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА — Отзывы (без белого фона, вертикально) */}
          <div className="flex flex-col">
            <h3 className="font-body text-lg font-semibold text-[var(--color-dark)] mb-6">
              Отзывы клиентов
            </h3>

            {/* Отзывы вертикально */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Верхний отзыв */}
              {topReview && (
                <div className="bg-[var(--color-beige)]/60 rounded-2xl p-6 flex-1 flex flex-col justify-center">
                  <Quote className="w-6 h-6 text-[var(--color-pink)]/40 mb-3" />
                  <p className="font-body text-sm sm:text-base text-[var(--color-dark)] leading-relaxed mb-4">
                    "{topReview.text}"
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[var(--color-pink)]/15 flex items-center justify-center">
                        <span className="font-body text-sm font-semibold text-[var(--color-pink)]">
                          {topReview.initials}
                        </span>
                      </div>
                      <span className="font-body text-sm font-medium text-[var(--color-dark)]">
                        {topReview.name}
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: topReview.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-[#F5C542] text-[#F5C542]" />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Нижний отзыв */}
              {bottomReview && (
                <div className="bg-[var(--color-beige)]/60 rounded-2xl p-6 flex-1 flex flex-col justify-center">
                  <Quote className="w-6 h-6 text-[var(--color-pink)]/40 mb-3" />
                  <p className="font-body text-sm sm:text-base text-[var(--color-dark)] leading-relaxed mb-4">
                    "{bottomReview.text}"
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[var(--color-pink)]/15 flex items-center justify-center">
                        <span className="font-body text-sm font-semibold text-[var(--color-pink)]">
                          {bottomReview.initials}
                        </span>
                      </div>
                      <span className="font-body text-sm font-medium text-[var(--color-dark)]">
                        {bottomReview.name}
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: bottomReview.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-[#F5C542] text-[#F5C542]" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Стрелки навигации */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={prevPage}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] hover:shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Точки-индикаторы */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === page ? 'bg-[var(--color-pink)] w-6' : 'bg-[var(--color-pink)]/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] hover:shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}