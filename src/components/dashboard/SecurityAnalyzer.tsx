import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Info } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { generateSecurityReport } from '../../lib/engine/securityEngine';

export function SecurityAnalyzer() {
  const { analysisResult, nodes, securityReport, setSecurityReport } = useStore();

  useEffect(() => {
    if (analysisResult && !securityReport) {
      const hasDb = nodes.some(n => n.data.serviceCategory === 'database');
      const hasStorage = nodes.some(n => n.data.serviceCategory === 'storage');
      setSecurityReport(generateSecurityReport(analysisResult.appType, hasDb, hasStorage));
    }
  }, [analysisResult, nodes, securityReport, setSecurityReport]);

  if (!securityReport) return null;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-white">Security Posture</h2>
          <p className="text-gray-400">Automated architecture security scan.</p>
        </div>
        <div className="w-16 h-16 rounded-full border-4 border-green-500/30 flex items-center justify-center">
          <span className="text-2xl font-bold text-green-400">{securityReport.score}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {securityReport.items.map((item, i) => {
          const isWarning = item.type === 'warning';
          const Icon = isWarning ? ShieldAlert : (item.type === 'recommendation' ? Info : ShieldCheck);
          const colorClass = isWarning ? 'text-red-400 bg-red-400/10 border-red-400/20' : 
                            (item.type === 'recommendation' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' : 'text-green-400 bg-green-400/10 border-green-400/20');
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 rounded-xl border border-white/5 flex gap-4 items-start hover:border-white/20 transition-all"
            >
              <div className={`p-3 rounded-xl ${colorClass}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${colorClass}`}>
                    {item.severity} severity
                  </span>
                </div>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
