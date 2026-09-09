import { useState, useCallback } from 'react';
import type { Tab, Bookmark, HistoryEntry, Download } from '@/types/browser';

const generateId = () => Math.random().toString(36).substr(2, 9);

const HOME_URL = 'home://newtab';

const createTab = (url = HOME_URL, title = 'New Tab'): Tab => ({
  id: generateId(),
  title,
  url,
  isLoading: false,
  isActive: true,
  canGoBack: false,
  canGoForward: false,
  history: [url],
  historyIndex: 0,
});

export const useBrowser = () => {
  const [tabs, setTabs] = useState<Tab[]>([createTab()]);
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    const tab = createTab();
    return tab.id;
  });
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('es_bookmarks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Google', url: 'https://www.google.com', favicon: 'G', folder: 'Default', createdAt: new Date().toISOString() },
      { id: '2', title: 'YouTube', url: 'https://www.youtube.com', favicon: 'Y', folder: 'Default', createdAt: new Date().toISOString() },
      { id: '3', title: 'Wikipedia', url: 'https://www.wikipedia.org', favicon: 'W', folder: 'Default', createdAt: new Date().toISOString() },
      { id: '4', title: 'GitHub', url: 'https://www.github.com', favicon: 'Gh', folder: 'Dev', createdAt: new Date().toISOString() },
    ];
  });
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('es_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [downloads, setDownloads] = useState<Download[]>([]);

  const saveBookmarks = (b: Bookmark[]) => {
    setBookmarks(b);
    localStorage.setItem('es_bookmarks', JSON.stringify(b));
  };

  const saveHistory = (h: HistoryEntry[]) => {
    setHistory(h);
    localStorage.setItem('es_history', JSON.stringify(h));
  };

  const getActiveTab = useCallback(() => {
    return tabs.find(t => t.id === activeTabId) || tabs[0];
  }, [tabs, activeTabId]);

  const navigateTo = useCallback((url: string, tabId?: string) => {
    const id = tabId || activeTabId;
    let finalUrl = url;
    if (url === '' || url === HOME_URL) {
      finalUrl = HOME_URL;
    } else if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('home://')) {
      if (url.includes('.') && !url.includes(' ')) {
        finalUrl = 'https://' + url;
      } else {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }

    setTabs(prev => prev.map(tab => {
      if (tab.id !== id) return tab;
      const newHistory = tab.history.slice(0, tab.historyIndex + 1);
      newHistory.push(finalUrl);
      return {
        ...tab,
        url: finalUrl,
        isLoading: finalUrl !== HOME_URL,
        title: finalUrl === HOME_URL ? 'New Tab' : finalUrl,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canGoBack: newHistory.length > 1,
        canGoForward: false,
      };
    }));

    if (finalUrl !== HOME_URL) {
      const entry: HistoryEntry = {
        id: generateId(),
        title: finalUrl,
        url: finalUrl,
        visitedAt: new Date().toISOString(),
      };
      saveHistory([entry, ...history].slice(0, 500));
    }

    // Simulate loading complete
    setTimeout(() => {
      setTabs(prev => prev.map(tab =>
        tab.id === id ? { ...tab, isLoading: false } : tab
      ));
    }, 1200);
  }, [activeTabId, history]);

  const goBack = useCallback((tabId?: string) => {
    const id = tabId || activeTabId;
    setTabs(prev => prev.map(tab => {
      if (tab.id !== id || tab.historyIndex <= 0) return tab;
      const newIndex = tab.historyIndex - 1;
      return {
        ...tab,
        url: tab.history[newIndex],
        historyIndex: newIndex,
        canGoBack: newIndex > 0,
        canGoForward: true,
        isLoading: tab.history[newIndex] !== HOME_URL,
      };
    }));
    setTimeout(() => {
      setTabs(prev => prev.map(tab => tab.id === id ? { ...tab, isLoading: false } : tab));
    }, 800);
  }, [activeTabId]);

  const goForward = useCallback((tabId?: string) => {
    const id = tabId || activeTabId;
    setTabs(prev => prev.map(tab => {
      if (tab.id !== id || tab.historyIndex >= tab.history.length - 1) return tab;
      const newIndex = tab.historyIndex + 1;
      return {
        ...tab,
        url: tab.history[newIndex],
        historyIndex: newIndex,
        canGoBack: true,
        canGoForward: newIndex < tab.history.length - 1,
        isLoading: tab.history[newIndex] !== HOME_URL,
      };
    }));
    setTimeout(() => {
      setTabs(prev => prev.map(tab => tab.id === id ? { ...tab, isLoading: false } : tab));
    }, 800);
  }, [activeTabId]);

  const reload = useCallback((tabId?: string) => {
    const id = tabId || activeTabId;
    setTabs(prev => prev.map(tab => tab.id === id ? { ...tab, isLoading: true } : tab));
    setTimeout(() => {
      setTabs(prev => prev.map(tab => tab.id === id ? { ...tab, isLoading: false } : tab));
    }, 1000);
  }, [activeTabId]);

  const openNewTab = useCallback((url = HOME_URL) => {
    const newTab = createTab(url, url === HOME_URL ? 'New Tab' : url);
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
    if (url !== HOME_URL) navigateTo(url, newTab.id);
    return newTab.id;
  }, [navigateTo]);

  const closeTab = useCallback((tabId: string) => {
    setTabs(prev => {
      const remaining = prev.filter(t => t.id !== tabId);
      if (remaining.length === 0) {
        const newTab = createTab();
        setActiveTabId(newTab.id);
        return [newTab];
      }
      if (activeTabId === tabId) {
        setActiveTabId(remaining[remaining.length - 1].id);
      }
      return remaining;
    });
  }, [activeTabId]);

  const switchTab = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

  const addBookmark = useCallback((bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    saveBookmarks([...bookmarks, newBookmark]);
  }, [bookmarks]);

  const removeBookmark = useCallback((id: string) => {
    saveBookmarks(bookmarks.filter(b => b.id !== id));
  }, [bookmarks]);

  const isBookmarked = useCallback((url: string) => {
    return bookmarks.some(b => b.url === url);
  }, [bookmarks]);

  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, []);

  const addDownload = useCallback((download: Omit<Download, 'id' | 'startedAt'>) => {
    const newDl: Download = {
      ...download,
      id: generateId(),
      startedAt: new Date().toISOString(),
    };
    setDownloads(prev => [newDl, ...prev]);
  }, []);

  return {
    tabs,
    activeTabId,
    getActiveTab,
    navigateTo,
    goBack,
    goForward,
    reload,
    openNewTab,
    closeTab,
    switchTab,
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    history,
    clearHistory,
    downloads,
    addDownload,
  };
};
