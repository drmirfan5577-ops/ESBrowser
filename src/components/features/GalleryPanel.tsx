import { useState } from 'react';
import { Image, Upload, X, Grid2X2, LayoutList, ZoomIn, Trash2, Download, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryItem {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
  size: string;
  liked: boolean;
  createdAt: string;
}

const DEMO_IMAGES: GalleryItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  url: `https://picsum.photos/seed/${i + 10}/400/300`,
  name: `Image ${i + 1}.jpg`,
  type: 'image',
  size: `${Math.floor(Math.random() * 3000 + 500)}KB`,
  liked: Math.random() > 0.7,
  createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 3600 * 1000).toISOString(),
}));

interface GalleryPanelProps {
  onClose: () => void;
}

export const GalleryPanel = ({ onClose }: GalleryPanelProps) => {
  const [items, setItems] = useState<GalleryItem[]>(DEMO_IMAGES);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'liked'>('all');

  const displayed = filter === 'liked' ? items.filter(i => i.liked) : items;
  const selectedItem = items.find(i => i.id === selected);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newItems: GalleryItem[] = files.map(f => ({
      id: Math.random().toString(36).slice(2),
      url: URL.createObjectURL(f),
      name: f.name,
      type: f.type.startsWith('video') ? 'video' : 'image',
      size: `${Math.floor(f.size / 1024)}KB`,
      liked: false,
      createdAt: new Date().toISOString(),
    }));
    setItems(prev => [...newItems, ...prev]);
  };

  const toggleLike = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, liked: !i.liked } : i));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    if (selected === id) setSelected(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="glass-crimson border-b border-red-100 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <Image className="w-4 h-4 text-pink-500" />
          <h3 className="text-sm font-bold text-gray-800">Gallery</h3>
          <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-semibold">{items.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setFilter(f => f === 'all' ? 'liked' : 'all')} className={cn("w-7 h-7 flex items-center justify-center rounded-lg transition-all", filter === 'liked' ? "text-red-500 bg-red-50" : "text-gray-400 hover:bg-gray-50")}>
            <Heart className={cn("w-3.5 h-3.5", filter === 'liked' && "fill-red-500")} />
          </button>
          <button onClick={() => setView(v => v === 'grid' ? 'list' : 'grid')} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 transition-all">
            {view === 'grid' ? <LayoutList className="w-3.5 h-3.5" /> : <Grid2X2 className="w-3.5 h-3.5" />}
          </button>
          <label className="w-7 h-7 flex items-center justify-center rounded-lg text-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5" />
            <input type="file" accept="image/*,video/*" multiple onChange={handleUpload} className="hidden" />
          </label>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-all">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={selectedItem.url} alt={selectedItem.name} className="w-full max-h-[80vh] object-contain rounded-xl" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur rounded-b-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{selectedItem.name}</p>
                <p className="text-xs text-gray-400">{selectedItem.size}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleLike(selectedItem.id)} className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all", selectedItem.liked ? "bg-red-500 text-white" : "bg-white/10 text-white")}>
                  <Heart className={cn("w-4 h-4", selectedItem.liked && "fill-white")} />
                </button>
                <a href={selectedItem.url} download={selectedItem.name} className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-600 transition-all">
                  <Download className="w-4 h-4" />
                </a>
                <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Image className="w-12 h-12 text-gray-200" />
            <p className="text-sm text-gray-400">No images here</p>
            <label className="px-4 py-2 bg-pink-500 text-white text-sm font-semibold rounded-xl cursor-pointer hover:bg-pink-600 transition-all">
              Upload Images
              <input type="file" accept="image/*,video/*" multiple onChange={handleUpload} className="hidden" />
            </label>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-3 gap-1.5">
            {displayed.map(item => (
              <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center gap-2">
                  <button onClick={() => setSelected(item.id)} className="opacity-0 group-hover:opacity-100 w-7 h-7 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => removeItem(item.id)} className="opacity-0 group-hover:opacity-100 w-7 h-7 bg-red-500/70 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {item.liked && (
                  <div className="absolute top-1 right-1">
                    <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1.5">
            {displayed.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-pink-50 transition-all cursor-pointer group" onClick={() => setSelected(item.id)}>
                <img src={item.url} alt={item.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.size}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={e => { e.stopPropagation(); toggleLike(item.id); }} className={cn("w-6 h-6 flex items-center justify-center rounded-md transition-all", item.liked ? "text-red-500" : "text-gray-300 hover:text-red-400")}>
                    <Heart className={cn("w-3 h-3", item.liked && "fill-red-500")} />
                  </button>
                  <button onClick={e => { e.stopPropagation(); removeItem(item.id); }} className="w-6 h-6 flex items-center justify-center rounded-md text-gray-300 hover:text-red-400 transition-all">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
