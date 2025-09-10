import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '@react-navigation/native';

export default function DashboardScreen() {
  const { user } = useAuth();
  const theme = useTheme();

  const quickActions = [
    { id: 1, title: 'Emergency SOS', icon: require('../assets/emergency/sos.png'), color: '#ef4444' },
    { id: 2, title: 'Share Location', icon: require('../assets/emergency/location.png'), color: '#2563eb' },
    { id: 3, title: 'Call Emergency', icon: require('../assets/emergency/phone.png'), color: '#f59e0b' },
    { id: 4, title: 'Safety Tips', icon: require('../assets/emergency/shield.png'), color: '#10b981' },
  ];

  const recentTrips = [
    { id: 1, destination: 'Mumbai', date: 'Dec 15, 2024', status: 'Active' },
    { id: 2, destination: 'Delhi', date: 'Dec 10, 2024', status: 'Completed' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, {user?.name || 'Tourist'}!</Text>
        <Text style={styles.subtitle}>Stay safe during your travels</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={[styles.actionCard, { borderLeftColor: action.color }]}>
              <Image source={action.icon} style={styles.actionIcon} />
              <Text style={[styles.actionText, { color: theme.colors.text }]}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Trips</Text>
        {recentTrips.map((trip) => (
          <View key={trip.id} style={[styles.tripCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.tripInfo}>
              <Text style={[styles.tripDestination, { color: theme.colors.text }]}>{trip.destination}</Text>
              <Text style={[styles.tripDate, { color: theme.colors.text }]}>{trip.date}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: trip.status === 'Active' ? '#10b981' : '#6b7280' }]}>
              <Text style={styles.statusText}>{trip.status}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Safety Status</Text>
        <View style={[styles.statusCard, { backgroundColor: theme.colors.card }]}>
          <Image source={require('../assets/emergency/shield.png')} style={styles.statusIcon} />
          <View style={styles.statusInfo}>
            <Text style={[styles.statusTitle, { color: theme.colors.text }]}>All Systems Active</Text>
            <Text style={[styles.statusSubtitle, { color: theme.colors.text }]}>Location tracking enabled</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#2563eb',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
    tintColor: '#2563eb',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  tripCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripInfo: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  statusCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIcon: {
    width: 32,
    height: 32,
    marginRight: 16,
    tintColor: '#10b981',
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
});
