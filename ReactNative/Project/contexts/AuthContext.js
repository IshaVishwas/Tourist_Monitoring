import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    // TODO: Implement login logic (mock for now)
    setTimeout(() => {
      setUser({ name: 'Tourist', id: 'DGT123456' });
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  const requestOtp = async (phone) => {
    setLoading(true);
    // TODO: Integrate with real OTP service
    setTimeout(() => {
      setLoading(false);
      alert('OTP sent to ' + phone);
    }, 1000);
  };

  const loginWithOtp = async (otp) => {
    setLoading(true);
    // TODO: Validate OTP
    setTimeout(() => {
      setUser({ name: 'Tourist', id: 'DGT123456' });
      setLoading(false);
    }, 1000);
  };

  const loginWithBiometrics = async () => {
    setLoading(true);
    // TODO: Integrate with real biometric auth
    setTimeout(() => {
      setUser({ name: 'Tourist', id: 'DGT123456' });
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, requestOtp, loginWithOtp, loginWithBiometrics }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
