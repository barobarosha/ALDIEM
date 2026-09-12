import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Send, RotateCcw } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { parseCSV, normalizeValue } from '@/lib/csv';
import DriveImage from '@/components/DriveImage';
import catalogBg from '@/assets/images/catalog.jpg';

type Category = 'all' | 'baby' | 'kids' | 'mom' | 'in-stock' | 'sale' | 'robes' | 'bedding';

type StockStatus = 'in-stock' | 'pre-order';

interface Product {
  id: number;
  name: string;
  categories: Category[];
  stockStatus: StockStatus;
  price: string;
  oldPrice: string;
  image: string;
  description: string;
  sizes: string[];
  gender: string;
  collection: string;
  fabric: string;
}

const filters: { key: Category; label: string }[] = [
  { key: 'sale', label: 'Скидки' },
  { key: 'all', label: 'Все' },
  { key: 'in-stock', label: 'В наличии' },
  { key: 'baby', label: 'Малыши' },
  { key: 'kids', label: 'Дети' },
  { key: 'mom', label: 'Мамы' },
  { key: 'robes', label: 'Халаты' },
  { key: 'bedding', label: 'Постельное бельё' },
];

// Преобразование Google Drive ссылки в thumbnail
function convertDriveLink(url: string): string {
  if (!url || url === 'undefined' || url === 'null') return '';
  if (url.includes('thumbnail?id=')) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  if (url.startsWith('http') && (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png'))) {
    return url;
  }
  return url;
}

// Разбор размеров: поддержка "62-80" (диапазон шаг 6), "62,68,74" (список), "62"
function parseSizes(raw: string): string[] {
  if (!raw) return [];
  const result: string[] = [];
  const parts = raw.split(/[,;]+/).map(s => s.trim()).filter(Boolean);
  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*[-–]\s*(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1]);
      const end = parseInt(rangeMatch[2]);
      for (let s = start; s <= end; s += 6) {
        result.push(String(s));
      }
      if (!result.includes(String(end))) result.push(String(end));
    } else if (/^\d+$/.test(part)) {
      result.push(part);
    } else {
      result.push(part); // текстовые размеры: "one size", "S/M" и т.п.
    }
  }
  return [...new Set(result)];
}

// URL Google Sheets CSV
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1JTHJw5EOgCRy5lHyCGuoclnvdenOREH1lWpejbMiKs8/gviz/tq?tqx=out:csv&sheet=Каталог';

