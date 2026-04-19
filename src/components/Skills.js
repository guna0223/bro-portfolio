import React from 'react';
import './Skills.css';

const categories = [
  {
    label: 'Frontend',
    skills: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'CSS / SCSS', 'HTML5'],
  },
  {
    label: '3D & Motion',
    skills: ['Three.js', 'React Three Fiber', 'GSAP', 'WebGL / GLSL', 'Blender', 'After Effects'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'PHP', 'MySQL', 'REST APIs', 'GraphQL', 'Docker'],
  },
  {
    label: 'Tools & Design',
    skills: ['Figma', 'Lenis', 'Git', 'Vite', 'Webpack', 'Photoshop'],
  },
];

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="skills__header reveal">
          <span className="section-tag">— Expertise</span>
          <h2 className="skills__heading reveal">
            What I <em>bring</em><br />to the table.
          </h2>
        </div>
        <div className="skills__grid">
          {categories.map((cat, i) => (
            <div className="skills__category reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <h3 className="skills__category-label">{cat.label}</h3>
              <ul className="skills__list">
                {cat.skills.map((s, j) => (
                  <li key={j} className="skills__item">
                    <span className="skills__item-dot" aria-hidden="true">✦</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
