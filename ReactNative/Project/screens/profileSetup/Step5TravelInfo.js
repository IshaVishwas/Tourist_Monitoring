import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, FlatList, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
  'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
  'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad',
  'Navi Mumbai', 'Solapur', 'Vijayawada', 'Kolhapur', 'Amritsar', 'Nashik', 'Allahabad',
  'Ranchi', 'Howrah', 'Coimbatore', 'Raipur', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur',
  'Madurai', 'Guwahati', 'Chandigarh', 'Hubli-Dharwad', 'Tiruchirappalli', 'Mysore', 'Tiruppur',
  'Kochi', 'Bhavnagar', 'Salem', 'Warangal', 'Guntur', 'Bhiwandi', 'Amravati', 'Nanded',
  'Kolhapur', 'Sangli', 'Malegaon', 'Ulhasnagar', 'Jalgaon', 'Akola', 'Latur', 'Ahmadnagar',
  'Dhule', 'Ichalkaranji', 'Parbhani', 'Jalna', 'Bhusawal', 'Panvel', 'Satara', 'Beed',
  'Yavatmal', 'Kamptee', 'Gondia', 'Achalpur', 'Osmanabad', 'Nandurbar', 'Wardha', 'Udgir',
  'Aurangabad', 'Amalner', 'Akot', 'Pandharpur', 'Shirpur-Warwade', 'Pusad', 'Lonavla',
  'Amalner', 'Akot', 'Pandharpur', 'Shirpur-Warwade', 'Pusad', 'Lonavla'
];

