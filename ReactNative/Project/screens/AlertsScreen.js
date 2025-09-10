import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function AlertsScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('all');

  const alerts = [
    { 
      id: 1, 
      type: 'emergency', 
      title: 'Emergency Alert', 
      message: 'High risk area detected near your location', 
      time: '2 minutes ago',
      priority: 'high',
      read: false
    },
    { 
      id: 2, 
      type: 'safety', 
      title: 'Safety Reminder', 
      message: 'Remember to share your location with family', 
      time: '1 hour ago',
      priority: 'medium',
      read: true
    },
    { 
      id: 3, 
      type: 'weather', 
      title: 'Weather Alert', 
      message: 'Heavy rain expected in Mumbai area', 
      time: '3 hours ago',
      priority: 'medium',
      read: true
    },
    { 
      id: 4, 
      type: 'location', 
      title: 'Location Update', 
      message: 'You have entered a safe zone', 
      time: '1 day ago',
      priority: 'low',
      read: true
    },
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'emergency': return require('../assets/emergency/sos.png');
      case 'safety': return require('../assets/emergency/shield.png');
      case 'weather': return require('../assets/emergency/alert.png');
      case 'location': return require('../assets/emergency/location.png');
      default: return require('../assets/emergency/alert.png');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const filteredAlerts = activeTab === 'all' ? alerts : alerts.filter(alert => alert.type === activeTab);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.title}>Alerts & Notifications</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Image source={require('../assets/ui/settings.png')} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      <View style={[styles.tabContainer, { backgroundColor: theme.colors.card, shadowColor: '#000' }]}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && [styles.activeTab, { backgroundColor: theme.colors.primary }]]} 
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, { color: theme.colors.text }, activeTab === 'all' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'emergency' && [styles.activeTab, { backgroundColor: theme.colors.primary }]]} 
          onPress={() => setActiveTab('emergency')}
        >
          <Text style={[styles.tabText, { color: theme.colors.text }, activeTab === 'emergency' && styles.activeTabText]}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'safety' && [styles.activeTab, { backgroundColor: theme.colors.primary }]]} 
          onPress={() => setActiveTab('safety')}
        >
          <Text style={[styles.tabText, { color: theme.colors.text }, activeTab === 'safety' && styles.activeTabText]}>Safety</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <TouchableOpacity key={alert.id} style={[styles.alertCard, { backgroundColor: theme.colors.card }, !alert.read && styles.unreadAlert]}>
              <View style={styles.alertHeader}>
                <Image source={getAlertIcon(alert.type)} style={styles.alertIcon} />
                <View style={styles.alertInfo}>
                  <Text style={[styles.alertTitle, { color: theme.colors.text }]}>{alert.title}</Text>
                  <Text style={[styles.alertTime, { color: theme.colors.text }]}>{alert.time}</Text>
                </View>
                <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(alert.priority) }]} />
              </View>
              <Text style={[styles.alertMessage, { color: theme.colors.text }]}>{alert.message}</Text>
              {!alert.read && (
                <View style={styles.unreadIndicator} />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Image source={require('../assets/emergency/alert.png')} style={styles.emptyIcon} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No alerts</Text>
            <Text style={[styles.emptySubtitle, { color: theme.colors.text }]}>You're all caught up!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#2563eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
  },
  settingsIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: -12,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  unreadAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#2563eb',
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
    tintColor: '#cbd5e1',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
