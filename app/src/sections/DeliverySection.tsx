import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Truck, CreditCard, Send } from 'lucide-react';

export default function DeliverySection() {
  const ref = useScrollAnimation('fade-up', true);

  return (
    <section id="delivery" className="bg-[var(--color-cream)] py-[clamp(60px,10vw,100px)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[var(--color-dark)] text-center mb-12">
          Доставка и <span className="text-[var(--color-pink)]">оплата</span>
        </h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {/* Delivery */}
          <div className="bg-white rounded-[20px] p-8 shadow-[0_4px_20px_rgba(202,135,144,0.12)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-[var(--color-blue)]/15 flex items-center justify-center">
                <Truck className="w-6 h-6 text-[var(--color-blue)]" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[var(--color-dark)]">
                Доставка
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-pink)] mt-2 flex-shrink-0" />
                <span className="font-body text-sm text-[var(--color-dark-muted)]">
                  <strong className="text-[var(--color-dark)]">СДЭК</strong> по всей России
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-pink)] mt-2 flex-shrink-0" />
                <span className="font-body text-sm text-[var(--color-dark-muted)]">
                  Срок: <strong className="text-[var(--color-dark)]">3-7 рабочих дней</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-pink)] mt-2 flex-shrink-0" />
                <span className="font-body text-sm text-[var(--color-dark-muted)]">
                  Стоимость: рассчитывается при заказе
                </span>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-[20px] p-8 shadow-[0_4px_20px_rgba(202,135,144,0.12)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-[var(--color-pink)]/15 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-[var(--color-pink)]" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[var(--color-dark)]">
                Оплата
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-blue)] mt-2 flex-shrink-0" />
                <span className="font-body text-sm text-[var(--color-dark-muted)]">
                  Перевод на карту после согласования заказа
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-blue)] mt-2 flex-shrink-0" />
                <span className="font-body text-sm text-[var(--color-dark-muted)]">
                  Оплата через <strong className="text-[var(--color-dark)]">Telegram</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Telegram note */}
        <div className="mt-8 max-w-[900px] mx-auto">
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-[var(--color-pink)]/10 border border-[var(--color-pink)]/30">
            <Send className="w-6 h-6 text-[var(--color-pink)] flex-shrink-0" />
            <p className="font-body text-sm text-[var(--color-dark)]">
              Оформление заказа — через Telegram{' '}
              <a
                href="https://t.me/dilishik"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-pink)] hover:underline"
              >
                @dilishik
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