export default function Step5TravelInfo({ defaultValues = {}, onNext }) {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({ 
    defaultValues: {
      selectedCities: [],
      ...defaultValues
    }
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCitiesModal, setShowCitiesModal] = useState(false);
  const travelerOptions = ['Solo', 'Couple', 'Family', 'Group'];
  const travelTypeOptions = ['Leisure', 'Adventure', 'Pilgrimage', 'Work', 'Study', 'Medical Tourism'];
  const modeOptions = ['Flight', 'Train', 'Bus', 'Car', 'Bike', 'Other'];
  const [showTravelerModal, setShowTravelerModal] = useState(false);
  const [showTravelTypeModal, setShowTravelTypeModal] = useState(false);
  const [showModeModal, setShowModeModal] = useState(false);
  const roomTypeOptions = ['Single', 'Double', 'Suite', 'Family', 'Dorm', 'Other'];
  const [showRoomTypeModal, setShowRoomTypeModal] = useState(false);
  const [wantGuide, setWantGuide] = useState(false);
  const [wantFood, setWantFood] = useState(false);
  const [transportOption, setTransportOption] = useState('');
  const transportOptions = ['Taxi apps', 'Metro cards', 'Bus passes', 'Car rentals', 'Other'];
  const [showTransportModal, setShowTransportModal] = useState(false);
  
  const selectedDate = watch('departureDate');
  const selectedCities = watch('selectedCities');

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
      setValue('departureDate', selectedDate.toISOString());
    }
  };

  const toggleCity = (city) => {
    const currentCities = selectedCities || [];
    const isSelected = currentCities.includes(city);
    
    if (isSelected) {
      setValue('selectedCities', currentCities.filter(c => c !== city));
    } else {
      setValue('selectedCities', [...currentCities, city]);
    }
  };

  const formatSelectedCities = () => {
    if (!selectedCities || selectedCities.length === 0) return 'Select cities';
    if (selectedCities.length === 1) return selectedCities[0];
    return `${selectedCities.length} cities selected`;
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Number of Travelers</Text>
      <Controller
        control={control}
        name="numberOfTravelers"
        rules={{ required: 'Please select number of travelers' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowTravelerModal(true)}>
            <Image source={require('../../assets/profile/avatar-placeholder.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>{value || 'Select'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      {errors.numberOfTravelers && <Text style={styles.error}>{errors.numberOfTravelers.message}</Text>}
      <Modal visible={showTravelerModal} transparent animationType="slide" onRequestClose={() => setShowTravelerModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Number of Travelers</Text>
            <FlatList data={travelerOptions} keyExtractor={item => item} renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => { setValue('numberOfTravelers', item); setShowTravelerModal(false); }}>
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )} />
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowTravelerModal(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>Travel Type</Text>
      <Controller
        control={control}
        name="travelType"
        rules={{ required: 'Please select travel type' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowTravelTypeModal(true)}>
            <Image source={require('../../assets/ui/settings.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>{value || 'Select'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      {errors.travelType && <Text style={styles.error}>{errors.travelType.message}</Text>}
      <Modal visible={showTravelTypeModal} transparent animationType="slide" onRequestClose={() => setShowTravelTypeModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Travel Type</Text>
            <FlatList data={travelTypeOptions} keyExtractor={item => item} renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => { setValue('travelType', item); setShowTravelTypeModal(false); }}>
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )} />
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowTravelTypeModal(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>Preferred Mode of Travel</Text>
      <Controller
        control={control}
        name="modeOfTravel"
        rules={{ required: 'Please select mode of travel' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowModeModal(true)}>
            <Image source={require('../../assets/ui/plus.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>{value || 'Select'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      {errors.modeOfTravel && <Text style={styles.error}>{errors.modeOfTravel.message}</Text>}
      <Modal visible={showModeModal} transparent animationType="slide" onRequestClose={() => setShowModeModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Mode of Travel</Text>
            <FlatList data={modeOptions} keyExtractor={item => item} renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => { setValue('modeOfTravel', item); setShowModeModal(false); }}>
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )} />
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowModeModal(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>Duration of Stay in Each City</Text>
      <Controller
        control={control}
        name="durationPerCity"
        rules={{ required: 'Please enter duration per city' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="e.g. Mumbai: 3 days, Delhi: 2 days"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.durationPerCity && <Text style={styles.error}>{errors.durationPerCity.message}</Text>}

      <Text style={styles.label}>Cities Planning to Visit</Text>
      <Controller
        control={control}
        name="selectedCities"
        rules={{ required: 'Please select at least one city' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowCitiesModal(true)}>
            <Image source={require('../../assets/profile/travel-bag.png')} style={styles.fieldIcon} />
            <Text style={{ color: value && value.length > 0 ? '#1e293b' : '#94a3b8', flex: 1 }}>
              {formatSelectedCities()}
            </Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      {errors.selectedCities && <Text style={styles.error}>{errors.selectedCities.message}</Text>}

      <Text style={styles.label}>Expected Departure Date</Text>
      <Controller
        control={control}
        name="departureDate"
        rules={{ required: 'Departure date is required' }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowDatePicker(true)}>
            <Image source={require('../../assets/ui/calendar.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>
              {value ? formatDate(value) : 'Select date'}
            </Text>
          </TouchableOpacity>
        )}
      />
      {errors.departureDate && <Text style={styles.error}>{errors.departureDate.message}</Text>}


      <Text style={styles.label}>Upload Itinerary</Text>
      <TouchableOpacity style={styles.uploadBtn} onPress={() => {/* TODO: File upload */}}>
        <Image source={require('../../assets/ui/plus.png')} style={styles.uploadIcon} />
        <Text style={styles.uploadText}>Upload File</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Accommodation Booking Details</Text>
      <Controller
        control={control}
        name="accommodationDetails"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Hotel/Airbnb/Hostel Name & Address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={styles.label}>Duration of Stay in Each Hotel</Text>
      <Controller
        control={control}
        name="accommodationDuration"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="e.g. Taj Mumbai: 3 days, Airbnb Delhi: 2 days"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={styles.label}>Room Type</Text>
      <Controller
        control={control}
        name="roomType"
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowRoomTypeModal(true)}>
            <Image source={require('../../assets/ui/plus.png')} style={styles.fieldIcon} />
            <Text style={{ color: value ? '#1e293b' : '#94a3b8', flex: 1 }}>{value || 'Select room type'}</Text>
            <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        )}
      />
      <Modal visible={showRoomTypeModal} transparent animationType="slide" onRequestClose={() => setShowRoomTypeModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Room Type</Text>
            <FlatList data={roomTypeOptions} keyExtractor={item => item} renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => { setValue('roomType', item); setShowRoomTypeModal(false); }}>
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )} />
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowRoomTypeModal(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Number of Days of Stay</Text>
      <Controller
        control={control}
        name="daysOfStay"
        rules={{ required: 'Number of days is required', min: { value: 1, message: 'Must be at least 1' } }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Number of Days"
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
          />
        )}
      />
      {errors.daysOfStay && <Text style={styles.error}>{errors.daysOfStay.message}</Text>}

      <Text style={styles.label}>Group Member Names & Nationalities</Text>
      <Controller
        control={control}
        name="groupMembers"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="e.g. John Doe (USA), Priya Singh (India)"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      <Text style={styles.label}>Age Range of Group Members</Text>
      <Controller
        control={control}
        name="groupAgeRange"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="e.g. 18-35"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={styles.label}>Emergency Contact for Group Members</Text>
      <Controller
        control={control}
        name="groupEmergencyContact"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="e.g. Jane Doe: +1-555-1234, jane@email.com"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />

      <Text style={styles.label}>Do you want Local Guide Recommendations?</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <TouchableOpacity style={[styles.uploadBtn, { backgroundColor: wantGuide ? '#10b981' : '#cbd5e1' }]} onPress={() => setWantGuide(true)}>
          <Text style={styles.uploadText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.uploadBtn, { backgroundColor: !wantGuide ? '#10b981' : '#cbd5e1' }]} onPress={() => setWantGuide(false)}>
          <Text style={styles.uploadText}>No</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Do you want Transport Assistance Suggestions?</Text>
      <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowTransportModal(true)}>
        <Image source={require('../../assets/ui/plus.png')} style={styles.fieldIcon} />
        <Text style={{ color: transportOption ? '#1e293b' : '#94a3b8', flex: 1 }}>{transportOption || 'Select option'}</Text>
        <Image source={require('../../assets/ui/dropdown-arrow.png')} style={styles.dropdownIcon} />
      </TouchableOpacity>
      <Modal visible={showTransportModal} transparent animationType="slide" onRequestClose={() => setShowTransportModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Transport Assistance</Text>
            <FlatList data={transportOptions} keyExtractor={item => item} renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => { setTransportOption(item); setShowTransportModal(false); }}>
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )} />
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowTransportModal(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>Do you want Restaurant & Food Recommendations?</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <TouchableOpacity style={[styles.uploadBtn, { backgroundColor: wantFood ? '#10b981' : '#cbd5e1' }]} onPress={() => setWantFood(true)}>
          <Text style={styles.uploadText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.uploadBtn, { backgroundColor: !wantFood ? '#10b981' : '#cbd5e1' }]} onPress={() => setWantFood(false)}>
          <Text style={styles.uploadText}>No</Text>
        </TouchableOpacity>
      </View>

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
          minimumDate={new Date()}
        />
      )}

      {/* Cities Modal */}
      <Modal
        visible={showCitiesModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCitiesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Cities to Visit</Text>
            <Text style={styles.modalSubtitle}>You can select multiple cities</Text>
            <FlatList
              data={indianCities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => toggleCity(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                  {selectedCities && selectedCities.includes(item) && (
                    <Image source={require('../../assets/ui/check.png')} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setShowCitiesModal(false)}
              >
                <Text style={styles.modalCloseText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalDoneBtn}
                onPress={() => setShowCitiesModal(false)}
              >
                <Text style={styles.modalDoneText}>Done</Text>
              </TouchableOpacity>
            </View>
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
  uploadBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    width: 140,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#fff',
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
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
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
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
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalCloseBtn: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 16,
  },
  modalDoneBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  modalDoneText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
