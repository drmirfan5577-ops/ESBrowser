import { ArrowUpRight, Globe } from 'lucide-react';

const providers = [
  { name: 'Netlify', description: 'Manage deployments, domains, and site configuration.', url: 'https://app.netlify.com' },
  { name: 'Cloudflare', description: 'Manage DNS, domain security, and CDN settings.', url: 'https://dash.cloudflare.com' },
  { name: 'Hostinger', description: 'Manage hosting, domains, and subscriptions.', url: 'https://hpanel.hostinger.com' },
  { name: 'Zoho Mail', description: 'Manage mailboxes and organization email settings.', url: 'https://mailadmin.zoho.com' },
];

export const DomainSection = () => (
  <section>
    <h2 className="text-lg font-bold text-gray-800">Domains & services</h2>
    <p className="mt-2 mb-6 text-sm text-gray-500">Open your provider to manage real account settings. Sign in with your provider account to view connection status and make changes.</p>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {providers.map(provider => <a key={provider.name} href={provider.url} className="rounded-xl border border-gray-200 p-5 hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
        <div className="flex items-center gap-3"><Globe className="w-5 h-5 text-emerald-700" /><h3 className="font-semibold flex-1">{provider.name}</h3><ArrowUpRight className="w-4 h-4" /></div>
        <p className="mt-3 text-xs text-gray-500">{provider.description}</p>
      </a>)}
    </div>
  </section>
);
