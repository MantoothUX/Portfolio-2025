import { useState, useEffect } from 'react';
import { BrowserChrome } from './components/BrowserChrome';
import { PlayerPopup } from './components/PlayerPopup';
import { ExtensionIcon } from './components/ExtensionIcon';

// Mock track data
export const mockTracks = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "The Echo Chamber",
    album: "Nocturnal Sessions",
    duration: 243,
    albumArt: "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWN8ZW58MXx8fHwxNzY1NDcwNzk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "Electric Sunrise",
    artist: "Nova Collective",
    album: "Dawn Breaks",
    duration: 197,
    albumArt: "https://images.unsplash.com/photo-1697238724753-60c0c31132d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGFsYnVtfGVufDF8fHx8MTc2NTQ3Nzc1NHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "Rhythm of the Night",
    artist: "Pulse Wave",
    album: "Live at Madison",
    duration: 312,
    albumArt: "https://images.unsplash.com/photo-1667816878987-bfbece40b561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjU0NTc0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export default function MusicPlayerChromeExtension() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Default to playing
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [showTrackHover, setShowTrackHover] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'playlists' | 'player'>('player');

  const currentTrack = mockTracks[currentTrackIndex];

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= currentTrack.duration) {
          // Move to next track
          setCurrentTrackIndex((idx) => (idx + 1) % mockTracks.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % mockTracks.length);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + mockTracks.length) % mockTracks.length);
      setCurrentTime(0);
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleLogin = () => {
    setShowConfirmation(true);
    
    // After 2 seconds, hide confirmation and complete login
    setTimeout(() => {
      setShowConfirmation(false);
      setIsLoggedIn(true);
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only enable keyboard controls when logged in
      if (!isLoggedIn) return;

      switch(e.key) {
        case ' ': // Space bar - play/pause
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'ArrowRight': // Right arrow - next track
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft': // Left arrow - previous track
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowUp': // Up arrow - volume up
          e.preventDefault();
          setVolume(prev => Math.min(100, prev + 5));
          break;
        case 'ArrowDown': // Down arrow - volume down
          e.preventDefault();
          setVolume(prev => Math.max(0, prev - 5));
          break;
        case 'm': // M key - mute/unmute
        case 'M':
          e.preventDefault();
          setVolume(prev => prev === 0 ? 70 : 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoggedIn, currentTime, currentTrack.duration]);

  return (
    <div className="w-full h-screen bg-slate-100 overflow-hidden">
      {/* Browser Chrome */}
      <BrowserChrome 
        isPlaying={isPlaying} 
        isLoggedIn={isLoggedIn}
        onExtensionClick={togglePopup}
        currentTrack={currentTrack}
        currentTime={currentTime}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      {/* Browser Content Area */}
      <div className="h-[calc(100vh-120px)] bg-white flex items-center justify-center">
        <div className="text-center text-slate-400">
          <p className="text-sm">Click the Spotify extension icon in the toolbar above to start</p>
          {isLoggedIn && (
            <div className="mt-6 text-xs space-y-1 text-slate-500">
              <p className="font-semibold text-slate-600 mb-2">⌨️ Keyboard Controls:</p>
              <p><kbd className="px-2 py-1 bg-slate-200 rounded text-slate-700">Space</kbd> Play/Pause</p>
              <p><kbd className="px-2 py-1 bg-slate-200 rounded text-slate-700">←</kbd> Previous Track</p>
              <p><kbd className="px-2 py-1 bg-slate-200 rounded text-slate-700">→</kbd> Next Track</p>
              <p><kbd className="px-2 py-1 bg-slate-200 rounded text-slate-700">↑</kbd> Volume Up</p>
              <p><kbd className="px-2 py-1 bg-slate-200 rounded text-slate-700">↓</kbd> Volume Down</p>
              <p><kbd className="px-2 py-1 bg-slate-200 rounded text-slate-700">M</kbd> Mute/Unmute</p>
            </div>
          )}
        </div>
      </div>

      {/* Extension Popup */}
      {isPopupOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={togglePopup}
          />
          
          {/* Popup */}
          <div className="fixed top-[120px] right-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <PlayerPopup
              isLoggedIn={isLoggedIn}
              showConfirmation={showConfirmation}
              isPlaying={isPlaying}
              currentTrack={currentTrack}
              currentTime={currentTime}
              volume={volume}
              currentView={currentView}
              onViewChange={setCurrentView}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSeek={handleSeek}
              onVolumeChange={handleVolumeChange}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          </div>
        </>
      )}
    </div>
  );
}
