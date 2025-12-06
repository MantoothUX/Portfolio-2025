import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FloatingNav, NavItem } from './src/components/FloatingNav';
import { Briefcase, User, Home } from 'lucide-react';

/**
 * Example usage of the FloatingNav component
 * 
 * This demonstrates how to integrate the FloatingNav component
 * into your React application with React Router.
 */

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Define your navigation items
  const navItems: NavItem[] = [
    {
      path: '/',
      label: 'Home',
      icon: Home,
      showIcon: false // Set to true to show icons
    },
    {
      path: '/work',
      label: 'Work',
      icon: Briefcase,
      showIcon: false
    },
    {
      path: '/about',
      label: 'About',
      icon: User,
      showIcon: false
    }
  ];

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode class to document
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        {/* Your page content here */}
        <main className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-4">Your Content</h1>
          <p>Page content goes here...</p>
        </main>

        {/* Floating Navigation */}
        <FloatingNav
          items={navItems}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

/**
 * Example with custom colors:
 * 
 * <FloatingNav
 *   items={navItems}
 *   darkMode={darkMode}
 *   onToggleDarkMode={toggleDarkMode}
 *   activeBgColor="bg-blue-600 dark:bg-blue-800"
 *   inactiveTextColor="text-blue-600 dark:text-blue-400"
 *   hoverBgColor="hover:bg-blue-50 dark:hover:bg-blue-900/30"
 *   borderColor="border-blue-200 dark:border-blue-900/50"
 *   dividerColor="bg-blue-200 dark:bg-blue-900/50"
 * />
 * 
 * Example with custom position (top instead of bottom):
 * 
 * <FloatingNav
 *   items={navItems}
 *   darkMode={darkMode}
 *   onToggleDarkMode={toggleDarkMode}
 *   position="fixed top-6 left-1/2 -translate-x-1/2"
 * />
 * 
 * Example without dark mode toggle:
 * 
 * <FloatingNav
 *   items={navItems}
 *   darkMode={darkMode}
 *   onToggleDarkMode={toggleDarkMode}
 *   showDarkModeToggle={false}
 * />
 */




