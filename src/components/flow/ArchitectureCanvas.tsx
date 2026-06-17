import { useEffect, useState } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState,
  Panel,
  BackgroundVariant,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useStore } from '../../store/useStore';
import { ServiceNode } from './ServiceNode';
import { generateDiagram } from '../../lib/engine/diagramBuilder';

const nodeTypes = {
  serviceNode: ServiceNode,
};

export function ArchitectureCanvas() {
  const { analysisResult } = useStore();
  const initialDiagram = analysisResult ? generateDiagram(analysisResult.appType, analysisResult.isFreeTier) : { nodes: [], edges: [] };
  
  // Format edges to force inline styling and disable CSS animations so html-to-image can capture them
  const formattedInitialEdges = initialDiagram.edges.map(edge => ({
    ...edge,
    animated: false,
    style: { stroke: '#4b5563', strokeWidth: 2, ...edge.style }
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialDiagram.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(formattedInitialEdges);
  const [isGenerating, setIsGenerating] = useState(true);

  // Generate the diagram when the component mounts or analysisResult changes
  useEffect(() => {
    if (!analysisResult) return;
    
    setIsGenerating(true);
    const { nodes: newNodes, edges: newEdges } = generateDiagram(analysisResult.appType, analysisResult.isFreeTier);
    
    const formattedNewEdges = newEdges.map(edge => ({
      ...edge,
      animated: false,
      style: { stroke: '#4b5563', strokeWidth: 2, ...edge.style }
    }));

    setNodes(newNodes);
    setEdges(formattedNewEdges);
    
    // Simulate generation overlay for dramatic effect
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [analysisResult, setNodes, setEdges]);

  // Dark mode specific styles for React Flow background and controls are handled via CSS or props
  
  if (!analysisResult) {
    return <div className="w-full h-full flex items-center justify-center text-gray-400">No architecture data found.</div>;
  }

  return (
    <div className="w-full h-full relative glass-panel rounded-2xl overflow-hidden border border-white/5">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        className="bg-[#050505]"
        minZoom={0.5}
        maxZoom={2}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="rgba(255,255,255,0.1)" />
        <Controls className="bg-[#1a1a1c] border-white/10 fill-white" showInteractive={false} />
        
        <Panel position="top-right" className="glass-card p-4 rounded-xl m-4 max-w-sm">
          <h3 className="text-white font-semibold mb-2">Architecture Details</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-500">Type:</span>
              <span className="text-blue-400 font-medium">{analysisResult.appType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Target Scale:</span>
              <span className="text-white">{analysisResult.scale}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Traffic:</span>
              <span className="text-white">{analysisResult.traffic}</span>
            </div>
          </div>
        </Panel>
      </ReactFlow>

      {/* Generation Overlay */}
      {isGenerating && (
        <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-blue-400 font-medium text-glow animate-pulse">Provisioning Virtual Architecture...</p>
        </div>
      )}
    </div>
  );
}
