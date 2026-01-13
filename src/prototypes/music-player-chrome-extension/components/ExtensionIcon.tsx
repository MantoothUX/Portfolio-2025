import { SpotifyLogo } from './SpotifyLogo';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { useState, useRef } from 'react';
import { Track } from '../types';

interface ExtensionIconProps {
  isPlaying: boolean;
  isLoggedIn: boolean;
  onClick: () => void;
  currentTrack: Track;
  currentTime: number;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function ExtensionIcon({ isPlaying, isLoggedIn, onClick, currentTrack, currentTime, onPlayPause, onNext, onPrevious }: ExtensionIconProps) {
  const [showHover, setShowHover] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / currentTrack.duration) * 100;
  const remainingTime = currentTrack.duration - currentTime;

  const handleMouseEnter = () => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setShowHover(true);
  };

  const handleMouseLeave = () => {
    // Delay hiding to give user time to move mouse to tooltip
    hideTimeoutRef.current = setTimeout(() => {
      setShowHover(false);
    }, 200); // 200ms delay
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={onClick}
        className="relative w-8 h-8 flex items-center justify-center hover:bg-slate-700 rounded transition-all"
        title={isLoggedIn && isPlaying ? `${currentTrack.title} - ${currentTrack.artist}` : 'Spotify Player'}
      >
        {/* Main Spotify Icon */}
        <div className={`relative ${isLoggedIn && isPlaying ? 'text-[#1DB954]' : 'text-slate-400'} transition-colors`}>
          <SpotifyLogo className="w-5 h-5" />
          
          {/* Liquid Equalizer Animation */}
          {isLoggedIn && isPlaying && (
            <div className="absolute inset-0 flex items-end justify-center gap-[1.5px] pb-[2px]">
              <div className="w-[2px] rounded-full animate-equalizer-1 overflow-hidden" style={{ height: '40%' }}>
                <div className="w-full h-full bg-gradient-to-t from-[#1DB954] via-[#2ef06f] to-white/60 opacity-80 shadow-[0_0_4px_rgba(29,185,84,0.6)]" />
              </div>
              <div className="w-[2px] rounded-full animate-equalizer-2 overflow-hidden" style={{ height: '60%' }}>
                <div className="w-full h-full bg-gradient-to-t from-[#1DB954] via-[#2ef06f] to-white/60 opacity-80 shadow-[0_0_4px_rgba(29,185,84,0.6)]" />
              </div>
              <div className="w-[2px] rounded-full animate-equalizer-3 overflow-hidden" style={{ height: '30%' }}>
                <div className="w-full h-full bg-gradient-to-t from-[#1DB954] via-[#2ef06f] to-white/60 opacity-80 shadow-[0_0_4px_rgba(29,185,84,0.6)]" />
              </div>
              <div className="w-[2px] rounded-full animate-equalizer-4 overflow-hidden" style={{ height: '50%' }}>
                <div className="w-full h-full bg-gradient-to-t from-[#1DB954] via-[#2ef06f] to-white/60 opacity-80 shadow-[0_0_4px_rgba(29,185,84,0.6)]" />
              </div>
            </div>
          )}
        </div>

        {/* Not logged in indicator */}
        {!isLoggedIn && (
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-slate-800" />
        )}
      </button>

      {/* Mini Track Indicator on Hover */}
      {isLoggedIn && isPlaying && (
        <div 
          className={`absolute top-full right-0 mt-2 transition-all duration-200 z-50 ${
            showHover ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-[#282828] rounded-xl shadow-2xl border border-white/10 overflow-hidden min-w-[280px]" style={{ borderRadius: '0.75rem' }}>
            <div className="flex items-center gap-3 p-3">
              {/* Album Art */}
              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#1DB954] to-[#1aa34a]">
                {currentTrack.albumArt ? (
                  <img 
                    src={currentTrack.albumArt} 
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <SpotifyLogo className="w-6 h-6 text-white/40" />
                  </div>
                )}
              </div>
              
              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm truncate">
                  {currentTrack.title}
                </div>
                <div className="text-white/60 text-xs truncate mt-0.5">
                  {currentTrack.artist}
                </div>
              </div>

              {/* Playing indicator */}
              <div className="flex gap-[2px] items-end h-4 px-2">
                <div className="w-[3px] bg-[#1DB954] rounded-full animate-equalizer-1" style={{ height: '40%' }} />
                <div className="w-[3px] bg-[#1DB954] rounded-full animate-equalizer-2" style={{ height: '70%' }} />
                <div className="w-[3px] bg-[#1DB954] rounded-full animate-equalizer-3" style={{ height: '50%' }} />
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-center gap-3 px-3 pb-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious?.();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <SkipBack className="w-4 h-4 text-white" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayPause?.();
                }}
                className="w-10 h-10 rounded-full bg-[#1DB954] hover:bg-[#1ed760] flex items-center justify-center transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current text-black" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5 text-black" />
                )}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext?.();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <SkipForward className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="relative h-1 bg-[#282828]">
              <div className="absolute left-0 top-0 h-full bg-[#1DB954]" style={{ width: `${progress}%` }} />
            </div>

            {/* Time Display */}
            <div className="flex justify-between px-3 py-1 text-xs text-white/60">
              <div>{formatTime(currentTime)}</div>
              <div>{formatTime(remainingTime)}</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes equalizer-1 {
          0%, 100% { height: 40%; }
          50% { height: 70%; }
        }
        @keyframes equalizer-2 {
          0%, 100% { height: 60%; }
          50% { height: 35%; }
        }
        @keyframes equalizer-3 {
          0%, 100% { height: 30%; }
          50% { height: 65%; }
        }
        @keyframes equalizer-4 {
          0%, 100% { height: 50%; }
          50% { height: 45%; }
        }
        .animate-equalizer-1 {
          animation: equalizer-1 0.8s ease-in-out infinite;
        }
        .animate-equalizer-2 {
          animation: equalizer-2 0.9s ease-in-out infinite;
          animation-delay: 0.1s;
        }
        .animate-equalizer-3 {
          animation: equalizer-3 0.7s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        .animate-equalizer-4 {
          animation: equalizer-4 0.85s ease-in-out infinite;
          animation-delay: 0.15s;
        }
      `}</style>
    </div>
  );
}