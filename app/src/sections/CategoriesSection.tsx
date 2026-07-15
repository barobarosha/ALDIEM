import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import catBaby from '@/assets/images/cat-baby.jpg';
import catKids from '@/assets/images/cat-kids.jpg';
import catMom from '@/assets/images/cat-mom.jpg';

const categories = [
  {
    title: 'Для малышей',
    description: 'Размеры 62-80',
    image: catBaby,
    bgColor: 'bg-[var(--color-blue)]/10',
  },
  {
    title: 'Для детей',
    description: 'Размеры 92-128',
    image: catKids,
    bgColor: 'bg-[var(--color-pink)]/10',
  },
  {
    title: 'Для мам и пап',
    description: 'Индивидуальный пошив',
    image: catMom,
    bgColor: 'bg-[var(--color-gray)]/10',
  },
];

export default function CategoriesSection() {
  const ref = useScrollAnimation('fade-up', true);

  return (
    <section className="bg-white py-[clamp(60px,10vw,100px)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[var(--color-dark)] text-center mb-12">
          Наши коллекции
        </h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href="#catalog"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group block rounded-[20px] overflow-hidden ${cat.bgColor} shadow-[0_4px_20px_rgba(202,135,144,0.12)] hover:shadow-[0_8px_32px_rgba(202,135,144,0.2)] transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-[var(--color-dark)] mb-1">
                  {cat.title}
                </h3>
                <p className="font-body text-sm text-[var(--color-dark-muted)]">
                  {cat.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
