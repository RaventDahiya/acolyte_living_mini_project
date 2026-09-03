import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
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
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>Saved Properties</Text>
        <Text style={styles.subtitle}>
          {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
        </Text>
      </View>
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
  topBar: {
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