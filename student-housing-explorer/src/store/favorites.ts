import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getFavorites: () => string[];
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (id: string) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favId) => favId !== id)
            : [...state.favoriteIds, id],
        })),
      isFavorite: (id: string) => get().favoriteIds.includes(id),
      getFavorites: () => get().favoriteIds,
      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: 'student-housing-favorites',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);