import { Chrome } from 'lucide-react';
import { SpotifyLogo } from './SpotifyLogo';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="w-[320px] h-[480px] bg-black text-white flex items-center justify-center">
      <div className="px-8 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg shadow-[#1DB954]/30">
            <SpotifyLogo className="w-12 h-12" />
          </div>
        </div>
        
        <h1 className="mb-2">Spotify for Chrome</h1>
        <p className="text-white/60 mb-8 text-sm">
          No more searching for Spotify in your tabs.
          <br /><br />
          Sync Spotify with your Google account to stay signed in and manage playback across devices.
        </p>

        <button
          onClick={onLogin}
          className="w-full bg-white text-black py-3 px-6 rounded-full hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.8449H13.8436C13.635 11.9699 13.0009 12.9231 12.0477 13.5613V15.8194H14.9564C16.6582 14.2526 17.64 11.9453 17.64 9.20443Z"
              fill="#4285F4"
            />
            <path
              d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
              fill="#34A853"
            />
            <path
              d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40665 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z"
              fill="#FBBC05"
            />
            <path
              d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="text-xs text-white/40 mt-6">
          Your credentials are securely synced with your Google account via Chrome's identity API.
        </p>
      </div>
    </div>
  );
}