import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [showOtpLogin, setShowOtpLogin] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    // ... add more as needed
  ];

  const onRequestOtp = () => {
    setOtpRequested(true);
    // TODO: Call requestOtp logic
    alert('OTP sent to your phone');
  };

  const onSubmit = data => {
    // TODO: Integrate with AuthContext
    navigation.replace('Main');
  };

  const selectCountryCode = (country) => {
    setSelectedCountryCode(country.code);
    setShowCountryModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {!showOtpLogin && (
        <>
          <Controller
            control={control}
            name="username"
            rules={{ required: 'Username is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
              />
            )}
          />
          {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#cbd5e1' }} />
            <Text style={{ marginHorizontal: 8, color: '#6b7280' }}>or</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#cbd5e1' }} />
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#10b981' }]} onPress={() => setShowOtpLogin(true)}>
            <Text style={styles.buttonText}>Login with Phone/OTP</Text>
          </TouchableOpacity>
        </>
      )}
      {showOtpLogin && (
        <>
          <Text style={styles.label}>Phone Number</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <TouchableOpacity style={styles.countryCode} onPress={() => setShowCountryModal(true)}>
              <Text style={{ color: '#1e293b', marginRight: 4 }}>{countryCodes.find(c => c.code === selectedCountryCode)?.flag || '🌐'}</Text>
              <Text style={{ color: '#1e293b' }}>{selectedCountryCode}</Text>
            </TouchableOpacity>
            <Controller
              control={control}
              name="phone"
              rules={{ required: 'Phone number is required', minLength: { value: 7, message: 'Invalid phone number' } }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { flex: 1, marginLeft: 8 }]}
                  placeholder="Phone Number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                />
              )}
            />
          </View>
          {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}
          <Modal
            visible={showCountryModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowCountryModal(false)}
          >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%', maxHeight: '70%' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 16, textAlign: 'center' }}>Select Country Code</Text>
                <FlatList
                  data={countryCodes}
                  keyExtractor={item => item.code}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' }} onPress={() => selectCountryCode(item)}>
                      <Text style={{ fontSize: 16, marginRight: 8 }}>{item.flag}</Text>
                      <Text style={{ fontSize: 16, flex: 1 }}>{item.country} ({item.code})</Text>
                      {selectedCountryCode === item.code && <Text style={{ color: '#10b981', fontWeight: 'bold' }}>✓</Text>}
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={{ backgroundColor: '#f1f5f9', paddingVertical: 12, borderRadius: 8, marginTop: 16, alignItems: 'center' }} onPress={() => setShowCountryModal(false)}>
                  <Text style={{ color: '#6b7280', fontWeight: '600', fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {!otpRequested && (
            <TouchableOpacity style={[styles.button, { backgroundColor: '#10b981' }]} onPress={onRequestOtp}>
              <Text style={styles.buttonText}>Request OTP</Text>
            </TouchableOpacity>
          )}
          {otpRequested && (
            <>
              <Controller
                control={control}
                name="otp"
                rules={{ required: 'OTP is required', minLength: { value: 4, message: 'OTP must be at least 4 digits' } }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                )}
              />
              {errors.otp && <Text style={styles.error}>{errors.otp.message}</Text>}
              <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity style={{ marginTop: 8 }} onPress={() => { setShowOtpLogin(false); setOtpRequested(false); }}>
            <Text style={{ color: '#2563eb', textAlign: 'center' }}>Back to Username/Password Login</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#2563eb',
    fontSize: 15,
    marginTop: 4,
  },
  error: {
    color: '#ef4444',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  countryCode: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
