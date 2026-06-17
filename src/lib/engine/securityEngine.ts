import { AppType } from './architectureEngine';

export interface SecurityItem {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'recommendation' | 'best-practice';
  severity: 'high' | 'medium' | 'low';
}

export interface SecurityReport {
  score: number;
  items: SecurityItem[];
}

export function generateSecurityReport(appType: AppType, hasDatabase: boolean, hasStorage: boolean): SecurityReport {
  const items: SecurityItem[] = [
    {
      id: 'iam',
      title: 'Use IAM Least Privilege',
      description: 'Ensure all roles and policies strictly grant only the permissions required to operate.',
      type: 'best-practice',
      severity: 'high'
    },
    {
      id: 'waf',
      title: 'Enable AWS WAF',
      description: 'Deploy Web Application Firewall on CloudFront to block SQL injection and cross-site scripting.',
      type: 'recommendation',
      severity: 'medium'
    }
  ];

  if (hasDatabase) {
    items.push({
      id: 'db-backup',
      title: 'Enable Automated Backups',
      description: 'Configure automated point-in-time recovery for all databases.',
      type: 'warning',
      severity: 'high'
    });
    items.push({
      id: 'db-multiaz',
      title: 'Enable Multi-AZ',
      description: 'Deploy databases across multiple availability zones to ensure high availability.',
      type: 'recommendation',
      severity: 'medium'
    });
  }

  if (hasStorage) {
    items.push({
      id: 's3-encrypt',
      title: 'Encrypt S3 Buckets',
      description: 'Enforce AES-256 server-side encryption for all stored objects.',
      type: 'warning',
      severity: 'high'
    });
  }

  if (appType === 'E-commerce' || appType === 'SaaS') {
    items.push({
      id: 'compliance',
      title: 'PCI-DSS / SOC2 Compliance',
      description: 'Ensure architecture logs are securely archived and PII is properly tokenized.',
      type: 'recommendation',
      severity: 'high'
    });
  }

  return {
    score: 100 - (items.filter(i => i.type === 'warning').length * 5),
    items: items.sort((a, _b) => (a.severity === 'high' ? -1 : 1))
  };
}
