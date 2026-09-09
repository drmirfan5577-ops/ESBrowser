import { useState } from 'react';
import { Settings2, Palette, Type, Layout, Save, RefreshCcw, Eye, Code, ToggleLeft, ToggleRight, Sun, Moon } from 'lucide-react';
import type { AdminSettings } from '@/types/admin';
import { LAUNCHERS } from '@/constants/launchers';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CustomizationSectionProps {
  settings: AdminSettings;
  onUpdate: (s: Partial<AdminSettings>) => void;
  onSetLauncher: (id: string) => void;
}

export const CustomizationSection = ({ settings, onUpdate, onSetLauncher }: CustomizationSectionProps) => {
  const [cssCode, setCssCode] = useState(settings.customCss);
  const [siteName, setSiteName] = useState(settings.siteName);
  const [tagline, setTagline] = useState(settings.siteTagline);

  const handleSave = () => {
    onUpdate({ customCss: cssCode, siteName, siteTagline: tagline });
    toast.success('Settings saved successfully!', {
      description: 'Changes applied to ES Browser.',
    });
  };

  const handleReset = () => {
    setSiteName('ES Browser');
    setTagline('UniOrbi — Fast. Secure. Beautiful.');
    setCssCode('');
    onUpdate({ siteName: 'ES Browser', siteTagline: 'UniOrbi — Fast. Secure. Beautiful.', customCss: '' });
    toast.info('Settings reset to defaults');
  };

  return (
    <div className="space-y-6">
      {/* Site Identity */}
      <div className="glass-card rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Layout className="w-4 h-4 text-emerald-500" />
          <h4 className="text-sm font-bold text-gray-700">Site Identity</h4>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1.5">Browser Name</label>
            <input value={siteName} onChange={e => setSiteName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-emerald-400 bg-gray-50 transition-all" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1.5">Tagline</label>
            <input value={tagline} onChange={e => setTagline(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-emerald-400 bg-gray-50 transition-all" />
          </div>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="glass-card rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4 text-violet-500" />
          <h4 className="text-sm font-bold text-gray-700">Active Launcher Theme</h4>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {LAUNCHERS.map(l => (
            <button
              key={l.id}
              onClick={() => onSetLauncher(l.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all duration-200",
                settings.defaultLauncher === l.id
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-transparent bg-gray-50 hover:border-gray-200"
              )}
            >
              <div className={cn("w-8 h-5 rounded-md bg-gradient-to-r", l.bg)} />
              <p className="text-xs font-medium text-gray-600 leading-tight text-center">{l.name.split(' ')[0]}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Display Mode */}
      <div className="glass-card rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-gray-500" />
          <h4 className="text-sm font-bold text-gray-700">Display & Behavior</h4>
        </div>
        <div className="space-y-3 divide-y divide-gray-50">
          {[
            { label: 'Auto Sync', desc: `Every ${settings.autoSyncInterval}s`, key: 'autoSync', value: settings.autoSync },
            { label: 'PWA Enabled', desc: 'Allow app installation', key: 'pwaEnabled', value: settings.pwaEnabled },
            { label: 'Analytics', desc: 'Usage tracking', key: 'analyticsEnabled', value: settings.analyticsEnabled },
            { label: 'Maintenance Mode', desc: 'Show maintenance page', key: 'maintenanceMode', value: settings.maintenanceMode },
          ].map(s => (
            <div key={s.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-700">{s.label}</p>
                <p className="text-xs text-gray-400">{s.desc}</p>
              </div>
              <button onClick={() => onUpdate({ [s.key]: !s.value } as Partial<AdminSettings>)}
                className={cn("transition-colors", s.value ? "text-emerald-500" : "text-gray-300")}>
                {s.value ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <div className="glass-card rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Code className="w-4 h-4 text-blue-500" />
          <h4 className="text-sm font-bold text-gray-700">Custom CSS</h4>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Advanced</span>
        </div>
        <textarea
          value={cssCode}
          onChange={e => setCssCode(e.target.value)}
          placeholder="/* Enter custom CSS here */&#10;.your-class {&#10;  property: value;&#10;}"
          rows={6}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono outline-none focus:border-blue-400 bg-gray-900 text-green-400 resize-none transition-all"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200"
        >
          <RefreshCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  );
};
