import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 100;

export function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true); // Start paused to show standby screen

  const directionRef = useRef(direction);

  const generateFood = useCallback((currentSnake: {x: number, y: number}[]) => {
    if (currentSnake.length >= GRID_SIZE * GRID_SIZE) return { x: -1, y: -1 };
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      // eslint-disable-next-line no-loop-func
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setFood(generateFood(INITIAL_SNAKE));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys and space
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        if (gameOver) {
          resetGame();
        } else {
          setIsPaused(p => !p);
        }
        return;
      }

      if (gameOver || isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current.y === 0) {
            setDirection({ x: 0, y: -1 });
            directionRef.current = { x: 0, y: -1 };
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current.y === 0) {
            setDirection({ x: 0, y: 1 });
            directionRef.current = { x: 0, y: 1 };
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current.x === 0) {
            setDirection({ x: -1, y: 0 });
            directionRef.current = { x: -1, y: 0 };
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current.x === 0) {
            setDirection({ x: 1, y: 0 });
            directionRef.current = { x: 1, y: 0 };
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, isPaused]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y
        };

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, SPEED);
    return () => clearInterval(intervalId);
  }, [food, gameOver, isPaused, generateFood]);

  return (
    <div className="w-full max-w-[500px] flex flex-col gap-6">
      {/* Header Bar */}
      <div className="flex justify-between items-end w-full">
        <div className="border-2 border-dashed border-[#00ffff] px-4 py-2 text-3xl neon-text-cyan tracking-widest glitch-text" data-text={`DATA.RECOVERED: ${score}`}>
          DATA.RECOVERED: {score}
        </div>
        <div className="text-xl tracking-widest opacity-80 mb-1">
          SYS.STATE: <span className={isPaused || gameOver ? "text-[#ff00ff] glitch-text" : "text-[#00ffff]"} data-text={gameOver ? 'CRITICAL_FAILURE' : isPaused ? 'AWAITING_INPUT' : 'ACTIVE'}>
            {gameOver ? 'CRITICAL_FAILURE' : isPaused ? 'AWAITING_INPUT' : 'ACTIVE'}
          </span>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative neon-border-cyan w-full aspect-square bg-black/80 overflow-hidden">
        {/* Grid background lines for aesthetic */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
             style={{
               backgroundImage: 'linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)',
               backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
             }}>
        </div>

        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-[#00ffff] border border-[#ff00ff]"
            style={{
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              boxShadow: index === 0 ? '0 0 15px #00ffff' : 'none',
              opacity: 1
            }}
          />
        ))}
        <div
          className="absolute bg-[#ff00ff] border border-[#00ffff] animate-pulse"
          style={{
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            boxShadow: '0 0 20px #ff00ff'
          }}
        />

        {/* Overlays */}
        {(isPaused || gameOver) && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 backdrop-blur-[4px]">
            <div className="w-32 h-32 rounded-full bg-[#ff00ff]/10 blur-2xl absolute"></div>
            <h2 className="text-5xl mb-4 neon-text-cyan tracking-widest z-20 glitch-text" data-text={gameOver ? 'CRITICAL.FAILURE' : 'AWAITING.INPUT'}>
              {gameOver ? 'CRITICAL.FAILURE' : 'AWAITING.INPUT'}
            </h2>
            <p className="text-xl tracking-[0.2em] opacity-80 text-[#ff00ff] mb-8 z-20">
              {gameOver ? 'S Y S T E M _ H A L T E D' : 'W A I T I N G _ F O R _ O P E R A T O R'}
            </p>
            <button
              onClick={gameOver ? resetGame : () => setIsPaused(false)}
              className="border-2 border-[#00ffff] px-8 py-3 text-xl tracking-widest hover:bg-[#00ffff] hover:text-black transition-colors z-20 shadow-[0_0_15px_rgba(0,255,255,0.4)]"
            >
              {gameOver ? 'REBOOT.EXE' : 'RESUME.SYNC'}
            </button>
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="text-center flex flex-col gap-2 mt-2">
        <div className="text-lg tracking-widest text-[#00ffff] opacity-70">[ ARROWS ] NAVIGATE_GRID</div>
        <div className="text-lg tracking-widest text-[#00ffff] opacity-70">[ SPACE ] TOGGLE_OVERRIDE</div>
      </div>
    </div>
  );
}
