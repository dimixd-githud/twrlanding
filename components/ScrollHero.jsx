'use client';

import { useEffect, useRef, useState } from 'react';

const DESKTOP_VIDEO = '/assets/hero-desktop.mp4';
const MOBILE_VIDEO = '/assets/hero-mobile.mp4';
const DESKTOP_POSTER = '/assets/hero-desktop-poster.jpg';
const MOBILE_POSTER = '/assets/hero-mobile-poster.png';

export default function ScrollHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
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

    const updateTarget = () => {
      const section = sectionRef.current;
      if (!section || !video.duration) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const travelled = Math.min(Math.max(-rect.top, 0), scrollable);
      const progress = travelled / scrollable;
      targetTimeRef.current = progress * Math.max(video.duration - 0.04, 0);
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
          <p className="eyebrow">TWR · TABLETOP TOOLS</p>
          <h1>Make room<br />for the game.</h1>
          <p className="hero-lede">
            Tools for Dungeon Masters and players to keep the focus on the session, not the software.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#command-tower">Download Command Tower</a>
            <a className="button button-ghost" href="#delver">Open Delver</a>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </div>
    </section>
  );
}
