import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { parseCSV } from '@/lib/csv';
import DriveImage from '@/components/DriveImage';

type CollectionType = 'video' | 'image';

interface Collection {
  type: CollectionType;
  src: string;
  title: string;
  subtitle: string;
  filterName: string; // имя коллекции для фильтра каталога
}

// Fallback БЕЗ картинок — показывается только пока таблица не загрузилась.
// Старых зашитых медиа тут нет: все картинки/видео берутся только из таблицы.
const fallbackCollections: Collection[] = [
  { type: 'image', src: '', title: 'Летняя коллаборация', subtitle: 'с консультантом по сну Екатериной Николаевой и ее брендом "SWEET SLEEP"', filterName: 'Летняя коллаборация' },
  { type: 'image', src: '', title: 'Пижамы слип для малышей', subtitle: 'от 62 до 80 размера', filterName: 'Пижамы слип для малышей' },
  { type: 'image', src: '', title: 'Классические пижамы для детей', subtitle: 'от 92 до 128 размера', filterName: 'Классические пижамы для детей' },
  { type: 'image', src: '', title: 'Пижамы для мам и пап', subtitle: 'по индивидуальным меркам', filterName: 'Пижамы для мам и пап' },
  { type: 'image', src: '', title: 'Халаты', subtitle: 'махровые и шёлковые для всей семьи', filterName: 'Халаты' },
  { type: 'image', src: '', title: 'Постельное белье', subtitle: 'коллаборация с консультантом по сну Екатериной Николаевой и ее брендом "SWEET SLEEP"', filterName: 'Постельное белье' },
];

// URL Google Sheets CSV — лист «Коллекции»
// Колонки: title | subtitle | media (Google Drive ссылка на фото или видео) | filterName (имя фильтра коллекции в каталоге)
const COLLECTIONS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1JTHJw5EOgCRy5lHyCGuoclnvdenOREH1lWpejbMiKs8/gviz/tq?tqx=out:csv&sheet=Коллекции';

function convertDriveLink(url: string): string {
  if (!url || url === 'undefined' || url === 'null') return '';
  if (url.includes('thumbnail?id=')) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return url;
}

function isVideoUrl(url: string): boolean {
  return /\.(mp4|mov|webm|m4v)(\?|$)/i.test(url);
}



export default function CollectionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollAnimation('fade-up', true);
  const [collections, setCollections] = useState<Collection[]>(fallbackCollections);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(COLLECTIONS_SHEET_URL, { cache: 'no-store' });
        if (!response.ok) return;
        const csvText = await response.text();
        const rows = parseCSV(csvText).slice(1);

        const parsed: Collection[] = [];
        for (const cols of rows) {
          if (!cols[0] || cols[0] === 'title' || cols[0] === 'Название') continue;
          // Защита от битых строк: в названии не должно быть ссылок
          if (cols[0].includes('http')) continue;

          const media = cols[2] || '';
          parsed.push({
            title: cols[0],
            subtitle: cols[1] || '',
            type: isVideoUrl(media) ? 'video' : 'image',
            src: isVideoUrl(media) ? media : convertDriveLink(media),
            filterName: (cols[3] || cols[0]).trim(),
          });
        }

        if (parsed.length > 0) {
          setCollections(parsed);
        }
      } catch (error) {
        console.error('Error loading collections:', error);
        // Остаёмся на fallback
      }
    };

    fetchCollections();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth / 2;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const handleCollectionClick = (item: Collection) => {
    // Сообщаем каталогу, какой фильтр коллекции применить
    window.dispatchEvent(
      new CustomEvent('aldiem:set-collection', { detail: item.filterName })
    );
  };

  return (
    <section id="collections" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ЗАГОЛОВОК */}
        <div ref={headerRef} className="text-center mb-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 sm:w-20 bg-[var(--color-pink)]/30" />
            <div className="h-px w-12 sm:w-20 bg-[var(--color-pink)]/30" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold text-[var(--color-dark)] leading-tight">
            Коллекции
          </h2>
        </div>
        <p className="font-body text-base sm:text-lg text-[var(--color-dark-muted)] text-center max-w-md mx-auto mb-10 leading-relaxed">
          Каждая коллекция — история для вашего сна
        </p>

        {/* Карусель */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {collections.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCollectionClick(item)}
                className="flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[32vw] xl:w-[28vw] snap-start cursor-pointer group relative aspect-square overflow-hidden rounded-2xl"
              >
                {item.type === 'video' ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : item.src ? (
                  <DriveImage
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-pink)]/30 to-[var(--color-blue)]/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6 right-6 z-10">
                  <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold text-white leading-tight mb-2 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="font-body text-[clamp(0.75rem,1.5vw,0.875rem)] text-white/80 leading-relaxed drop-shadow-md">
                    {item.subtitle}
                  </p>
                </div>
                {/* Подсказка при наведении */}
                <div className="absolute bottom-6 left-6 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="px-4 py-2 bg-white/90 rounded-full font-body text-xs font-medium text-[var(--color-dark)] shadow-lg">
                    Смотреть товары
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* СТРЕЛКИ */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] hover:shadow-xl transition-all duration-300 z-10"
            aria-label="Предыдущая коллекция"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-pink)] hover:shadow-xl transition-all duration-300 z-10"
            aria-label="Следующая коллекция"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
