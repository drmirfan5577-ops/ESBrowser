import { Globe, Check, X } from 'lucide-react';
import type { Language } from '@/types/browser';
import { LANGUAGES } from '@/constants/languages';
import { cn } from '@/lib/utils';

interface LanguagePanelProps {
  current: Language;
  onSelect: (lang: Language) => void;
  onClose: () => void;
}

const fontOptions = [
  { id: 'inter', name: 'Inter', sample: 'The quick brown fox' },
  { id: 'system', name: 'System UI', sample: 'The quick brown fox' },
  { id: 'roboto', name: 'Roboto', sample: 'The quick brown fox' },
];

export const LanguagePanel = ({ current, onSelect, onClose }: LanguagePanelProps) => {
  const languages = Object.entries(LANGUAGES) as [Language, typeof LANGUAGES[Language]][];

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-500" />
          <h3 className="text-sm font-bold text-gray-800">Language & Fonts</h3>
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-all">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Language Selection */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Display Language</h4>
          <div className="space-y-2">
            {languages.map(([code, lang]) => (
              <button
                key={code}
                onClick={() => onSelect(code)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200",
                  current === code
                    ? "border-cyan-400 bg-cyan-50"
                    : "border-transparent bg-gray-50 hover:border-gray-200"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {lang.native.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-800">{lang.name}</p>
                  <p className={cn("text-xs text-gray-500", code !== 'en' && (code === 'ur' ? 'urdu-text' : 'arabic-text'))}>
                    {lang.native}
                  </p>
                </div>
                <div className="text-xs text-gray-400 font-medium">{lang.dir.toUpperCase()}</div>
                {current === code && (
                  <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Font Options */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Font Style</h4>
          <div className="space-y-2">
            {fontOptions.map(font => (
              <div key={font.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-700">{font.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{font.sample}</p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* RTL Info */}
        <div className="glass-emerald rounded-xl p-3">
          <p className="text-xs font-semibold text-emerald-800 mb-1">Multi-language Support</p>
          <p className="text-xs text-emerald-600 leading-relaxed">
            ES Browser supports English, Urdu (اردو), and Arabic (العربية) with proper RTL (Right-to-Left) text rendering and custom fonts for each language.
          </p>
        </div>
      </div>
    </div>
  );
};
