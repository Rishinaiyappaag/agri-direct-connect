import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
type UserRole = 'farmer' | 'exporter';

interface User {
  uid: string;
  email: string;
  name?: string;
  phone?: string;
  role?: UserRole;
  region?: string;
  cropsInterested?: string[];
  imageUrl?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string, role: UserRole) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateUserProfile: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Note: Actual Firebase implementation will be added later
  // This is a mock implementation for now
  const signIn = async (email: string, password: string, role: UserRole) => {
    // Mock implementation
    setLoading(true);
    try {
      // In real implementation, this would use Firebase auth
      console.log('Signing in with:', email, password, role);
      const mockUser = {
        uid: '123',
        email,
        name: 'Test User',
        role,
      };
      setCurrentUser(mockUser);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    // Mock implementation
    setLoading(true);
    try {
      // In real implementation, this would use Firebase auth and Firestore
      console.log('Signing up with:', email, password, name, role);
      const mockUser = {
        uid: '123',
        email,
        name,
        role,
      };
      setCurrentUser(mockUser);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    // Mock implementation
    try {
      // In real implementation, this would use Firebase auth
      console.log('Signing out');
      setCurrentUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<User>) => {
    // Mock implementation
    try {
      // In real implementation, this would update Firebase auth and Firestore
      console.log('Updating user profile:', data);
      setCurrentUser(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Mock effect to simulate auth state change
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
