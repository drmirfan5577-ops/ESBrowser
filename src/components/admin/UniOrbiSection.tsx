import { Image, Music, Download, Globe, Bookmark, Clock, type LucideIcon } from 'lucide-react';

const features: { id: string; name: string; description: string; icon: LucideIcon }[] = [
  { id: 'gallery', name: 'Gallery', description: 'Open and view your images.', icon: Image },
  { id: 'media', name: 'Media Player', description: 'Play audio and video.', icon: Music },
  { id: 'downloads', name: 'Downloads', description: 'Open download tools.', icon: Download },
  { id: 'bookmarks', name: 'Bookmarks', description: 'Browse and manage saved websites.', icon: Bookmark },
  { id: 'history', name: 'History', description: 'View browsing history.', icon: Clock },
  { id: 'language', name: 'Language', description: 'Choose your interface language.', icon: Globe },
];

export const UniOrbiSection = ({ onOpenFeature }: { onOpenFeature: (id: string) => void }) => (
  <section>
    <h2 className="text-lg font-bold text-gray-800">Browser tools</h2>
    <p className="mt-2 mb-6 text-sm text-gray-500">Open a tool in a full-screen view.</p>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {features.map(feature => <button key={feature.id} onClick={() => onOpenFeature(feature.id)} className="text-left rounded-xl border border-gray-200 p-5 hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
        <feature.icon className="w-5 h-5 text-emerald-700 mb-3" /><h3 className="font-semibold">{feature.name}</h3><p className="text-xs text-gray-500 mt-2">{feature.description}</p>
      </button>)}
    </div>
  </section>
);
