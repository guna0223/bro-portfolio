import React, { useRef, useState } from 'react';
import './Projects.css';

const projects = [
  {
    num: '01',
    title: 'WebGL Skydiving',
    tags: ['Three.js', 'WebGL', 'GSAP'],
    year: '2024',
    desc: 'An immersive first-person skydiving experience built entirely in WebGL with custom GLSL shaders and physics.',
    color: '#7a5d6d',
    emoji: '🪂',
  },
  {
    num: '02',
    title: 'Monkey Island Tribute',
    tags: ['React', 'Canvas', 'Animation'],
    year: '2023',
    desc: 'A loving tribute to the classic adventure game, recreated as an interactive web experience with modern tooling.',
    color: '#8a6570',
    emoji: '🏝️',
  },
  {
    num: '03',
    title: 'Flow Field Particles',
    tags: ['GPGPU', 'Three.js', 'Shaders'],
    year: '2023',
    desc: 'A GPU-accelerated particle system using GPGPU techniques to simulate millions of particles with flow-field dynamics.',
    color: '#9a7580',
    emoji: '✨',
  },
  {
    num: '04',
    title: 'Holiday WebGL',
    tags: ['React Three Fiber', '3D', 'Interactive'],
    year: '2023',
    desc: 'A festive 3D interactive scene built with React Three Fiber featuring custom animations and particle effects.',
    color: '#c09e9c',
    emoji: '🎄',
  },
  {
    num: '05',
    title: 'Creative Portfolio',
    tags: ['GSAP', 'Lenis', 'CSS'],
    year: '2024',
    desc: 'Award-winning personal portfolio combining scroll-driven animations, typographic design, and WebGL backgrounds.',
    color: '#b08e8c',
    emoji: '🎨',
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState(null);
  const previewRef = useRef(null);

  const onMouseMove = (e) => {
    if (previewRef.current) {
      previewRef.current.style.left = e.clientX + 28 + 'px';
      previewRef.current.style.top = e.clientY - 80 + 'px';
    }
  };

  return (
    <section className="projects" id="projects">
      {/* Floating emoji preview */}
      <div
        ref={previewRef}
        className={`projects__preview ${hovered !== null ? 'projects__preview--visible' : ''}`}
        aria-hidden="true"
      >
        <div
          className="projects__preview-inner"
          style={{ background: hovered !== null ? projects[hovered]?.color + '22' : 'transparent' }}
        >
          <span className="projects__preview-emoji">
            {hovered !== null ? projects[hovered]?.emoji : ''}
          </span>
        </div>
      </div>

      <div className="container">
        <div className="projects__header reveal">
          <span className="section-tag">— Selected work</span>
          <span className="projects__count">{projects.length} projects</span>
        </div>

        <ul className="projects__list">
          {projects.map((p, i) => (
            <li
              key={i}
              className="projects__item reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onMouseMove={onMouseMove}
              data-cursor-hover="true"
            >
              <span className="projects__num">{p.num}</span>
              <div className="projects__info">
                <h3 className="projects__title">{p.title}</h3>
                <p className="projects__desc">{p.desc}</p>
              </div>
              <div className="projects__tags">
                {p.tags.map((t) => (
                  <span key={t} className="projects__tag">{t}</span>
                ))}
              </div>
              <span className="projects__year">{p.year}</span>
              <span className="projects__arrow" aria-hidden="true">↗</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
