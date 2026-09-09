import { useState, useCallback } from 'react';
import type { AdminSettings } from '@/types/admin';

const ADMIN_PASSWORD = '1122';
const SETTINGS_KEY = 'es_admin_settings';

const defaultSettings: AdminSettings = {
  siteName: 'ES Browser',
  siteTagline: 'UniOrbi — Fast. Secure. Beautiful.',
  defaultLanguage: 'en',
  defaultLauncher: 'crystal',
  darkMode: false,
  autoSync: true,
  autoSyncInterval: 30,
  pwaEnabled: true,
  analyticsEnabled: true,
  maintenanceMode: false,
  customCss: '',
};

export const useAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [settings, setSettingsState] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
      return true;
    }
    setLoginError('Incorrect password. Default: 1122');
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsOpen(false);
  }, []);

  const openAdmin = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeAdmin = useCallback(() => {
    setIsOpen(false);
    setIsAuthenticated(false);
  }, []);

  const updateSettings = useCallback((updates: Partial<AdminSettings>) => {
    setSettingsState(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return {
    isAuthenticated,
    isOpen,
    loginError,
    settings,
    login,
    logout,
    openAdmin,
    closeAdmin,
    updateSettings,
  };
};
