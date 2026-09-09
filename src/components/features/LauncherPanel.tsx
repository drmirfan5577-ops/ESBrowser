import { Check, Palette, X } from 'lucide-react';
import type { LauncherId } from '@/types/browser';
import { LAUNCHERS } from '@/constants/launchers';
import { cn } from '@/lib/utils';

interface LauncherPanelProps {
  currentId: LauncherId;
  onSelect: (id: LauncherId) => void;
  onClose: () => void;
}

export const LauncherPanel = ({ currentId, onSelect, onClose }: LauncherPanelProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-violet-50 to-pink-50">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-violet-500" />
          <h3 className="text-sm font-bold text-gray-800">Launcher Themes</h3>
          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">{LAUNCHERS.length} Themes</span>
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-all">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <p className="text-xs text-gray-400 mb-3 px-1">Choose a visual theme for your browser experience.</p>
        <div className="grid grid-cols-2 gap-2">
          {LAUNCHERS.map(launcher => (
            <button
              key={launcher.id}
              onClick={() => onSelect(launcher.id)}
              className={cn(
                "relative p-3 rounded-xl border-2 text-left transition-all duration-200 card-3d",
                launcher.id === currentId
                  ? "border-emerald-400 bg-emerald-50 shadow-md shadow-emerald-100"
                  : "border-transparent bg-white hover:border-gray-200 hover:shadow-sm"
              )}
            >
              {/* Color Preview */}
              <div className={cn("flex gap-1 mb-2 h-8 rounded-lg overflow-hidden bg-gradient-to-r", launcher.bg)}>
                {launcher.preview.map((p, i) => (
                  <div key={i} className={cn("flex-1 opacity-80", p)} />
                ))}
              </div>
              <p className="text-xs font-bold text-gray-800">{launcher.name}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-tight">{launcher.description}</p>

              {/* Color Dots */}
              <div className="flex gap-1 mt-2">
                {[launcher.primary, launcher.secondary, launcher.accent].map((color, i) => (
                  <div key={i} className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ backgroundColor: color }} />
                ))}
              </div>

              {launcher.id === currentId && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
