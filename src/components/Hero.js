import React, { useEffect, useRef } from 'react';
import ThreeScene from './ThreeScene';
import './Hero.css';

export default function Hero() {
  const titleRef = useRef(null);

  useEffect(() => {
    const lines = titleRef.current?.querySelectorAll('.hero__line-inner');
    if (!lines) return;
    lines.forEach((el, i) => {
      el.style.transitionDelay = `${0.8 + i * 0.15}s`;
      el.classList.add('hero__line-inner--in');
    });
  }, []);

  return (
    <section className="hero" id="hero">
      <ThreeScene />

      <div className="hero__content">
        <span className="hero__eyebrow reveal">French · Gen X · Web Engineer</span>

        <h1 className="hero__title" ref={titleRef}>
          <span className="hero__line">
            <span className="hero__line-inner">I craft</span>
          </span>
          <span className="hero__line">
            <span className="hero__line-inner hero__line-inner--italic">digital</span>
          </span>
          <span className="hero__line">
            <span className="hero__line-inner">worlds.</span>
          </span>
        </h1>

        <div className="hero__meta">
          <p className="hero__desc reveal">
            Self-taught designer & developer with 15+ years of experience creating
            high-quality, user-friendly websites and web applications.
          </p>
          <div className="hero__scroll reveal">
            <span className="hero__scroll-line" />
            <span className="hero__scroll-label">Scroll</span>
          </div>
        </div>
      </div>

      <div className="hero__location reveal">
        <span>Based in</span>
        <strong>France</strong>
      </div>
    </section>
  );
}
