import { create } from 'zustand';
import type { FilterState } from '@/types/property';

interface FiltersStore extends FilterState {
  setSearchQuery: (query: string) => void;
  toggleCity: (city: string) => void;
  setMaxPrice: (price: number | null) => void;
  setMaxDistance: (distance: number | null) => void;
  clearAll: () => void;
  getActiveCount: () => number;
}

const initialState: FilterState = {
  searchQuery: '',
  selectedCities: [],
  maxPrice: null,
  maxDistance: null,
};

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  ...initialState,
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  toggleCity: (city: string) =>
    set((state) => ({
      selectedCities: state.selectedCities.includes(city)
        ? state.selectedCities.filter((c) => c !== city)
        : [...state.selectedCities, city],
    })),
  setMaxPrice: (maxPrice: number | null) => set({ maxPrice }),
  setMaxDistance: (maxDistance: number | null) => set({ maxDistance }),
  clearAll: () => set(initialState),
  getActiveCount: () => {
    const state = get();
    let count = 0;
    if (state.searchQuery) count++;
    if (state.selectedCities.length > 0) count++;
    if (state.maxPrice !== null) count++;
    if (state.maxDistance !== null) count++;
    return count;
  },
}));