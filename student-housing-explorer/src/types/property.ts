export interface Property {
  id: string;
  name: string;
  lat: number;
  lng: number;
  price: number;
  currency: string;
  address: string;
  university: string;
  distance: number;
  rating: number | null;
  about: string;
  images: string[];
  houseUrl: string;
  operator?: string;
  beds?: number;
  roomTypes?: string;
  country?: string;
  city?: string;
}

export interface FetchPropertiesResult {
  data: Property[];
  fetchedAt: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCities: string[];
  maxPrice: number | null;
  maxDistance: number | null;
}