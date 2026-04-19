import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__top">
        <div className="container">
          <span className="section-tag reveal">— Get in touch</span>
          <h2 className="contact__heading reveal">
            Let's build<br />
            something <em>great</em><br />
            together.
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="contact__inner">
          <div className="contact__left reveal">
            <p className="contact__intro">
              I'm always open to new projects and collaborations. Whether you have a complex
              web app, a creative experiment, or just want to say hello — drop me a line.
            </p>
            <div className="contact__links">
              <a href="mailto:hello@sebastien-lempens.com" className="contact__link" data-cursor-hover="true">
                <span className="contact__link-label">Email</span>
                <span className="contact__link-value">hello@sebastien-lempens.com ↗</span>
              </a>
              <a href="https://twitter.com/s_lempens" className="contact__link" target="_blank" rel="noreferrer" data-cursor-hover="true">
                <span className="contact__link-label">Twitter</span>
                <span className="contact__link-value">@s_lempens ↗</span>
              </a>
              <a href="https://github.com/sebastien-lempens" className="contact__link" target="_blank" rel="noreferrer" data-cursor-hover="true">
                <span className="contact__link-label">GitHub</span>
                <span className="contact__link-value">sebastien-lempens ↗</span>
              </a>
              <a href="https://www.linkedin.com/in/sebastien-lempens-78114143" className="contact__link" target="_blank" rel="noreferrer" data-cursor-hover="true">
                <span className="contact__link-label">LinkedIn</span>
                <span className="contact__link-value">Sébastien Lempens ↗</span>
              </a>
            </div>
          </div>

          <div className="contact__right reveal">
            {!sent ? (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__field">
                  <label className="contact__label" htmlFor="name">Name</label>
                  <input
                    className="contact__input"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label className="contact__label" htmlFor="email">Email</label>
                  <input
                    className="contact__input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label className="contact__label" htmlFor="message">Message</label>
                  <textarea
                    className="contact__input contact__textarea"
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className="contact__submit" data-cursor-hover="true">
                  Send message
                  <span className="contact__submit-arrow">↗</span>
                </button>
              </form>
            ) : (
              <div className="contact__success">
                <span className="contact__success-icon">✦</span>
                <p className="contact__success-title">Message sent!</p>
                <p className="contact__success-text">Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
