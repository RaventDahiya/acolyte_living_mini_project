import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useProperties } from '@/hooks/useProperties';
import { useFavoritesStore } from '@/store/favorites';
import { PropertyCard } from '@/components/PropertyCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import type { Property } from '@/types/property';

export default function FavoritesScreen() {
  const router = useRouter();
  const { properties: allProperties, isLoading, refetch } = useProperties();
  const { favoriteIds } = useFavoritesStore();

  const flashListRef = useRef<any>(null);

  const favorites = allProperties.filter((p) => favoriteIds.includes(p.id));

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

  if (isLoading && allProperties.length === 0) {
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
        data={favorites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !isLoading && favorites.length === 0 ? (
            <EmptyState
              title="No saved properties yet"
              message="Tap the heart icon on any property to save it here"
              style={styles.emptyState}
            />
          ) : null
        }
        ListFooterComponent={
          !isLoading && favorites.length === 0 ? null : (
            <View style={styles.listFooter} />
          )
        }
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