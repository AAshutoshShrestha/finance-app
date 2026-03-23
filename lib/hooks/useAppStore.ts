import { create } from 'zustand';
import { Organization, User, Transaction, Category, Particular, Timeline } from '../const.interface';

interface AppState {
  // UI State
  sidebarOpen: boolean;
  darkMode: boolean;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;

  // Current Tenant & User
  currentTenant: Organization | null;
  currentUser: User | null;
  setCurrentTenant: (tenant: Organization | null) => void;
  setCurrentUser: (user: User | null) => void;

  // Data State
  transactions: Transaction[];
  categories: Category[];
  particulars: Particular[];
  timelines: Timeline[];
  isLoading: boolean;
  error: string | null;

  setTransactions: (transactions: Transaction[]) => void;
  setCategories: (categories: Category[]) => void;
  setParticulars: (particulars: Particular[]) => void;
  setTimelines: (timelines: Timeline[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // UI State
  sidebarOpen: false,
  darkMode: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { darkMode: newMode };
    }),

  // Current Tenant & User
  currentTenant: null,
  currentUser: null,
  setCurrentTenant: (tenant) => set({ currentTenant: tenant }),
  setCurrentUser: (user) => set({ currentUser: user }),

  // Data State
  transactions: [],
  categories: [],
  particulars: [],
  timelines: [],
  isLoading: false,
  error: null,

  setTransactions: (transactions) => set({ transactions }),
  setCategories: (categories) => set({ categories }),
  setParticulars: (particulars) => set({ particulars }),
  setTimelines: (timelines) => set({ timelines }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
