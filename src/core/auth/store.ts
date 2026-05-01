import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  mockLogin,
  mockSignup,
  tokenStorage,
  AuthUser,
  SignupInput,
} from './mock-backend';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  hydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hydrated: false,
      login: async (email, password) => {
        const { token, user } = await mockLogin(email, password);
        tokenStorage.set(token);
        set({ user, token });
      },
      signup: async (input) => {
        const { token, user } = await mockSignup(input);
        tokenStorage.set(token);
        set({ user, token });
      },
      logout: () => {
        tokenStorage.clear();
        set({ user: null, token: null });
      },
    }),
    {
      name: 'launchpad-auth',
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    }
  )
);
