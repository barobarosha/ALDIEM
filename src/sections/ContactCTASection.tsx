import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Send, ExternalLink } from 'lucide-react';

export default function ContactCTASection() {
  const ref = useScrollAnimation('fade-up');

  return (
    <section
      id="contacts"
      className="py-[clamp(60px,10vw,100px)]"
      style={{
        background: 'linear-gradient(135deg, #CA8790 0%, #AECEE5 100%)',
      }}
    >
      <div ref={ref} className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-white mb-6">
          Свяжитесь с нами
        </h2>
        <p className="font-body text-[clamp(1rem,2vw,1.125rem)] text-white/90 leading-relaxed mb-10 max-w-[560px] mx-auto">
          Все заказы принимаем через Telegram. Напишите нам — поможем выбрать размер,
          расскажем о тканях и оформим заказ!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://t.me/dilishik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-white text-[var(--color-pink)] font-body text-base font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
            Написать в Telegram
          </a>
        </div>

        <a
          href="https://t.me/aldiem_ru"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-6 font-body text-sm text-white/80 hover:text-white transition-colors duration-200 underline underline-offset-4"
        >
          Наш канал @aldiem_ru
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
