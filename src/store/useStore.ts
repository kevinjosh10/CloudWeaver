import { create } from 'zustand';
import { ArchitectureRequirements, AppType } from '../lib/engine/architectureEngine';
import { Node, Edge } from '@xyflow/react';

interface AppState {
  // Input
  userInput: string;
  setUserInput: (input: string) => void;
  
  // Analysis
  analysisResult: ArchitectureRequirements | null;
  setAnalysisResult: (result: ArchitectureRequirements) => void;
  
  // Architecture Flow
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  
  // Actions
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
  
  reset: () => set({
    userInput: '',
    analysisResult: null,
    nodes: [],
    edges: []
  })
}));
