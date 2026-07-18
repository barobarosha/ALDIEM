import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import aboutSewing from '@/assets/images/about-sewing.jpg';
import sewingVideo from '@/assets/video/sewing.mp4';

export default function AboutSection() {
  const ref = useScrollAnimation('fade-up', true);

  return (
    <section id="about" className="bg-white py-[clamp(60px,10vw,100px)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Левая часть — ВИДЕО */}
          <div className="relative">
            <div className="rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] aspect-[4/5] bg-[var(--color-beige)]">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={aboutSewing}
                className="w-full h-full object-cover"
              >
                <source src={sewingVideo} type="video/mp4" />
                {/* Fallback на картинку если видео не поддерживается */}
                <img
                  src={aboutSewing}
                  alt="Процесс пошива ALDIEM"
                  className="w-full h-full object-cover"
                />
              </video>
            </div>
          </div>

          {/* Правая часть — ТЕКСТ */}
          <div ref={ref}>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[var(--color-dark)] mb-6">
              О бренде <span className="text-[var(--color-pink)]">ALDIEM</span>
            </h2>
            
            <div className="space-y-4 font-body text-[var(--color-dark-muted)] leading-relaxed">
              <p>
                ✨ Мы представляем вам уникальные пижамы, созданные с заботой к каждой детали. 
                Каждая отшивается вручную, чтобы вы получили не просто одежду, а настоящее произведение искусства.
              </p>
              <p>
                Мы уделяем особое внимание выбору тканей и фурнитуре — только натуральные материалы 
                и интересные расцветки, которые обеспечат комфорт и уют во время сна вашим малышам.
              </p>
              <p>
                Мы ценим каждого нашего маленького клиента и стремимся сделать сон малыша приятным и уютным.
              </p>
              <p className="text-[var(--color-pink)] font-medium italic pt-2">
                С любовью, ALDIEM 🤍
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}