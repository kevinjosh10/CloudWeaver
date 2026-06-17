import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export type ServiceNodeType = {
  label: string;
  iconName: keyof typeof Icons;
  serviceCategory: 'compute' | 'storage' | 'database' | 'network' | 'cache' | 'edge';
  index: number; // For staggered animation
};

const categoryColors = {
  compute: 'from-orange-500 to-orange-600 border-orange-500/50 text-orange-100',
  storage: 'from-green-500 to-green-600 border-green-500/50 text-green-100',
  database: 'from-blue-500 to-blue-600 border-blue-500/50 text-blue-100',
  network: 'from-purple-500 to-purple-600 border-purple-500/50 text-purple-100',
  cache: 'from-red-500 to-red-600 border-red-500/50 text-red-100',
  edge: 'from-pink-500 to-pink-600 border-pink-500/50 text-pink-100',
};

export const ServiceNode = memo(({ data, isConnectable }: NodeProps<ServiceNodeType>) => {
  const Icon = Icons[data.iconName] as React.ElementType || Icons.Server;
  const colorClass = categoryColors[data.serviceCategory] || categoryColors.compute;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: data.index * 0.2, // Staggered animation
        type: 'spring',
        bounce: 0.4
      }}
      className={`relative min-w-[180px] p-[1px] rounded-2xl bg-gradient-to-br ${colorClass} shadow-2xl`}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-white border-2 border-gray-800"
      />
      
      <div className="bg-[#0a0a0c]/90 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-3 w-full h-full border border-white/5">
        <div className={`p-2 rounded-xl bg-gradient-to-br ${colorClass} shadow-inner`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white tracking-wide">{data.label}</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">{data.serviceCategory}</span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-white border-2 border-gray-800"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-white border-2 border-gray-800"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-white border-2 border-gray-800"
      />
    </motion.div>
  );
});
