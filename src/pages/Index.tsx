import { useState, useCallback } from 'react';
import { useBrowser } from '@/hooks/useBrowser';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useAdmin } from '@/hooks/useAdmin';
import { TabBar } from '@/components/layout/TabBar';
import { BrowserBar } from '@/components/layout/BrowserBar';
import { BrowserFrame } from '@/components/features/BrowserFrame';
import { SideMenu } from '@/components/layout/SideMenu';
import { BookmarksPanel } from '@/components/features/BookmarksPanel';
import { HistoryPanel } from '@/components/features/HistoryPanel';
import { MediaPlayer } from '@/components/features/MediaPlayer';
import { GalleryPanel } from '@/components/features/GalleryPanel';
import { LauncherPanel } from '@/components/features/LauncherPanel';
import { LanguagePanel } from '@/components/features/LanguagePanel';
import { SettingsPanel } from '@/components/features/SettingsPanel';
import { DownloadsPanel } from '@/components/features/DownloadsPanel';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { cn } from '@/lib/utils';
import type { LauncherId } from '@/types/browser';

const Index = () => {
  const browser = useBrowser();
  const theme = useTheme();
  const lang = useLanguage();
  const admin = useAdmin();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const activeTab = browser.getActiveTab();
  const isBookmarked = activeTab ? browser.isBookmarked(activeTab.url) : false;

  const handleBookmark = useCallback(() => {
    if (!activeTab) return;
    if (isBookmarked) {
      const bm = browser.bookmarks.find(b => b.url === activeTab.url);
      if (bm) browser.removeBookmark(bm.id);
    } else {
      browser.addBookmark({ title: activeTab.title || activeTab.url, url: activeTab.url });
    }
  }, [activeTab, isBookmarked, browser]);

  const handleNavigate = useCallback((url: string) => {
    browser.navigateTo(url);
    setActivePanel(null);
  }, [browser]);

  const handleSetPanel = useCallback((panel: string | null) => {
    setActivePanel(panel);
    setMenuOpen(false);
  }, []);

  return (
    <div className={cn(
      "h-[100dvh] w-full flex flex-col overflow-hidden bg-white",
      `bg-gradient-to-br ${theme.currentLauncher.bg}`
    )}>
      {/* Admin Panel */}
      {admin.isOpen && !admin.isAuthenticated && (
        <AdminLogin
          onLogin={admin.login}
          onClose={admin.closeAdmin}
          error={admin.loginError}
        />
      )}
      {admin.isOpen && admin.isAuthenticated && (
        <AdminPanel
          settings={admin.settings}
          onUpdate={admin.updateSettings}
          onClose={admin.closeAdmin}
          onLogout={admin.logout}
          onOpenFeature={(id) => { admin.closeAdmin(); handleSetPanel(id); }}
          onSetLauncher={(id) => {
            theme.setLauncher(id as LauncherId);
            admin.updateSettings({ defaultLauncher: id });
          }}
        />
      )}

      {/* Tab Bar */}
      <TabBar
        tabs={browser.tabs}
        activeTabId={browser.activeTabId}
        onSwitchTab={browser.switchTab}
        onCloseTab={browser.closeTab}
        onNewTab={() => browser.openNewTab()}
      />

      {/* Browser Bar */}
      {activeTab && (
        <BrowserBar
          activeTab={activeTab}
          isBookmarked={isBookmarked}
          onBack={() => browser.goBack()}
          onForward={() => browser.goForward()}
          onReload={() => browser.reload()}
          onHome={() => browser.navigateTo('home://newtab')}
          onNavigate={handleNavigate}
          onBookmark={handleBookmark}
          onMenuOpen={() => setMenuOpen(true)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Side Panel */}
        {activePanel && (
          <div className={cn(
            "fixed inset-0 z-30 w-full bg-white overflow-hidden flex flex-col"
          )}>
            {activePanel === 'bookmarks' && (
              <BookmarksPanel
                bookmarks={browser.bookmarks}
                onNavigate={handleNavigate}
                onRemove={browser.removeBookmark}
                onAdd={browser.addBookmark}
                currentUrl={activeTab?.url || ''}
                currentTitle={activeTab?.title || ''}
                onClose={() => setActivePanel(null)}
              />
            )}
            {activePanel === 'history' && (
              <HistoryPanel
                history={browser.history}
                onNavigate={handleNavigate}
                onClear={browser.clearHistory}
                onClose={() => setActivePanel(null)}
              />
            )}
            {activePanel === 'media' && (
              <MediaPlayer onClose={() => setActivePanel(null)} />
            )}
            {activePanel === 'gallery' && (
              <GalleryPanel onClose={() => setActivePanel(null)} />
            )}
            {activePanel === 'launcher' && (
              <LauncherPanel
                currentId={theme.currentLauncherId}
                onSelect={(id) => { theme.setLauncher(id); }}
                onClose={() => setActivePanel(null)}
              />
            )}
            {activePanel === 'language' && (
              <LanguagePanel
                current={lang.language}
                onSelect={lang.setLanguage}
                onClose={() => setActivePanel(null)}
              />
            )}
            {activePanel === 'settings' && (
              <SettingsPanel
                onClose={() => setActivePanel(null)}
                isDark={theme.isDark}
                onToggleDark={theme.toggleDark}
              />
            )}
            {activePanel === 'downloads' && (
              <DownloadsPanel onClose={() => setActivePanel(null)} />
            )}
          </div>
        )}

        {/* Browser Frame */}
        {!activePanel && (
          <div className="flex-1 overflow-hidden relative">
            {activeTab && (
              <BrowserFrame
                tab={activeTab}
                onNavigate={handleNavigate}
                language={lang.language}
                isRTL={lang.isRTL}
                launcherPrimary={theme.currentLauncher.primary}
              />
            )}
          </div>
        )}
      </div>

      {/* Side Menu Drawer */}
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenAdmin={admin.openAdmin}
        activePanel={activePanel}
        onSetPanel={handleSetPanel}
        t={lang.t}
        isRTL={lang.isRTL}
      />


    </div>
  );
};

export default Index;
