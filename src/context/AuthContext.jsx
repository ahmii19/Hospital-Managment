import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id: 1, email: 'admin@gmail.com', password: '123456', name: 'Admin User', role: 'Admin', avatar: 'AU' },
  { id: 2, email: 'doctor@gmail.com', password: '123456', name: 'Dr. Sarah Johnson', role: 'Doctor', avatar: 'SJ' },
  { id: 3, email: 'receptionist@gmail.com', password: '123456', name: 'Jane Smith', role: 'Receptionist', avatar: 'JS' },
  { id: 4, email: 'patient@gmail.com', password: '123456', name: 'Alice Thompson', role: 'Patient', avatar: 'AT' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hms_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 1000)); // simulate network delay
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const token = btoa(`${found.email}:${Date.now()}`);
      const userData = { ...found, token };
      localStorage.setItem('hms_user', JSON.stringify(userData));
      localStorage.setItem('hms_token', token);
      setUser(userData);
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (data) => {
    await new Promise(r => setTimeout(r, 1200));
    const newUser = { id: Date.now(), ...data, avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase() };
    const token = btoa(`${data.email}:${Date.now()}`);
    const userData = { ...newUser, token };
    localStorage.setItem('hms_user', JSON.stringify(userData));
    localStorage.setItem('hms_token', token);
    setUser(userData);
    return { success: true, user: userData };
  };

  const logout = () => {
    localStorage.removeItem('hms_user');
    localStorage.removeItem('hms_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
