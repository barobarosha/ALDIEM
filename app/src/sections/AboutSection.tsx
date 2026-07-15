import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Leaf, Heart, Ruler } from 'lucide-react';
import aboutSewing from '@/assets/images/about-sewing.jpg';

const features = [
  {
    icon: Leaf,
    title: '100% хлопок',
    description: 'Натуральные ткани',
  },
  {
    icon: Heart,
    title: 'Ручной пошив',
    description: 'С любовью к деталям',
  },
  {
    icon: Ruler,
    title: 'Индивидуальные мерки',
    description: 'Без доплаты',
  },
];

export default function AboutSection() {
  const ref = useScrollAnimation('fade-up', true);

  return (
    <section id="about" className="bg-[var(--color-beige)] py-[clamp(60px,10vw,100px)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(202,135,144,0.15)]">
              <img
                src={aboutSewing}
                alt="Ручной пошив пижам ALDIEM"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={ref}>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[var(--color-dark)] mb-6">
              О бренде <span className="text-[var(--color-pink)]">ALDIEM</span>
            </h2>
            <p className="font-body text-[clamp(1rem,2vw,1.125rem)] text-[var(--color-dark-muted)] leading-relaxed mb-8">
              Мы шьём пижамы с любовью к деталям. Каждая модель создаётся вручную из
              натурального хлопка — мягкого, дышащего и приятного к телу. Верим, что
              качественный сон начинается с удобной пижамы. Индивидуальный пошив по вашим
              меркам — наш особый подход к каждому клиенту.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm"
                >
                  <f.icon className="w-8 h-8 mx-auto mb-2 text-[var(--color-pink)]" />
                  <p className="font-body text-xs sm:text-sm font-semibold text-[var(--color-dark)]">
                    {f.title}
                  </p>
                  <p className="font-body text-[10px] sm:text-xs text-[var(--color-dark-muted)] mt-0.5">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
