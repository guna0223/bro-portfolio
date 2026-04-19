import React, { useRef, useEffect, useState, useCallback } from 'react';
import './MiniGame.css';

const COLS = 12;
const ROWS = 8;
const CELL = 48;

function randomColor() {
  const colors = ['#7a5d6d','#c09e9c','#d4b5b0','#9e7080','#b08e8c'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function MiniGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const initGame = useCallback(() => {
    const bricks = [];
    for (let r = 0; r < ROWS; r++) {
      bricks[r] = [];
      for (let c = 0; c < COLS; c++) {
        bricks[r][c] = { active: true, color: randomColor() };
      }
    }
    stateRef.current = {
      bricks,
      ball: { x: COLS * CELL / 2, y: ROWS * CELL + 140, dx: 3.5, dy: -3.5 },
      paddle: { x: COLS * CELL / 2 - 50, w: 100, h: 10 },
      score: 0,
      lives: 3,
    };
    setScore(0);
    setLives(3);
    setGameOver(false);
    setWin(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const brickAreaH = ROWS * CELL;
    const brickOffsetY = 40;
    const brickOffsetX = (W - COLS * CELL) / 2;

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      if (stateRef.current) {
        stateRef.current.paddle.x = mx - stateRef.current.paddle.w / 2;
      }
    };
    canvas.addEventListener('mousemove', onMouse);

    const onTouch = (e) => {
      const rect = canvas.getBoundingClientRect();
      const tx = e.touches[0].clientX - rect.left;
      if (stateRef.current) {
        stateRef.current.paddle.x = tx - stateRef.current.paddle.w / 2;
      }
    };
    canvas.addEventListener('touchmove', onTouch, { passive: true });

    const draw = () => {
      const st = stateRef.current;
      if (!st) return;
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = '#1a0f14';
      ctx.fillRect(0, 0, W, H);

      // Grid lines (subtle)
      ctx.strokeStyle = 'rgba(122,93,109,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += CELL) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }

      // Bricks
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const b = st.bricks[r][c];
          if (!b.active) continue;
          const bx = brickOffsetX + c * CELL;
          const by = brickOffsetY + r * CELL;
          ctx.fillStyle = b.color;
          ctx.globalAlpha = 0.85;
          ctx.fillRect(bx + 2, by + 2, CELL - 4, CELL - 4);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = 'rgba(255,255,255,0.08)';
          ctx.strokeRect(bx + 2, by + 2, CELL - 4, CELL - 4);
        }
      }

      // Paddle
      const px = st.paddle.x;
      const py = H - 40;
      ctx.fillStyle = '#c09e9c';
      ctx.shadowColor = '#c09e9c';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.roundRect(px, py, st.paddle.w, st.paddle.h, 5);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Ball
      ctx.fillStyle = '#f0e8e6';
      ctx.shadowColor = '#c09e9c';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(st.ball.x, st.ball.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Separation line
      ctx.strokeStyle = 'rgba(122,93,109,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, brickOffsetY + brickAreaH + 10);
      ctx.lineTo(W, brickOffsetY + brickAreaH + 10);
      ctx.stroke();
    };

    const update = () => {
      const st = stateRef.current;
      if (!st) return;
      const ball = st.ball;
      const paddle = st.paddle;

      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collisions
      if (ball.x <= 8 || ball.x >= W - 8) ball.dx *= -1;
      if (ball.y <= 8) ball.dy *= -1;

      // Paddle collision
      const py = H - 40;
      if (
        ball.y + 8 >= py && ball.y - 8 <= py + paddle.h &&
        ball.x >= paddle.x && ball.x <= paddle.x + paddle.w
      ) {
        ball.dy = -Math.abs(ball.dy);
        const hit = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
        ball.dx = hit * 5;
      }

      // Bottom — lose life
      if (ball.y > H + 20) {
        st.lives -= 1;
        setLives(st.lives);
        if (st.lives <= 0) {
          setGameOver(true);
          cancelAnimationFrame(rafRef.current);
          return;
        }
        ball.x = W / 2;
        ball.y = H - 80;
        ball.dx = 3.5;
        ball.dy = -3.5;
      }

      // Brick collisions
      let allClear = true;
      const brickOffX = (W - COLS * CELL) / 2;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const b = st.bricks[r][c];
          if (!b.active) continue;
          allClear = false;
          const bx = brickOffX + c * CELL + 2;
          const by = 40 + r * CELL + 2;
          const bw = CELL - 4;
          const bh = CELL - 4;
          if (ball.x + 8 > bx && ball.x - 8 < bx + bw && ball.y + 8 > by && ball.y - 8 < by + bh) {
            b.active = false;
            ball.dy *= -1;
            st.score += 10;
            setScore(st.score);
          }
        }
      }
      if (allClear) {
        setWin(true);
        cancelAnimationFrame(rafRef.current);
      }
    };

    const loop = () => {
      update();
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('touchmove', onTouch);
    };
  }, [started]);

  const handleStart = () => {
    initGame();
    setStarted(true);
  };

  const handleRestart = () => {
    initGame();
    setStarted(true);
  };

  return (
    <section className="minigame" id="minigame">
      <div className="container">
        <div className="minigame__header reveal">
          <span className="section-tag">— Mini Game</span>
          <h2 className="minigame__heading reveal">
            Take a <em>break.</em>
          </h2>
          <p className="minigame__sub reveal">
            A little breakout game — because why not?
          </p>
        </div>

        <div className="minigame__wrap reveal">
          <div className="minigame__hud">
            <span>Score: <strong>{score}</strong></span>
            <span>{'♥'.repeat(lives)}{'♡'.repeat(Math.max(0, 3 - lives))}</span>
          </div>

          <div className="minigame__canvas-wrap">
            <canvas
              ref={canvasRef}
              width={COLS * CELL + 0}
              height={ROWS * CELL + 200}
              className="minigame__canvas"
            />

            {!started && !gameOver && !win && (
              <div className="minigame__overlay">
                <p className="minigame__overlay-title">Breakout</p>
                <p className="minigame__overlay-hint">Move your mouse to control the paddle</p>
                <button className="minigame__btn" onClick={handleStart}>Play Game</button>
              </div>
            )}

            {gameOver && (
              <div className="minigame__overlay">
                <p className="minigame__overlay-title">Game Over</p>
                <p className="minigame__overlay-hint">Score: {score}</p>
                <button className="minigame__btn" onClick={handleRestart}>Try Again</button>
              </div>
            )}

            {win && (
              <div className="minigame__overlay">
                <p className="minigame__overlay-title">You Win! 🎉</p>
                <p className="minigame__overlay-hint">Final score: {score}</p>
                <button className="minigame__btn" onClick={handleRestart}>Play Again</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
