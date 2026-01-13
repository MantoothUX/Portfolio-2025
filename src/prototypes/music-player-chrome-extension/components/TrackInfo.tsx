import { Music } from 'lucide-react';
import { Track } from '../types';

interface TrackInfoProps {
  track: Track;
}

export function TrackInfo({ track }: TrackInfoProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 bg-gradient-to-b from-[#1DB954]/10 to-transparent relative z-0">
      {/* Album Art */}
      <div className="mb-4 relative group">
        <div className="w-36 h-36 rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
          {track.albumArt ? (
            <img
              src={track.albumArt}
              alt={track.album}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1DB954] to-[#1aa34a] flex items-center justify-center">
              <Music className="w-16 h-16 text-white/30" />
            </div>
          )}
        </div>
        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Track Details */}
      <div className="text-center w-full">
        <h2 className="mb-1 truncate px-4">{track.title}</h2>
        <p className="text-white/70 text-sm mb-1 truncate px-4">{track.artist}</p>
        <p className="text-white/50 text-xs truncate px-4">{track.album}</p>
      </div>
    </div>
  );
}