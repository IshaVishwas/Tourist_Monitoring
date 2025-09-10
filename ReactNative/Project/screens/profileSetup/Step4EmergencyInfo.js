import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useProfile } from '../../contexts/ProfileContext';

const relationshipOptions = [
  'Parent', 'Spouse', 'Friend', 'Guardian', 'Other'
];
const bloodGroups = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

export default function Step4EmergencyInfo({ defaultValues = {}, onNext }) {
  const { updateProfile } = useProfile();
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({ defaultValues });
  const [showRelationshipModal, setShowRelationshipModal] = useState(false);
  const [showBloodGroupModal, setShowBloodGroupModal] = useState(false);
  
  const selectedRelationship = watch('relationship');
  const selectedBloodGroup = watch('bloodGroup');

  const onSubmit = data => {
    updateProfile({
      guardianName: data.contactName,
      guardianPhone: data.contactPhone,
      guardianEmail: data.contactEmail,
      guardianRelationship: data.relationship,
    });
    onNext(data);
  };

  const selectRelationship = (relationship) => {
    setValue('relationship', relationship);
    setShowRelationshipModal(false);
  };

  const selectBloodGroup = (bloodGroup) => {
    setValue('bloodGroup', bloodGroup);
    setShowBloodGroupModal(false);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Emergency Contact Name</Text>
      <Controller
        control={control}
        name="contactName"
        rules={{ required: 'Contact name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Contact Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.contactName && <Text style={styles.error}>{errors.contactName.message}</Text>}

      <Text style={styles.label}>Relationship</Text>
      <Controller
        control={control}
        name="relationship"
        rules={{ required: 'Relationship is required' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowRelationshipModal(true)}>
            <Image source={require('../../assets/profile/emergency-contact.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>{value || 'Select relationship'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      {errors.relationship && <Text style={styles.error}>{errors.relationship.message}</Text>}

      <Text style={styles.label}>Emergency Contact Phone</Text>
      <Controller
        control={control}
        name="contactPhone"
        rules={{ required: 'Phone number is required', minLength: { value: 7, message: 'Invalid number' } }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.contactPhone && <Text style={styles.error}>{errors.contactPhone.message}</Text>}

      <Text style={styles.label}>Emergency Contact Email</Text>
      <Controller
        control={control}
        name="contactEmail"
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
      {errors.contactEmail && <Text style={styles.error}>{errors.contactEmail.message}</Text>}

      <Text style={styles.label}>Blood Group</Text>
      <Controller
        control={control}
        name="bloodGroup"
        rules={{ required: 'Blood group is required' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowBloodGroupModal(true)}>
            <Image source={require('../../assets/ui/medical-cross.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>{value || 'Select blood group'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      {errors.bloodGroup && <Text style={styles.error}>{errors.bloodGroup.message}</Text>}

      <Text style={styles.label}>Pre-existing Medical Conditions (optional)</Text>
      <Controller
        control={control}
        name="medicalConditions"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Medical Conditions"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.saveText}>Next</Text>
      </TouchableOpacity>

      {/* Relationship Modal */}
      <Modal
        visible={showRelationshipModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRelationshipModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Relationship</Text>
            <FlatList
              data={relationshipOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectRelationship(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                  {selectedRelationship === item && (
                    <Image source={require('../../assets/ui/check.png')} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowRelationshipModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Blood Group Modal */}
      <Modal
        visible={showBloodGroupModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBloodGroupModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Blood Group</Text>
            <FlatList
              data={bloodGroups}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectBloodGroup(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                  {selectedBloodGroup === item && (
                    <Image source={require('../../assets/ui/check.png')} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowBloodGroupModal(false)}
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