export default function CatalogSection() {
  const [activeFilter, setActiveFilter] = useState<Category>('sale');
  const [sizeFilter, setSizeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [collectionFilter, setCollectionFilter] = useState('');
  const [fabricFilter, setFabricFilter] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollAnimation('fade-up', true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        const rows = parseCSV(csvText).slice(1);

        const parsedProducts: Product[] = [];

        for (let i = 0; i < rows.length; i++) {
          const cols = rows[i];

          // Пропускаем пустые строки и заголовки
          if (!cols[0] || !cols[1] || cols[1] === 'name' || cols[0] === 'id') {
            continue;
          }

          parsedProducts.push({
            id: parseInt(cols[0]) || i + 1,
            name: cols[1],
            categories: (cols[2] || 'all')
              .split(/[,;]+/)
              .map((s) => s.trim().toLowerCase() as Category)
              .filter((s) => s) || ['all'],
            price: cols[3] ? `${cols[3]} ₽` : '',
            oldPrice: cols[4] ? `${cols[4]} ₽` : '',
            image: convertDriveLink(cols[5] || ''),
            stockStatus: (cols[6] as StockStatus) || 'pre-order',
            description: cols[7] || '',
            sizes: parseSizes(cols[8] || ''),
            gender: cols[9] || '',
            collection: cols[10] || '',
            fabric: cols[11] || '',
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

  // Актуальные значения фильтра коллекций — для сопоставления с кликом из блока "Коллекции"
  const collectionOptionsRef = useRef<string[]>([]);

  // Слушаем событие выбора коллекции из блока "Коллекции"
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = ((e as CustomEvent<string>).detail || '').trim();
      // Ищем точное значение среди имеющихся в каталоге (без учёта регистра/пробелов)
      const canonical =
        collectionOptionsRef.current.find(
          (opt) => normalizeValue(opt) === normalizeValue(detail)
        ) || detail;
      setCollectionFilter(canonical);
      setActiveFilter('all');
      document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('aldiem:set-collection', handler);
    return () => window.removeEventListener('aldiem:set-collection', handler);
  }, []);

  // Опции фильтров из реальных данных
  const sizeOptions = useMemo(
    () => [...new Set(products.flatMap(p => p.sizes))].sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0)),
    [products]
  );
  const genderOptions = useMemo(() => [...new Set(products.map(p => p.gender).filter(Boolean))], [products]);
  const collectionOptions = useMemo(() => [...new Set(products.map(p => p.collection).filter(Boolean))], [products]);
  const fabricOptions = useMemo(() => [...new Set(products.map(p => p.fabric).filter(Boolean))], [products]);

  // Держим ref актуальным для обработчика события коллекций
  useEffect(() => {
    collectionOptionsRef.current = collectionOptions;
  }, [collectionOptions]);

  const hasAdvancedFilters = sizeFilter || genderFilter || collectionFilter || fabricFilter;

  const filtered = products.filter(p => {
    if (activeFilter !== 'all' && !p.categories.includes(activeFilter)) return false;
    if (sizeFilter && !p.sizes.includes(sizeFilter)) return false;
    if (genderFilter && normalizeValue(p.gender) !== normalizeValue(genderFilter)) return false;
    if (collectionFilter && normalizeValue(p.collection) !== normalizeValue(collectionFilter)) return false;
    if (fabricFilter && normalizeValue(p.fabric) !== normalizeValue(fabricFilter)) return false;
    return true;
  });

  const resetAdvancedFilters = () => {
    setSizeFilter('');
    setGenderFilter('');
    setCollectionFilter('');
    setFabricFilter('');
  };

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

  // Блокируем скролл страницы при открытом поп-апе
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProduct]);

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

        {/* ФИЛЬТРЫ КАТЕГОРИЙ */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-4">
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

        {/* РАСШИРЕННЫЕ ФИЛЬТРЫ */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <FilterSelect
              label="Размер"
              value={sizeFilter}
              onChange={setSizeFilter}
              options={sizeOptions}
            />
            <FilterSelect
              label="Пол"
              value={genderFilter}
              onChange={setGenderFilter}
              options={genderOptions}
            />
            <FilterSelect
              label="Коллекция"
              value={collectionFilter}
              onChange={setCollectionFilter}
              options={collectionOptions}
            />
            <FilterSelect
              label="Ткань"
              value={fabricFilter}
              onChange={setFabricFilter}
              options={fabricOptions}
            />
            {hasAdvancedFilters && (
              <button
                onClick={resetAdvancedFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 font-body text-xs text-white hover:bg-white/20 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Сбросить
              </button>
            )}
          </div>
        </div>

        {/* КАРТОЧКИ */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-8">
          <div className="relative">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-body text-[var(--color-dark-muted)]">
                  По выбранным фильтрам товары не найдены
                </p>
                {hasAdvancedFilters && (
                  <button
                    onClick={resetAdvancedFilters}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--color-pink)] text-white font-body text-sm font-medium hover:bg-[#b8737d] transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Сбросить фильтры
                  </button>
                )}
              </div>
            ) : (
              <>
                <div
                  ref={scrollRef}
                  className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {filtered.map((product, index) => (
                    <div
                      key={`product-${product.id}-${index}`}
                      onClick={() => setSelectedProduct(product)}
                      className="flex-shrink-0 w-[calc(50%-10px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] snap-start cursor-pointer group"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 rounded-xl mb-3">
                        {/* НАКЛЕЙКА СТАТУСА */}
                        <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full font-body text-xs font-medium ${getStockStyle(product.stockStatus)}`}>
                          {getStockLabel(product.stockStatus)}
                        </div>

                        {/* КАРТИНКА */}
                        {product.image ? (
                          <DriveImage
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400 text-xs">Нет фото</span>
                          </div>
                        )}

                        {/* КНОПКА ЗАКАЗАТЬ */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-6">
                          <span className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-6 py-2.5 bg-white rounded-full font-body text-sm font-medium text-[var(--color-dark)] shadow-lg">
                            Подробнее
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-body text-sm text-[var(--color-dark)] group-hover:text-[var(--color-pink)] transition-colors leading-tight">
                          {product.name}
                        </h3>
                        <p className="font-body text-sm mt-1">
                          {product.oldPrice ? (
                            <>
                              <span className="text-[var(--color-gray)] line-through mr-2">{product.oldPrice}</span>
                              <span className="text-[var(--color-pink)] font-medium">{product.price}</span>
                            </>
                          ) : (
                            <span className="text-[var(--color-dark-muted)]">{product.price}</span>
                          )}
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* ПЛАВНЫЙ ПЕРЕХОД К ТКАНЯМ */}
      <div className="h-16 sm:h-20 bg-gradient-to-b from-white to-[var(--color-beige)]" />

      {/* ПОП-АП ТОВАРА */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

// ===================== ФИЛЬТР-ВЫПАДАЙКА =====================
function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none pl-4 pr-8 py-2 rounded-full font-body text-xs sm:text-sm border backdrop-blur-sm cursor-pointer transition-all focus:outline-none ${
          value
            ? 'bg-white text-[var(--color-dark)] border-white font-medium'
            : 'bg-white/10 text-white/90 border-white/30 hover:bg-white/20'
        }`}
      >
        <option value="" className="text-[var(--color-dark)]">{label}: все</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-[var(--color-dark)]">
            {opt}
          </option>
        ))}
      </select>
      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rotate-90 pointer-events-none text-current opacity-60" />
    </div>
  );
}

