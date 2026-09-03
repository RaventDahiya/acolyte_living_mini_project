export const APP_NAME = 'Student Housing Explorer';
export const STORAGE_KEYS = {
  FAVORITES: '@student_housing_favorites',
  FILTERS: '@student_housing_filters',
} as const;

export const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€',
} as const;

export const DEFAULT_MAX_PRICE = 500;
export const DEFAULT_MAX_DISTANCE = 5;