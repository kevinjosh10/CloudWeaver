import { ArchitectureRequirements } from './architectureEngine';

export interface Scores {
  scalability: number;
  security: number;
  reliability: number;
  costEfficiency: number;
}

export function generateScores(reqs: ArchitectureRequirements): Scores {
  let scalability = 80;
  let security = 85;
  let reliability = 90;
  let costEfficiency = 85;

  // Adjust based on App Type
  switch (reqs.appType) {
    case 'Streaming':
      scalability = 98;
      costEfficiency = 70; // CDN and bandwidth is expensive
      break;
    case 'E-commerce':
      reliability = 99;
      security = 95;
      break;
    case 'AI':
      scalability = 95;
      costEfficiency = 65; // GPU compute is expensive
      break;
    case 'SaaS':
      reliability = 95;
      security = 90;
      break;
    case 'Blog':
    case 'Portfolio':
      costEfficiency = 98;
      scalability = 99; // Static sites scale easily
      break;
  }

  // Adjust based on Traffic
  if (reqs.traffic === 'Critical' || reqs.traffic === 'Very High') {
    scalability += 5;
    costEfficiency -= 10;
    reliability += 2;
  }

  // Ensure scores remain between 50 and 99
  const clamp = (val: number) => Math.min(Math.max(Math.round(val), 50), 99);

  return {
    scalability: clamp(scalability),
    security: clamp(security),
    reliability: clamp(reliability),
    costEfficiency: clamp(costEfficiency),
  };
}
