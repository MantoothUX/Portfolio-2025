import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for merging Tailwind classes
 * This is a copy of the cn utility from lib/utils.ts
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface NavItem {
  /** The path/route for this navigation item */
  path: string;
  /** The label to display */
  label: string;
  /** Optional icon component from lucide-react */
  icon?: LucideIcon;
  /** Whether to show the icon (default: false) */
  showIcon?: boolean;
}

export interface FloatingNavProps {
  /** Array of navigation items to display */
  items: NavItem[];
  /** Current dark mode state */
  darkMode: boolean;
  /** Function to toggle dark mode */
  onToggleDarkMode: () => void;
  /** Whether to show the dark mode toggle button (default: true) */
  showDarkModeToggle?: boolean;
  /** Custom position classes (default: "fixed bottom-6 left-1/2 -translate-x-1/2") */
  position?: string;
  /** Custom background color classes (default: "bg-white/70 dark:bg-zinc-900/70") */
  backgroundColor?: string;
  /** Custom border color classes (default: "border-green-200 dark:border-green-900/50") */
  borderColor?: string;
  /** Custom active item background color (default: "bg-[#13531C] dark:bg-green-700") */
  activeBgColor?: string;
  /** Custom active item text color (default: "text-white dark:text-green-50") */
  activeTextColor?: string;
  /** Custom inactive item text color (default: "text-green-700 dark:text-green-400") */
  inactiveTextColor?: string;
  /** Custom hover background color (default: "hover:bg-green-50 dark:hover:bg-green-900/30") */
  hoverBgColor?: string;
  /** Custom divider color (default: "bg-green-200 dark:bg-green-900/50") */
  dividerColor?: string;
  /** Custom z-index (default: "z-50") */
  zIndex?: string;
  /** Additional className for the nav element */
  className?: string;
}

/**
 * FloatingNav - A floating bottom navigation component with smooth animations
 * 
 * Features:
 * - Smooth spring animations on mount
 * - Active route highlighting
 * - Dark mode toggle support
 * - Fully customizable colors and positioning
 * - Responsive design with backdrop blur
 * 
 * @example
 * ```tsx
 * const navItems = [
 *   { path: '/work', label: 'Work', icon: Briefcase },
 *   { path: '/about', label: 'About', icon: User }
 * ];
 * 
 * <FloatingNav
 *   items={navItems}
 *   darkMode={darkMode}
 *   onToggleDarkMode={() => setDarkMode(!darkMode)}
 * />
 * ```
 */
export const FloatingNav = ({
  items,
  darkMode,
  onToggleDarkMode,
  showDarkModeToggle = true,
  position = 'fixed bottom-6 left-1/2 -translate-x-1/2',
  backgroundColor = 'bg-white/70 dark:bg-zinc-900/70',
  borderColor = 'border-green-200 dark:border-green-900/50',
  activeBgColor = 'bg-[#13531C] dark:bg-green-700',
  activeTextColor = 'text-white dark:text-green-50',
  inactiveTextColor = 'text-green-700 dark:text-green-400',
  hoverBgColor = 'hover:bg-green-50 dark:hover:bg-green-900/30',
  dividerColor = 'bg-green-200 dark:bg-green-900/50',
  zIndex = 'z-50',
  className
}: FloatingNavProps) => {
  const location = useLocation();

  return (
    <nav className={cn(position, zIndex, className)}>
      <motion.div
        initial={{
          y: 100,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className={cn(
          backgroundColor,
          'backdrop-blur-xl border rounded-full shadow-lg shadow-green-500/10 dark:shadow-green-500/20',
          borderColor
        )}
      >
        <div className="flex items-center gap-2 px-6 py-3">
          {items.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path !== '/' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-full',
                  isActive
                    ? cn(activeBgColor, activeTextColor, 'shadow-md')
                    : cn(inactiveTextColor, hoverBgColor)
                )}
              >
                {Icon && item.showIcon && (
                  <Icon className="w-4 h-4" />
                )}
                {item.label}
              </Link>
            );
          })}
          
          {showDarkModeToggle && (
            <>
              <div className={cn('w-px h-6 mx-1', dividerColor)} />
              <button
                onClick={onToggleDarkMode}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  inactiveTextColor,
                  hoverBgColor
                )}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
};




