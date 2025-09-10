import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';

export default function SettingsScreen() {
  const { settings, toggleTheme } = useSettings();
  const isDark = settings.theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0f172a' : '#f8fafc' }]}>
      <View style={[styles.row, { backgroundColor: isDark ? '#1f2937' : '#fff', borderColor: isDark ? '#334155' : '#f1f5f9' }]}>
        <View style={styles.texts}>
          <Text style={[styles.title, { color: isDark ? '#e5e7eb' : '#1e293b' }]}>Dark Mode</Text>
          <Text style={[styles.subtitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>Use dark theme throughout the app</Text>
        </View>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  texts: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
});


