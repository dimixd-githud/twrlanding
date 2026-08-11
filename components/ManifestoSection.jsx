'use client';

import { useEffect, useRef, useState } from 'react';

const TITLE = 'TTRPG should feel like an adventure.';

const manifestoLines = [
  'Not like admin work.',
  'TWR exists to reduce the friction between you and the table.',
  'We bring together the tools that keep a session moving, without trying to replace the way you already organize your campaign.',
];

const icons = [
  ['scroll', 'Notes'],
  ['backpack', 'Inventory'],
  ['wand', 'Spells'],
  ['sword-shield', 'Combat'],
];

export default function ManifestoSection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setActive(true);
      setTypedTitle(TITLE);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setTypedTitle(TITLE);
      return;
    }

    let index = 0;
    let interval = null;
    const startDelay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1;
        setTypedTitle(TITLE.slice(0, index));
        if (index >= TITLE.length && interval) window.clearInterval(interval);
      }, 27);
    }, 360);

    return () => {
      window.clearTimeout(startDelay);
      if (interval) window.clearInterval(interval);
    };
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className={`manifesto-section ${active ? 'is-active' : ''}`}
      id="manifesto"
    >
      <div className="manifesto-bg" aria-hidden="true" />
      <div className="manifesto-vignette" aria-hidden="true" />

      <div className="shell manifesto-shell">
        <div className="crpg-dialog" role="region" aria-label="Why TWR exists">
          <span className="deco-corner deco-tl" aria-hidden="true" />
          <span className="deco-corner deco-tr" aria-hidden="true" />
          <span className="deco-corner deco-bl" aria-hidden="true" />
          <span className="deco-corner deco-br" aria-hidden="true" />

          <div className="manifesto-icon-row" aria-hidden="true">
            {icons.map(([name, label]) => (
              <div className="manifesto-icon" key={name}>
                <img src={`/assets/icons/${name}.png`} alt="" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p className="eyebrow manifesto-eyebrow">WHY TWR EXISTS</p>
          <h2 className="dialog-title">
            {typedTitle}
            <span className="type-caret" aria-hidden="true">▾</span>
          </h2>

          <div className="dialog-copy">
            {manifestoLines.map((line, index) => (
              <p key={line} style={{ '--reveal-delay': `${1.25 + index * 0.42}s` }}>
                {line}
              </p>
            ))}
          </div>

          <p className="manifesto-closing" style={{ '--reveal-delay': '2.58s' }}>
            Less tools fighting for your attention. <strong>More room for the story.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
