import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'Norway', flag: '🇳🇴' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
  { code: '+98', country: 'Iran', flag: '🇮🇷' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵' },
  { code: '+975', country: 'Bhutan', flag: '🇧🇹' },
  { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+95', country: 'Myanmar', flag: '🇲🇲' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
  { code: '+856', country: 'Laos', flag: '🇱🇦' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+673', country: 'Brunei', flag: '🇧🇳' },
  { code: '+670', country: 'East Timor', flag: '🇹🇱' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
];

export default function Step2ContactInfo({ defaultValues = {}, onNext }) {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({ 
    defaultValues: {
      countryCode: '+91',
      ...defaultValues
    }
  });
  const [showCountryModal, setShowCountryModal] = useState(false);
  
  const selectedCountryCode = watch('countryCode');

  const onSubmit = data => {
    onNext(data);
  };

  const selectCountryCode = (country) => {
    setValue('countryCode', country.code);
    setShowCountryModal(false);
  };

  const getSelectedCountry = () => {
    return countryCodes.find(country => country.code === selectedCountryCode) || countryCodes[0];
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Mobile Number</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.countryCode} onPress={() => setShowCountryModal(true)}>
          <Image source={require('../../assets/emergency/phone.png')} style={styles.fieldIcon} />
          <Text style={{ color: '#1e293b', marginLeft: 8 }}>{getSelectedCountry().flag} {getSelectedCountry().code}</Text>
        </TouchableOpacity>
        <Controller
          control={control}
          name="mobile"
          rules={{ required: 'Mobile number is required', minLength: { value: 7, message: 'Invalid number' } }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Mobile Number"
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
            />
          )}
        />
      </View>
      {errors.mobile && <Text style={styles.error}>{errors.mobile.message}</Text>}

      <Text style={styles.label}>Email Address</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Permanent Address</Text>
      <Controller
        control={control}
        name="permanentAddress"
        rules={{ required: 'Permanent address is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Permanent Address"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      {errors.permanentAddress && <Text style={styles.error}>{errors.permanentAddress.message}</Text>}

      <Text style={styles.label}>Local Stay Address in India</Text>
      <Controller
        control={control}
        name="localStay"
        rules={{ required: 'Local stay address is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Hotel/Airbnb/Hostel Address"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      {errors.localStay && <Text style={styles.error}>{errors.localStay.message}</Text>}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.saveText}>Next</Text>
      </TouchableOpacity>

      {/* Country Code Modal */}
      <Modal
        visible={showCountryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country Code</Text>
            <FlatList
              data={countryCodes}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectCountryCode(item)}
                >
                  <Text style={styles.modalItemText}>{item.flag} {item.country} ({item.code})</Text>
                  {selectedCountryCode === item.code && (
                    <Image source={require('../../assets/ui/check.png')} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowCountryModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: '#1e293b',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  countryCode: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldIcon: {
    width: 16,
    height: 16,
    tintColor: '#6b7280',
  },
  error: {
    color: '#ef4444',
    fontSize: 13,
    marginBottom: 2,
    marginLeft: 2,
  },
  saveBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 18,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalItemText: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: '#10b981',
  },
  modalCloseBtn: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 16,
  },
});
