import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [geoFence, setGeoFence] = useState([]);

  const updateLocation = (loc) => setLocation(loc);
  const updateGeoFence = (fence) => setGeoFence(fence);

  return (
    <LocationContext.Provider value={{ location, geoFence, updateLocation, updateGeoFence }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
