import { create } from 'zustand';

type User = {
  id: string;
  email?: string;
  token?: string;
  // anything else you need
};

type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const useAuth = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuth;