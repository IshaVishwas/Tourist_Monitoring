import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, FlatList, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

const genderOptions = [
  'Male',
  'Female',
  'Other',
  'Prefer not to say',
];

const nationalityOptions = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bangladesh', 'Belarus', 'Belgium', 'Brazil', 'Bulgaria', 'Cambodia', 'Canada', 'Chile', 'China',
  'Colombia', 'Croatia', 'Czech Republic', 'Denmark', 'Egypt', 'Estonia', 'Finland', 'France',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
  'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait',
  'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands',
  'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa',
  'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Thailand', 'Turkey', 'Ukraine',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam', 'Other'
];

export default function Step1BasicInfo({ defaultValues = {}, onNext }) {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({ defaultValues });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showNationalityModal, setShowNationalityModal] = useState(false);
  
  const selectedDate = watch('dob');
  const selectedGender = watch('gender');
  const selectedNationality = watch('nationality');

  const onSubmit = data => {
    onNext(data);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setValue('dob', selectedDate.toISOString());
    }
  };

  const selectGender = (gender) => {
    setValue('gender', gender);
    setShowGenderModal(false);
  };

  const selectNationality = (nationality) => {
    setValue('nationality', nationality);
    setShowNationalityModal(false);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Full Name</Text>
      <Controller
        control={control}
        name="fullName"
        rules={{ required: 'Full Name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="As per passport/ID"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName.message}</Text>}

      <Text style={styles.label}>Date of Birth</Text>
      <Controller
        control={control}
        name="dob"
        rules={{ required: 'Date of Birth is required' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowDatePicker(true)}>
            <Image source={require('../../assets/ui/calendar.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>
              {value ? formatDate(value) : 'Select date'}
            </Text>
          </TouchableOpacity>
        )}
      />
      {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}

      <Text style={styles.label}>Gender</Text>
      <Controller
        control={control}
        name="gender"
        rules={{ required: 'Gender is required' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowGenderModal(true)}>
            <Image source={require('../../assets/profile/avatar-placeholder.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>{value || 'Select gender'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      {errors.gender && <Text style={styles.error}>{errors.gender.message}</Text>}

      <Text style={styles.label}>Nationality</Text>
      <Controller
        control={control}
        name="nationality"
        rules={{ required: 'Nationality is required' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowNationalityModal(true)}>
            <Image source={require('../../assets/ui/globe.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>{value || 'Select nationality'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      {errors.nationality && <Text style={styles.error}>{errors.nationality.message}</Text>}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.saveText}>Next</Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate ? new Date(selectedDate) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}

      {/* Gender Modal */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <FlatList
              data={genderOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectGender(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                  {selectedGender === item && (
                    <Image source={require('../../assets/ui/check.png')} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowGenderModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Nationality Modal */}
      <Modal
        visible={showNationalityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNationalityModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Nationality</Text>
            <FlatList
              data={nationalityOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectNationality(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                  {selectedNationality === item && (
                    <Image source={require('../../assets/ui/check.png')} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowNationalityModal(false)}
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
  inputWithIcon: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: '#6b7280',
  },
  dropdownIcon: {
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
