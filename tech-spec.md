# Техническая спецификация — ALDIEM

## Зависимости

| Пакет | Версия | Назначение |
|-------|--------|------------|
| `react` | ^19.0 | UI фреймворк |
| `react-dom` | ^19.0 | DOM рендеринг |
| `react-router-dom` | ^7.0 | Маршрутизация |
| `gsap` | ^3.12 | Анимации, ScrollTrigger |
| `lenis` | ^1.2 | Плавный скролл |
| `lucide-react` | ^0.400 | Иконки |
| `tailwind-merge` | ^2.6 | Утилиты классов |
| `clsx` | ^2.1 | Условные классы |

## Компоненты

### Layout
| Компонент | Источник | Описание |
|-----------|----------|----------|
| `Navbar` | Custom | Фиксированная навигация с блюром, мобильное меню |
| `Footer` | Custom | 4-колоночный футер |
| `Layout` | Custom | Обертка: Lenis + Navbar + Outlet + Footer |

### Sections (Home)
| Компонент | Использует | Анимации |
|-----------|-----------|----------|
| `HeroSection` | — | fade-up stagger, плавающие SVG декорации |
| `CategoriesSection` | `CategoryCard` | fade-up stagger |
| `CatalogSection` | `ProductCard`, `FilterTabs` | fade-up, фильтр категорий (JS state) |
| `AboutSection` | `FeatureItem` | fade-up |
| `WhyChooseSection` | `FeatureCard` | scale-in stagger |
| `DeliverySection` | — | fade-up |
| `ReviewsSection` | `ReviewCard` | carousel горизонтальный |
| `ContactCTASection` | — | fade-up |

### Переиспользуемые
| Компонент | Источник | Описание |
|-----------|----------|----------|
| `PillButton` | Custom | 2 варианта: filled (pink) + outlined |
| `ProductCard` | Custom | hover-эффекты (lift + shadow + image scale) |
| `CategoryCard` | Custom | hover-эффекты |
| `ReviewCard` | Custom | карточка отзыва |
| `FeatureCard` | Custom | иконка + заголовок + описание |
| `FilterTabs` | Custom | переключение категорий каталога |
| `FloatingDecorations` | Custom | SVG петельки, floating animation CSS keyframes |

## Анимации (GSAP)

| Анимация | Триггер | Параметры |
|----------|---------|-----------|
| fade-up | scroll (ScrollTrigger) | opacity 0→1, y:40→0, duration 0.7, ease power3.out |
| stagger | scroll | дети с delay 0.1s |
| scale-in | scroll | scale 0.95→1, opacity 0→1, duration 0.6 |
| card-hover | hover | y:-8px, shadow transition 0.3s, img scale 1.03 |
| floating-decor | mount | CSS keyframes, infinite slow drift |
| page-load | mount | nav fade 0.3s → hero stagger 0.5s |

## State

- Фильтр каталога: `activeFilter` ("all" | "baby" | "kids" | "mom") — React state в CatalogSection
- Мобильное меню: `mobileMenuOpen` — React state в Navbar

## Хуки

- `useLenis` — инициализация Lenis, синхронизация с GSAP ScrollTrigger
- `useScrollAnimation` — обертка для fade-up/scale-in анимаций через GSAP ScrollTrigger

## Роутинг

Единственная страница — Home. Все секции на одной странице с якорной навигацией. Роутер не критичен, но подключен для масштабируемости.

## Изображения

Все изображения — статические assets в `/public/images/`. Имена соответствуют ID из design.md.
