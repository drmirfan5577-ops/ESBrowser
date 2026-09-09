import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Pause, Volume2, VolumeX, SkipBack, SkipForward,
  Maximize2, Minimize2, Music, Film, Upload, X, List,
  Shuffle, Repeat, ChevronDown, ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaItem {
  id: string;
  title: string;
  type: 'audio' | 'video';
  url: string;
  thumbnail?: string;
}

const DEMO_MEDIA: MediaItem[] = [
  { id: '1', title: 'Sample Audio Track 1', type: 'audio', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', title: 'Sample Audio Track 2', type: 'audio', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '3', title: 'Sample Audio Track 3', type: 'audio', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '4', title: 'Big Buck Bunny (Video)', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { id: '5', title: 'Elephant Dream (Video)', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
];

interface MediaPlayerProps {
  onClose: () => void;
}

export const MediaPlayer = ({ onClose }: MediaPlayerProps) => {
  const [playlist, setPlaylist] = useState<MediaItem[]>(DEMO_MEDIA);
  const [current, setCurrent] = useState<MediaItem>(DEMO_MEDIA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);

  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = useCallback(() => {
    const media = mediaRef.current;
    if (!media) return;
    if (isPlaying) { media.pause(); setIsPlaying(false); }
    else { media.play().then(() => setIsPlaying(true)).catch(() => {}); }
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (mediaRef.current) mediaRef.current.currentTime = val;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (mediaRef.current) mediaRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const handleMute = () => {
    setIsMuted(prev => {
      if (mediaRef.current) mediaRef.current.muted = !prev;
      return !prev;
    });
  };

  const playItem = (item: MediaItem) => {
    setCurrent(item);
    setIsPlaying(false);
    setCurrentTime(0);
    setTimeout(() => {
      const media = mediaRef.current;
      if (media) {
        media.load();
        media.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 100);
  };

  const handleNext = () => {
    const idx = playlist.findIndex(p => p.id === current.id);
    if (isShuffle) {
      const nextIdx = Math.floor(Math.random() * playlist.length);
      playItem(playlist[nextIdx]);
    } else {
      const nextIdx = (idx + 1) % playlist.length;
      playItem(playlist[nextIdx]);
    }
  };

  const handlePrev = () => {
    const idx = playlist.findIndex(p => p.id === current.id);
    const prevIdx = (idx - 1 + playlist.length) % playlist.length;
    playItem(playlist[prevIdx]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newItems: MediaItem[] = files.map(f => ({
      id: Math.random().toString(36).slice(2),
      title: f.name,
      type: f.type.startsWith('video') ? 'video' : 'audio',
      url: URL.createObjectURL(f),
    }));
    setPlaylist(prev => [...prev, ...newItems]);
  };

  const handleEnded = () => {
    if (isRepeat) { if (mediaRef.current) { mediaRef.current.currentTime = 0; mediaRef.current.play(); } }
    else handleNext();
  };

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    const updateTime = () => setCurrentTime(media.currentTime);
    const updateDuration = () => setDuration(media.duration);
    media.addEventListener('timeupdate', updateTime);
    media.addEventListener('loadedmetadata', updateDuration);
    media.addEventListener('ended', handleEnded);
    return () => {
      media.removeEventListener('timeupdate', updateTime);
      media.removeEventListener('loadedmetadata', updateDuration);
      media.removeEventListener('ended', handleEnded);
    };
  }, [current, isRepeat]);

  const isVideo = current.type === 'video';

  return (
    <div ref={containerRef} className={cn(
      "flex flex-col h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950",
      isFullscreen && "fixed inset-0 z-50"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          {isVideo ? <Film className="w-4 h-4 text-red-400" /> : <Music className="w-4 h-4 text-emerald-400" />}
          <span className="text-sm font-bold text-white">Ultra HD Media Player</span>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">UniOrbi</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowPlaylist(!showPlaylist)} className="w-7 h-7 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <List className="w-4 h-4" />
          </button>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="w-7 h-7 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Player Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Video/Audio Display */}
          <div className="flex-1 relative flex items-center justify-center bg-black min-h-0">
            {isVideo ? (
              <video
                ref={mediaRef as React.RefObject<HTMLVideoElement>}
                src={current.url}
                className="max-w-full max-h-full object-contain"
                onClick={handlePlayPause}
              />
            ) : (
              <div className="flex flex-col items-center gap-4 p-8">
                <div className={cn(
                  "w-32 h-32 rounded-full flex items-center justify-center",
                  "bg-gradient-to-br from-emerald-500/30 to-emerald-700/30",
                  "border-2 border-emerald-500/50",
                  isPlaying && "animate-pulse"
                )}>
                  <Music className="w-16 h-16 text-emerald-400" />
                </div>
                <audio
                  ref={mediaRef as React.RefObject<HTMLAudioElement>}
                  src={current.url}
                />
                <div className="text-center">
                  <p className="text-base font-bold text-white">{current.title}</p>
                  <p className="text-xs text-gray-400">Audio Track</p>
                </div>
              </div>
            )}
            {!isPlaying && (
              <button
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity group"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/30 transition-all">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="bg-gray-900/90 px-4 py-3 flex-shrink-0">
            {/* Track info */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-white truncate flex-1">{current.title}</p>
              <p className="text-xs text-gray-400 ml-2">{isVideo ? 'Video' : 'Audio'}</p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 accent-emerald-500 cursor-pointer"
              />
              <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button onClick={() => setIsShuffle(!isShuffle)} className={cn("w-7 h-7 flex items-center justify-center rounded-lg transition-all", isShuffle ? "text-emerald-400" : "text-gray-500 hover:text-gray-300")}>
                  <Shuffle className="w-3.5 h-3.5" />
                </button>
                <button onClick={handlePrev} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                  <SkipBack className="w-4 h-4" />
                </button>
                <button onClick={handlePlayPause} className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 transition-all">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button onClick={handleNext} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                  <SkipForward className="w-4 h-4" />
                </button>
                <button onClick={() => setIsRepeat(!isRepeat)} className={cn("w-7 h-7 flex items-center justify-center rounded-lg transition-all", isRepeat ? "text-emerald-400" : "text-gray-500 hover:text-gray-300")}>
                  <Repeat className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button onClick={handleMute} className="text-gray-400 hover:text-white transition-colors">
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  className="w-20 h-1.5 accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Playlist */}
        {showPlaylist && (
          <div className="w-64 border-l border-white/10 flex flex-col flex-shrink-0">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 flex-shrink-0">
              <span className="text-xs font-semibold text-white">Playlist ({playlist.length})</span>
              <label className="w-6 h-6 flex items-center justify-center rounded-md cursor-pointer text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all" title="Upload media">
                <Upload className="w-3.5 h-3.5" />
                <input type="file" accept="audio/*,video/*" multiple onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
            <div className="flex-1 overflow-y-auto">
              {playlist.map((item, i) => (
                <div
                  key={item.id}
                  onClick={() => playItem(item)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 cursor-pointer transition-all duration-150 border-b border-white/5",
                    item.id === current.id
                      ? "bg-emerald-500/20 border-l-2 border-l-emerald-500"
                      : "hover:bg-white/5"
                  )}
                >
                  <span className="text-xs text-gray-500 w-5 text-right flex-shrink-0">{i + 1}</span>
                  <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: item.type === 'video' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)' }}>
                    {item.type === 'video' ? <Film className="w-3.5 h-3.5 text-red-400" /> : <Music className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-gray-300 truncate flex-1">{item.title}</p>
                  {item.id === current.id && isPlaying && (
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[0, 1, 2].map(b => (
                        <div key={b} className="w-0.5 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: `${b * 0.15}s` }} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
