import React from 'react';
import './About.css';

const stats = [
  { num: '15+', label: 'Years of experience' },
  { num: '80+', label: 'Projects delivered' },
  { num: '12', label: 'Awards & honours' },
  { num: '∞', label: 'Passion for the craft' },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner container">

        <div className="about__left">
          <span className="section-tag reveal">— About me</span>
          <h2 className="about__heading reveal">
            Self-taught.<br />
            <em>Passionate.</em><br />
            Engineer.
          </h2>
          <div className="about__body reveal">
            <p>
              I'm Sébastien Lempens, a French 'Gen X' Web Engineer. Throughout my career,
              I have worked on multiple-sized projects in various roles, including Project Manager,
              Designer and Front/Back-end Developer.
            </p>
            <p>
              I'm passionate about creating high-quality, user-friendly websites and web applications
              that push the boundaries of what's possible on the web — blending art direction,
              motion design, and cutting-edge technology.
            </p>
            <p>
              When I'm not coding, I explore 3D worlds, experiment with WebGL shaders,
              and take long rides through the French countryside.
            </p>
          </div>
        </div>

        <div className="about__right">
          <div className="about__video-wrap reveal">
            <div className="about__video-placeholder">
              <div className="about__video-icon">▶</div>
              <p>About Me — Video</p>
            </div>
          </div>
          <div className="about__stats">
            {stats.map((s, i) => (
              <div className="about__stat reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="about__stat-num">{s.num}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
