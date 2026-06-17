import { AppType } from './architectureEngine';

export interface ScalingTier {
  range: string;
  title: string;
  description: string;
  actionItems: string[];
}

export interface ScalingStrategy {
  tiers: ScalingTier[];
}

export function generateScalingStrategy(appType: AppType): ScalingStrategy {
  const isStateful = ['Real-time Chat', 'Streaming', 'Social Media'].includes(appType);
  const isComputeHeavy = ['AI'].includes(appType);

  const tiers: ScalingTier[] = [
    {
      range: '0–10K Users',
      title: 'The MVP Phase',
      description: 'Focus on speed to market and cost efficiency. Single region deployment.',
      actionItems: [
        'Use managed services to reduce ops overhead.',
        'Implement basic CloudWatch alarms.',
        'Keep database on the smallest viable instance.'
      ]
    },
    {
      range: '10K–100K Users',
      title: 'Growth & Hardening',
      description: 'Traffic becomes consistent. Focus on high availability.',
      actionItems: [
        'Enable Auto Scaling groups for compute.',
        'Deploy Read Replicas for databases.',
        'Implement ElastiCache/Redis to offload database reads.'
      ]
    },
    {
      range: '100K–1M Users',
      title: 'Scale Out',
      description: 'Architecture must handle significant spikes.',
      actionItems: [
        isStateful ? 'Implement horizontal database sharding.' : 'Migrate to serverless Aurora for auto-scaling.',
        isComputeHeavy ? 'Use dedicated GPU clusters with queue-based processing (SQS).' : 'Implement asynchronous background workers.',
        'Set up multi-region active-passive failover.'
      ]
    },
    {
      range: '1M+ Users',
      title: 'Hyperscale',
      description: 'Global reach and critical reliability.',
      actionItems: [
        'Multi-region active-active deployment using Route53 latency routing.',
        'Custom caching layers and edge computing.',
        'Dedicated infrastructure engineering team required.'
      ]
    }
  ];

  return { tiers };
}
