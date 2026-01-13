import { Chrome, Lock, Star, MoreVertical, RefreshCw } from 'lucide-react';
import { ExtensionIcon } from './ExtensionIcon';
import { Track } from '../types';

interface BrowserChromeProps {
  isPlaying: boolean;
  isLoggedIn: boolean;
  onExtensionClick: () => void;
  currentTrack: Track;
  currentTime: number;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function BrowserChrome({ isPlaying, isLoggedIn, onExtensionClick, currentTrack, currentTime, onPlayPause, onNext, onPrevious }: BrowserChromeProps) {
  return (
    <div className="bg-slate-800 text-white">
      {/* Tab Bar */}
      <div className="flex items-center gap-1 px-2 pt-2 bg-slate-900">
        <div className="bg-slate-800 px-4 py-2 rounded-t-lg flex items-center gap-2 min-w-[200px]">
          <Chrome className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-300 truncate">Example Website</span>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-t-lg flex items-center gap-2 min-w-[200px]">
          <div className="w-4 h-4 rounded-full bg-slate-700" />
          <span className="text-xs text-slate-500 truncate">New Tab</span>
        </div>
        <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded">
          <span className="text-lg">+</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="px-3 py-2 flex items-center gap-2">
        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded">
            <span className="text-lg">←</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded">
            <span className="text-lg">→</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center gap-2 bg-slate-900 rounded-full px-4 py-2">
          <Lock className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-400">example.com</span>
        </div>

        {/* Extension Icons */}
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded">
            <Star className="w-4 h-4" />
          </button>
          
          {/* Music Player Extension Icon */}
          <ExtensionIcon 
            isPlaying={isPlaying} 
            isLoggedIn={isLoggedIn}
            onClick={onExtensionClick}
            currentTrack={currentTrack}
            currentTime={currentTime}
            onPlayPause={onPlayPause}
            onNext={onNext}
            onPrevious={onPrevious}
          />
          
          <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Profile */}
        <button className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs">
          ME
        </button>
      </div>

      {/* Bookmarks Bar */}
      <div className="px-3 py-1.5 bg-slate-800 border-t border-slate-700 flex items-center gap-4">
        <div className="text-xs text-slate-400 hover:text-white cursor-pointer flex items-center gap-1">
          <div className="w-4 h-4 bg-slate-700 rounded" />
          <span>Bookmarks</span>
        </div>
        <div className="text-xs text-slate-400 hover:text-white cursor-pointer flex items-center gap-1">
          <div className="w-4 h-4 bg-slate-700 rounded" />
          <span>Apps</span>
        </div>
        <div className="text-xs text-slate-400 hover:text-white cursor-pointer flex items-center gap-1">
          <div className="w-4 h-4 bg-slate-700 rounded" />
          <span>News</span>
        </div>
      </div>
    </div>
  );
}