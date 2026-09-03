import { useQuery } from '@tanstack/react-query';
import { fetchPropertyById } from '@/api/properties';
import type { Property } from '@/types/property';

export function useProperty(id: string | undefined) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}