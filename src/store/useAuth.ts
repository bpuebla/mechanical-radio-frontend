import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout as logoutAPI } from '../api/auth';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (tokens: { accessToken: string; refreshToken: string; user?: User }) => void;
  logout: () => Promise<void>;
  updateTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
      
      login: (tokens) => {
        set({
          isAuthenticated: true,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user: tokens.user || null,
        });
      },
      
      logout: async () => {
        try {
          // Call logout API to invalidate tokens on server
          await logoutAPI();
        } catch (error) {
          console.error('Logout API failed:', error);
        } finally {
          // Always clear local state
          set({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            user: null,
          });
        }
      },
      
      updateTokens: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuth;