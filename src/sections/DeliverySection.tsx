import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Truck, CreditCard, Send, PackageCheck, Clock, Wallet, MessageCircle } from 'lucide-react';

export default function DeliverySection() {
  const ref = useScrollAnimation('fade-up', true);

  return (
    <section id="delivery" className="relative overflow-hidden bg-[var(--color-cream)] py-[clamp(60px,10vw,110px)]">
      {/* Декоративные пятна */}
      <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-[var(--color-blue)]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[var(--color-pink)]/10 blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[var(--color-dark)]">
            Доставка и <span className="text-[var(--color-pink)]">оплата</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-[var(--color-dark-muted)] mt-3 max-w-md mx-auto">
            Всё просто: заказ в Telegram, доставка по всей России
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
          {/* Delivery */}
          <div className="group relative bg-white rounded-3xl p-8 pt-10 shadow-[0_6px_24px_rgba(202,135,144,0.10)] hover:shadow-[0_16px_40px_rgba(202,135,144,0.18)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            {/* Цветная полоска сверху */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-blue)] to-[#CFE3F2]" />

            <div className="flex items-center gap-4 mb-7">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-blue)]/25 to-[var(--color-blue)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-7 h-7 text-[#6E9BBD]" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-[var(--color-dark)]">
                  Доставка
                </h3>
                <p className="font-body text-xs text-[var(--color-dark-muted)]">по всей России</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--color-blue)]/8 hover:bg-[var(--color-blue)]/15 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <PackageCheck className="w-5 h-5 text-[#6E9BBD]" />
                </div>
                <span className="font-body text-sm text-[var(--color-dark-muted)]">
                  <strong className="text-[var(--color-dark)] font-semibold">СДЭК</strong> — до пункта выдачи или курьером
                </span>
              </li>
              <li className="flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--color-blue)]/8 hover:bg-[var(--color-blue)]/15 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#6E9BBD]" />
                </div>
                <span className="font-body text-sm text-[var(--color-dark-muted)]">
                  Срок: <strong className="text-[var(--color-dark)] font-semibold">3–7 рабочих дней</strong>
                </span>
              </li>
              <li className="flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--color-blue)]/8 hover:bg-[var(--color-blue)]/15 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-5 h-5 text-[#6E9BBD]" />
                </div>
                <span className="font-body text-sm text-[var(--color-dark-muted)]">
                  Стоимость рассчитывается при заказе
                </span>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div className="group relative bg-white rounded-3xl p-8 pt-10 shadow-[0_6px_24px_rgba(202,135,144,0.10)] hover:shadow-[0_16px_40px_rgba(202,135,144,0.18)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-pink)] to-[#E5B5BC]" />

            <div className="flex items-center gap-4 mb-7">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-pink)]/25 to-[var(--color-pink)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-7 h-7 text-[var(--color-pink)]" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-[var(--color-dark)]">
                  Оплата
                </h3>
                <p className="font-body text-xs text-[var(--color-dark-muted)]">удобным способом</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--color-pink)]/8 hover:bg-[var(--color-pink)]/15 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-[var(--color-pink)]" />
                </div>
                <span className="font-body text-sm text-[var(--color-dark-muted)]">
                  Перевод на карту после согласования заказа
                </span>
              </li>
              <li className="flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--color-pink)]/8 hover:bg-[var(--color-pink)]/15 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[var(--color-pink)]" />
                </div>
                <span className="font-body text-sm text-[var(--color-dark-muted)]">
                  Все детали согласуем в <strong className="text-[var(--color-dark)] font-semibold">Telegram</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Telegram CTA */}
        <div className="mt-8 max-w-[960px] mx-auto">
          <div className="relative overflow-hidden flex flex-col sm:flex-row items-center gap-5 p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-[var(--color-pink)] to-[#D9A5AC] shadow-[0_10px_32px_rgba(202,135,144,0.35)]">
            <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
              <Send className="w-7 h-7 text-white" />
            </div>
            <p className="font-body text-sm sm:text-base text-white/95 text-center sm:text-left flex-1">
              Оформление заказа — через Telegram. Напишите нам, и мы поможем с выбором размера и ткани
            </p>
            <a
              href="https://t.me/dilishik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[var(--color-pink)] font-body text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              @dilishik
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
