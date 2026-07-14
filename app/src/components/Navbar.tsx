import { useState, useEffect } from 'react';
import { Menu, X, Send } from 'lucide-react';

const navLinks = [
  { label: 'Каталог', href: '#catalog' },
  { label: 'О нас', href: '#about' },
  { label: 'Доставка', href: '#delivery' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(255,249,240,0.95)] shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-md'
            : 'bg-[rgba(255,249,240,0.92)] backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Brand */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-pink)] tracking-wide"
            >
              ALDIEM
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="font-body text-[0.9375rem] font-medium text-[var(--color-dark)] hover:text-[var(--color-pink)] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="https://t.me/dilishik"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--color-pink)] text-white font-body text-sm font-semibold shadow-[0_4px_16px_rgba(202,135,144,0.3)] hover:shadow-[0_6px_20px_rgba(202,135,144,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                Заказать в Telegram
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[var(--color-dark)] hover:text-[var(--color-pink)] transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-[72px] left-0 right-0 z-40 bg-[var(--color-cream)] shadow-lg transition-all duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-body text-base font-medium text-[var(--color-dark)] hover:text-[var(--color-pink)] transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://t.me/dilishik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-pink)] text-white font-body text-sm font-semibold shadow-[0_4px_16px_rgba(202,135,144,0.3)] mt-2"
          >
            <Send className="w-4 h-4" />
            Заказать в Telegram
          </a>
        </div>
      </div>
    </>
  );
}
