import { TrackInfo } from './TrackInfo';
import { PlayerControls } from './PlayerControls';
import { LoginScreen } from './LoginScreen';
import { ConfirmationScreen } from './ConfirmationScreen';
import { HomePage } from './HomePage';
import { PlaylistsPage } from './PlaylistsPage';
import { MenuDropdown } from './MenuDropdown';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { Track } from '../types';

interface PlayerPopupProps {
  isLoggedIn: boolean;
  showConfirmation: boolean;
  isPlaying: boolean;
  currentTrack: Track;
  currentTime: number;
  volume: number;
  currentView: 'home' | 'playlists' | 'player';
  onViewChange: (view: 'home' | 'playlists' | 'player') => void;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onLogin: () => void;
  onLogout: () => void;
}

export function PlayerPopup({
  isLoggedIn,
  showConfirmation,
  isPlaying,
  currentTrack,
  currentTime,
  volume,
  currentView,
  onViewChange,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onLogin,
  onLogout,
}: PlayerPopupProps) {
  const [currentPlaylist, setCurrentPlaylist] = useState('Liked Songs');

  const handleBack = () => {
    if (currentView === 'player') {
      onViewChange('playlists');
    } else if (currentView === 'playlists') {
      onViewChange('home');
    }
  };

  const handleNavigate = (view: string) => {
    onViewChange(view as 'home' | 'playlists' | 'player');
  };

  const handleSelectPlaylist = (playlistName: string) => {
    setCurrentPlaylist(playlistName);
    onViewChange('player');
  };

  const handleLogout = () => {
    onLogout();
    onViewChange('home');
  };

  if (showConfirmation) {
    return (
      <div className="shadow-2xl rounded-xl overflow-hidden bg-black" style={{ borderRadius: '0.75rem' }}>
        <ConfirmationScreen />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="shadow-2xl rounded-xl overflow-hidden bg-black" style={{ borderRadius: '0.75rem' }}>
        <LoginScreen onLogin={onLogin} />
      </div>
    );
  }

  return (
    <div className="w-[320px] h-[500px] bg-black text-white overflow-hidden shadow-2xl rounded-xl" style={{ borderRadius: '0.75rem' }}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-4 py-3 bg-white/5 backdrop-blur-sm border-b border-white/10 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {currentView !== 'home' && (
              <button
                onClick={handleBack}
                className="p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-1.5 min-w-0">
              {currentView === 'home' && <span className="text-xs text-white">Home</span>}
              {currentView === 'playlists' && (
                <>
                  <button
                    onClick={() => handleNavigate('home')}
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    Home
                  </button>
                  <span className="text-xs text-white/60">/</span>
                  <span className="text-xs text-white">Playlists</span>
                </>
              )}
              {currentView === 'player' && (
                <>
                  <button
                    onClick={() => handleNavigate('home')}
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    Home
                  </button>
                  <span className="text-xs text-white/60">/</span>
                  <button
                    onClick={() => handleNavigate('playlists')}
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    Playlists
                  </button>
                  <span className="text-xs text-white/60">/</span>
                  <span className="text-xs text-white truncate">{currentPlaylist}</span>
                </>
              )}
            </div>
          </div>
          <MenuDropdown onLogout={handleLogout} />
        </div>

        {/* Content Views */}
        {currentView === 'home' && <HomePage onNavigate={handleNavigate} isPlaying={isPlaying} />}
        
        {currentView === 'playlists' && <PlaylistsPage onSelectPlaylist={handleSelectPlaylist} />}
        
        {currentView === 'player' && (
          <>
            {/* Track Info */}
            <TrackInfo track={currentTrack} />

            {/* Player Controls */}
            <PlayerControls
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={currentTrack.duration}
              volume={volume}
              onPlayPause={onPlayPause}
              onNext={onNext}
              onPrevious={onPrevious}
              onSeek={onSeek}
              onVolumeChange={onVolumeChange}
            />
          </>
        )}
      </div>
    </div>
  );
}