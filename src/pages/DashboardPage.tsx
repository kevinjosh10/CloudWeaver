import { ArchitectureCanvas } from '../components/flow/ArchitectureCanvas';
import { useStore } from '../store/useStore';

export function DashboardPage() {
  const { analysisResult } = useStore();

  if (!analysisResult) {
    return <div className="text-white text-center mt-20">Please generate an architecture first.</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-white/5 glass-panel flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">C</span>
          </div>
          <span className="text-white font-semibold tracking-tight">CloudWeaver</span>
        </div>
        
        {/* Placeholder for tabs in Phase 3 */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button className="text-white border-b-2 border-blue-500 py-5">Architecture</button>
          <button className="text-gray-500 hover:text-gray-300 py-5">Cost Analysis</button>
          <button className="text-gray-500 hover:text-gray-300 py-5">Security</button>
        </nav>
        
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            {analysisResult.appType}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* Architecture Canvas Area */}
        <div className="flex-1 h-[calc(100vh-8rem)]">
          <ArchitectureCanvas />
        </div>

      </main>
    </div>
  );
}
