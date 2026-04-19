import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <p className="footer__name">Sébastien Lempens</p>
          <p className="footer__copy">© {year} — All rights reserved</p>
        </div>
        <div className="footer__center">
          <p className="footer__quote">
            "Crafted with curiosity &amp; code."
          </p>
        </div>
        <nav className="footer__right" aria-label="Social links">
          <a href="https://twitter.com/s_lempens" target="_blank" rel="noreferrer" className="footer__link">Twitter</a>
          <a href="https://github.com/sebastien-lempens" target="_blank" rel="noreferrer" className="footer__link">GitHub</a>
          <a href="https://www.linkedin.com/in/sebastien-lempens-78114143" target="_blank" rel="noreferrer" className="footer__link">LinkedIn</a>
        </nav>
      </div>
      <div className="footer__big-text" aria-hidden="true">
        <span>S. Lempens</span>
      </div>
    </footer>
  );
}
