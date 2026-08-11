'use client';

import { useEffect, useRef } from 'react';

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const range = (progress, start, end) => clamp((progress - start) / (end - start));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle className="instagram-dot" cx="17.55" cy="6.65" r="1" />
    </svg>
  );
}

export default function ScrollHeader({ lang, copy, alternateLocale, alternateLabel, instagramUrl }) {
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
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  return (
    <header className="site-header site-header-reveal" ref={headerRef}>
      <a className="brand" href={`/${lang}#top`} aria-label="TWR home"><img src="/assets/twr-logo.svg" alt="TWR" /></a>
      <nav aria-label="Primary navigation">
        <a href="#manifesto">{copy.manifesto}</a>
        <a href="#delver">{copy.delver}</a>
        <a href="#command-tower">{copy.command}</a>
      </nav>
      <div className="header-actions">
        <a className="language-switch" href={`/${alternateLocale}`} aria-label={`Switch language to ${alternateLabel}`}>
          <span className="language-current">{lang === 'pt-BR' ? 'PT' : 'EN'}</span><span className="language-divider">/</span><span>{alternateLabel}</span>
        </a>
        <a className="instagram-link" href={instagramUrl} target="_blank" rel="noreferrer" aria-label={copy.instagram}><InstagramIcon /></a>
      </div>
    </header>
  );
}
