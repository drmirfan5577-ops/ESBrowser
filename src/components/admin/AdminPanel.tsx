import { useState } from 'react';
import {
  X, Globe, Smartphone, Settings2, Shield, LogOut,
  ChevronRight, Layers, Sun, Moon
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

export const AdminPanel = ({ settings, onUpdate, onClose, onLogout, onSetLauncher }: AdminPanelProps) => {
  const [activeSection, setActiveSection] = useState('domain');

  const current = SECTIONS.find(s => s.id === activeSection)!;

  return (
    <div className="fixed inset-0 z-50 flex bg-white/95 backdrop-blur-md">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-gray-100 flex flex-col bg-white/80">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <img src={logo} alt="UniOrbi" className="w-8 h-8 rounded-xl" />
            <div>
              <p className="text-sm font-black shimmer-text">Admin Panel</p>
              <p className="text-xs text-emerald-600 font-medium">UniOrbi ES Browser</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2 px-2 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span className="text-xs text-emerald-700 font-medium">Authenticated · Admin</span>
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Sections Nav */}
        <div className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">Management Sections</p>
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200",
                activeSection === section.id
                  ? `${section.bgColor} border ${section.borderColor}`
                  : "hover:bg-gray-50 border border-transparent"
              )}
            >
              <div className={cn("w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0", section.color)}>
                <section.icon className="w-4.5 h-4.5 text-white w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-xs font-bold", activeSection === section.id ? section.textColor : "text-gray-400")}>{section.label}</p>
                <p className={cn("text-sm font-semibold truncate", activeSection === section.id ? "text-gray-800" : "text-gray-600")}>{section.sublabel}</p>
              </div>
              {activeSection === section.id && (
                <ChevronRight className={cn("w-4 h-4 flex-shrink-0", section.textColor)} />
              )}
            </button>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-gray-100 space-y-1 flex-shrink-0">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-semibold">Logout</span>
          </button>
          <button
            onClick={onClose}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 transition-all duration-200"
          >
            <X className="w-4 h-4" />
            <span className="text-sm font-semibold">Close Panel</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Header */}
        <div className={cn("px-6 py-4 border-b border-gray-100 flex items-center gap-3 flex-shrink-0 bg-gradient-to-r", current.color)}>
          <current.icon className="w-5 h-5 text-white" />
          <div>
            <p className="text-white/80 text-xs font-medium">{current.label}</p>
            <h2 className="text-lg font-black text-white">{current.sublabel}</h2>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Layers className="w-4 h-4 text-white/70" />
            <span className="text-sm text-white/80 font-medium">Full Command & Control</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === 'domain' && <DomainSection />}
          {activeSection === 'uniorbi' && <UniOrbiSection />}
          {activeSection === 'customization' && (
            <CustomizationSection
              settings={settings}
              onUpdate={onUpdate}
              onSetLauncher={onSetLauncher}
            />
          )}
        </div>
      </div>
    </div>
  );
};
