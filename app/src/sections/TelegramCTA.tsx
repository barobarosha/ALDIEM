import { Send } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function TelegramCTA() {
  const ref = useScrollAnimation('fade-up', true);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-pink)] to-[var(--color-pink)]/80 p-8 sm:p-12 lg:p-16 text-center"
        >
          {/* Декоративные элементы */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 leading-tight">
              Есть вопросы?
            </h2>
            <p className="font-body text-lg sm:text-xl text-white/90 mb-8 max-w-lg mx-auto">
              Напишите нам в Telegram — ответим за 5 минут и поможем выбрать идеальную пижаму
            </p>

            <a
              href="https://t.me/dilishik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-white rounded-full font-body text-base sm:text-lg font-semibold text-[var(--color-pink)] hover:bg-[var(--color-beige)] hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              Написать в Telegram
            </a>

            <p className="font-body text-sm text-white/70 mt-6">
              Работаем ежедневно с 10:00 до 22:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}