import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image, Modal, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const languageOptions = [
  'English', 'Hindi', 'Tamil', 'Bengali', 'Telugu', 'Marathi', 'Gujarati', 'Kannada',
  'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Nepali', 'Sanskrit', 'Urdu', 'Other'
];

const interestOptions = ['Historical Places', 'Nature', 'Adventure', 'Shopping', 'Food', 'Spiritual', 'Nightlife'];
const accessibilityOptions = ['Wheelchair access', 'Senior-friendly', 'Child-friendly'];

export default function Step6Preferences({ defaultValues = {}, onNext }) {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      shareWithFamily: false,
      shareWithAuthorities: false,
      safetyNotifications: true,
      redZoneAlerts: true,
      crowdAlerts: true,
      localEmergency: true,
      language: 'English',
      interests: [],
      accessibilityNeeds: [],
      ...defaultValues
    }
  });
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showAccessibilityModal, setShowAccessibilityModal] = useState(false);
  
  const selectedLanguage = watch('language');

  const onSubmit = data => {
    onNext(data);
  };

  const selectLanguage = (language) => {
    setValue('language', language);
    setShowLanguageModal(false);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Preferred Language</Text>
      <Controller
        control={control}
        name="language"
        rules={{ required: 'Preferred language is required' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowLanguageModal(true)}>
            <Image source={require('../../assets/ui/settings.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>{value || 'Select language'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      {errors.language && <Text style={styles.error}>{errors.language.message}</Text>}

      <Text style={styles.label}>Interests</Text>
      <Controller
        control={control}
        name="interests"
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowInterestsModal(true)}>
            <Image source={require('../../assets/ui/plus.png')} style={styles.fieldIcon} />
            <Text style={{ color: value && value.length > 0 ? '#1e293b' : '#94a3b8', flex: 1 }}>{value && value.length > 0 ? `${value.length} selected` : 'Select interests'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      <Modal visible={showInterestsModal} transparent animationType="slide" onRequestClose={() => setShowInterestsModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Interests</Text>
            <FlatList data={interestOptions} keyExtractor={item => item} renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => {
                const current = watch('interests') || [];
                if (current.includes(item)) {
                  setValue('interests', current.filter(i => i !== item));
                } else {
                  setValue('interests', [...current, item]);
                }
              }}>
                <Text style={styles.modalItemText}>{item}</Text>
                {watch('interests') && watch('interests').includes(item) && (
                  <Image source={require('../../assets/ui/check.png')} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            )} />
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowInterestsModal(false)}>
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>Accessibility Needs</Text>
      <Controller
        control={control}
        name="accessibilityNeeds"
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowAccessibilityModal(true)}>
            <Image source={require('../../assets/ui/plus.png')} style={styles.fieldIcon} />
            <Text style={{ color: value && value.length > 0 ? '#1e293b' : '#94a3b8', flex: 1 }}>{value && value.length > 0 ? `${value.length} selected` : 'Select needs'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      <Modal visible={showAccessibilityModal} transparent animationType="slide" onRequestClose={() => setShowAccessibilityModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Accessibility Needs</Text>
            <FlatList data={accessibilityOptions} keyExtractor={item => item} renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => {
                const current = watch('accessibilityNeeds') || [];
                if (current.includes(item)) {
                  setValue('accessibilityNeeds', current.filter(i => i !== item));
                } else {
                  setValue('accessibilityNeeds', [...current, item]);
                }
              }}>
                <Text style={styles.modalItemText}>{item}</Text>
                {watch('accessibilityNeeds') && watch('accessibilityNeeds').includes(item) && (
                  <Image source={require('../../assets/ui/check.png')} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            )} />
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowAccessibilityModal(false)}>
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Location Sharing</Text>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Share with family</Text>
        <Controller
          control={control}
          name="shareWithFamily"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Share with authorities</Text>
        <Controller
          control={control}
          name="shareWithAuthorities"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>

      <Text style={styles.label}>Notification Preferences</Text>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Safety notifications</Text>
        <Controller
          control={control}
          name="safetyNotifications"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Red zone alerts</Text>
        <Controller
          control={control}
          name="redZoneAlerts"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Crowd alerts</Text>
        <Controller
          control={control}
          name="crowdAlerts"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Local emergency notifications</Text>
        <Controller
          control={control}
          name="localEmergency"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.saveText}>Finish</Text>
      </TouchableOpacity>

      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Preferred Language</Text>
            <FlatList
              data={languageOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectLanguage(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                  {selectedLanguage === item && (
                    <Image source={require('../../assets/ui/check.png')} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowLanguageModal(false)}
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  switchLabel: {
    fontSize: 15,
    color: '#1e293b',
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
