import React, { useEffect, useRef } from 'react';
import './styles/global.css';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import MiniGame from './components/MiniGame';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useLenis } from './hooks/useLenis';
import { useReveal } from './hooks/useReveal';

function App() {
  useLenis();
  useReveal();

  return (
    <>
      <Cursor />
      <Loader />
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <MiniGame />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
