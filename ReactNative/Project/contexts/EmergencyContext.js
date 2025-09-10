import React, { createContext, useState, useContext } from 'react';

const EmergencyContext = createContext();

export const EmergencyProvider = ({ children }) => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [incidents, setIncidents] = useState([]);

  const addContact = (contact) => setEmergencyContacts([...emergencyContacts, contact]);
  const reportIncident = (incident) => setIncidents([...incidents, incident]);

  return (
    <EmergencyContext.Provider value={{ emergencyContacts, addContact, incidents, reportIncident }}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => useContext(EmergencyContext);
