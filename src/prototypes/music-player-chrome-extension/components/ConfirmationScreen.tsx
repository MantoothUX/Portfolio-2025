import { motion } from 'framer-motion';
import { SpotifyLogo } from './SpotifyLogo';

export function ConfirmationScreen() {
  return (
    <div className="w-[320px] h-[480px] bg-black text-white flex items-center justify-center">
      <div className="px-8 text-center">
        {/* Animated Checkmark Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-24 h-24">
            {/* Outer circle with Spotify green */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-full bg-[#1DB954] flex items-center justify-center shadow-2xl shadow-[#1DB954]/50"
            >
              {/* Checkmark SVG */}
              <motion.svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  pathLength: { duration: 0.5, delay: 0.3, ease: "easeOut" },
                  opacity: { duration: 0.1, delay: 0.3 }
                }}
              >
                <motion.path
                  d="M10 24L20 34L38 14"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>

            {/* Pulsing ring effect */}
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute inset-0 rounded-full border-4 border-[#1DB954]"
            />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <h2 className="text-xl mb-2">Accounts synced!</h2>
          <p className="text-white/60 text-sm">
            Loading your new experience.
          </p>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-1.5 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#1DB954]"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Small Spotify Logo at Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="mt-12 flex justify-center"
        >
          <SpotifyLogo className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </div>
  );
}