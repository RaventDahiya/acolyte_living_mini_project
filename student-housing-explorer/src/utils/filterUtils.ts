import type { Property, FilterState } from '@/types/property';

export function filterProperties(properties: Property[], filters: FilterState): Property[] {
  return properties.filter((property) => {
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = property.name.toLowerCase().includes(query);
      const matchesAddress = property.address.toLowerCase().includes(query);
      if (!matchesName && !matchesAddress) return false;
    }

    if (filters.selectedCities.length > 0) {
      if (!property.city || !filters.selectedCities.includes(property.city)) {
        return false;
      }
    }

    if (filters.maxPrice !== null && property.price > filters.maxPrice) {
      return false;
    }

    if (filters.maxDistance !== null && property.distance > filters.maxDistance) {
      return false;
    }

    return true;
  });
}

export function getUniqueCities(properties: Property[]): string[] {
  const cities = properties
    .map((p) => p.city)
    .filter((city): city is string => Boolean(city));
  return Array.from(new Set(cities)).sort();
}

export function getPriceRange(properties: Property[]): { min: number; max: number } {
  if (properties.length === 0) return { min: 0, max: 500 };
  const prices = properties.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}