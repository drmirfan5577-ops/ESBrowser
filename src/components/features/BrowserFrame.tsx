import { useEffect, useRef } from 'react';
import type { Tab } from '@/types/browser';
import { BrowserHomePage } from './BrowserHomePage';
import { Loader2 } from 'lucide-react';

interface BrowserFrameProps {
  tab: Tab;
  onNavigate: (url: string) => void;
  language: string;
  isRTL: boolean;
  launcherPrimary: string;
}

export const BrowserFrame = ({ tab, onNavigate, language, isRTL, launcherPrimary }: BrowserFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isHome = tab.url === 'home://newtab' || tab.url === '';

  useEffect(() => {
    if (!isHome && iframeRef.current) {
      // Attempt to navigate
    }
  }, [tab.url, isHome]);

  if (isHome) {
    return (
      <BrowserHomePage
        onNavigate={onNavigate}
        language={language}
        isRTL={isRTL}
        launcherPrimary={launcherPrimary}
      />
    );
  }

  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      {tab.isLoading && (
        <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-200 border-t-emerald-500 animate-spin" />
            <Loader2 className="w-5 h-5 text-emerald-500 absolute inset-0 m-auto animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700">Loading...</p>
            <p className="text-xs text-gray-400 max-w-xs truncate">{tab.url}</p>
          </div>
          <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}

      {/* Proxy Notice Banner */}
      <div className="glass-emerald border-b border-emerald-100 px-3 py-1.5 flex items-center gap-2 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <p className="text-xs text-emerald-700 font-medium flex-1 truncate">
          Opening: <span className="font-semibold">{tab.url}</span>
        </p>
        <a
          href={tab.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-600 font-semibold hover:text-emerald-800 underline whitespace-nowrap"
        >
          Open in New Tab ↗
        </a>
      </div>

      <iframe
        ref={iframeRef}
        src={tab.url}
        title={tab.title}
        className="flex-1 w-full border-0"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
        onLoad={() => {}}
        onError={() => {}}
      />

      {/* CORS Notice Overlay - shows if iframe fails */}
      {!tab.isLoading && (
        <div className="absolute inset-0 top-8 pointer-events-none flex flex-col items-center justify-center opacity-0 transition-opacity" id="cors-notice">
          <div className="glass-card rounded-2xl p-8 text-center max-w-sm mx-4 pointer-events-auto">
            <div className="w-16 h-16 rounded-full glass-emerald flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Security Restriction</h3>
            <p className="text-sm text-gray-500 mb-4">This website cannot be embedded due to security policies (X-Frame-Options). Click below to open it directly.</p>
            <a
              href={tab.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200"
            >
              Open Website ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
