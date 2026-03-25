import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';

const TRACKS = [
  { id: 1, title: "SECTOR_01.WAV", url: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Cyborg_Ninja_-_Kevin_MacLeod.ogg" },
  { id: 2, title: "CORRUPT_DATA.OGG", url: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Movement_Proposition_-_Kevin_MacLeod.ogg" },
  { id: 3, title: "VOID_RESONANCE.FLAC", url: "https://upload.wikimedia.org/wikipedia/commons/8/89/Volatile_Reaction_-_Kevin_MacLeod.ogg" }
];

export function MusicPlayer() {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIdx]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipTrack = () => {
    setCurrentTrackIdx((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="neon-border-cyan p-6 flex flex-col gap-8">
      <audio
        ref={audioRef}
        src={TRACKS[currentTrackIdx].url}
        onEnded={skipTrack}
        loop={false}
      />

      {/* Top Section */}
      <div className="flex gap-6 items-center">
        <div className="w-16 h-16 border border-[#00ffff] flex items-center justify-center shadow-[0_0_10px_rgba(0,255,255,0.2)] bg-[#00ffff]/5">
          <Music size={28} className="text-[#00ffff]" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="text-2xl tracking-widest neon-text-cyan glitch-text" data-text={TRACKS[currentTrackIdx].title}>{TRACKS[currentTrackIdx].title}</div>
          <div className="text-sm tracking-widest opacity-60">SOURCE: NEURAL_CORE</div>
          {/* Progress Bar */}
          <div className="w-full h-[2px] bg-[#00ffff]/20 mt-2 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-[#00ffff] shadow-[0_0_5px_#00ffff] transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-10 my-2">
        <button onClick={prevTrack} className="text-[#00ffff] hover:text-white transition-colors">
          <SkipBack size={24} />
        </button>
        <button 
          onClick={togglePlay} 
          className="w-14 h-14 rounded-full border-2 border-[#00ffff] flex items-center justify-center text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,255,0.3)]"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>
        <button onClick={skipTrack} className="text-[#00ffff] hover:text-white transition-colors">
          <SkipForward size={24} />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button onClick={toggleMute} className="flex items-center gap-2 text-sm tracking-widest opacity-70 hover:opacity-100 transition-opacity">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />} 
            AUD.STREAM.SYNC
          </button>
          <div className="flex-1 ml-4 h-[2px] bg-[#00ffff]/30"></div>
        </div>
        {/* Equalizer bars */}
        <div className="flex justify-between items-end h-6 gap-[3px] opacity-60">
           {[...Array(28)].map((_, i) => (
             <div 
               key={i} 
               className="w-full bg-[#00ffff]" 
               style={{ 
                 height: isPlaying ? `${Math.random() * 80 + 20}%` : '10%',
                 transition: 'height 0.1s ease-in-out'
               }}
             ></div>
           ))}
        </div>
      </div>
    </div>
  );
}
