import { X, Plus, Globe } from 'lucide-react';
import type { Tab } from '@/types/browser';
import { cn } from '@/lib/utils';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSwitchTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: () => void;
}

export const TabBar = ({ tabs, activeTabId, onSwitchTab, onCloseTab, onNewTab }: TabBarProps) => {
  return (
    <div className="flex items-end bg-white/80 backdrop-blur-sm border-b border-gray-100 overflow-x-auto scrollbar-thin px-1 pt-1 gap-0.5 flex-shrink-0 min-h-[36px]">
      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => onSwitchTab(tab.id)}
          className={cn(
            'group flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg cursor-pointer min-w-[100px] max-w-[180px] transition-all duration-200 select-none',
            tab.id === activeTabId
              ? 'tab-active'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-500 border border-transparent'
          )}
        >
          {tab.isLoading ? (
            <div className="w-3 h-3 rounded-full border border-emerald-400 border-t-transparent animate-spin flex-shrink-0" />
          ) : (
            <Globe className="w-3 h-3 flex-shrink-0 text-emerald-500 opacity-70" />
          )}
          <span className="text-xs font-medium truncate flex-1">
            {tab.title === '' || tab.url === 'home://newtab' ? 'New Tab' : tab.title.length > 20 ? tab.title.slice(0, 20) + '…' : tab.title}
          </span>
          <button
            onClick={e => { e.stopPropagation(); onCloseTab(tab.id); }}
            className="w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-500 transition-all duration-150 flex-shrink-0"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      ))}
      <button
        onClick={onNewTab}
        className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 text-gray-400 transition-all duration-200 ml-1 flex-shrink-0 self-center"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
