import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  tokens: Tokens | null;
  isAuthenticated: boolean;
  login: (tokens: Tokens) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
};

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      tokens: null,
      isAuthenticated: false,
      login: (tokens) => set({ tokens, isAuthenticated: true }),
      logout: () => set({ tokens: null, isAuthenticated: false }),
      setAccessToken: (accessToken) =>
        set((state) => ({
          tokens: state.tokens ? { ...state.tokens, accessToken } : null,
        })),
    }),
    {
      name: 'auth', // localstorage/AsyncStorage key
    }
  )
);

export default useAuth;