'use client';

import { useEffect, useRef } from 'react';

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const range = (progress, start, end) => clamp((progress - start) / (end - start));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export default function ScrollHeader() {
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const hero = document.getElementById('top');
    if (!header || !hero) return;

    const update = () => {
      const rect = hero.getBoundingClientRect();
      const scrollable = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const travelled = Math.min(Math.max(-rect.top, 0), scrollable);
      const progress = travelled / scrollable;
      const visible = easeOut(range(progress, 0.28, 0.52));

      header.style.opacity = visible.toFixed(3);
      header.style.transform = `translate(-50%, ${(1 - visible) * -18}px)`;
      header.style.filter = `blur(${(1 - visible) * 7}px)`;
      header.style.pointerEvents = visible > 0.9 ? 'auto' : 'none';
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <header className="site-header site-header-reveal" ref={headerRef}>
      <a className="brand" href="#top" aria-label="TWR home">
        <img src="/assets/twr-logo.svg" alt="TWR" />
      </a>
      <nav aria-label="Primary navigation">
        <a href="#delver">Delver</a>
        <a href="#command-tower">Command Tower</a>
        <a href="https://www.instagram.com/commandtwr" target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <a className="header-cta" href="#delver">Open Delver</a>
    </header>
  );
}
