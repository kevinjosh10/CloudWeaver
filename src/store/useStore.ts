import { create } from 'zustand';
import { ArchitectureRequirements, AppType } from '../lib/engine/architectureEngine';
import { Node, Edge } from '@xyflow/react';
import { CostEstimate } from '../lib/pricing/pricingEngine';
import { Scores } from '../lib/engine/scoreEngine';
import { SecurityReport } from '../lib/engine/securityEngine';
import { ScalingStrategy } from '../lib/engine/scalingEngine';

interface AppState {
  userInput: string;
  setUserInput: (input: string) => void;
  
  analysisResult: ArchitectureRequirements | null;
  setAnalysisResult: (result: ArchitectureRequirements) => void;
  
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;

  costEstimate: CostEstimate | null;
  setCostEstimate: (estimate: CostEstimate) => void;
  
  infrastructureScores: Scores | null;
  setInfrastructureScores: (scores: Scores) => void;

  securityReport: SecurityReport | null;
  setSecurityReport: (report: SecurityReport) => void;

  scalingStrategy: ScalingStrategy | null;
  setScalingStrategy: (strategy: ScalingStrategy) => void;
  
  reset: () => void;
}

export const useStore = create<AppState>((set) => ({
  userInput: '',
  setUserInput: (userInput) => set({ userInput }),
  
  analysisResult: null,
  setAnalysisResult: (analysisResult) => set({ analysisResult }),
  
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  costEstimate: null,
  setCostEstimate: (costEstimate) => set({ costEstimate }),
  
  infrastructureScores: null,
  setInfrastructureScores: (infrastructureScores) => set({ infrastructureScores }),

  securityReport: null,
  setSecurityReport: (securityReport) => set({ securityReport }),

  scalingStrategy: null,
  setScalingStrategy: (scalingStrategy) => set({ scalingStrategy }),
  
  reset: () => set({
    userInput: '',
    analysisResult: null,
    nodes: [],
    edges: [],
    costEstimate: null,
    infrastructureScores: null,
    securityReport: null,
    scalingStrategy: null
  })
}));
