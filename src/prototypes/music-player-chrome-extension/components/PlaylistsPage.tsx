import { Search, Music, ListMusic, Heart, Clock } from 'lucide-react';
import { useState } from 'react';

interface PlaylistsPageProps {
  onSelectPlaylist: (playlistName: string) => void;
}

export function PlaylistsPage({ onSelectPlaylist }: PlaylistsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const playlists = [
    { id: 1, name: 'Liked Songs', count: 127, icon: Heart, color: 'bg-gradient-to-br from-purple-500 to-blue-500' },
    { id: 2, name: 'Chill Vibes', count: 43, icon: Music, color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { id: 3, name: 'Workout Mix', count: 56, icon: Music, color: 'bg-gradient-to-br from-red-500 to-orange-500' },
    { id: 4, name: 'Focus Flow', count: 38, icon: Music, color: 'bg-gradient-to-br from-green-500 to-emerald-500' },
    { id: 5, name: 'Party Hits', count: 89, icon: Music, color: 'bg-gradient-to-br from-pink-500 to-rose-500' },
    { id: 6, name: 'Road Trip', count: 72, icon: Music, color: 'bg-gradient-to-br from-yellow-500 to-orange-500' },
  ];

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Search Bar */}
      <div className="px-4 pt-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-white/40 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:bg-white/15 transition-all"
          />
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <h3 className="text-white mb-3 text-sm">Your Playlists</h3>
        <div className="space-y-2">
          {filteredPlaylists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist.name)}
              className="w-full bg-white/5 hover:bg-white/10 rounded-lg p-3 flex items-center gap-3 transition-all group"
            >
              <div className={`w-12 h-12 ${playlist.color} rounded flex items-center justify-center flex-shrink-0`}>
                <playlist.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-white text-sm">{playlist.name}</div>
                <div className="text-white/60 text-xs">{playlist.count} songs</div>
              </div>
            </button>
          ))}
        </div>

        {filteredPlaylists.length === 0 && (
          <div className="text-center py-8 text-white/40 text-sm">
            No playlists found
          </div>
        )}
      </div>
    </div>
  );
}
