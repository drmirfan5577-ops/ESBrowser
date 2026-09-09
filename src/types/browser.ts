export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isLoading: boolean;
  isActive: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  history: string[];
  historyIndex: number;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  folder?: string;
  createdAt: string;
}

export interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  visitedAt: string;
  favicon?: string;
}

export interface Download {
  id: string;
  filename: string;
  url: string;
  size: string;
  progress: number;
  status: 'downloading' | 'completed' | 'failed' | 'paused';
  startedAt: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  title: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  size?: string;
  createdAt: string;
}

export type LauncherId =
  | 'crystal'
  | 'emerald'
  | 'crimson'
  | 'midnight'
  | 'aurora'
  | 'diamond'
  | 'neon'
  | 'arctic';

export interface Launcher {
  id: LauncherId;
  name: string;
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  preview: string[];
}

export type Language = 'en' | 'ur' | 'ar';

export interface SearchEngine {
  id: string;
  name: string;
  url: string;
  icon: string;
}
