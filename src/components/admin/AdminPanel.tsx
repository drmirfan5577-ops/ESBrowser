import { useState } from 'react';
import {
  X, Globe, Smartphone, Settings2, Shield, LogOut,
} from 'lucide-react';
import type { AdminSettings } from '@/types/admin';
import { DomainSection } from './DomainSection';
import { UniOrbiSection } from './UniOrbiSection';
import { CustomizationSection } from './CustomizationSection';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

interface AdminPanelProps {
  settings: AdminSettings;
  onUpdate: (s: Partial<AdminSettings>) => void;
  onClose: () => void;
  onLogout: () => void;
  onSetLauncher: (id: string) => void;
  onOpenFeature: (id: string) => void;
}

const SECTIONS = [
  {
    id: 'domain',
    icon: Globe,
    label: 'Section 01',
    sublabel: 'Domain Management',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'uniorbi',
    icon: Smartphone,
    label: 'Section 02',
    sublabel: 'UniOrbi Features',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
  },
  {
    id: 'customization',
    icon: Settings2,
    label: 'Section 03',
    sublabel: 'Customization',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-200',
  },
];

export const AdminPanel = ({ settings, onUpdate, onClose, onLogout, onSetLauncher, onOpenFeature }: AdminPanelProps) => {
  const [activeSection, setActiveSection] = useState('domain');

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <header className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-4 sm:px-6 py-3">
        <img src={logo} alt="UniOrbi" className="w-8 h-8 rounded-xl" />
        <h1 className="text-sm font-bold text-emerald-900">Admin Panel</h1>
        <div className="ml-auto flex items-center gap-3">
          <button onClick={onLogout} className="flex items-center gap-1 text-xs text-red-600"><LogOut className="w-4 h-4" /> Logout</button>
          <button onClick={onClose} aria-label="Close admin panel" className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <nav aria-label="Admin sections" className="w-full flex flex-wrap gap-2">
          {SECTIONS.map(section => <button key={section.id} onClick={() => setActiveSection(section.id)} aria-current={activeSection === section.id ? 'page' : undefined} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold", activeSection === section.id ? `${section.bgColor} ${section.textColor}` : 'text-gray-500 hover:bg-gray-50')}><section.icon className="w-4 h-4" />{section.sublabel}</button>)}
        </nav>
      </header>
      <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
        {activeSection === 'domain' && <DomainSection />}
        {activeSection === 'uniorbi' && <UniOrbiSection onOpenFeature={onOpenFeature} />}
        {activeSection === 'customization' && <CustomizationSection settings={settings} onUpdate={onUpdate} onSetLauncher={onSetLauncher} />}
      </main>
    </div>
  );
};
