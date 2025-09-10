import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const systemScheme = Appearance.getColorScheme();
  const [settings, setSettings] = useState({ theme: systemScheme || 'light' });

  const updateSettings = (newSettings) => setSettings({ ...settings, ...newSettings });
  const toggleTheme = () => setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, toggleTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
