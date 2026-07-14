import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Send } from 'lucide-react';

type Category = 'all' | 'baby' | 'kids' | 'mom';

interface Product {
  id: number;
  name: string;
  category: Category;
  categoryLabel: string;
  description: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Слип для малышей',
    category: 'baby',
    categoryLabel: 'Для малышей',
    description: 'Пижама-слип на кнопках, 100% хлопок. Размеры 62-80.',
    price: '5 300 ₽',
    image: '/images/prod-slip.jpg',
  },
  {
    id: 2,
    name: 'Классическая пижама',
    category: 'kids',
    categoryLabel: 'Для детей',
    description: 'Двухдетальная пижама: лонгслив + штанишки. Размеры 92-128.',
    price: '5 500 ₽',
    image: '/images/prod-kids-classic.jpg',
  },
  {
    id: 3,
    name: 'Пижама для мамы',
    category: 'mom',
    categoryLabel: 'Для мам',
    description: 'Индивидуальный пошив по вашим меркам. Любой размер.',
    price: '8 500 ₽',
    image: '/images/prod-mom.jpg',
  },
  {
    id: 4,
    name: 'Пижама для папы',
    category: 'mom',
    categoryLabel: 'Для пап',
    description: 'Комплект для папы: футболка + штаны. Индивидуальный пошив.',
    price: '8 500 ₽',
    image: '/images/prod-dad.jpg',
  },
  {
    id: 5,
    name: 'Family Look «Мама + Малыш»',
    category: 'baby',
    categoryLabel: 'Family Look',
    description: 'Одинаковые пижамы для мамы и малыша. Комплект.',
    price: '12 500 ₽',
    image: '/images/prod-family1.jpg',
  },
  {
    id: 6,
    name: 'Family Look «Папа + Ребёнок»',
    category: 'kids',
    categoryLabel: 'Family Look',
    description: 'Одинаковые пижамы для папы и ребёнка. Комплект.',
    price: '12 500 ₽',
    image: '/images/prod-family2.jpg',
  },
];

const filters: { key: Category; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'baby', label: 'Малыши' },
  { key: 'kids', label: 'Дети' },
  { key: 'mom', label: 'Мамы' },
];

export default function CatalogSection() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const ref = useScrollAnimation('fade-up', true);

  const filtered =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section id="catalog" className="bg-[var(--color-cream)] py-[clamp(60px,10vw,100px)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[var(--color-dark)] text-center mb-8">
          Каталог
        </h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                activeFilter === f.key
                  ? 'bg-[var(--color-pink)] text-white shadow-[0_4px_16px_rgba(202,135,144,0.3)]'
                  : 'bg-transparent border border-[var(--color-gray)] text-[var(--color-dark-muted)] hover:border-[var(--color-pink)] hover:text-[var(--color-pink)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(202,135,144,0.12)] hover:shadow-[0_8px_32px_rgba(202,135,144,0.2)] transition-all duration-300 hover:-translate-y-2"
            >
              {/* Category tag */}
              <div className="relative">
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[var(--color-blue)] text-white font-body text-xs font-medium">
                  {product.categoryLabel}
                </span>
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-body text-base font-semibold text-[var(--color-dark)] mb-1.5">
                  {product.name}
                </h3>
                <p className="font-body text-xs text-[var(--color-dark-muted)] mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-semibold text-[var(--color-pink)]">
                    {product.price}
                  </span>
                  <a
                    href={`https://t.me/dilishik?text=Здравствуйте! Хочу заказать: ${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--color-pink)] text-white font-body text-xs font-semibold hover:bg-[#b8737d] transition-colors duration-200"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Заказать
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
