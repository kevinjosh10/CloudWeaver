import { AppType, ScaleLevel } from '../engine/architectureEngine';
import { generateDiagram } from '../engine/diagramBuilder';

export interface ServiceCost {
  service: string;
  monthlyCost: number;
  category: 'Compute' | 'Storage' | 'Database' | 'Network' | 'Edge' | 'Cache';
}

export interface CostEstimate {
  total: number;
  services: ServiceCost[];
}

// Base cost multiplier based on scale level
const scaleMultipliers: Record<ScaleLevel, number> = {
  'Low': 1,
  'Medium': 5,
  'High': 20,
  'Very High': 100,
  'Critical': 500,
};

// Base unit costs (Monthly) for "Low" scale
const basePricing: Record<string, number> = {
  'cloudfront': 15,
  'alb': 20,
  'ecs': 40,
  'rds': 50,
  's3': 5,
  'redis': 30,
  'apigw': 10,
  'lambda': 5,
  'bedrock': 100,
  'dynamo': 20,
  'route53': 5,
  'compute': 40,
  'db': 50
};

const categoryMap: Record<string, ServiceCost['category']> = {
  'cloudfront': 'Edge',
  'alb': 'Network',
  'ecs': 'Compute',
  'rds': 'Database',
  's3': 'Storage',
  'redis': 'Cache',
  'apigw': 'Network',
  'lambda': 'Compute',
  'bedrock': 'Compute',
  'dynamo': 'Database',
  'route53': 'Network',
  'compute': 'Compute',
  'db': 'Database'
};

export function estimateCost(appType: AppType, traffic: ScaleLevel, storage: ScaleLevel, compute: ScaleLevel, isFreeTier: boolean = false): CostEstimate {
  const { nodes } = generateDiagram(appType, isFreeTier);
  
  const services: ServiceCost[] = nodes.map(node => {
    const serviceId = node.id.split('-')[0]; // Handle cases like s3-1, s3-2
    const baseId = basePricing[serviceId] ? serviceId : 'compute'; // Fallback
    
    // Determine which scale multiplier to apply based on the service category
    let multiplier = scaleMultipliers[traffic];
    if (categoryMap[baseId] === 'Storage') multiplier = scaleMultipliers[storage];
    if (categoryMap[baseId] === 'Compute') multiplier = scaleMultipliers[compute];
    
    // If it's the free tier, force cost to 0
    const cost = isFreeTier ? 0 : basePricing[baseId] * multiplier;
    
    return {
      service: node.data.label,
      monthlyCost: cost,
      category: categoryMap[baseId] || 'Compute'
    };
  });

  const total = services.reduce((sum, item) => sum + item.monthlyCost, 0);

  return { total, services };
}
