import { Download, Pause, Play, X, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DownloadItem {
  id: string;
  filename: string;
  url: string;
  size: string;
  progress: number;
  status: 'downloading' | 'completed' | 'failed' | 'paused';
  startedAt: string;
}

const DEMO_DOWNLOADS: DownloadItem[] = [
  { id: '1', filename: 'document.pdf', url: '#', size: '2.4MB', progress: 100, status: 'completed', startedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', filename: 'image-gallery.zip', url: '#', size: '45.8MB', progress: 67, status: 'downloading', startedAt: new Date(Date.now() - 120000).toISOString() },
  { id: '3', filename: 'video-clip.mp4', url: '#', size: '128MB', progress: 23, status: 'paused', startedAt: new Date(Date.now() - 600000).toISOString() },
  { id: '4', filename: 'audio-track.mp3', url: '#', size: '8.2MB', progress: 0, status: 'failed', startedAt: new Date(Date.now() - 7200000).toISOString() },
];

interface DownloadsPanelProps {
  onClose: () => void;
}

export const DownloadsPanel = ({ onClose }: DownloadsPanelProps) => {
  const statusConfig = {
    completed: { icon: CheckCircle, color: 'text-emerald-500', label: 'Completed', barColor: 'bg-emerald-500' },
    downloading: { icon: Download, color: 'text-blue-500', label: 'Downloading', barColor: 'bg-blue-500' },
    paused: { icon: Pause, color: 'text-amber-500', label: 'Paused', barColor: 'bg-amber-400' },
    failed: { icon: AlertCircle, color: 'text-red-500', label: 'Failed', barColor: 'bg-red-400' },
  };

  const totalSize = DEMO_DOWNLOADS.reduce((acc, d) => acc + parseFloat(d.size), 0).toFixed(1);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-purple-50/50">
        <div className="flex items-center gap-2">
          <Download className="w-4 h-4 text-purple-500" />
          <h3 className="text-sm font-bold text-gray-800">Downloads</h3>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">{DEMO_DOWNLOADS.length}</span>
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-all">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="px-4 py-2 border-b border-gray-50 flex-shrink-0 flex items-center justify-between">
        <p className="text-xs text-gray-400">Total: {totalSize}MB</p>
        <button className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors">Clear All</button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {DEMO_DOWNLOADS.map(dl => {
          const config = statusConfig[dl.status];
          return (
            <div key={dl.id} className="glass-card rounded-xl p-3 border border-gray-100">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <config.icon className={cn("w-4 h-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{dl.filename}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{dl.size}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className={cn("text-xs font-medium", config.color)}>{config.label}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {dl.status === 'downloading' && (
                    <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-amber-100 text-amber-400 transition-all">
                      <Pause className="w-3 h-3" />
                    </button>
                  )}
                  {dl.status === 'paused' && (
                    <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-blue-100 text-blue-400 transition-all">
                      <Play className="w-3 h-3" />
                    </button>
                  )}
                  <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-100 text-red-300 transition-all">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              {dl.status !== 'failed' && (
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-300", config.barColor, dl.status === 'downloading' && "animate-pulse")}
                    style={{ width: `${dl.progress}%` }}
                  />
                </div>
              )}
              {dl.status !== 'failed' && (
                <p className="text-xs text-gray-400 mt-1 text-right">{dl.progress}%</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
