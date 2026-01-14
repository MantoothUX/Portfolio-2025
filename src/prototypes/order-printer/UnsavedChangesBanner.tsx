import React from 'react';
import { AlertCircle } from 'lucide-react';

type UnsavedChangesBannerProps = {
  onDiscard?: () => void;
  onSave?: () => void;
  className?: string;
  shouldShake?: boolean;
};

// @component: UnsavedChangesBanner
export const UnsavedChangesBanner = ({
  onDiscard = () => {},
  onSave = () => {},
  className = '',
  shouldShake = false
}: UnsavedChangesBannerProps) => {
  // @return
  return (
    <>
        <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .shake-animation {
          animation: shake 0.5s;
        }
      `}</style>
      <div className={`relative flex h-9 w-full max-w-[640px] items-center justify-between rounded-xl border border-white/10 bg-[#1a1a1a] py-1 pl-2 pr-1 shadow-lg backdrop-blur-sm ${shouldShake ? 'shake-animation' : ''} ${className}`}>
      {/* Message Section */}
      <div className="flex items-center gap-2 overflow-hidden">
        <AlertCircle size={14} className="text-[#e3e3e3] opacity-80" strokeWidth={2} />
        <h2 className="truncate text-xs font-medium text-[#e3e3e3]">
          Unsaved changes
        </h2>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-1">
        {/* Discard Button */}
        <button 
          onClick={onDiscard} 
          type="button" 
          className="group relative flex h-7 min-w-[48px] cursor-pointer items-center justify-center rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#e3e3e3] transition-colors hover:bg-white/10 active:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
        >
          <span className="relative z-10">Discard</span>
        </button>

        {/* Save Button */}
        <button 
          onClick={onSave} 
          type="submit" 
          className="group relative flex h-7 min-w-[48px] cursor-pointer items-center justify-center rounded-lg bg-[#e3e3e3] px-3 py-1.5 text-xs font-semibold text-[#303030] shadow-sm transition-all hover:bg-white hover:shadow-[0_0_8px_rgba(255,255,255,0.2)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
        >
          <span className="relative z-10">Save</span>
        </button>
      </div>
    </div>
    </>
  );
};


