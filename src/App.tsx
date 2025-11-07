import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Theme } from './settings/types';
import { PortfolioWebsite } from './components/generated/PortfolioWebsite';
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
      <Routes>
        <Route path="/" element={<Navigate to="/work" replace />} />
        <Route path="/work" element={<PortfolioWebsite />} />
        <Route path="/about" element={<PortfolioWebsite />} />
      </Routes>
    );
  }, []);
  if (container === 'centered') {
    return <div className="h-full w-full flex flex-col items-center justify-center" style={{
      background: "radial-gradient(circle, #123623 6.84%, #18181b 68.06%)"
    }}>
        {generatedComponent}
      </div>;
  } else {
    return <div style={{
      background: "radial-gradient(circle, #123623 6.84%, #18181b 68.06%)"
    }}>{generatedComponent}</div>;
  }
}
export default App;