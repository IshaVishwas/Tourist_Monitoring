import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useProfile } from '../contexts/ProfileContext';
import Step1BasicInfo from './profileSetup/Step1BasicInfo';
import Step2ContactInfo from './profileSetup/Step2ContactInfo';
import Step3Identification from './profileSetup/Step3Identification';
import Step4EmergencyInfo from './profileSetup/Step4EmergencyInfo';
import Step5TravelInfo from './profileSetup/Step5TravelInfo';
import Step6Preferences from './profileSetup/Step6Preferences';

const steps = [
  { key: 'basic', label: 'Basic Information', component: Step1BasicInfo, icon: require('../assets/profile/avatar-placeholder.png') },
  { key: 'contact', label: 'Contact Information', component: Step2ContactInfo, icon: require('../assets/emergency/phone.png') },
  { key: 'id', label: 'Identification', component: Step3Identification, icon: require('../assets/profile/id-card.png') },
  { key: 'emergency', label: 'Emergency Information', component: Step4EmergencyInfo, icon: require('../assets/profile/emergency-contact.png') },
  { key: 'travel', label: 'Travel Information', component: Step5TravelInfo, icon: require('../assets/profile/travel-bag.png') },
  { key: 'prefs', label: 'App Preferences', component: Step6Preferences, icon: require('../assets/ui/settings.png') },
];

export default function ProfileSetupScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const { profile, updateProfile, resetProfile } = useProfile();
  const StepComponent = steps[step].component;

  const handleNext = (stepData) => {
    updateProfile(stepData);
    // If current step is emergency, finish setup and go to Main
    if (steps[step].key === 'emergency') {
      navigation.replace('Main');
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigation.replace('Main');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={steps[step].icon} style={styles.stepIcon} />
        <Text style={styles.header}>Profile Setup</Text>
        <Text style={styles.stepLabel}>{steps[step].label}</Text>
      </View>
      
      <StepComponent
        defaultValues={profile}
        onNext={handleNext}
      />
      
      <View style={styles.buttonRow}>
        {step > 0 && (
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Image source={require('../assets/ui/back-arrow.png')} style={styles.btnIcon} />
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.progressRow}>
        {steps.map((_, idx) => (
          <View key={idx} style={[styles.dot, step === idx && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stepIcon: {
    width: 48,
    height: 48,
    marginBottom: 12,
    tintColor: '#2563eb',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepLabel: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    alignItems: 'center',
  },
  nextBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  backBtn: {
    backgroundColor: '#cbd5e1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 8,
  },
  btnIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2563eb',
    width: 18,
  },
});
