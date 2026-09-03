import { useQuery } from '@tanstack/react-query';
import { fetchProperties } from '@/api/properties';
import { useFiltersStore } from '@/store/filters';
import { filterProperties } from '@/utils/filterUtils';
import type { Property } from '@/types/property';

export function useProperties() {
  const filters = useFiltersStore();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    staleTime: 5 * 60 * 1000,
  });

  const filteredProperties: Property[] = data
    ? filterProperties(data.data, filters)
    : [];

  return {
    properties: filteredProperties,
    allProperties: data?.data ?? [],
    fetchedAt: data?.fetchedAt,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
}