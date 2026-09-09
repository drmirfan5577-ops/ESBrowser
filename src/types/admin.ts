export interface DomainRecord {
  id: string;
  domain: string;
  registrar: string;
  registrarUrl: string;
  expiryDate: string;
  status: 'active' | 'expiring' | 'expired';
  dnsProvider: string;
  sslStatus: 'active' | 'pending' | 'expired';
}

export interface HostingService {
  id: string;
  name: string;
  type: string;
  url: string;
  status: 'active' | 'inactive' | 'maintenance';
  plan: string;
  region?: string;
  usage?: string;
  color: string;
}

export interface EmailAccount {
  id: string;
  email: string;
  provider: string;
  status: 'active' | 'inactive';
  storage: string;
  quota: string;
}

export interface IntegrationService {
  id: string;
  name: string;
  category: 'hosting' | 'email' | 'dns' | 'cdn' | 'analytics' | 'ai';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  icon: string;
  color: string;
  description: string;
}

export interface AdminSettings {
  siteName: string;
  siteTagline: string;
  defaultLanguage: string;
  defaultLauncher: string;
  darkMode: boolean;
  autoSync: boolean;
  autoSyncInterval: number;
  pwaEnabled: boolean;
  analyticsEnabled: boolean;
  maintenanceMode: boolean;
  customCss: string;
}
