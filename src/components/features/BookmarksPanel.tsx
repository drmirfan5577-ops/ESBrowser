import { useState } from 'react';
import { Bookmark, Trash2, ExternalLink, FolderOpen, Plus, X } from 'lucide-react';
import type { Bookmark as BookmarkType } from '@/types/browser';
import { cn } from '@/lib/utils';

interface BookmarksPanelProps {
  bookmarks: BookmarkType[];
  onNavigate: (url: string) => void;
  onRemove: (id: string) => void;
  onAdd: (bookmark: Omit<BookmarkType, 'id' | 'createdAt'>) => void;
  currentUrl: string;
  currentTitle: string;
  onClose: () => void;
}

export const BookmarksPanel = ({ bookmarks, onNavigate, onRemove, onAdd, currentUrl, currentTitle, onClose }: BookmarksPanelProps) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [newUrl, setNewUrl] = useState(currentUrl);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const folders = ['All', ...Array.from(new Set(bookmarks.map(b => b.folder || 'Default')))];
  const filtered = activeFolder && activeFolder !== 'All'
    ? bookmarks.filter(b => (b.folder || 'Default') === activeFolder)
    : bookmarks;

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    onAdd({ title: newTitle || newUrl, url: newUrl, folder: 'Default' });
    setShowAdd(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="glass-emerald border-b border-emerald-100 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-gray-800">Bookmarks</h3>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">{bookmarks.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowAdd(!showAdd)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all">
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/60 text-gray-400 transition-all">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="p-3 glass-gold border-b border-amber-100 flex-shrink-0">
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Title"
            className="w-full mb-2 px-3 py-1.5 rounded-lg border border-amber-200 text-xs outline-none bg-white/70 focus:border-amber-400"
          />
          <input
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            placeholder="URL"
            className="w-full mb-2 px-3 py-1.5 rounded-lg border border-amber-200 text-xs outline-none bg-white/70 focus:border-amber-400"
          />
          <div className="flex gap-2">
            <button onClick={handleAdd} className="flex-1 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-lg hover:bg-amber-600 transition-all">Add</button>
            <button onClick={() => setShowAdd(false)} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200 transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="flex gap-1 px-3 py-2 overflow-x-auto flex-shrink-0 border-b border-gray-50">
        {folders.map(f => (
          <button
            key={f}
            onClick={() => setActiveFolder(f === 'All' ? null : f)}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all",
              (f === 'All' && !activeFolder) || f === activeFolder
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <FolderOpen className="w-8 h-8 text-gray-200" />
            <p className="text-xs text-gray-400">No bookmarks yet</p>
          </div>
        ) : (
          filtered.map(bm => (
            <div key={bm.id} className="group flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-amber-50 transition-all duration-150 cursor-pointer"
              onClick={() => onNavigate(bm.url)}>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {(bm.title || bm.url).charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{bm.title}</p>
                <p className="text-xs text-gray-400 truncate">{bm.url}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={e => { e.stopPropagation(); window.open(bm.url, '_blank'); }} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-blue-100 text-blue-400">
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button onClick={e => { e.stopPropagation(); onRemove(bm.id); }} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-100 text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
