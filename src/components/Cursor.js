import React, { useEffect, useRef, useState } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onDown = () => setIsClick(true);
    const onUp = () => setIsClick(false);

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    const addHover = () => {
      const targets = document.querySelectorAll('a, button, [data-cursor-hover]');
      targets.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHover(true));
        el.addEventListener('mouseleave', () => setIsHover(false));
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf.current = requestAnimationFrame(loop);

    // Wait for DOM then attach hover
    setTimeout(addHover, 500);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isHover ? 'hover' : ''} ${isClick ? 'click' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHover ? 'hover' : ''} ${isClick ? 'click' : ''}`}
      />
    </>
  );
}
