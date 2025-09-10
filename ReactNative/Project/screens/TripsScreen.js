import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useProfile } from '../contexts/ProfileContext';

export default function TripsScreen() {
  const theme = useTheme();
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingTrips, setUpcomingTrips] = useState([
    { id: 1, destination: 'Mumbai', date: 'Dec 20, 2024', duration: '3 days', status: 'Confirmed' },
    { id: 2, destination: 'Goa', date: 'Jan 5, 2025', duration: '5 days', status: 'Planned' },
  ]);
  const [pastTrips, setPastTrips] = useState([
    { id: 3, destination: 'Delhi', date: 'Dec 10, 2024', duration: '2 days', status: 'Completed' },
    { id: 4, destination: 'Bangalore', date: 'Nov 25, 2024', duration: '4 days', status: 'Completed' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTravelTypeModal, setShowTravelTypeModal] = useState(false);
  const [showModeModal, setShowModeModal] = useState(false);
  const [showRoomTypeModal, setShowRoomTypeModal] = useState(false);
  const [showTransportModal, setShowTransportModal] = useState(false);

  const travelTypeOptions = ['Leisure', 'Adventure', 'Pilgrimage', 'Work', 'Study', 'Medical Tourism'];
  const modeOptions = ['Flight', 'Train', 'Bus', 'Car', 'Bike', 'Other'];
  const roomTypeOptions = ['Single', 'Double', 'Suite', 'Family', 'Dorm', 'Other'];
  const transportOptions = ['Taxi apps', 'Metro cards', 'Bus passes', 'Car rentals', 'Other'];

  const [newTrip, setNewTrip] = useState({
    destination: '',
    date: '',
    duration: '',
    numPeople: '1',
    groupMembers: '',
    cities: '',
    durationPerCity: '',
    travelType: '',
    modeOfTravel: '',
    daysOfStay: '',
    accommodationDetails: '',
    accommodationDuration: '',
    roomType: '',
    wantGuide: false,
    transportOption: '',
    wantFood: false,
    itineraryFile: '',
  });

  const mockUploadItinerary = () => {
    setNewTrip({ ...newTrip, itineraryFile: 'itinerary.pdf' });
    alert('Mock itinerary uploaded: itinerary.pdf');
  };

  const handleAddTrip = () => {
    if (!newTrip.destination || !newTrip.date || !newTrip.duration) {
      alert('Please fill destination, date, and duration');
      return;
    }
    const id = Date.now();
    setUpcomingTrips([
      ...upcomingTrips,
      {
        id,
        destination: newTrip.destination,
        date: newTrip.date,
        duration: newTrip.duration,
        status: 'Planned',
        numPeople: newTrip.numPeople,
        groupMembers: newTrip.groupMembers,
        cities: newTrip.cities,
        durationPerCity: newTrip.durationPerCity,
        travelType: newTrip.travelType,
        modeOfTravel: newTrip.modeOfTravel,
        daysOfStay: newTrip.daysOfStay,
        accommodationDetails: newTrip.accommodationDetails,
        accommodationDuration: newTrip.accommodationDuration,
        roomType: newTrip.roomType,
        wantGuide: newTrip.wantGuide,
        transportOption: newTrip.transportOption,
        wantFood: newTrip.wantFood,
        itineraryFile: newTrip.itineraryFile,
      },
    ]);
    setShowAddModal(false);
    setNewTrip({
      destination: '',
      date: '',
      duration: '',
      numPeople: '1',
      groupMembers: '',
      cities: '',
      durationPerCity: '',
      travelType: '',
      modeOfTravel: '',
      daysOfStay: '',
      accommodationDetails: '',
      accommodationDuration: '',
      roomType: '',
      wantGuide: false,
      transportOption: '',
      wantFood: false,
      itineraryFile: '',
    });
    if (profile.guardianName && profile.guardianPhone) {
      alert('Guardian (' + profile.guardianName + ', ' + profile.guardianPhone + ') will be notified in case of alerts.');
    } else {
      alert('No guardian info set. Please update your emergency contact in your profile.');
    }
  };

  const renderTripCard = (trip) => (
    <TouchableOpacity key={trip.id} style={[styles.tripCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.tripHeader}>
        <Image source={require('../assets/profile/travel-bag.png')} style={styles.tripIcon} />
        <View style={styles.tripInfo}>
          <Text style={[styles.tripDestination, { color: theme.colors.text }]}>{trip.destination}</Text>
          <Text style={[styles.tripDate, { color: theme.colors.text }]}>{trip.date} • {trip.duration}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: trip.status === 'Confirmed' ? '#10b981' : trip.status === 'Planned' ? '#f59e0b' : '#6b7280' }]}>
          <Text style={styles.statusText}>{trip.status}</Text>
        </View>
      </View>
      <View style={styles.tripActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Image source={require('../assets/ui/edit.png')} style={styles.actionIcon} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Image source={require('../assets/emergency/location.png')} style={styles.actionIcon} />
          <Text style={styles.actionText}>Track</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Image source={require('../assets/ui/plus.png')} style={styles.actionIcon} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={[styles.title, { color: '#fff' }]}>My Trips</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddModal(true)}>
          <Image source={require('../assets/ui/plus.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
      <Modal visible={showAddModal} transparent animationType="slide" onRequestClose={() => setShowAddModal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: theme.colors.card, borderRadius: 12, padding: 20, width: '90%', maxHeight: '85%' }}>
            <ScrollView>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: theme.colors.text }}>Add New Trip</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }]}
                placeholder="Destination"
                value={newTrip.destination}
                onChangeText={text => setNewTrip({ ...newTrip, destination: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Date (e.g. 2024-12-20)"
                value={newTrip.date}
                onChangeText={text => setNewTrip({ ...newTrip, date: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Duration (e.g. 3 days)"
                value={newTrip.duration}
                onChangeText={text => setNewTrip({ ...newTrip, duration: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Number of People"
                value={newTrip.numPeople}
                keyboardType="number-pad"
                onChangeText={text => setNewTrip({ ...newTrip, numPeople: text })}
              />
              {newTrip.numPeople !== '1' && (
                <TextInput
                  style={styles.input}
                  placeholder="Group Member Names (comma separated)"
                  value={newTrip.groupMembers}
                  onChangeText={text => setNewTrip({ ...newTrip, groupMembers: text })}
                />
              )}
              <TextInput
                style={styles.input}
                placeholder="Cities Planning to Visit (comma separated)"
                value={newTrip.cities}
                onChangeText={text => setNewTrip({ ...newTrip, cities: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Duration per City (e.g. Mumbai: 3 days, Delhi: 2 days)"
                value={newTrip.durationPerCity}
                onChangeText={text => setNewTrip({ ...newTrip, durationPerCity: text })}
              />
              <TouchableOpacity style={styles.input} onPress={() => setShowTravelTypeModal(true)}>
                <Text style={{ color: newTrip.travelType ? '#1e293b' : '#94a3b8' }}>{newTrip.travelType || 'Select Travel Type'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]} onPress={() => setShowModeModal(true)}>
                <Text style={{ color: newTrip.modeOfTravel ? theme.colors.text : '#94a3b8' }}>{newTrip.modeOfTravel || 'Select Mode of Travel'}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Number of Days of Stay"
                value={newTrip.daysOfStay}
                keyboardType="number-pad"
                onChangeText={text => setNewTrip({ ...newTrip, daysOfStay: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Accommodation Booking Details (Name & Address)"
                value={newTrip.accommodationDetails}
                onChangeText={text => setNewTrip({ ...newTrip, accommodationDetails: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Duration of Stay in Each Hotel"
                value={newTrip.accommodationDuration}
                onChangeText={text => setNewTrip({ ...newTrip, accommodationDuration: text })}
              />
              <TouchableOpacity style={styles.input} onPress={() => setShowRoomTypeModal(true)}>
                <Text style={{ color: newTrip.roomType ? '#1e293b' : '#94a3b8' }}>{newTrip.roomType || 'Select Room Type'}</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TouchableOpacity style={[styles.button, { flex: 1, marginRight: 8, backgroundColor: newTrip.wantGuide ? '#10b981' : '#cbd5e1' }]} onPress={() => setNewTrip({ ...newTrip, wantGuide: !newTrip.wantGuide })}>
                  <Text style={styles.buttonText}>{newTrip.wantGuide ? 'Guide: Yes' : 'Guide: No'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: '#f1f5f9' }]} onPress={() => setShowTransportModal(true)}>
                  <Text style={[styles.buttonText, { color: '#1e293b' }]}>{newTrip.transportOption || 'Transport Assistance'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: newTrip.wantFood ? '#10b981' : '#cbd5e1' }]} onPress={() => setNewTrip({ ...newTrip, wantFood: !newTrip.wantFood })}>
                  <Text style={styles.buttonText}>{newTrip.wantFood ? 'Food Reco: Yes' : 'Food Reco: No'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { flex: 1, marginLeft: 8 }]} onPress={mockUploadItinerary}>
                  <Text style={styles.buttonText}>{newTrip.itineraryFile ? 'Itinerary: Uploaded' : 'Upload Itinerary'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: '#cbd5e1', marginRight: 8 }]} onPress={() => setShowAddModal(false)}>
                  <Text style={[styles.buttonText, { color: '#1e293b' }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: '#cbd5e1' }]} onPress={handleAddTrip}>
                  <Text style={[styles.buttonText, { color: '#1e293b' }]}>Done</Text>
                </TouchableOpacity>
              </View>
              {profile.guardianName && profile.guardianPhone && (
                <Text style={{ marginTop: 12, color: '#2563eb', textAlign: 'center' }}>
                  Guardian: {profile.guardianName} ({profile.guardianPhone})
                </Text>
              )}
            </ScrollView>

            {/* Travel Type Modal */}
            <Modal visible={showTravelTypeModal} transparent animationType="slide" onRequestClose={() => setShowTravelTypeModal(false)}>
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%', maxHeight: '70%' }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Select Travel Type</Text>
                  <FlatList data={travelTypeOptions} keyExtractor={item => item} renderItem={({ item }) => (
                    <TouchableOpacity style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' }} onPress={() => { setNewTrip({ ...newTrip, travelType: item }); setShowTravelTypeModal(false); }}>
                      <Text style={{ fontSize: 16 }}>{item}</Text>
                    </TouchableOpacity>
                  )} />
                  <TouchableOpacity style={{ backgroundColor: '#f1f5f9', paddingVertical: 12, borderRadius: 8, marginTop: 16, alignItems: 'center' }} onPress={() => setShowTravelTypeModal(false)}>
                    <Text style={{ color: '#6b7280', fontWeight: '600', fontSize: 16 }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Mode Modal */}
            <Modal visible={showModeModal} transparent animationType="slide" onRequestClose={() => setShowModeModal(false)}>
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%', maxHeight: '70%' }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Select Mode of Travel</Text>
                  <FlatList data={modeOptions} keyExtractor={item => item} renderItem={({ item }) => (
                    <TouchableOpacity style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' }} onPress={() => { setNewTrip({ ...newTrip, modeOfTravel: item }); setShowModeModal(false); }}>
                      <Text style={{ fontSize: 16 }}>{item}</Text>
                    </TouchableOpacity>
                  )} />
                  <TouchableOpacity style={{ backgroundColor: '#f1f5f9', paddingVertical: 12, borderRadius: 8, marginTop: 16, alignItems: 'center' }} onPress={() => setShowModeModal(false)}>
                    <Text style={{ color: '#6b7280', fontWeight: '600', fontSize: 16 }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Room Type Modal */}
            <Modal visible={showRoomTypeModal} transparent animationType="slide" onRequestClose={() => setShowRoomTypeModal(false)}>
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%', maxHeight: '70%' }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Select Room Type</Text>
                  <FlatList data={roomTypeOptions} keyExtractor={item => item} renderItem={({ item }) => (
                    <TouchableOpacity style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' }} onPress={() => { setNewTrip({ ...newTrip, roomType: item }); setShowRoomTypeModal(false); }}>
                      <Text style={{ fontSize: 16 }}>{item}</Text>
                    </TouchableOpacity>
                  )} />
                  <TouchableOpacity style={{ backgroundColor: '#f1f5f9', paddingVertical: 12, borderRadius: 8, marginTop: 16, alignItems: 'center' }} onPress={() => setShowRoomTypeModal(false)}>
                    <Text style={{ color: '#6b7280', fontWeight: '600', fontSize: 16 }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Transport Modal */}
            <Modal visible={showTransportModal} transparent animationType="slide" onRequestClose={() => setShowTransportModal(false)}>
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%', maxHeight: '70%' }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Select Transport Assistance</Text>
                  <FlatList data={transportOptions} keyExtractor={item => item} renderItem={({ item }) => (
                    <TouchableOpacity style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' }} onPress={() => { setNewTrip({ ...newTrip, transportOption: item }); setShowTransportModal(false); }}>
                      <Text style={{ fontSize: 16 }}>{item}</Text>
                    </TouchableOpacity>
                  )} />
                  <TouchableOpacity style={{ backgroundColor: '#f1f5f9', paddingVertical: 12, borderRadius: 8, marginTop: 16, alignItems: 'center' }} onPress={() => setShowTransportModal(false)}>
                    <Text style={{ color: '#6b7280', fontWeight: '600', fontSize: 16 }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </Modal>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]} 
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]} 
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'upcoming' ? (
          upcomingTrips.length > 0 ? (
            upcomingTrips.map(renderTripCard)
          ) : (
            <View style={styles.emptyState}>
              <Image source={require('../assets/profile/travel-bag.png')} style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>No upcoming trips</Text>
              <Text style={styles.emptySubtitle}>Plan your next adventure!</Text>
            </View>
          )
        ) : (
          pastTrips.length > 0 ? (
            pastTrips.map(renderTripCard)
          ) : (
            <View style={styles.emptyState}>
              <Image source={require('../assets/profile/travel-bag.png')} style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>No past trips</Text>
              <Text style={styles.emptySubtitle}>Your travel history will appear here</Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#2563eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
  },
  addIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: -12,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#2563eb',
  },
  tripInfo: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: 'bold',
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
  tripActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: '#2563eb',
  },
  actionText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
    tintColor: '#cbd5e1',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
