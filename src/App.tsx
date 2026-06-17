import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      {!showDashboard ? (
        <LandingPage onGenerate={() => setShowDashboard(true)} />
      ) : (
        <DashboardPage />
      )}
    </>
  );
}

export default App;
