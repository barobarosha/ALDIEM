import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import catalogBg from '@/assets/images/catalog.jpg';

type Category = 'all' | 'baby' | 'kids' | 'mom' | 'dad' | 'in-stock' | 'sale' | 'robes' | 'bedding';

type StockStatus = 'in-stock' | 'pre-order';

interface Product {
  id: number;
  name: string;
  category: Category;
  stockStatus: StockStatus;
  price: string;
  image: string;
  description: string;
}

const filters: { key: Category; label: string }[] = [
  { key: 'sale', label: 'Скидки' },
  { key: 'all', label: 'Все' },
  { key: 'in-stock', label: 'В наличии' },
  { key: 'baby', label: 'Малыши' },
  { key: 'kids', label: 'Дети' },
  { key: 'mom', label: 'Мамы' },
  { key: 'dad', label: 'Папы' },
  { key: 'robes', label: 'Халаты' },
  { key: 'bedding', label: 'Постельное бельё' },
];

// Преобразование Google Drive ссылки в thumbnail
function convertDriveLink(url: string): string {
  if (!url || url === 'undefined' || url === 'null') return '';
  
  // Если уже thumbnail — оставляем
  if (url.includes('thumbnail?id=')) return url;
  
  // Извлекаем ID из разных форматов Google Drive
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  
  // Если уже прямая ссылка на изображение
  if (url.startsWith('http') && (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png'))) {
    return url;
  }
  
  return url;
}

// URL Google Sheets CSV
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1JTHJw5EOgCRy5lHyCGuoclnvdenOREH1lWpejbMiKs8/gviz/tq?tqx=out:csv&sheet=Каталог';

export default function CatalogSection() {
  const [activeFilter, setActiveFilter] = useState<Category>('sale');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollAnimation('fade-up', true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        const rows = csvText.split('\n').slice(1);
        
        const parsedProducts: Product[] = [];
        
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (!row.trim() || !row.includes('"')) continue;
          
          const cols = row.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
          
          // Пропускаем пустые строки и заголовки
          if (!cols[0] || !cols[1] || cols[1] === 'name' || cols[0] === 'id') {
            continue;
          }
          
          parsedProducts.push({
            id: parseInt(cols[0]) || i + 1,
            name: cols[1],
            category: (cols[2] as Category) || 'all',
            price: cols[3] ? `${cols[3]} ₽` : '',
            image: convertDriveLink(cols[4] || ''),
            stockStatus: (cols[5] as StockStatus) || 'pre-order',
            description: cols[6] || '',
          });
        }
        
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = activeFilter === 'all' 
    ? products 
    : products.filter((p) => p.category === activeFilter);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth / 2;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const getStockLabel = (status: StockStatus) => {
    return status === 'in-stock' ? 'В наличии' : 'Под заказ';
  };

  const getStockStyle = (status: StockStatus) => {
    return status === 'in-stock'
      ? 'bg-[var(--color-beige)] text-[var(--color-dark)]'
      : 'bg-[var(--color-gray)] text-white';
  };

  if (loading) {
    return (
      <section id="catalog" className="relative">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[var(--color-pink)] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="relative">
      {/* ФОНОВАЯ КАРТИНКА */}
      <div className="absolute inset-0 h-[75%]">
        <img 
          src={catalogBg} 
          alt="Каталог ALDIEM" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      {/* КОНТЕНТ */}
      <div className="relative z-10">
        {/* ЗАГОЛОВОК */}
        <div className="pt-24 pb-4">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={headerRef} className="text-center mb-4">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 sm:w-20 bg-white/40" />
                <div className="h-px w-12 sm:w-20 bg-white/40" />
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold text-white drop-shadow-lg leading-tight">
                Каталог
              </h2>
            </div>
            <p className="font-body text-base sm:text-lg text-white/80 text-center max-w-md mx-auto mb-10 leading-relaxed drop-shadow-md">
              Коллекция пижам для всей семьи
            </p>
          </div>
        </div>

        {/* ФИЛЬТРЫ */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-wrap items-center justify-center gap-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`relative px-4 py-2 font-body text-sm transition-all duration-300 ${
                  activeFilter === f.key
                    ? 'text-white font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {f.label}
                {activeFilter === f.key && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* КАРТОЧКИ */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-8">
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filtered.map((product, index) => (
                <div
                  key={`product-${product.id}-${index}`}
                  className="flex-shrink-0 w-[calc(50%-10px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] snap-start cursor-pointer group"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 rounded-xl mb-3">
                    {/* НАКЛЕЙКА СТАТУСА */}
                    <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full font-body text-xs font-medium ${getStockStyle(product.stockStatus)}`}>
                      {getStockLabel(product.stockStatus)}
                    </div>
                    
                    {/* КАРТИНКА */}
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          console.error('Image failed:', product.image);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400 text-xs">Нет фото</span>
                      </div>
                    )}
                    
                    {/* КНОПКА ЗАКАЗАТЬ */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-6">
                      <a
                        href="https://t.me/dilishik"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-6 py-2.5 bg-white rounded-full font-body text-sm font-medium text-[var(--color-dark)] hover:bg-[var(--color-pink)] hover:text-white shadow-lg"
                      >
                        Заказать
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-body text-sm text-[var(--color-dark)] group-hover:text-[var(--color-pink)] transition-colors leading-tight">
                      {product.name}
                    </h3>
                    <p className="font-body text-sm text-[var(--color-dark-muted)] mt-1">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* СТРЕЛКИ */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-2 sm:-left-4 top-1/3 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] hover:shadow-xl transition-all duration-300 z-10"
              aria-label="Предыдущий товар"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute -right-2 sm:-right-4 top-1/3 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] hover:shadow-xl transition-all duration-300 z-10"
              aria-label="Следующий товар"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ПЛАВНЫЙ ПЕРЕХОД К ТКАНЯМ */}
      <div className="h-16 sm:h-20 bg-gradient-to-b from-white to-[var(--color-beige)]" />
    </section>
  );
}