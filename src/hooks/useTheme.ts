import { useState, useCallback, useEffect } from 'react';
import type { LauncherId } from '@/types/browser';
import { LAUNCHERS } from '@/constants/launchers';

export const useTheme = () => {
  const [currentLauncherId, setCurrentLauncherId] = useState<LauncherId>(() => {
    return (localStorage.getItem('es_launcher') as LauncherId) || 'crystal';
  });
  const [isDark, setIsDark] = useState(false);

  const currentLauncher = LAUNCHERS.find(l => l.id === currentLauncherId) || LAUNCHERS[0];

  const setLauncher = useCallback((id: LauncherId) => {
    setCurrentLauncherId(id);
    localStorage.setItem('es_launcher', id);
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', currentLauncher.primary.replace('#', ''));
    document.documentElement.style.setProperty('--secondary', currentLauncher.secondary.replace('#', ''));
  }, [currentLauncher]);

  return {
    currentLauncher,
    currentLauncherId,
    setLauncher,
    isDark,
    toggleDark,
  };
};
