import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, DollarSign, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { generateScores } from '../../lib/engine/scoreEngine';

function CircularProgress({ value, color }: { value: number, color: string }) {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCurrentValue(value);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  const strokeDasharray = `${currentValue}, 100`;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        {/* Background Circle */}
        <path
          className="text-gray-800"
          strokeWidth="3"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {/* Progress Circle */}
        <path
          className={color}
          strokeDasharray={strokeDasharray}
          strokeWidth="3"
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute text-xl font-bold text-white">{currentValue}</div>
    </div>
  );
}

export function InfrastructureScores() {
  const { analysisResult, infrastructureScores, setInfrastructureScores } = useStore();

  useEffect(() => {
    if (analysisResult && !infrastructureScores) {
      setInfrastructureScores(generateScores(analysisResult));
    }
  }, [analysisResult, infrastructureScores, setInfrastructureScores]);

  if (!infrastructureScores) return null;

  const scoreItems = [
    { label: 'Scalability', value: infrastructureScores.scalability, icon: <ArrowUpRight className="w-5 h-5" />, color: 'text-blue-500' },
    { label: 'Security', value: infrastructureScores.security, icon: <ShieldCheck className="w-5 h-5" />, color: 'text-green-500' },
    { label: 'Reliability', value: infrastructureScores.reliability, icon: <Activity className="w-5 h-5" />, color: 'text-purple-500' },
    { label: 'Cost Efficiency', value: infrastructureScores.costEfficiency, icon: <DollarSign className="w-5 h-5" />, color: 'text-yellow-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-full p-4">
      {scoreItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center gap-4 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all"
        >
          <div className="absolute top-4 left-4 text-gray-500 group-hover:text-white transition-colors">
            {item.icon}
          </div>
          <CircularProgress value={item.value} color={item.color} />
          <span className="text-gray-300 font-medium tracking-wide">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
