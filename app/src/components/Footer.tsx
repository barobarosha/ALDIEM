import { Send, Instagram } from 'lucide-react';

const navLinks = [
  { label: 'Коллекции', href: '#collections' },
  { label: 'Каталог', href: '#catalog' },
  { label: 'Ткани', href: '#fabrics' },
  { label: 'О нас', href: '#about' },
  { label: 'Доставка', href: '#delivery-reviews' },
  { label: 'Контакты', href: '#contacts' },
];

const catalogLinks = [
  { label: 'Для малышей', href: '#catalog' },
  { label: 'Для детей', href: '#catalog' },
  { label: 'Для мам', href: '#catalog' },
  { label: 'Для пап', href: '#catalog' },
  { label: 'Family Look', href: '#catalog' },
];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[var(--color-dark)] text-white pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl font-semibold text-[var(--color-pink)] mb-3">
              ALDIEM
            </h3>
            <p className="font-body text-sm text-[var(--color-gray)] leading-relaxed">
              Уютные пижамы для всей семьи. Ручной пошив из натуральных тканей.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-[var(--color-gray)] mb-4">
              Навигация
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="font-body text-sm text-white/80 hover:text-[var(--color-pink)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-[var(--color-gray)] mb-4">
              Каталог
            </h4>
            <ul className="space-y-2.5">
              {catalogLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="font-body text-sm text-white/80 hover:text-[var(--color-pink)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-[var(--color-gray)] mb-4">
              Контакты
            </h4>
            <div className="space-y-3">
              <a
                href="https://t.me/dilishik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-white/80 hover:text-[var(--color-pink)] transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
                @dilishik
              </a>
              <a
                href="https://t.me/aldiem_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-white/80 hover:text-[var(--color-pink)] transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
                @aldiem_ru
              </a>
              <a
                href="https://instagram.com/aldiem_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-white/80 hover:text-[var(--color-pink)] transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
                @aldiem_ru
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="font-body text-xs text-[var(--color-gray)]">
            &copy; 2025 ALDIEM. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}