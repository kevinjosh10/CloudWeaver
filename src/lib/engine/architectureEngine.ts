export type AppType = 
  | 'SaaS' 
  | 'Streaming' 
  | 'AI' 
  | 'E-commerce' 
  | 'Blog' 
  | 'Marketplace' 
  | 'Social Media' 
  | 'Real-time Chat' 
  | 'Portfolio' 
  | 'Enterprise'
  | 'Unknown';

export type ScaleLevel = 'Low' | 'Medium' | 'High' | 'Very High' | 'Critical';

export interface ArchitectureRequirements {
  appType: AppType;
  traffic: ScaleLevel;
  scale: string;
  storage: ScaleLevel;
  compute: ScaleLevel;
  latency: ScaleLevel;
  isFreeTier?: boolean;
}

const typeKeywords: Record<AppType, string[]> = {
  'Streaming': ['netflix', 'youtube', 'spotify', 'video', 'music', 'stream', 'streaming', 'vod'],
  'SaaS': ['saas', 'software as a service', 'b2b', 'subscription', 'platform', 'dashboard', 'workspace'],
  'E-commerce': ['amazon', 'shopify', 'store', 'shop', 'ecommerce', 'e-commerce', 'buy', 'cart', 'sell'],
  'AI': ['ai', 'chatgpt', 'openai', 'llm', 'machine learning', 'bot', 'chatbot', 'generator', 'stable diffusion'],
  'Blog': ['blog', 'medium', 'content', 'article', 'newsletter', 'ghost'],
  'Marketplace': ['airbnb', 'uber', 'marketplace', 'fiverr', 'ebay', 'craigslist', 'directory'],
  'Social Media': ['facebook', 'twitter', 'instagram', 'tiktok', 'social', 'network', 'community'],
  'Real-time Chat': ['chat', 'whatsapp', 'slack', 'discord', 'messenger', 'realtime', 'real-time', 'websocket'],
  'Portfolio': ['portfolio', 'resume', 'cv', 'personal site', 'landing page', 'static'],
  'Enterprise': ['enterprise', 'erp', 'crm', 'internal', 'corporate', 'b2b enterprise'],
  'Unknown': []
};

// Advanced regex to find numbers followed by scale indicators
const scaleRegex = /(\d+(?:\.\d+)?)\s*(k|m|b|thousand|million|billion|users|requests)/i;

export function analyzeArchitecture(input: string): ArchitectureRequirements {
  const normalizedInput = input.toLowerCase();
  
  // 1. Detect App Type
  let detectedType: AppType = 'Unknown';
  let maxMatches = 0;

  for (const [type, keywords] of Object.entries(typeKeywords)) {
    const matches = keywords.filter(kw => normalizedInput.includes(kw)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      detectedType = type as AppType;
    }
  }

  // Default fallback if no keywords matched but it sounds like an app
  if (detectedType === 'Unknown') {
    if (normalizedInput.includes('app') || normalizedInput.includes('clone')) {
      detectedType = 'SaaS'; // Sensible default
    } else {
      detectedType = 'Portfolio';
    }
  }

  // 2. Extract Scale
  let scaleString = '1K Users';
  let numericScale = 1000;
  
  const scaleMatch = normalizedInput.match(scaleRegex);
  if (scaleMatch) {
    const val = parseFloat(scaleMatch[1]);
    const modifier = scaleMatch[2].toLowerCase();
    
    if (['k', 'thousand'].includes(modifier)) {
      numericScale = val * 1000;
      scaleString = `${val}K Users`;
    } else if (['m', 'million'].includes(modifier)) {
      numericScale = val * 1000000;
      scaleString = `${val}M Users`;
    } else if (['b', 'billion'].includes(modifier)) {
      numericScale = val * 1000000000;
      scaleString = `${val}B Users`;
    } else {
      numericScale = val;
      scaleString = `${val} Users`;
    }
  }

  // 3. Determine Needs based on Scale and Type
  let traffic: ScaleLevel = 'Low';
  let storage: ScaleLevel;
  let compute: ScaleLevel = 'Low';
  let latency: ScaleLevel = 'Medium';

  // Traffic rules
  if (numericScale > 1000000) traffic = 'Critical';
  else if (numericScale > 100000) traffic = 'Very High';
  else if (numericScale > 10000) traffic = 'High';
  else if (numericScale > 1000) traffic = 'Medium';

  // Specific Type Adjustments
  switch (detectedType) {
    case 'Streaming':
      storage = 'Very High';
      latency = 'Critical';
      compute = 'High';
      break;
    case 'AI':
      compute = 'Critical';
      latency = 'High';
      storage = 'Medium';
      break;
    case 'E-commerce':
      storage = 'Medium';
      latency = 'High'; // Fast page loads
      break;
    case 'Real-time Chat':
      latency = 'Critical';
      compute = 'Medium';
      storage = 'High'; // Chat history
      break;
    case 'Blog':
    case 'Portfolio':
      storage = 'Low';
      compute = 'Low';
      latency = 'Medium';
      break;
    case 'Social Media':
      storage = 'Very High';
      compute = 'High';
      latency = 'High';
      break;
    default:
      // Baseline
      storage = traffic === 'Critical' ? 'High' : 'Medium';
      compute = traffic === 'Critical' ? 'High' : 'Medium';
  }

  // Scale up needs if traffic is insane
  if (traffic === 'Critical') {
    if (storage === 'Medium') storage = 'High';
    if (compute === 'Medium') compute = 'High';
  }

  // 4. Detect Free Tier
  const isFreeTier = normalizedInput.includes('$0') || normalizedInput.includes('free') || normalizedInput.includes('static');

  return {
    appType: detectedType,
    traffic,
    scale: scaleString,
    storage,
    compute,
    latency,
    isFreeTier
  };
}
