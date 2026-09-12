import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Truck, CreditCard, ChevronLeft, ChevronRight, Quote, Star, MapPin, Building2, Camera, Wallet, BadgePercent } from 'lucide-react';

const reviews = [
  {
    name: 'Покупатель',
    initials: 'М',
    text: 'Добрый вечер! Забрали сегодня пижаму — ребёнок в восторге! И я тоже) хочу такую же',
    rating: 5,
  },
  {
    name: 'Покупатель',
    initials: 'А',
    text: 'Заказывали пижамку с мишками для сына (3 года). Он был в полном восторге! Пижамка очень яркая, красивая, и ткань качественная. Теперь укладываться спать стало гораздо приятнее! Спасибо вам!',
    rating: 5,
  },
  {
    name: 'Покупатель',
    initials: 'О',
    text: 'Обожаю вашу пижаму! Лучшая из всех, какие у нас были',
    rating: 5,
  },
  {
    name: 'Покупатель',
    initials: 'К',
    text: 'Качество прекрасное',
    rating: 5,
  },
  {
    name: 'Покупатель',
    initials: 'Д',
    text: 'Только эту пижамку дочка не хочет снимать! Долго выбирала, мне как дизайнеру, важен стиль и качество, поэтому мой выбор пал на @aldiem_ru',
    rating: 5,
  },
];

const avatarGradients = [
  'from-[#CA8790] to-[#E5B5BC]',
  'from-[#8FB4D4] to-[#C4D9EB]',
  'from-[#D9A5AC] to-[#F0CDD2]',
  'from-[#9FBFD9] to-[#AECEE5]',
  'from-[#C97582] to-[#E3ABB4]',
  'from-[#B78FA8] to-[#DCC2D2]',
];

