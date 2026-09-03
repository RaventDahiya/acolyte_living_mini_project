import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, RefreshControl, SafeAreaView, TouchableOpacity } from 'react-native';
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
  const { properties, isLoading, refetch } = useProperties();
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
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.appTitle}>Student Housing</Text>
          <Text style={styles.subtitle}>
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setFilterSheetOpen(true)}
          style={[styles.filterButton, activeFilterCount > 0 && styles.filterButtonActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterIcon, activeFilterCount > 0 && styles.filterIconActive]}>
            ⚙️ Filter
          </Text>
          {activeFilterCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterIcon: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  filterIconActive: {
    color: '#fff',
  },
  badge: {
    backgroundColor: '#fff',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007AFF',
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