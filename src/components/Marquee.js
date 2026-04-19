import React from 'react';
import './Marquee.css';

const items = [
  'Web Engineering', 'Three.js', 'GSAP', 'React', 'Creative Development',
  'WebGL', 'Lenis', 'Motion Design', 'UI/UX', 'PHP', 'Node.js',
  'Web Engineering', 'Three.js', 'GSAP', 'React', 'Creative Development',
  'WebGL', 'Lenis', 'Motion Design', 'UI/UX', 'PHP', 'Node.js',
];

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__dot" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
