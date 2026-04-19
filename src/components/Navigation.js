import React, { useEffect, useState } from 'react';
import './Navigation.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      if (window._lenis) {
        window._lenis.scrollTo(el, { duration: 1.6 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href="#hero" className="nav__logo" onClick={(e) => handleNav(e, '#hero')}>
        <span className="nav__logo-name">S. Lempens</span>
        <span className="nav__logo-role">Web Engineer</span>
      </a>

      <nav className={`nav__menu ${menuOpen ? 'nav__menu--open' : ''}`} aria-label="Main navigation">
        <ul className="nav__list">
          {navLinks.map((link) => (
            <li key={link.label} className="nav__item">
              <a href={link.href} className="nav__link" onClick={(e) => handleNav(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className={`nav__burger ${menuOpen ? 'nav__burger--active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
