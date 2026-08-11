'use client';

import { useEffect, useRef, useState } from 'react';

const TITLE = 'TTRPG should feel like an adventure.';

const manifestoLines = [
  'Not like admin work.',
  'TWR exists to reduce the friction between you and the table.',
  'We bring together the tools that keep a session moving, without trying to replace the way you already organize your campaign.',
];

const icons = [
  ['wand', 'Spells'],
  ['sword-shield', 'Combat'],
  ['scroll', 'Notes'],
  ['backpack', 'Inventory'],
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
      { threshold: 0.28 }
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
    let interval;
    const startDelay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1;
        setTypedTitle(TITLE.slice(0, index));
        if (index >= TITLE.length) window.clearInterval(interval);
      }, 25);
    }, 520);

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

          <p className="eyebrow manifesto-eyebrow">WHY TWR EXISTS</p>

          <h2 className="dialog-title" aria-label={TITLE}>
            <span aria-hidden="true">{typedTitle}</span>
            <span className="type-caret" aria-hidden="true">▾</span>
          </h2>

          <div className="dialog-copy">
            {manifestoLines.map((line, index) => (
              <p key={line} style={{ '--reveal-delay': `${1.45 + index * 0.42}s` }}>
                {line}
              </p>
            ))}
          </div>

          <div className="manifesto-tools" aria-label="Tools for the table">
            <span className="manifesto-tools-label">TOOLS THAT STAY OUT OF THE WAY</span>
            <div className="manifesto-icon-row">
              {icons.map(([name, label], index) => (
                <div
                  className="manifesto-icon"
                  key={name}
                  style={{ '--icon-delay': `${2.55 + index * 0.12}s` }}
                >
                  <div className="manifesto-icon-frame">
                    <img src={`/assets/icons/${name}.png`} alt="" />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="manifesto-closing" style={{ '--reveal-delay': '3.15s' }}>
            Less tools fighting for your attention. <strong>More room for the story.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
