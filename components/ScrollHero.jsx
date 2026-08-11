'use client';

import { useEffect, useRef, useState } from 'react';

const DESKTOP_VIDEO = '/assets/hero-desktop.mp4';
const MOBILE_VIDEO = '/assets/hero-mobile.mp4';
const DESKTOP_POSTER = '/assets/hero-desktop-poster.jpg';
const MOBILE_POSTER = '/assets/hero-mobile-poster.png';

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const range = (progress, start, end) => clamp((progress - start) / (end - start));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export default function ScrollHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const ledeRef = useRef(null);
  const buttonsRef = useRef(null);
  const cueRef = useRef(null);
  const rafRef = useRef(null);
  const targetTimeRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 720px)');
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const setReveal = (node, value, distance = 28) => {
      if (!node) return;
      const eased = easeOut(value);
      node.style.opacity = eased.toFixed(3);
      node.style.transform = `translate3d(0, ${(1 - eased) * distance}px, 0)`;
    };

    const updateTarget = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const travelled = Math.min(Math.max(-rect.top, 0), scrollable);
      const progress = travelled / scrollable;

      if (video.duration) {
        targetTimeRef.current = progress * Math.max(video.duration - 0.04, 0);
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        [eyebrowRef.current, titleRef.current, ledeRef.current, buttonsRef.current].forEach((node) => {
          if (node) { node.style.opacity = '1'; node.style.transform = 'none'; }
        });
      } else {
        setReveal(eyebrowRef.current, range(progress, 0.07, 0.18), 18);
        setReveal(titleRef.current, range(progress, 0.12, 0.30), 40);
        setReveal(ledeRef.current, range(progress, 0.24, 0.40), 28);
        setReveal(buttonsRef.current, range(progress, 0.34, 0.49), 22);
      }

      if (cueRef.current) {
        cueRef.current.style.opacity = String(clamp(0.72 - progress * 2.2, 0, 0.72));
      }
    };

    const animate = () => {
      if (Number.isFinite(video.duration) && video.readyState >= 2) {
        const target = targetTimeRef.current;
        const current = video.currentTime;
        const next = current + (target - current) * 0.24;
        if (Math.abs(target - current) > 0.006) {
          try { video.currentTime = next; } catch (_) {}
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onLoaded = () => {
      updateTarget();
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget);
    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('canplay', onLoaded);

    updateTarget();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('canplay', onLoaded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isMobile]);

  return (
    <section className="hero-scroll" ref={sectionRef} id="top">
      <div className="hero-sticky">
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          ref={videoRef}
          className="hero-video"
          src={isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO}
          poster={isMobile ? MOBILE_POSTER : DESKTOP_POSTER}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="hero-shade" />
        <div className="hero-grain" />
        <div className="shell hero-copy">
          <p className="eyebrow hero-reveal" ref={eyebrowRef}>TWR · TABLETOP TOOLS</p>
          <h1 className="hero-reveal" ref={titleRef}>Make room<br />for the game.</h1>
          <p className="hero-lede hero-reveal" ref={ledeRef}>
            Tools for Dungeon Masters and players to keep the focus on the session, not the software.
          </p>
          <div className="button-row hero-reveal" ref={buttonsRef}>
            <a className="button button-primary" href="#command-tower">Download Command Tower</a>
            <a className="button button-ghost" href="#delver">Open Delver</a>
          </div>
        </div>
        <div className="scroll-cue" ref={cueRef} aria-hidden="true">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </div>
    </section>
  );
}
