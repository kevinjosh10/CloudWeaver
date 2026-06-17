import { useState } from 'react';
import { ArchitectureCanvas } from '../components/flow/ArchitectureCanvas';
import { CostAnalysis } from '../components/dashboard/CostAnalysis';
import { InfrastructureScores } from '../components/dashboard/InfrastructureScores';
import { SecurityAnalyzer } from '../components/dashboard/SecurityAnalyzer';
import { ScalingStrategyView } from '../components/dashboard/ScalingStrategy';
import { ExportPanel } from '../components/dashboard/ExportPanel';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export function DashboardPage() {
  const { analysisResult } = useStore();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Architecture' | 'Cost' | 'Security' | 'Scaling' | 'Exports'>('Overview');

  if (!analysisResult) {
    return <div className="text-white text-center mt-20">Please generate an architecture first.</div>;
  }

  const tabs = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Architecture', label: 'Architecture' },
    { id: 'Cost', label: 'Cost Analysis' },
    { id: 'Security', label: 'Security' },
    { id: 'Scaling', label: 'Scaling' },
    { id: 'Exports', label: 'Exports' }
  ] as const;

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-white/5 glass-panel flex items-center px-6 justify-between shrink-0 z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">C</span>
          </div>
          <span className="text-white font-semibold tracking-tight">CloudWeaver</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium h-full overflow-x-auto custom-scrollbar">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative h-full px-2 flex items-center transition-colors whitespace-nowrap ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            {analysisResult.appType}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === 'Overview' && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6 flex flex-col gap-6 overflow-y-auto">
              <InfrastructureScores />
              <div className="flex-1 min-h-[500px] border border-white/5 rounded-2xl overflow-hidden relative">
                {/* To allow html2canvas to capture the architecture view properly from the overview tab, we add a class here too. */}
                <ArchitectureCanvas />
              </div>
            </motion.div>
          )}

          {activeTab === 'Architecture' && (
            <motion.div key="architecture" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6">
              <ArchitectureCanvas />
            </motion.div>
          )}

          {activeTab === 'Cost' && (
            <motion.div key="cost" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6 overflow-y-auto">
              <CostAnalysis />
            </motion.div>
          )}

          {activeTab === 'Security' && (
            <motion.div key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6 overflow-y-auto">
              <SecurityAnalyzer />
            </motion.div>
          )}

          {activeTab === 'Scaling' && (
            <motion.div key="scaling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6 overflow-y-auto">
              <ScalingStrategyView />
            </motion.div>
          )}

          {activeTab === 'Exports' && (
            <motion.div key="exports" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6 flex flex-col gap-6 overflow-y-auto">
              <ExportPanel />
              
              <div className="w-full flex-1 min-h-[500px] border border-white/5 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505]/20 backdrop-blur-[2px] pointer-events-none">
                  <span className="px-4 py-2 rounded-xl bg-black/50 text-white/70 font-semibold tracking-wider text-sm border border-white/10 backdrop-blur-md">EXPORT PREVIEW</span>
                </div>
                <ArchitectureCanvas />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
