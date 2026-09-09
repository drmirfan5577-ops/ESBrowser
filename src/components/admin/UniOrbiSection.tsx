import { useState } from 'react';
import { Smartphone, Image, Music, Film, Wifi, Download, Upload, Settings2, ChevronRight, ToggleLeft, ToggleRight, Star, Zap, Shield, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
  color?: string;
}

const ToggleSwitch = ({ enabled, onToggle, label, description, color = 'emerald' }: ToggleSwitchProps) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {description && <p className="text-xs text-gray-400">{description}</p>}
    </div>
    <button onClick={onToggle} className={cn("transition-colors duration-200", enabled ? `text-${color}-500` : "text-gray-300")}>
      {enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
    </button>
  </div>
);

export const UniOrbiSection = () => {
  const [pwa, setPwa] = useState(true);
  const [gallery, setGallery] = useState(true);
  const [mediaPlayer, setMediaPlayer] = useState(true);
  const [hd, setHd] = useState(true);
  const [hdPlus, setHdPlus] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [mediaCache, setMediaCache] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [backgroundPlay, setBackgroundPlay] = useState(true);
  const [gestureControl, setGestureControl] = useState(true);
  const [downloadManager, setDownloadManager] = useState(true);

  const features = [
    { icon: Smartphone, title: 'PWA Support', desc: 'Install as native app on any device', enabled: pwa, toggle: () => setPwa(!pwa), color: 'bg-blue-100', iconColor: 'text-blue-500', status: pwa ? 'Enabled' : 'Disabled' },
    { icon: Image, title: 'Native Gallery', desc: 'Built-in gallery with full management', enabled: gallery, toggle: () => setGallery(!gallery), color: 'bg-pink-100', iconColor: 'text-pink-500', status: gallery ? 'Active' : 'Hidden' },
    { icon: Film, title: 'Ultra HD+ Media Player', desc: '4K video, lossless audio, DRM support', enabled: mediaPlayer, toggle: () => setMediaPlayer(!mediaPlayer), color: 'bg-red-100', iconColor: 'text-red-500', status: mediaPlayer ? 'Active' : 'Disabled' },
    { icon: Download, title: 'Download Manager', desc: 'Multi-thread downloads with resume', enabled: downloadManager, toggle: () => setDownloadManager(!downloadManager), color: 'bg-purple-100', iconColor: 'text-purple-500', status: downloadManager ? 'Active' : 'Disabled' },
    { icon: Wifi, title: 'Offline Mode', desc: 'Cache pages for offline viewing', enabled: offlineMode, toggle: () => setOfflineMode(!offlineMode), color: 'bg-cyan-100', iconColor: 'text-cyan-500', status: offlineMode ? 'Active' : 'Off' },
    { icon: Music, title: 'Background Audio', desc: 'Continue playback in background', enabled: backgroundPlay, toggle: () => setBackgroundPlay(!backgroundPlay), color: 'bg-emerald-100', iconColor: 'text-emerald-500', status: backgroundPlay ? 'Active' : 'Off' },
  ];

  return (
    <div className="space-y-6">
      {/* UniOrbi Badge */}
      <div className="glass-emerald rounded-2xl p-5 tube-border-emerald">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black shimmer-text">UniOrbi Platform</h3>
            <p className="text-xs text-emerald-600 font-medium">ES Browser v2.0 — Feature Control</p>
          </div>
          <div className="ml-auto">
            <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">PRO</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Zap, label: 'Speed', value: 'Ultra' },
            { icon: Shield, label: 'Security', value: 'Max' },
            { icon: Star, label: 'Features', value: '50+' },
            { icon: Globe, label: 'Languages', value: '3' },
          ].map(s => (
            <div key={s.label} className="text-center p-2 bg-white/50 rounded-xl">
              <s.icon className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-emerald-800">{s.value}</p>
              <p className="text-xs text-emerald-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Core Features</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className={cn("glass-card rounded-xl p-3 border border-gray-100 flex items-center gap-3 transition-all duration-200", f.enabled ? "opacity-100" : "opacity-60")}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", f.color)}>
                <f.icon className={cn("w-5 h-5", f.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
                <span className={cn("text-xs font-medium", f.enabled ? "text-emerald-500" : "text-gray-400")}>{f.status}</span>
              </div>
              <button onClick={f.toggle} className={cn("transition-colors duration-200 flex-shrink-0", f.enabled ? "text-emerald-500" : "text-gray-300")}>
                {f.enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Media Player Settings */}
      <div className="glass-card rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Film className="w-4 h-4 text-red-500" />
          <h4 className="text-sm font-bold text-gray-700">Ultra HD+ Media Player Settings</h4>
        </div>
        <div className="space-y-1 divide-y divide-gray-50">
          <ToggleSwitch enabled={hd} onToggle={() => setHd(!hd)} label="HD Quality" description="1080p streaming and playback" />
          <ToggleSwitch enabled={hdPlus} onToggle={() => setHdPlus(!hdPlus)} label="Ultra HD+ (4K)" description="4K UHD, HDR10+ support" color="red" />
          <ToggleSwitch enabled={mediaCache} onToggle={() => setMediaCache(!mediaCache)} label="Media Cache" description="Cache media for faster replays" />
          <ToggleSwitch enabled={autoDownload} onToggle={() => setAutoDownload(!autoDownload)} label="Auto Download" description="Auto-download on WiFi" />
          <ToggleSwitch enabled={gestureControl} onToggle={() => setGestureControl(!gestureControl)} label="Gesture Controls" description="Swipe/pinch media controls" />
          <ToggleSwitch enabled={notifications} onToggle={() => setNotifications(!notifications)} label="Media Notifications" description="Show playback notifications" />
        </div>
      </div>

      {/* PWA Install */}
      <div className="glass-card rounded-xl p-4 border border-blue-100 bg-blue-50/30">
        <div className="flex items-center gap-3 mb-3">
          <Smartphone className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-bold text-gray-800">PWA Installation</p>
            <p className="text-xs text-gray-500">Install ES Browser as a native app</p>
          </div>
          <button className="ml-auto px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-all flex items-center gap-1">
            <Download className="w-3 h-3" /> Install
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { icon: '📱', label: 'Android', desc: 'Chrome / Samsung' },
            { icon: '🍎', label: 'iOS', desc: 'Safari Share' },
            { icon: '🖥️', label: 'Desktop', desc: 'Chrome / Edge' },
          ].map(p => (
            <div key={p.label} className="p-2 bg-white rounded-lg">
              <p className="text-lg">{p.icon}</p>
              <p className="text-xs font-semibold text-gray-700">{p.label}</p>
              <p className="text-xs text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
