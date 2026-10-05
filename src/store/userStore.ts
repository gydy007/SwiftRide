import { create } from 'zustand';

import { mockUser } from '../data/user';
import type { UserProfile } from '../types';

interface UserState {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: mockUser,
  setUser: (user) => set({ user }),
  signOut: () => set({ user: mockUser }),
}));
