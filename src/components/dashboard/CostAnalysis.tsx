import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { useStore } from '../../store/useStore';
import { estimateCost } from '../../lib/pricing/pricingEngine';

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];

export function CostAnalysis() {
  const { analysisResult, costEstimate, setCostEstimate } = useStore();

  useEffect(() => {
    if (analysisResult && !costEstimate) {
      const estimate = estimateCost(
        analysisResult.appType,
        analysisResult.traffic,
        analysisResult.storage,
        analysisResult.compute,
        analysisResult.isFreeTier
      );
      setCostEstimate(estimate);
    }
  }, [analysisResult, costEstimate, setCostEstimate]);

  if (!costEstimate) return null;

  // Group by category for the pie chart
  const categoryDataMap: Record<string, number> = {};
  costEstimate.services.forEach(s => {
    categoryDataMap[s.category] = (categoryDataMap[s.category] || 0) + s.monthlyCost;
  });
  const pieData = Object.keys(categoryDataMap).map(key => ({ name: key, value: categoryDataMap[key] }));

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 p-4">
      {/* Summary Card */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card rounded-2xl p-8 flex-1 border border-white/5 flex flex-col justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Estimated Monthly Cost</h2>
          <p className="text-gray-400">Based on {analysisResult?.scale} target scale</p>
        </div>
        
        <div className="my-8">
          <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-500">
            ${costEstimate.total.toLocaleString()}
          </div>
          <p className="text-gray-500 mt-2">/ month</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-semibold border-b border-white/10 pb-2">Service Breakdown</h3>
          <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {costEstimate.services.sort((a, b) => b.monthlyCost - a.monthlyCost).map((service, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <div>
                  <div className="text-gray-200">{service.service}</div>
                  <div className="text-xs text-gray-500">{service.category}</div>
                </div>
                <div className="text-white font-medium">${service.monthlyCost.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Chart Card */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-8 flex-1 border border-white/5 flex flex-col"
      >
        <h3 className="text-white font-semibold mb-6">Cost Distribution by Category</h3>
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                stroke="rgba(255,255,255,0.05)"
              >
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'rgba(10, 10, 10, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => `$${Number(value || 0).toLocaleString()}`}
              />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#aaa' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
