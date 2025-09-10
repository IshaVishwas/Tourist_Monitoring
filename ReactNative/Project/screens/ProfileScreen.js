import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const theme = useTheme();

  const menuItems = [
    { id: 1, title: 'Edit Profile', icon: require('../assets/ui/edit.png'), action: 'edit' },
    { id: 2, title: 'Emergency Contacts', icon: require('../assets/profile/emergency-contact.png'), action: 'contacts' },
    { id: 3, title: 'Travel History', icon: require('../assets/profile/travel-bag.png'), action: 'history' },
    { id: 4, title: 'Safety Settings', icon: require('../assets/emergency/shield.png'), action: 'safety' },
    { id: 5, title: 'Notifications', icon: require('../assets/emergency/alert.png'), action: 'notifications' },
    { id: 6, title: 'Help & Support', icon: require('../assets/ui/settings.png'), action: 'help' },
    { id: 7, title: 'Settings', icon: require('../assets/ui/settings.png'), action: 'app-settings' },
  ];

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  const onMenuPress = (action) => {
    if (action === 'app-settings') {
      navigation.navigate('Settings');
      return;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.profileInfo}>
          <Image source={require('../assets/profile/avatar-placeholder.png')} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Tourist'}</Text>
            <Text style={styles.userId}>ID: {user?.id || 'DGT123456'}</Text>
            <Text style={styles.userStatus}>Active</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Image source={require('../assets/ui/edit.png')} style={styles.editIcon} />
        </TouchableOpacity>
      </View>

      <View style={[styles.statsContainer, { backgroundColor: theme.colors.card }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>12</Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Trips</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>5</Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Countries</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>45</Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Days</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>100%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Safe</Text>
        </View>
      </View>

      <View style={[styles.menuContainer, { backgroundColor: theme.colors.card }]}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.menuItem, { borderBottomColor: theme.colors.border }]} onPress={() => onMenuPress(item.action)}>
            <View style={styles.menuLeft}>
              <Image source={item.icon} style={[styles.menuIcon, { tintColor: theme.colors.primary }]} />
              <Text style={[styles.menuTitle, { color: theme.colors.text }]}>{item.title}</Text>
            </View>
            <Image source={require('../assets/ui/next-arrow.png')} style={[styles.arrowIcon, { tintColor: theme.colors.border }]} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: theme.colors.card, borderColor: '#ef4444' }]} onPress={handleLogout}>
          <Image source={require('../assets/ui/delete.png')} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.text }]}>Smart Tourist Safety v1.0.0</Text>
        <Text style={[styles.footerText, { color: theme.colors.text }]}>© 2024 All rights reserved</Text>
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
    backgroundColor: '#2563eb',
    padding: 24,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    tintColor: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: '#e0e7ff',
    marginBottom: 2,
  },
  userStatus: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  editBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: -20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  menuContainer: {
    margin: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: '#2563eb',
  },
  menuTitle: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#6b7280',
  },
  logoutContainer: {
    margin: 24,
    marginTop: 0,
  },
  logoutBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#ef4444',
  },
  logoutText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
});
