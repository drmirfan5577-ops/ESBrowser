import { useState } from 'react';
import { Settings, Sun, Moon, Shield, Eye, EyeOff, Cookie, Bell, Wifi, Trash2, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SettingsPanelProps {
  onClose: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

interface ToggleProps {
  label: string;
  desc?: string;
  value: boolean;
  onChange: () => void;
}

const Toggle = ({ label, desc, value, onChange }: ToggleProps) => (
  <div className="flex items-center justify-between py-2.5">
    <div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {desc && <p className="text-xs text-gray-400">{desc}</p>}
    </div>
    <button
      onClick={onChange}
      className={cn("w-10 h-6 rounded-full transition-all duration-200 relative flex-shrink-0", value ? "bg-emerald-500" : "bg-gray-200")}
    >
      <div className={cn("w-4 h-4 rounded-full bg-white shadow absolute top-1 transition-all duration-200", value ? "left-5" : "left-1")} />
    </button>
  </div>
);

export const SettingsPanel = ({ onClose, isDark, onToggleDark }: SettingsPanelProps) => {
  const [cookies, setCookies] = useState(true);
  const [javascript, setJavascript] = useState(true);
  const [images, setImages] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [location, setLocation] = useState(false);
  const [camera, setCamera] = useState(false);
  const [adblock, setAdblock] = useState(true);
  const [https, setHttps] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [savePasswords, setSavePasswords] = useState(false);
  const [doNotTrack, setDoNotTrack] = useState(true);
  const [searchSuggest, setSearchSuggest] = useState(true);

  const handleClearData = () => {
    localStorage.removeItem('es_history');
    localStorage.removeItem('es_bookmarks');
    toast.success('Browsing data cleared!');
  };

  const sections = [
    {
      title: 'Appearance',
      icon: Sun,
      items: [
        { label: 'Dark Mode', desc: 'Toggle dark/light theme', value: isDark, onChange: onToggleDark },
        { label: 'Search Suggestions', desc: 'Show URL/search predictions', value: searchSuggest, onChange: () => setSearchSuggest(!searchSuggest) },
      ]
    },
    {
      title: 'Privacy',
      icon: Shield,
      items: [
        { label: 'Ad Blocker', desc: 'Block ads and trackers', value: adblock, onChange: () => setAdblock(!adblock) },
        { label: 'Do Not Track', desc: 'Send DNT header to sites', value: doNotTrack, onChange: () => setDoNotTrack(!doNotTrack) },
        { label: 'Save History', desc: 'Keep browsing history', value: saveHistory, onChange: () => setSaveHistory(!saveHistory) },
        { label: 'Save Passwords', desc: 'Store site passwords', value: savePasswords, onChange: () => setSavePasswords(!savePasswords) },
      ]
    },
    {
      title: 'Content',
      icon: Eye,
      items: [
        { label: 'JavaScript', desc: 'Enable/disable JS execution', value: javascript, onChange: () => setJavascript(!javascript) },
        { label: 'Images', desc: 'Load images on pages', value: images, onChange: () => setImages(!images) },
        { label: 'Cookies', desc: 'Allow site cookies', value: cookies, onChange: () => setCookies(!cookies) },
        { label: 'HTTPS Only', desc: 'Block insecure HTTP sites', value: https, onChange: () => setHttps(!https) },
      ]
    },
    {
      title: 'Permissions',
      icon: Bell,
      items: [
        { label: 'Notifications', desc: 'Allow push notifications', value: notifications, onChange: () => setNotifications(!notifications) },
        { label: 'Location Access', desc: 'Allow location requests', value: location, onChange: () => setLocation(!location) },
        { label: 'Camera Access', desc: 'Allow camera requests', value: camera, onChange: () => setCamera(!camera) },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-gray-50">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-bold text-gray-800">Settings</h3>
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-400 transition-all">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sections.map(section => (
          <div key={section.title} className="px-4 py-3 border-b border-gray-50">
            <div className="flex items-center gap-1.5 mb-2">
              <section.icon className="w-3.5 h-3.5 text-gray-400" />
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{section.title}</h4>
            </div>
            <div className="divide-y divide-gray-50">
              {section.items.map(item => (
                <Toggle key={item.label} {...item} />
              ))}
            </div>
          </div>
        ))}

        {/* Clear Data */}
        <div className="px-4 py-4">
          <button
            onClick={handleClearData}
            className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold">Clear Browsing Data</p>
              <p className="text-xs text-red-400">History, cookies, cache</p>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 py-4 text-center">
          <p className="text-xs text-gray-300">ES Browser v2.0 · UniOrbi © 2026</p>
          <p className="text-xs text-gray-200">All rights reserved · UniOrbi.Com</p>
        </div>
      </div>
    </div>
  );
};
