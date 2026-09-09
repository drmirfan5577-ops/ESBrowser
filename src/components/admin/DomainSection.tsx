import { useState } from 'react';
import {
  Globe, Shield, Server, Mail, Cloud, Zap, RefreshCcw,
  CheckCircle, AlertTriangle, XCircle, ExternalLink, Edit2, Save, X, Plus, Wifi
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DOMAIN_DATA = {
  domain: 'UniOrbi.Com',
  registrar: 'Namecheap',
  registrarUrl: 'https://namecheap.com',
  expiryDate: '2027-03-15',
  status: 'active' as const,
  dnsProvider: 'Cloudflare',
  sslStatus: 'active' as const,
  emails: ['admin@uniorbi.com', 'support@uniorbi.com', 'info@uniorbi.com', 'noreply@uniorbi.com'],
};

const SERVICES = [
  {
    id: 'namecheap',
    name: 'Namecheap',
    role: 'Domain Registrar',
    url: 'https://namecheap.com',
    status: 'connected',
    color: 'from-orange-400 to-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    icon: '🌐',
    details: 'Domain: UniOrbi.Com | Auto-renew: ON',
    expiry: '2027-03-15',
  },
  {
    id: 'netlify',
    name: 'Netlify',
    role: 'Web Hosting',
    url: 'https://netlify.com',
    status: 'connected',
    color: 'from-teal-400 to-teal-500',
    textColor: 'text-teal-700',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    icon: '🚀',
    details: 'Plan: Pro | Region: US East | SSL: Active',
  },
  {
    id: 'zoho',
    name: 'Zoho Mail',
    role: 'Email System',
    url: 'https://mail.zoho.com',
    status: 'connected',
    color: 'from-red-400 to-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: '📧',
    details: '@uniorbi.com | 5 accounts active',
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    role: 'CDN & DNS & Security',
    url: 'https://cloudflare.com',
    status: 'connected',
    color: 'from-orange-500 to-yellow-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: '☁️',
    details: 'DNS | CDN | DDoS Protection | SSL | Analytics',
  },
  {
    id: 'onspace',
    name: 'OnSpace AI',
    role: 'AI Hosting + Email',
    url: 'https://onspace.ai',
    status: 'connected',
    color: 'from-purple-400 to-purple-600',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    icon: '🤖',
    details: 'Web hosting | AI services | Email connections',
  },
];

const EMAIL_ACCOUNTS = [
  { email: 'admin@uniorbi.com', role: 'Admin', storage: '15GB', used: '2.3GB', status: 'active', provider: 'Zoho' },
  { email: 'support@uniorbi.com', role: 'Support', storage: '15GB', used: '4.1GB', status: 'active', provider: 'Zoho' },
  { email: 'info@uniorbi.com', role: 'Info', storage: '10GB', used: '0.8GB', status: 'active', provider: 'Zoho' },
  { email: 'noreply@uniorbi.com', role: 'No-Reply', storage: '5GB', used: '0.1GB', status: 'active', provider: 'Zoho' },
];

export const DomainSection = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [editingDomain, setEditingDomain] = useState(false);
  const [domainData, setDomainData] = useState(DOMAIN_DATA);
  const [tempDomain, setTempDomain] = useState(DOMAIN_DATA.domain);
  const [syncing, setSyncing] = useState<string | null>(null);

  const getDaysUntilExpiry = (dateStr: string) => {
    const expiry = new Date(dateStr);
    const today = new Date();
    return Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysUntilExpiry(domainData.expiry);

  const handleSync = (serviceId: string) => {
    setSyncing(serviceId);
    setTimeout(() => setSyncing(null), 2000);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
      connected: { icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50 border-emerald-200', label: 'Connected' },
      disconnected: { icon: XCircle, color: 'text-gray-400 bg-gray-50 border-gray-200', label: 'Disconnected' },
      error: { icon: AlertTriangle, color: 'text-red-500 bg-red-50 border-red-200', label: 'Error' },
      active: { icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50 border-emerald-200', label: 'Active' },
    };
    const s = map[status] || map.disconnected;
    return (
      <span className={cn("inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border", s.color)}>
        <s.icon className="w-3 h-3" />
        {s.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Domain Overview Card */}
      <div className="admin-border rounded-2xl overflow-hidden glass-card">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/70 text-xs font-medium">Primary Domain</p>
              {editingDomain ? (
                <div className="flex items-center gap-2">
                  <input value={tempDomain} onChange={e => setTempDomain(e.target.value)}
                    className="text-lg font-black bg-white/20 text-white border border-white/40 rounded-lg px-2 py-0.5 outline-none placeholder:text-white/60 w-48" />
                  <button onClick={() => { setDomainData(p => ({ ...p, domain: tempDomain })); setEditingDomain(false); }} className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30"><Save className="w-3.5 h-3.5" /></button>
                  <button onClick={() => { setTempDomain(domainData.domain); setEditingDomain(false); }} className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30"><X className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-xl font-black text-white">{domainData.domain}</p>
                  <button onClick={() => setEditingDomain(true)} className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center text-white/80 hover:bg-white/30"><Edit2 className="w-3 h-3" /></button>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-xs">Expiry</p>
            <p className={cn("text-sm font-bold", daysLeft > 90 ? "text-white" : daysLeft > 30 ? "text-yellow-200" : "text-red-200")}>{domainData.expiryDate}</p>
            <p className={cn("text-xs font-medium", daysLeft > 90 ? "text-emerald-200" : daysLeft > 30 ? "text-yellow-200" : "text-red-200")}>{daysLeft} days left</p>
          </div>
        </div>
        <div className="px-5 py-3 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500">Registrar: <strong className="text-gray-700">{domainData.registrar}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500">DNS: <strong className="text-gray-700">{domainData.dnsProvider}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500">SSL: <strong className="text-emerald-600">Active</strong></span>
          </div>
          <StatusBadge status={domainData.status} />
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Connected Services</h4>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {SERVICES.map(service => (
            <div
              key={service.id}
              className={cn(
                "rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 card-3d",
                activeService === service.id
                  ? `${service.bgColor} ${service.borderColor}`
                  : "bg-white border-gray-100 hover:border-gray-200"
              )}
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg", service.color)}>
                    {service.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{service.name}</p>
                    <p className="text-xs text-gray-500">{service.role}</p>
                  </div>
                </div>
                <StatusBadge status={service.status} />
              </div>
              <p className="text-xs text-gray-500 mb-3">{service.details}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={e => { e.stopPropagation(); handleSync(service.id); }}
                  className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all", service.bgColor, service.textColor, `border ${service.borderColor}`, "hover:shadow-sm")}
                >
                  <RefreshCcw className={cn("w-3 h-3", syncing === service.id && "animate-spin")} />
                  {syncing === service.id ? 'Syncing...' : 'Sync'}
                </button>
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open Dashboard
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Accounts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" /> Email Accounts (@uniorbi.com)
          </h4>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all">
            <Plus className="w-3 h-3" /> Add Account
          </button>
        </div>
        <div className="space-y-2">
          {EMAIL_ACCOUNTS.map(acc => (
            <div key={acc.email} className="flex items-center gap-3 p-3 rounded-xl glass-card border border-gray-100 hover:border-gray-200 transition-all">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {acc.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800">{acc.email}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                      style={{ width: `${(parseFloat(acc.used) / parseFloat(acc.storage)) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{acc.used}/{acc.storage}</span>
                </div>
              </div>
              <div className="text-right">
                <StatusBadge status={acc.status} />
                <p className="text-xs text-gray-400 mt-1">{acc.provider}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DNS Quick View */}
      <div className="glass-card rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Wifi className="w-4 h-4 text-orange-500" />
          <h4 className="text-sm font-bold text-gray-700">Cloudflare DNS Records</h4>
          <a href="https://dash.cloudflare.com" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-orange-500 hover:underline flex items-center gap-1">
            Manage <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="space-y-1.5">
          {[
            { type: 'A', name: 'uniorbi.com', value: 'Netlify CDN', proxy: true },
            { type: 'CNAME', name: 'www', value: 'uniorbi.netlify.app', proxy: true },
            { type: 'MX', name: '@', value: 'mx.zoho.com (Priority 10)', proxy: false },
            { type: 'TXT', name: '@', value: 'v=spf1 include:zoho.com ~all', proxy: false },
          ].map((record, i) => (
            <div key={i} className="flex items-center gap-2 text-xs bg-gray-50 px-3 py-2 rounded-lg font-mono">
              <span className="w-14 font-bold text-blue-600">{record.type}</span>
              <span className="text-gray-500 w-20 truncate">{record.name}</span>
              <span className="flex-1 text-gray-700 truncate">{record.value}</span>
              {record.proxy && <span className="text-orange-500 font-semibold text-xs">🔶 Proxied</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
