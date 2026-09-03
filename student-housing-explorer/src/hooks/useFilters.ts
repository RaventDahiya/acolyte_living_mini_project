import { useFiltersStore } from '@/store/filters';
import type { FilterState } from '@/types/property';

export function useFilters() {
  const {
    searchQuery,
    selectedCities,
    maxPrice,
    maxDistance,
    setSearchQuery,
    toggleCity,
    setMaxPrice,
    setMaxDistance,
    clearAll,
    getActiveCount,
  } = useFiltersStore();

  const filters: FilterState = {
    searchQuery,
    selectedCities,
    maxPrice,
    maxDistance,
  };

  return {
    filters,
    setSearchQuery,
    toggleCity,
    setMaxPrice,
    setMaxDistance,
    clearAll,
    getActiveCount,
  };
}