// ===================== ПОП-АП ТОВАРА =====================
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const telegramText = encodeURIComponent(
    `Здравствуйте! Хочу заказать: ${product.name}${product.sizes.length ? ` (размеры: ${product.sizes.join(', ')})` : ''}`
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Фото */}
          <div className="aspect-[3/4] sm:aspect-auto sm:min-h-[420px] bg-gray-100 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none overflow-hidden">
            {product.image ? (
              <DriveImage
                src={product.image}
                alt={product.name}
                lazy={false}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-sm">Нет фото</span>
              </div>
            )}
          </div>

          {/* Информация */}
          <div className="p-6 sm:p-8 flex flex-col">
            {/* Статус */}
            <span
              className={`self-start px-3 py-1 rounded-full font-body text-xs font-medium mb-3 ${
                product.stockStatus === 'in-stock'
                  ? 'bg-[var(--color-beige)] text-[var(--color-dark)]'
                  : 'bg-[var(--color-gray)] text-white'
              }`}
            >
              {product.stockStatus === 'in-stock' ? 'В наличии' : 'Под заказ'}
            </span>

            <h3 className="font-display text-2xl font-semibold text-[var(--color-dark)] leading-tight mb-2">
              {product.name}
            </h3>

            <p className="font-display mb-5">
              {product.oldPrice && (
                <span className="text-lg text-[var(--color-gray)] line-through mr-3">{product.oldPrice}</span>
              )}
              <span className="text-2xl font-semibold text-[var(--color-pink)]">{product.price}</span>
            </p>

            {/* Характеристики */}
            <div className="space-y-2 mb-5">
              {product.sizes.length > 0 && (
                <div className="flex gap-2">
                  <span className="font-body text-xs text-[var(--color-dark-muted)] w-20 flex-shrink-0 pt-0.5">Размеры:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-[var(--color-blue)]/20 font-body text-xs text-[var(--color-dark)] border border-[var(--color-blue)]/30">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.gender && (
                <div className="flex gap-2">
                  <span className="font-body text-xs text-[var(--color-dark-muted)] w-20 flex-shrink-0">Пол:</span>
                  <span className="font-body text-xs text-[var(--color-dark)]">{product.gender}</span>
                </div>
              )}
              {product.collection && (
                <div className="flex gap-2">
                  <span className="font-body text-xs text-[var(--color-dark-muted)] w-20 flex-shrink-0">Коллекция:</span>
                  <span className="font-body text-xs text-[var(--color-dark)]">{product.collection}</span>
                </div>
              )}
              {product.fabric && (
                <div className="flex gap-2">
                  <span className="font-body text-xs text-[var(--color-dark-muted)] w-20 flex-shrink-0">Ткань:</span>
                  <span className="font-body text-xs text-[var(--color-dark)]">{product.fabric}</span>
                </div>
              )}
            </div>

            {/* Описание */}
            {product.description && (
              <p className="font-body text-sm text-[var(--color-dark-muted)] leading-relaxed mb-6 flex-1">
                {product.description}
              </p>
            )}

            {/* Кнопка заказа */}
            <a
              href={`https://t.me/dilishik?text=${telegramText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-pink)] text-white font-body text-sm font-semibold shadow-[0_4px_16px_rgba(202,135,144,0.3)] hover:bg-[#b8737d] hover:shadow-[0_6px_20px_rgba(202,135,144,0.4)] transition-all mt-auto"
            >
              <Send className="w-4 h-4" />
              Заказать
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
