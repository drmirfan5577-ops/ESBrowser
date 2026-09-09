import { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, RotateCcw, Home, Star, StarOff,
  Shield, Lock, Menu, Share2
} from 'lucide-react';
import type { Tab } from '@/types/browser';
import { cn } from '@/lib/utils';

interface BrowserBarProps {
  activeTab: Tab;
  isBookmarked: boolean;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  onHome: () => void;
  onNavigate: (url: string) => void;
  onBookmark: () => void;
  onMenuOpen: () => void;
}

export const BrowserBar = ({
  activeTab,
  isBookmarked,
  onBack,
  onForward,
  onReload,
  onHome,
  onNavigate,
  onBookmark,
  onMenuOpen,
}: BrowserBarProps) => {
  const [urlInput, setUrlInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const displayUrl = activeTab.url === 'home://newtab' ? '' : activeTab.url;
  const isSecure = activeTab.url.startsWith('https://');
  const isHome = activeTab.url === 'home://newtab';

  useEffect(() => {
    if (!isFocused) {
      setUrlInput(displayUrl);
    }
  }, [activeTab.url, isFocused, displayUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onNavigate(urlInput.trim());
    }
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setUrlInput(displayUrl);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setUrlInput(displayUrl);
  };

  return (
    <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white/90 backdrop-blur-sm border-b border-gray-100 flex-shrink-0">
      {/* Navigation buttons */}
      <button
        onClick={onBack}
        disabled={!activeTab.canGoBack}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-30 text-gray-600 transition-all duration-150"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={onForward}
        disabled={!activeTab.canGoForward}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-30 text-gray-600 transition-all duration-150"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        onClick={activeTab.isLoading ? onReload : onReload}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-150"
      >
        <RotateCcw className={cn("w-4 h-4", activeTab.isLoading && "animate-spin text-emerald-500")} />
      </button>
      <button
        onClick={onHome}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-150"
      >
        <Home className="w-4 h-4" />
      </button>

      {/* URL Bar */}
      <form onSubmit={handleSubmit} className="flex-1 relative">
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200",
          isFocused
            ? "border-emerald-400 bg-white shadow-md shadow-emerald-100"
            : "border-gray-200 bg-gray-50 hover:border-gray-300"
        )}>
          {!isHome && (
            isSecure ? (
              <Lock className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            ) : (
              <Shield className="w-3 h-3 text-amber-400 flex-shrink-0" />
            )
          )}
          <input
            type="text"
            value={isFocused ? urlInput : (isHome ? '' : displayUrl)}
            onChange={e => setUrlInput(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search or enter URL..."
            className="flex-1 bg-transparent outline-none text-xs text-gray-700 placeholder:text-gray-400 min-w-0"
          />
        </div>
      </form>

      {/* Action buttons */}
      <button
        onClick={onBookmark}
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150",
          isBookmarked ? "text-amber-500 hover:bg-amber-50" : "text-gray-400 hover:bg-gray-100"
        )}
      >
        {isBookmarked ? <Star className="w-4 h-4 fill-amber-400" /> : <StarOff className="w-4 h-4" />}
      </button>
      <button
        onClick={() => {
          if (navigator.share && !isHome) {
            navigator.share({ title: activeTab.title, url: activeTab.url });
          }
        }}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-all duration-150"
      >
        <Share2 className="w-4 h-4" />
      </button>
      <button
        onClick={onMenuOpen}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-all duration-150"
      >
        <Menu className="w-4 h-4" />
      </button>
    </div>
  );
};
