import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Cpu, Activity, Wifi, Shield, Zap } from 'lucide-react';

function HWMetrics() {
  return (
    <div className="neon-border-cyan p-5 flex flex-col gap-5 text-xl">
      <div className="flex items-center gap-3 mb-2">
        <Cpu size={24} className="text-[#00ffff]" />
        <h2 className="text-2xl tracking-[0.2em] neon-text-cyan glitch-text" data-text="SYS.OP.METRICS">SYS.OP.METRICS</h2>
      </div>
      <div className="flex justify-between tracking-wider">
        <span className="flex items-center gap-3 opacity-70"><Zap size={18}/> THRM.CORE</span>
        <span className="text-[#00ffff] glitch-text" data-text="314K">314K</span>
      </div>
      <div className="flex justify-between tracking-wider">
        <span className="flex items-center gap-3 opacity-70"><Activity size={18}/> NET.FLUX</span>
        <span className="text-[#00ffff]">8.4GB/s</span>
      </div>
      <div className="flex justify-between tracking-wider">
        <span className="flex items-center gap-3 opacity-70"><Wifi size={18}/> UPLINK.STR</span>
        <span className="text-[#00ffff]">99%</span>
      </div>
      <div className="flex justify-between tracking-wider">
        <span className="flex items-center gap-3 opacity-70"><Shield size={18}/> SEC.PROTO</span>
        <span className="text-[#ff00ff] glitch-text" data-text="AES_256">AES_256</span>
      </div>
    </div>
  );
}

function EnergyGrid() {
  return (
    <div className="neon-border-magenta p-5 flex flex-col gap-5 h-48">
      <div className="flex items-center gap-3 mb-2">
        <Zap size={24} className="text-[#ff00ff]" />
        <h2 className="text-2xl tracking-[0.2em] neon-text-magenta glitch-text" data-text="PWR.GRID.ALLOC">PWR.GRID.ALLOC</h2>
      </div>
      <div className="flex-1 flex items-end justify-between gap-1">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="w-full bg-[#ff00ff] opacity-80 animate-pulse shadow-[0_0_5px_#ff00ff]"
            style={{
              height: `${Math.random() * 80 + 20}%`,
              animationDuration: `${Math.random() * 1.5 + 0.5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

function TerminalOutput() {
  return (
    <div className="neon-border-cyan p-5 flex flex-col gap-4 text-xl">
      <h2 className="text-2xl tracking-[0.2em] mb-2 opacity-70 border-b border-[#00ffff]/30 pb-3 glitch-text" data-text="SYS.LOG.STREAM">SYS.LOG.STREAM</h2>
      <div className="flex justify-between tracking-wider">
        <span className="opacity-70">&gt; GRID_SYNC</span>
        <span className="text-[#00ffff]">OK</span>
      </div>
      <div className="flex justify-between tracking-wider">
        <span className="opacity-70">&gt; AUDIO_INIT</span>
        <span className="text-[#00ffff]">OK</span>
      </div>
      <div className="flex justify-between tracking-wider">
        <span className="opacity-70">&gt; NEURAL_LINK</span>
        <span className="text-[#ff00ff] glitch-text" data-text="UNSTABLE">UNSTABLE</span>
      </div>
      <div className="flex justify-between tracking-wider">
        <span className="opacity-70">&gt; INPUT_WAIT</span>
        <span className="text-[#ff00ff] animate-pulse">...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#000000] bg-grid text-[#00ffff] font-mono p-6 lg:p-10 flex flex-col relative overflow-hidden screen-tear crt-flicker">
      <div className="bg-noise"></div>
      <div className="scanline"></div>

      {/* Header */}
      <div className="text-center mb-10 z-10 mt-4">
        <h1 className="text-6xl lg:text-7xl neon-text-cyan mb-4 tracking-wider glitch-text" data-text="VOID_CRAWLER.EXE">VOID_CRAWLER.EXE</h1>
        <p className="text-xl lg:text-2xl tracking-[0.4em] opacity-60 text-[#ff00ff]">MEM.CORRUPTION_DETECTED // OVERRIDE_ENGAGED</p>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-8 lg:gap-12 max-w-[1400px] mx-auto w-full z-10">
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          <HWMetrics />
          <EnergyGrid />
        </div>

        {/* Center Column */}
        <div className="flex flex-col items-center w-full">
          <SnakeGame />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          <MusicPlayer />
          <TerminalOutput />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-6 text-sm tracking-[0.5em] opacity-40 pointer-events-none">
        P R I Y A _ K O N G A R A _ S Y S T E M S _ V 4 . 0 . 1
      </div>
      <div className="absolute bottom-4 right-6 text-sm tracking-[0.5em] opacity-40 pointer-events-none">
        T I M E S T A M P _ 2 0 2 6 _ 0 3 _ 2 5
      </div>
    </div>
  );
}