function ReviewCard({ review, index }: { review: (typeof reviews)[number]; index: number }) {
  return (
    <div className="group relative bg-white rounded-3xl p-6 sm:p-7 flex-1 flex flex-col border border-white shadow-[0_6px_24px_rgba(202,135,144,0.10)] hover:shadow-[0_14px_36px_rgba(202,135,144,0.20)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Декор-кавычка */}
      <Quote className="absolute top-5 right-6 w-9 h-9 text-[var(--color-pink)]/15 group-hover:text-[var(--color-pink)]/25 transition-colors" />

      {/* Звёзды */}
      <div className="flex gap-1 mb-3.5">
        {Array.from({ length: review.rating }).map((_, j) => (
          <Star key={j} className="w-4 h-4 fill-[#F5C542] text-[#F5C542]" />
        ))}
      </div>

      <p className="font-body text-sm sm:text-[15px] text-[var(--color-dark)] leading-relaxed mb-5">
        {review.text}
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-pink)]/10 mt-auto">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]} flex items-center justify-center flex-shrink-0`}
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
  );
}

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
    <section id="delivery-reviews" className="relative overflow-hidden bg-gradient-to-b from-[var(--color-beige)] via-[#FBF3F0] to-[var(--color-beige)] py-16 sm:py-24">
      {/* Декоративные пятна */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[var(--color-pink)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-blue)]/15 blur-3xl" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ЗАГОЛОВОК */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[var(--color-pink)]/20 mb-5">
            <Star className="w-3.5 h-3.5 fill-[#F5C542] text-[#F5C542]" />
            <span className="font-body text-xs font-medium tracking-wide text-[var(--color-dark-muted)] uppercase">
              5.0 — средняя оценка клиентов
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold text-[var(--color-dark)] leading-tight">
            Доставка и <span className="text-[var(--color-pink)]">отзывы</span>
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
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-[0_6px_24px_rgba(202,135,144,0.10)] hover:shadow-[0_14px_36px_rgba(202,135,144,0.16)] transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-blue)] to-[#CFE3F2]" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-blue)]/30 to-[var(--color-blue)]/10 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#6E9BBD]" />
                </div>
                <div>
                  <h3 className="font-body text-lg font-semibold text-[var(--color-dark)]">
                    Доставка
                  </h3>
                  <p className="font-body text-xs text-[var(--color-dark-muted)]">по всей России</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--color-blue)]/10 hover:bg-[var(--color-blue)]/15 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#6E9BBD]" />
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-[var(--color-dark)] mb-0.5">
                      По России
                    </h4>
                    <p className="font-body text-sm text-[var(--color-dark-muted)]">
                      Почта России, Яндекс, СДЭК
                    </p>
                    <p className="font-body text-xs text-[var(--color-dark-muted)]/70 mt-1">
                      Стоимость и сроки рассчитываются индивидуально
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--color-blue)]/10 hover:bg-[var(--color-blue)]/15 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-[#6E9BBD]" />
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-[var(--color-dark)] mb-0.5">
                      Москва и область
                    </h4>
                    <p className="font-body text-sm text-[var(--color-dark-muted)]">
                      Курьером — Достависта, Яндекс Доставка
                    </p>
                    <p className="font-body text-xs text-[var(--color-dark-muted)]/70 mt-1">
                      Стоимость рассчитывается в день отправки
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Оплата */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-[0_6px_24px_rgba(202,135,144,0.10)] hover:shadow-[0_14px_36px_rgba(202,135,144,0.16)] transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-pink)] to-[#E5B5BC]" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-pink)]/30 to-[var(--color-pink)]/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[var(--color-pink)]" />
                </div>
                <div>
                  <h3 className="font-body text-lg font-semibold text-[var(--color-dark)]">
                    Оплата
                  </h3>
                  <p className="font-body text-xs text-[var(--color-dark-muted)]">в три простых шага</p>
                </div>
              </div>

              <div className="relative space-y-4">
                {/* Соединительная линия шагов */}
                <div className="absolute left-[17px] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--color-pink)]/40 to-[var(--color-pink)]/10" />

                <div className="relative flex items-start gap-4">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-pink)] to-[#D9A5AC] flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(202,135,144,0.35)]">
                    <BadgePercent className="w-4 h-4 text-white" />
                  </span>
                  <p className="font-body text-sm text-[var(--color-dark-muted)] leading-relaxed pt-2">
                    <strong className="text-[var(--color-dark)] font-semibold">50% предоплата</strong> при оформлении заказа
                  </p>
                </div>
                <div className="relative flex items-start gap-4">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-pink)] to-[#D9A5AC] flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(202,135,144,0.35)]">
                    <Camera className="w-4 h-4 text-white" />
                  </span>
                  <p className="font-body text-sm text-[var(--color-dark-muted)] leading-relaxed pt-2">
                    Присылаем <strong className="text-[var(--color-dark)] font-semibold">фото готового изделия</strong> для проверки
                  </p>
                </div>
                <div className="relative flex items-start gap-4">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-pink)] to-[#D9A5AC] flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(202,135,144,0.35)]">
                    <Wallet className="w-4 h-4 text-white" />
                  </span>
                  <p className="font-body text-sm text-[var(--color-dark-muted)] leading-relaxed pt-2">
                    <strong className="text-[var(--color-dark)] font-semibold">Оплата остатка</strong> перед отправкой
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА — Отзывы */}
          <div className="flex flex-col">
            <h3 className="font-body text-lg font-semibold text-[var(--color-dark)] mb-6">
              Отзывы клиентов
            </h3>

            <div className="flex-1 flex flex-col gap-5">
              {topReview && <ReviewCard review={topReview} index={page * 2} />}
              {bottomReview && <ReviewCard review={bottomReview} index={page * 2 + 1} />}
            </div>

            {/* Стрелки навигации */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={prevPage}
                aria-label="Предыдущие отзывы"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--color-dark)] hover:bg-[var(--color-pink)] hover:text-white hover:shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Точки-индикаторы */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Страница отзывов ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === page ? 'bg-[var(--color-pink)] w-6' : 'bg-[var(--color-pink)]/30 w-2 hover:bg-[var(--color-pink)]/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                aria-label="Следующие отзывы"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--color-dark)] hover:bg-[var(--color-pink)] hover:text-white hover:shadow-lg transition-all"
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
