import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

interface PlayerControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

export function PlayerControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
}: PlayerControlsProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  const handleSeekBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    onSeek(percentage * duration);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    onVolumeChange(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      // Unmute: restore previous volume
      onVolumeChange(previousVolume || 50);
      setIsMuted(false);
    } else {
      // Mute: save current volume and set to 0
      setPreviousVolume(volume);
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="px-6 pb-8 bg-black/40 backdrop-blur-sm border-t border-white/5">
      {/* Progress Bar */}
      <div className="mb-4">
        <div
          className="h-1 bg-white/20 rounded-full cursor-pointer overflow-hidden group"
          onClick={handleSeekBarClick}
        >
          <div
            className="h-full bg-[#1DB954] rounded-full relative transition-all group-hover:bg-[#1ed760]"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-white/50">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={onPrevious}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={onPlayPause}
          className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-[#1DB954]/30"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current text-black" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-0.5 text-black" />
          )}
        </button>

        <button
          onClick={onNext}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all flex-shrink-0"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
        
        <div className="flex-1 flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-runnable-track]:bg-transparent"
            style={{
              background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>

        <span className="text-xs text-white/50 w-8 text-right">
          {volume}%
        </span>
      </div>
    </div>
  );
}