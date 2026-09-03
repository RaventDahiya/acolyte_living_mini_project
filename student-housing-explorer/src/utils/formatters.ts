import { CURRENCY_SYMBOLS } from '@/constants';

export function formatCurrency(price: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return `${symbol}${formattedPrice}/week`;
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

export function formatRating(rating: number | null): string {
  if (rating === null) return '—';
  return rating.toFixed(1);
}