import React, { useEffect, useRef, useState } from 'react';
import './Loader.css';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => setDone(true), 300);
          setTimeout(() => setHidden(true), 1500);
          return 100;
        }
        const step = Math.random() * 12 + 4;
        return Math.min(p + step, 100);
      });
    }, 80);

    return () => clearInterval(intervalRef.current);
  }, []);

  if (hidden) return null;

  return (
    <div className={`loader ${done ? 'loader--done' : ''}`}>
      <div className="loader__panels">
        <div className="loader__panel loader__panel--left" />
        <div className="loader__panel loader__panel--right" />
      </div>
      <div className="loader__content">
        <p className="loader__name">Sébastien Lempens</p>
        <div className="loader__bar-wrap">
          <div className="loader__bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="loader__count">{Math.round(progress)}</p>
      </div>
    </div>
  );
}
