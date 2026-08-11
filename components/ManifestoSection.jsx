'use client';

import { useEffect, useRef, useState } from 'react';

const iconNames = ['wand', 'sword-shield', 'scroll', 'backpack'];

export default function ManifestoSection({ copy }) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.28 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    setTypedTitle('');
    let index = 0;
    let interval;
    const startDelay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1;
        setTypedTitle(copy.title.slice(0, index));
        if (index >= copy.title.length) window.clearInterval(interval);
      }, 72);
    }, 1000);
    return () => {
      window.clearTimeout(startDelay);
      if (interval) window.clearInterval(interval);
    };
  }, [active, copy.title]);

  return (
    <section ref={sectionRef} className={`manifesto-section ${active ? 'is-active' : ''}`} id="manifesto">
      <div className="manifesto-bg" aria-hidden="true" />
      <div className="manifesto-vignette" aria-hidden="true" />
      <div className="shell manifesto-shell">
        <div className="crpg-dialog" role="region" aria-label={copy.eyebrow}>
          <span className="deco-corner deco-tl" aria-hidden="true" /><span className="deco-corner deco-tr" aria-hidden="true" />
          <span className="deco-corner deco-bl" aria-hidden="true" /><span className="deco-corner deco-br" aria-hidden="true" />
          <p className="eyebrow manifesto-eyebrow">{copy.eyebrow}</p>
          <h2 className="dialog-title" aria-label={copy.title}><span aria-hidden="true">{typedTitle}</span><span className="type-caret" aria-hidden="true">▾</span></h2>
          <div className="dialog-copy">
            {copy.lines.map((line, index) => <p key={line} style={{ '--reveal-delay': `${4.0 + index * 1.15}s` }}>{line}</p>)}
          </div>
          <div className="manifesto-tools">
            <span className="manifesto-tools-label">{copy.toolsLabel}</span>
            <div className="manifesto-icon-row">
              {iconNames.map((name, index) => (
                <div className="manifesto-icon" key={name} style={{ '--icon-delay': `${7.35 + index * 0.28}s` }}>
                  <div className="manifesto-icon-frame"><img src={`/assets/icons/${name}.png`} alt="" /></div>
                  <span>{copy.iconLabels[name]}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="manifesto-closing" style={{ '--reveal-delay': '8.7s' }}>{copy.closingStart} <strong>{copy.closingStrong}</strong></p>
        </div>
      </div>
    </section>
  );
}
