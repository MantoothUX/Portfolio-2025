import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, User, Code, Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import { useDarkMode } from '../contexts/DarkModeContext';

export const Navigation = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const isWork = location.pathname === '/' || location.pathname === '/work';
  const isAbout = location.pathname === '/about';
  const isPrototypes = location.pathname.startsWith('/prototypes');
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndicator, setActiveIndicator] = useState({ width: 0, x: 0 });
  const prevActiveRef = useRef<string | null>(null);
  const currentIndicatorRef = useRef({ width: 0, x: 0 });
  const [initialIndicator, setInitialIndicator] = useState<{ width: number; x: number } | null>(null);
  const isFirstMountRef = useRef(true);

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;
      
      let currentActive: string | null = null;
      let activeLink: HTMLElement | null = null;
      
      if (isWork) {
        currentActive = 'work';
        activeLink = navRef.current.querySelector('[data-nav="work"]') as HTMLElement;
      } else if (isAbout) {
        currentActive = 'about';
        activeLink = navRef.current.querySelector('[data-nav="about"]') as HTMLElement;
      } else if (isPrototypes) {
        currentActive = 'prototypes';
        activeLink = navRef.current.querySelector('[data-nav="prototypes"]') as HTMLElement;
      }

      if (activeLink && currentActive) {
        const containerRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        const newX = linkRect.left - containerRect.left;
        const newWidth = linkRect.width;

        // On first mount, set position immediately without animation
        if (isFirstMountRef.current) {
          setActiveIndicator({ width: newWidth, x: newX });
          setInitialIndicator({ width: newWidth, x: newX });
          currentIndicatorRef.current = { width: newWidth, x: newX };
          prevActiveRef.current = currentActive;
          isFirstMountRef.current = false;
          return;
        }

        // If switching nav items, animate from previous position
        if (prevActiveRef.current && prevActiveRef.current !== currentActive && currentIndicatorRef.current.width > 0) {
          setInitialIndicator({ ...currentIndicatorRef.current });
        }

        setActiveIndicator({ width: newWidth, x: newX });
        currentIndicatorRef.current = { width: newWidth, x: newX };
        prevActiveRef.current = currentActive;
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [isWork, isAbout, isPrototypes]);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-green-200 dark:border-green-900/50 rounded-full shadow-lg shadow-green-500/10 dark:shadow-green-500/20 relative" ref={navRef}>
        {/* Liquid background indicator */}
        {activeIndicator.width > 0 && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute bg-[#13531C] dark:bg-green-700 rounded-full h-[calc(100%-12px)] top-1/2 -translate-y-1/2"
            initial={initialIndicator ? {
              width: initialIndicator.width,
              x: initialIndicator.x
            } : {
              width: activeIndicator.width,
              x: activeIndicator.x
            }}
            animate={{
              width: activeIndicator.width,
              x: activeIndicator.x
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              mass: 1
            }}
            style={{
              borderRadius: '9999px'
            }}
          />
        )}
        
        <div className="relative flex items-center gap-2 px-6 py-3">
          <Link 
            to="/work" 
            data-nav="work"
            className={cn('relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors', isWork ? 'text-white dark:text-green-50' : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30')} 
            style={{ fontFamily: "'balto', sans-serif", fontWeight: 500, fontSize: '16px' }}
          >
            <Briefcase className="w-4 h-4" style={{ display: "none" }} />
            Work
          </Link>
          <Link 
            to="/about" 
            data-nav="about"
            className={cn('relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors', isAbout ? 'text-white dark:text-green-50' : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30')} 
            style={{ fontFamily: "'balto', sans-serif", fontWeight: 500, fontSize: '16px' }}
          >
            <User className="w-4 h-4" style={{ display: "none" }} />
            About
          </Link>
          <Link 
            to="/prototypes" 
            data-nav="prototypes"
            className={cn('relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors', isPrototypes ? 'text-white dark:text-green-50' : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30')} 
            style={{ fontFamily: "'balto', sans-serif", fontWeight: 500, fontSize: '16px' }}
          >
            <Code className="w-4 h-4" style={{ display: "none" }} />
            Prototypes
          </Link>
          <div className="w-px h-6 bg-green-200 dark:bg-green-900/50 mx-1" />
          <button onClick={toggleDarkMode} className="p-2 rounded-full text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors" style={{ fontFamily: "'balto', sans-serif" }} aria-label="Toggle dark mode">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};
