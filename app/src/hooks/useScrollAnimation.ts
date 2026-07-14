import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(
  animationType: 'fade-up' | 'scale-in' = 'fade-up',
  staggerChildren = false
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = staggerChildren
      ? el.children
      : el;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });

    if (animationType === 'fade-up') {
      tl.from(targets, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        stagger: staggerChildren ? 0.1 : 0,
      });
    } else if (animationType === 'scale-in') {
      tl.from(targets, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: 'power3.out',
        stagger: staggerChildren ? 0.1 : 0,
      });
    }

    return () => {
      tl.kill();
    };
  }, [animationType, staggerChildren]);

  return ref;
}
