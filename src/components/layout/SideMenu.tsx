import { X, Bookmark, Clock, Download, Settings, Shield, Image, Music, Palette, Globe, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin: () => void;
  activePanel: string | null;
  onSetPanel: (panel: string | null) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const menuItems = [
  { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks', color: 'text-amber-500', bg: 'hover:bg-amber-50' },
  { id: 'history', icon: Clock, label: 'History', color: 'text-blue-500', bg: 'hover:bg-blue-50' },
  { id: 'downloads', icon: Download, label: 'Downloads', color: 'text-purple-500', bg: 'hover:bg-purple-50' },
  { id: 'gallery', icon: Image, label: 'Gallery', color: 'text-pink-500', bg: 'hover:bg-pink-50' },
  { id: 'media', icon: Music, label: 'Media Player', color: 'text-red-500', bg: 'hover:bg-red-50' },
  { id: 'launcher', icon: Palette, label: 'Launcher Themes', color: 'text-emerald-500', bg: 'hover:bg-emerald-50' },
  { id: 'language', icon: Globe, label: 'Language', color: 'text-cyan-500', bg: 'hover:bg-cyan-50' },
  { id: 'settings', icon: Settings, label: 'Settings', color: 'text-gray-500', bg: 'hover:bg-gray-50' },
];

export const SideMenu = ({ isOpen, onClose, onOpenAdmin, activePanel, onSetPanel, t, isRTL }: SideMenuProps) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      {/* Drawer */}
      <div className={cn(
        "fixed top-0 h-full w-72 z-50 glass-card flex flex-col transition-transform duration-300 ease-in-out shadow-2xl",
        isRTL ? "right-0" : "right-0",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="glass-emerald border-b border-emerald-100 px-4 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-sm font-bold shimmer-text">ES Browser</h2>
            <p className="text-xs text-emerald-600 font-medium">UniOrbi Platform</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/60 text-gray-500 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onSetPanel(item.id); onClose(); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left",
                item.bg,
                activePanel === item.id ? 'bg-emerald-50 border border-emerald-200' : 'bg-transparent'
              )}
            >
              <div className={cn("w-8 h-8 rounded-lg glass-card flex items-center justify-center flex-shrink-0", item.bg)}>
                <item.icon className={cn("w-4 h-4", item.color)} />
              </div>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              {activePanel === item.id && (
                <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>
          ))}
        </div>

        {/* Admin Button */}
        <div className="p-3 border-t border-gray-100 space-y-2 flex-shrink-0">
          <button
            onClick={() => { onOpenAdmin(); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl glass-crimson tube-border-crimson hover:shadow-md transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-red-700">Admin Panel</p>
              <p className="text-xs text-red-400">Protected Access</p>
            </div>
          </button>
          <div className="flex items-center gap-2 px-3 py-2">
            <Info className="w-3 h-3 text-gray-300" />
            <span className="text-xs text-gray-300">v2.0 · UniOrbi © 2026</span>
          </div>
        </div>
      </div>
    </>
  );
};
