import { useFavoritesStore } from '@/store/favorites';

export function useFavorites() {
  const { favoriteIds, toggleFavorite, isFavorite, getFavorites, clearFavorites } =
    useFavoritesStore();

  return {
    favorites: favoriteIds,
    toggleFavorite,
    isFavorite,
    getFavorites,
    clearFavorites,
  };
}