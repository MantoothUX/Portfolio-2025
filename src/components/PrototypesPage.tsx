import { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { useNavigate, useParams, Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Folder, FileText, ExternalLink } from 'lucide-react';
import prototypesData from '../content/prototypes.json';
import { cn } from '../lib/utils';
import SpinningGlobe from './SpinningGlobe';
import { useDarkMode } from '../contexts/DarkModeContext';

// Lazy load prototype components
const DoorHandleCheckin = lazy(() => import('../prototypes/door-handle-checkin/DoorHandleCheckin'));
const MusicPlayerChromeExtension = lazy(() => import('../prototypes/music-player-chrome-extension/App'));
const CircleChartViz = lazy(() => import('../prototypes/circle-chart-viz/CircleChartViz'));

interface PrototypeItem {
  id: string;
  title: string;
  slug: string;
  iterations: number;
  password?: string | null;
  externalUrl?: string;
}

interface PrototypeCategory {
  name: string;
  items: PrototypeItem[];
}

interface PrototypesData {
  categories: PrototypeCategory[];
}

const PasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
  correctPassword
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctPassword: string;
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === correctPassword) {
      setPassword('');
      setError('');
      onSuccess();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'balto', sans-serif", fontWeight: 500 }}>
          Password Required
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
            style={{ fontFamily: "'balto', sans-serif" }}
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mb-4" style={{ fontFamily: "'balto', sans-serif" }}>
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              style={{ fontFamily: "'balto', sans-serif", fontWeight: 500 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 hover:bg-green-800 dark:hover:bg-green-600 transition-colors"
              style={{ fontFamily: "'balto', sans-serif", fontWeight: 500 }}
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function PrototypesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams<{ slug?: string }>();
  const effectiveSlug = slug;
  const data = prototypesData as PrototypesData;
  const [passwordModal, setPasswordModal] = useState<{ isOpen: boolean; password: string; slug: string }>({
    isOpen: false,
    password: '',
    slug: ''
  });
  const [authenticatedPrototypes, setAuthenticatedPrototypes] = useState<Set<string>>(new Set());
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  const isPrototypes = location.pathname.startsWith('/prototypes');
  const isWork = location.pathname === '/' || location.pathname === '/work';
  const isAbout = location.pathname === '/about';

  const handlePrototypeClick = (item: PrototypeItem) => {
    // Handle external links
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    
    if (item.password && !authenticatedPrototypes.has(item.slug)) {
      setPasswordModal({ isOpen: true, password: item.password, slug: item.slug });
    } else {
      navigate(`/prototypes/${item.slug}`);
    }
  };

  const handlePasswordSuccess = () => {
    setAuthenticatedPrototypes((prev) => new Set([...prev, passwordModal.slug]));
    navigate(`/prototypes/${passwordModal.slug}`);
    setPasswordModal({ isOpen: false, password: '', slug: '' });
  };

  // If slug is provided, show individual prototype viewer
  if (effectiveSlug) {
    const allItems = data.categories.flatMap((cat) => cat.items);
    const prototype = allItems.find((item) => item.slug === effectiveSlug);
    
    if (!prototype) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: "'balto', sans-serif" }}>
            Prototype not found
          </p>
        </div>
      );
    }

    // Check if password is required and not authenticated
    if (prototype.password && !authenticatedPrototypes.has(effectiveSlug)) {
      return (
        <>
          <PasswordModal
            isOpen={true}
            onClose={() => navigate('/prototypes')}
            onSuccess={handlePasswordSuccess}
            correctPassword={prototype.password}
          />
        </>
      );
    }

    return <PrototypeViewer slug={effectiveSlug} prototype={prototype} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
  }

  // Landing page
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="min-h-screen pb-24 transition-colors duration-300 relative"
      >
        {/* Spinning Globe Background */}
        <SpinningGlobe darkMode={darkMode} />

        <div className="max-w-7xl mx-auto px-15 py-12 relative z-10" style={{ isolation: 'isolate' }}>
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="mb-4 leading-tight" style={{
                color: darkMode ? "#7bf1a8" : "#13531C",
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: 'clamp(2.5rem, 5vw, 5rem)' // Responsive: 40px on small, 80px on large
              }}>
                Prototypes
              </h1>
            </motion.div>

            {/* Projects List Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-xl md:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 shadow-2xl"
            >
            <div className="space-y-4 sm:space-y-6">
              {data.categories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + 0.3 }}
                >
                  <button
                    className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-left w-full"
                    style={{ fontFamily: "'balto', sans-serif", fontWeight: 500, fontSize: '16px' }}
                  >
                    <Folder className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">{category.name}</span>
                  </button>
                  <div className="ml-6 sm:ml-8 space-y-1.5 sm:space-y-2">
                    {category.items.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => handlePrototypeClick(item)}
                        className="flex items-center gap-2 sm:gap-3 w-full text-left p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
                        whileHover={{ x: 4 }}
                      >
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200 flex-1 text-sm sm:text-base flex items-center gap-2" style={{ fontFamily: "'balto', sans-serif" }}>
                          {item.title}
                          {item.slug === "order-printer" && (
                            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                          )}
                        </span>
                        {item.externalUrl && <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />}
                        {item.password && (
                          <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                        )}
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0" style={{ fontFamily: "'balto', sans-serif" }}>
                          ({item.iterations} {item.iterations === 1 ? 'iteration' : 'iterations'})
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
        </div>
      </motion.div>

      <PasswordModal
        isOpen={passwordModal.isOpen}
        onClose={() => setPasswordModal({ isOpen: false, password: '', slug: '' })}
        onSuccess={handlePasswordSuccess}
        correctPassword={passwordModal.password}
      />
    </>
  );
}

const PrototypeViewer = ({ slug, prototype, darkMode, onToggleDarkMode }: { slug: string; prototype: PrototypeItem; darkMode: boolean; onToggleDarkMode: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isPrototypes = location.pathname.startsWith('/prototypes');
  const isWork = location.pathname === '/' || location.pathname === '/work';
  const isAbout = location.pathname === '/about';
  
  // Get iteration from URL query params or default to v1
  const currentIteration = searchParams.get("iteration") || "v1";

  // Dynamically load the prototype component based on slug
  const PrototypeComponent = useMemo(() => {
    switch (slug) {
      case 'door-handle-checkin':
        return DoorHandleCheckin;
      case 'music-player-chrome-extension':
        return MusicPlayerChromeExtension;
      case 'circle-chart-viz':
        return CircleChartViz;
      default:
        return null;
    }
  }, [slug]);

  if (!PrototypeComponent) {
    return (
      <div className="min-h-screen transition-colors duration-300 relative">
        <SpinningGlobe darkMode={darkMode} />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center p-8">
            <p className="text-gray-600 dark:text-gray-400 mb-4" style={{ fontFamily: "'balto', sans-serif", fontSize: '18px' }}>
              Prototype "{slug}" is not yet migrated. Coming soon!
            </p>
            <button
              onClick={() => navigate('/prototypes')}
              className="px-6 py-3 bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 rounded-full hover:bg-green-800 dark:hover:bg-green-600 transition-colors"
              style={{ fontFamily: "'balto', sans-serif", fontWeight: 500 }}
            >
              ← All prototypes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // For prototypes, use standard layout
  return (
    <div className="min-h-screen transition-colors duration-300 relative">
      {/* Spinning Globe Background */}
      <SpinningGlobe darkMode={darkMode} />

      <div className="sticky top-0 z-10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800 px-6 py-4">
        <button
          onClick={() => navigate('/prototypes')}
          className="text-green-600 dark:text-green-400 hover:underline"
          style={{ fontFamily: "'balto', sans-serif", fontWeight: 500 }}
        >
          ← All prototypes
        </button>
      </div>
      
      {/* Render the prototype component with Suspense for lazy loading */}
      <div className="relative z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-400 rounded-full animate-spin" />
          </div>
        }>
          <PrototypeComponent />
        </Suspense>
      </div>
    </div>
  );
};
