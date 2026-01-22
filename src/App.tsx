import { useMemo } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, Theme } from './settings/types';
import { PortfolioWebsite } from './components/generated/PortfolioWebsite';
import PrototypesPage from './components/PrototypesPage';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { Navigation } from './components/Navigation';
import { Agentation } from 'agentation';
import React from 'react';
let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';
function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  setTheme(theme);
  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    return (
      <DarkModeProvider>
        <AppWithRoutes />
      </DarkModeProvider>
    );
  }, []);
  if (container === 'centered') {
    return <div className="h-full w-full flex flex-col items-center justify-center">
      {generatedComponent}
    </div>;
  } else {
    return <div>{generatedComponent}</div>;
  }
}

function AppWithRoutes() {
  const location = useLocation();

  return (
    <>
      {import.meta.env.DEV && <Agentation />}
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/work" replace />} />
          <Route path="/work" element={<PortfolioWebsite />} />
          <Route path="/about" element={<PortfolioWebsite />} />
          <Route path="/prototypes" element={<PrototypesPage />} />
          <Route path="/prototypes/:slug" element={<PrototypesPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;