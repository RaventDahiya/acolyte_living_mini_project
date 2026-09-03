import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useProperties } from '@/hooks/useProperties';
import { useFiltersStore } from '@/store/filters';
import { PropertyCard } from '@/components/PropertyCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { FilterSheet } from '@/components/FilterSheet';
import type { Property } from '@/types/property';

export default function PropertyListScreen() {
  const router = useRouter();
  const { properties, isLoading, isError, error, refetch } = useProperties();
  const { getActiveCount, clearAll } = useFiltersStore();
  const activeFilterCount = getActiveCount();

  const [filterSheetOpen, setFilterSheetOpen] = React.useState(false);

  const flashListRef = useRef<any>(null);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: Property }) => (
      <PropertyCard
        property={item}
        onPress={() => router.push(`/property/${item.id}`)}
      />
    ),
    [router]
  );

  const keyExtractor = useCallback((item: Property) => item.id, []);

  if (isLoading && properties.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        ref={flashListRef}
        data={properties}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !isLoading && properties.length === 0 ? (
            <EmptyState
              title="No properties found"
              message="Try adjusting your filters or search terms"
              actionLabel="Clear filters"
              onAction={clearAll}
              style={styles.emptyState}
            />
          ) : null
        }
        ListFooterComponent={
          !isLoading && properties.length === 0 ? null : (
            <View style={styles.listFooter} />
          )
        }
      />
      <FilterSheet
        isOpen={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        activeFilterCount={activeFilterCount}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
    gap: 12,
  },
  listFooter: {
    height: 80,
  },
  emptyState: {
    flex: 1,
    marginTop: 100,
  },
});