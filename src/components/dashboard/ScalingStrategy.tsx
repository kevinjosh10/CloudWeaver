import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { generateScalingStrategy } from '../../lib/engine/scalingEngine';

export function ScalingStrategyView() {
  const { analysisResult, scalingStrategy, setScalingStrategy } = useStore();

  useEffect(() => {
    if (analysisResult && !scalingStrategy) {
      setScalingStrategy(generateScalingStrategy(analysisResult.appType));
    }
  }, [analysisResult, scalingStrategy, setScalingStrategy]);

  if (!scalingStrategy) return null;

  return (
    <div className="w-full h-full flex flex-col p-4 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <TrendingUp className="text-blue-500" /> Evolution Path
        </h2>
        <p className="text-gray-400">Recommended infrastructure upgrades as your user base grows.</p>
      </div>

      <div className="relative border-l-2 border-white/10 ml-6 space-y-12 pb-12">
        {scalingStrategy.tiers.map((tier, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative pl-8"
          >
            {/* Timeline Node */}
            <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#050505] border-2 border-blue-500 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-400" />
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h3 className="text-xl font-bold text-white">{tier.title}</h3>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold whitespace-nowrap">
                  {tier.range}
                </span>
              </div>
              <p className="text-gray-400 mb-4">{tier.description}</p>
              
              <ul className="space-y-2">
                {tier.actionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <ArrowRight className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
