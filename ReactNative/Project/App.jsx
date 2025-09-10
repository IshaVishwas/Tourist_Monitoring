
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { LocationProvider } from './contexts/LocationContext';
import { EmergencyProvider } from './contexts/EmergencyContext';
import { TripProvider } from './contexts/TripContext';
import { AlertProvider } from './contexts/AlertContext';
import { SettingsProvider } from './contexts/SettingsContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AuthProvider>
        <ProfileProvider>
          <LocationProvider>
            <EmergencyProvider>
              <TripProvider>
                <AlertProvider>
                  <SettingsProvider>
                    <AppNavigator />
                  </SettingsProvider>
                </AlertProvider>
              </TripProvider>
            </EmergencyProvider>
          </LocationProvider>
        </ProfileProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
