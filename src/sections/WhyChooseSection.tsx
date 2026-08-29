import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Sparkles, Ruler, Truck, Heart } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Натуральные ткани',
    description: 'Только 100% хлопок высшего качества. Мягкий, дышащий, гипоаллергенный.',
    bgColor: 'bg-[var(--color-blue)]/10',
    iconColor: 'text-[var(--color-blue)]',
  },
  {
    icon: Ruler,
    title: 'Индивидуальный пошив',
    description: 'Шьём по вашим меркам без дополнительной платы. Идеальная посадка гарантирована.',
    bgColor: 'bg-[var(--color-pink)]/10',
    iconColor: 'text-[var(--color-pink)]',
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'Отправляем СДЭК по всей России. Срок доставки 3-7 рабочих дней.',
    bgColor: 'bg-[var(--color-blue)]/10',
    iconColor: 'text-[var(--color-blue)]',
  },
  {
    icon: Heart,
    title: 'Семейный look',
    description: 'Одинаковые пижамы для всей семьи. Создавайте тёплые семейные традиции.',
    bgColor: 'bg-[var(--color-pink)]/10',
    iconColor: 'text-[var(--color-pink)]',
  },
];

export default function WhyChooseSection() {
  const ref = useScrollAnimation('scale-in', true);

  return (
    <section className="bg-white py-[clamp(60px,10vw,100px)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[var(--color-dark)] text-center mb-12">
          Почему выбирают <span className="text-[var(--color-pink)]">нас</span>
        </h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className={`${f.bgColor} rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/80 flex items-center justify-center">
                <f.icon className={`w-7 h-7 ${f.iconColor}`} />
              </div>
              <h3 className="font-body text-base font-semibold text-[var(--color-dark)] mb-2">
                {f.title}
              </h3>
              <p className="font-body text-sm text-[var(--color-dark-muted)] leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
