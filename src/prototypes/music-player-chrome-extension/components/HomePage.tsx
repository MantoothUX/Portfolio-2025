import { Music, Clock, Heart, ListMusic } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
  isPlaying?: boolean;
}

export function HomePage({ onNavigate, isPlaying = false }: HomePageProps) {
  const quickAccess = [
    { icon: Heart, label: 'Liked Songs', count: '127 songs', color: 'bg-gradient-to-br from-purple-500 to-blue-500' },
    { icon: Clock, label: 'Recently Played', count: '50 songs', color: 'bg-gradient-to-br from-green-500 to-teal-500' },
    { icon: ListMusic, label: 'Your Playlists', count: '12 playlists', color: 'bg-gradient-to-br from-orange-500 to-pink-500' },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <h2 className="mb-1 text-white">Good evening</h2>
      
      <div className="space-y-3 mt-6">
        {quickAccess.map((item, index) => (
          <button
            key={index}
            onClick={() => item.label === 'Your Playlists' ? onNavigate('playlists') : item.label === 'Liked Songs' ? onNavigate('player') : null}
            className="w-full bg-white/10 hover:bg-white/20 rounded-lg p-3 flex items-center gap-3 transition-all group"
          >
            <div className={`w-12 h-12 ${item.color} rounded flex items-center justify-center flex-shrink-0 relative`}>
              <item.icon className={`w-6 h-6 text-white ${item.label === 'Liked Songs' && isPlaying ? 'opacity-0' : ''} transition-opacity`} />
              
              {/* Equalizer Animation for Liked Songs */}
              {item.label === 'Liked Songs' && isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center gap-[2px]">
                  <div className="w-[3px] bg-white rounded-full animate-equalizer-1" style={{ height: '40%' }} />
                  <div className="w-[3px] bg-white rounded-full animate-equalizer-2" style={{ height: '60%' }} />
                  <div className="w-[3px] bg-white rounded-full animate-equalizer-3" style={{ height: '30%' }} />
                  <div className="w-[3px] bg-white rounded-full animate-equalizer-4" style={{ height: '50%' }} />
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="text-white text-sm">{item.label}</div>
              <div className="text-white/60 text-xs">{item.count}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-white mb-4 text-sm">Jump back in</h3>
        <button
          onClick={() => onNavigate('player')}
          className="w-full bg-white/5 hover:bg-white/10 rounded-lg p-3 flex items-center gap-3 transition-all group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex-shrink-0 relative flex items-center justify-center">
            {/* Equalizer Animation */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center gap-[2px]">
                <div className="w-[3px] bg-white rounded-full animate-equalizer-1" style={{ height: '40%' }} />
                <div className="w-[3px] bg-white rounded-full animate-equalizer-2" style={{ height: '60%' }} />
                <div className="w-[3px] bg-white rounded-full animate-equalizer-3" style={{ height: '30%' }} />
                <div className="w-[3px] bg-white rounded-full animate-equalizer-4" style={{ height: '50%' }} />
              </div>
            )}
          </div>
          <div className="flex-1 text-left">
            <div className="text-white text-sm">Liked Songs</div>
            <div className="text-white/60 text-xs">Playlist • 127 songs</div>
          </div>
        </button>
      </div>
      
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