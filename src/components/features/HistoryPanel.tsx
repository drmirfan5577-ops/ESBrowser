import { Clock, Trash2, ExternalLink, X, Search } from 'lucide-react';
import { useState } from 'react';
import type { HistoryEntry } from '@/types/browser';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onNavigate: (url: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export const HistoryPanel = ({ history, onNavigate, onClear, onClose }: HistoryPanelProps) => {
  const [search, setSearch] = useState('');

  const filtered = search
    ? history.filter(h => h.url.toLowerCase().includes(search.toLowerCase()) || h.title.toLowerCase().includes(search.toLowerCase()))
    : history;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-100 px-4 py-3 flex items-center justify-between flex-shrink-0 bg-blue-50/50">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-bold text-gray-800">History</h3>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{history.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onClear} className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg font-medium transition-all">Clear All</button>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="px-3 py-2 border-b border-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
          <Search className="w-3 h-3 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search history..."
            className="flex-1 text-xs bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <Clock className="w-8 h-8 text-gray-200" />
            <p className="text-xs text-gray-400">{search ? 'No results found' : 'No history yet'}</p>
          </div>
        ) : (
          filtered.map(entry => (
            <div
              key={entry.id}
              onClick={() => onNavigate(entry.url)}
              className="group flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 transition-all duration-150 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-3 h-3 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">{entry.url}</p>
                <p className="text-xs text-gray-400">{formatDate(entry.visitedAt)}</p>
              </div>
              <button onClick={e => { e.stopPropagation(); window.open(entry.url, '_blank'); }}
                className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-blue-100 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
