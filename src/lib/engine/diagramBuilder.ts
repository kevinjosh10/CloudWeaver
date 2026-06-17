import { AppType } from './architectureEngine';
import { Node, Edge, MarkerType } from '@xyflow/react';
import { ServiceNodeType } from '../../components/flow/ServiceNode';

type CustomNode = Node<ServiceNodeType>;

const templates: Record<AppType | 'Unknown', { nodes: CustomNode[], edges: Edge[] }> = {
  'Streaming': {
    nodes: [
      { id: 'cloudfront', type: 'serviceNode', position: { x: 250, y: 50 }, data: { label: 'CloudFront', iconName: 'Globe', serviceCategory: 'edge', index: 0 } },
      { id: 'alb', type: 'serviceNode', position: { x: 250, y: 200 }, data: { label: 'Application Load Balancer', iconName: 'Split', serviceCategory: 'network', index: 1 } },
      { id: 'ecs', type: 'serviceNode', position: { x: 250, y: 350 }, data: { label: 'ECS Fargate', iconName: 'Server', serviceCategory: 'compute', index: 2 } },
      { id: 'rds', type: 'serviceNode', position: { x: 100, y: 500 }, data: { label: 'RDS PostgreSQL', iconName: 'Database', serviceCategory: 'database', index: 3 } },
      { id: 's3', type: 'serviceNode', position: { x: 400, y: 500 }, data: { label: 'S3 Storage', iconName: 'HardDrive', serviceCategory: 'storage', index: 4 } },
      { id: 'redis', type: 'serviceNode', position: { x: 250, y: 500 }, data: { label: 'ElastiCache', iconName: 'Zap', serviceCategory: 'cache', index: 5 } },
    ],
    edges: [
      { id: 'e1', source: 'cloudfront', target: 'alb', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2', source: 'alb', target: 'ecs', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e3', source: 'ecs', target: 'rds', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e4', source: 'ecs', target: 's3', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e5', source: 'ecs', target: 'redis', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    ]
  },
  'E-commerce': {
    nodes: [
      { id: 'cloudfront', type: 'serviceNode', position: { x: 250, y: 50 }, data: { label: 'CloudFront', iconName: 'Globe', serviceCategory: 'edge', index: 0 } },
      { id: 'alb', type: 'serviceNode', position: { x: 250, y: 200 }, data: { label: 'Application Load Balancer', iconName: 'Split', serviceCategory: 'network', index: 1 } },
      { id: 'ecs', type: 'serviceNode', position: { x: 250, y: 350 }, data: { label: 'ECS Fargate', iconName: 'Server', serviceCategory: 'compute', index: 2 } },
      { id: 'rds', type: 'serviceNode', position: { x: 100, y: 500 }, data: { label: 'RDS Aurora', iconName: 'Database', serviceCategory: 'database', index: 3 } },
      { id: 'redis', type: 'serviceNode', position: { x: 400, y: 500 }, data: { label: 'ElastiCache Redis', iconName: 'Zap', serviceCategory: 'cache', index: 4 } },
      { id: 's3', type: 'serviceNode', position: { x: 400, y: 200 }, data: { label: 'S3 Assets', iconName: 'Image', serviceCategory: 'storage', index: 5 } },
    ],
    edges: [
      { id: 'e1', source: 'cloudfront', target: 'alb', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2', source: 'alb', target: 'ecs', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e3', source: 'ecs', target: 'rds', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e4', source: 'ecs', target: 'redis', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e5', source: 'cloudfront', target: 's3', sourceHandle: 'right', targetHandle: 'left', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    ]
  },
  'AI': {
    nodes: [
      { id: 'cloudfront', type: 'serviceNode', position: { x: 250, y: 50 }, data: { label: 'CloudFront', iconName: 'Globe', serviceCategory: 'edge', index: 0 } },
      { id: 'apigw', type: 'serviceNode', position: { x: 250, y: 200 }, data: { label: 'API Gateway', iconName: 'Network', serviceCategory: 'network', index: 1 } },
      { id: 'lambda', type: 'serviceNode', position: { x: 250, y: 350 }, data: { label: 'Lambda', iconName: 'Code', serviceCategory: 'compute', index: 2 } },
      { id: 'bedrock', type: 'serviceNode', position: { x: 100, y: 500 }, data: { label: 'Amazon Bedrock', iconName: 'BrainCircuit', serviceCategory: 'compute', index: 3 } },
      { id: 'dynamo', type: 'serviceNode', position: { x: 400, y: 500 }, data: { label: 'DynamoDB', iconName: 'Database', serviceCategory: 'database', index: 4 } },
    ],
    edges: [
      { id: 'e1', source: 'cloudfront', target: 'apigw', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2', source: 'apigw', target: 'lambda', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e3', source: 'lambda', target: 'bedrock', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e4', source: 'lambda', target: 'dynamo', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    ]
  },
  'SaaS': {
    nodes: [
      { id: 'cloudfront', type: 'serviceNode', position: { x: 250, y: 50 }, data: { label: 'CloudFront', iconName: 'Globe', serviceCategory: 'edge', index: 0 } },
      { id: 'alb', type: 'serviceNode', position: { x: 250, y: 200 }, data: { label: 'Application Load Balancer', iconName: 'Split', serviceCategory: 'network', index: 1 } },
      { id: 'ecs', type: 'serviceNode', position: { x: 250, y: 350 }, data: { label: 'ECS Fargate', iconName: 'Server', serviceCategory: 'compute', index: 2 } },
      { id: 'rds', type: 'serviceNode', position: { x: 100, y: 500 }, data: { label: 'RDS PostgreSQL', iconName: 'Database', serviceCategory: 'database', index: 3 } },
      { id: 'redis', type: 'serviceNode', position: { x: 400, y: 500 }, data: { label: 'ElastiCache', iconName: 'Zap', serviceCategory: 'cache', index: 4 } },
    ],
    edges: [
      { id: 'e1', source: 'cloudfront', target: 'alb', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2', source: 'alb', target: 'ecs', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e3', source: 'ecs', target: 'rds', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e4', source: 'ecs', target: 'redis', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    ]
  },
  'Blog': {
    nodes: [
      { id: 'route53', type: 'serviceNode', position: { x: 250, y: 50 }, data: { label: 'Route 53', iconName: 'Compass', serviceCategory: 'network', index: 0 } },
      { id: 'cloudfront', type: 'serviceNode', position: { x: 250, y: 200 }, data: { label: 'CloudFront', iconName: 'Globe', serviceCategory: 'edge', index: 1 } },
      { id: 's3', type: 'serviceNode', position: { x: 250, y: 350 }, data: { label: 'S3 Website Bucket', iconName: 'HardDrive', serviceCategory: 'storage', index: 2 } },
    ],
    edges: [
      { id: 'e1', source: 'route53', target: 'cloudfront', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2', source: 'cloudfront', target: 's3', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    ]
  },
  'Real-time Chat': {
    nodes: [
      { id: 'cloudfront', type: 'serviceNode', position: { x: 250, y: 50 }, data: { label: 'CloudFront', iconName: 'Globe', serviceCategory: 'edge', index: 0 } },
      { id: 'apigw', type: 'serviceNode', position: { x: 250, y: 200 }, data: { label: 'API Gateway (WebSockets)', iconName: 'Radio', serviceCategory: 'network', index: 1 } },
      { id: 'lambda', type: 'serviceNode', position: { x: 250, y: 350 }, data: { label: 'Lambda', iconName: 'Code', serviceCategory: 'compute', index: 2 } },
      { id: 'dynamo', type: 'serviceNode', position: { x: 250, y: 500 }, data: { label: 'DynamoDB', iconName: 'Database', serviceCategory: 'database', index: 3 } },
    ],
    edges: [
      { id: 'e1', source: 'cloudfront', target: 'apigw', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2', source: 'apigw', target: 'lambda', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e3', source: 'lambda', target: 'dynamo', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    ]
  },
  // Default fallback map for other types
  'Unknown': {
    nodes: [
      { id: 'cloudfront', type: 'serviceNode', position: { x: 250, y: 50 }, data: { label: 'CloudFront', iconName: 'Globe', serviceCategory: 'edge', index: 0 } },
      { id: 'alb', type: 'serviceNode', position: { x: 250, y: 200 }, data: { label: 'Load Balancer', iconName: 'Split', serviceCategory: 'network', index: 1 } },
      { id: 'compute', type: 'serviceNode', position: { x: 250, y: 350 }, data: { label: 'Compute Engine', iconName: 'Server', serviceCategory: 'compute', index: 2 } },
      { id: 'db', type: 'serviceNode', position: { x: 250, y: 500 }, data: { label: 'Primary Database', iconName: 'Database', serviceCategory: 'database', index: 3 } },
    ],
    edges: [
      { id: 'e1', source: 'cloudfront', target: 'alb', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2', source: 'alb', target: 'compute', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e3', source: 'compute', target: 'db', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    ]
  }
};

// Aliases for missing specific maps
templates['Marketplace'] = templates['E-commerce'];
templates['Social Media'] = templates['SaaS']; // simplified for now
templates['Portfolio'] = templates['Blog'];
templates['Enterprise'] = templates['SaaS'];

export function generateDiagram(appType: AppType) {
  const template = templates[appType] || templates['Unknown'];
  return template;
}
