import { useState, lazy, Suspense } from 'react';
import { LandingPage } from './pages/LandingPage';

const DashboardPage = lazy(() => import('./pages/DashboardPage').then(module => ({ default: module.DashboardPage })));

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      {!showDashboard ? (
        <LandingPage onGenerate={() => setShowDashboard(true)} />
      ) : (
        <Suspense fallback={
          <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }>
          <DashboardPage />
        </Suspense>
      )}
    </>
  );
}

export default App;
