import { useState } from 'react';

// Извлекаем ID файла Google Drive из ссылки любого вида
export function driveIdFrom(url: string): string | null {
  const m =
    url.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

// Картинка из Google Drive с запасными вариантами загрузки:
// 1) drive.google.com/thumbnail (основной)
// 2) lh3.googleusercontent.com/d/ID (если thumbnail не сработал)
interface DriveImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  onFail?: () => void;
}

export default function DriveImage({ src, alt, className, lazy = true, onFail }: DriveImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    const id = driveIdFrom(currentSrc);
    if (id && !currentSrc.includes('lh3.googleusercontent.com')) {
      // Пробуем альтернативный хост Google
      setCurrentSrc(`https://lh3.googleusercontent.com/d/${id}=w1000`);
    } else {
      setFailed(true);
      onFail?.();
    }
  };

  if (failed) return null;

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={lazy ? 'lazy' : undefined}
      className={className}
      onError={handleError}
    />
  );
}
