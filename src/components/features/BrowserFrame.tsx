import { useEffect } from 'react';
import type { Tab } from '@/types/browser';
import { BrowserHomePage } from './BrowserHomePage';

interface BrowserFrameProps {
  tab: Tab;
  onNavigate: (url: string) => void;
  language: string;
  isRTL: boolean;
  launcherPrimary: string;
}

export const BrowserFrame = ({ tab, ...props }: BrowserFrameProps) => {
  const isHome = tab.url === 'home://newtab' || tab.url === '';
  useEffect(() => {
    if (!isHome && /^https?:\/\//i.test(tab.url)) window.location.assign(tab.url);
  }, [isHome, tab.url]);
  if (isHome) return <BrowserHomePage {...props} />;
  return <div className="h-full flex items-center justify-center bg-white"><a className="text-emerald-700 underline" href={tab.url}>Continue to website</a></div>;
};
