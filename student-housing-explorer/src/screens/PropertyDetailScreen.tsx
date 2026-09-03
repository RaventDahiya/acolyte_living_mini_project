import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ImageStyle } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';
import { useProperty } from '@/hooks/useProperty';
import { useFavoritesStore } from '@/store/favorites';
import { RatingStars } from '@/components/RatingStars';
import { formatCurrency, formatDistance } from '@/utils/formatters';

export default function PropertyDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: property, isLoading, isError, error } = useProperty(id);
  const { favoriteIds, toggleFavorite, isFavorite } = useFavoritesStore();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleFavoritePress = useCallback(() => {
    if (property) {
      toggleFavorite(property.id);
    }
  }, [property, toggleFavorite]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !property) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error?.message || 'Property not found'}
          </Text>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isFav = isFavorite(property.id);
  const hasImages = property.images.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image / Gallery */}
        <View style={styles.imageSection}>
          {hasImages ? (
            <ExpoImage
              source={property.images[0]}
              style={styles.heroImage}
              contentFit="cover"
              transition={300}
              placeholder="blur"
            />
          ) : (
            <View style={[styles.heroImage, styles.imagePlaceholder]}>
              <Text style={styles.placeholderText}>🏠</Text>
            </View>
          )}
          
          {/* Favorite Button */}
          <TouchableOpacity
            onPress={handleFavoritePress}
            style={[
              styles.favoriteButton,
              isFav && styles.favoriteButtonActive,
            ]}
            activeOpacity={0.7}
          >
            <Text style={styles.favoriteIcon}>
              {isFav ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>

          {/* Image Gallery Indicator */}
          {hasImages && property.images.length > 1 && (
            <View style={styles.galleryIndicator}>
              <Text style={styles.galleryText}>
                {property.images.length} photos · Swipe to view
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Header Info */}
          <View style={styles.header}>
            <Text style={styles.name}>{property.name}</Text>
          </View>

          <View style={styles.address}>
            <Text style={styles.addressText}>📍 {property.address}</Text>
          </View>

          {/* Price & Key Details */}
          <View style={styles.keyDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>
                {formatCurrency(property.price, property.currency)}
              </Text>
            </View>
            {property.beds && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Beds</Text>
                <Text style={styles.detailValue}>{property.beds}</Text>
              </View>
            )}
            {property.roomTypes && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Room Types</Text>
                <Text style={styles.detailValue}>{property.roomTypes}</Text>
              </View>
            )}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Rating</Text>
              <RatingStars rating={property.rating} size={16} showValue />
            </View>
          </View>

          {/* University & Distance */}
          <View style={styles.universitySection}>
            <View style={styles.universityRow}>
              <Text style={styles.universityLabel}>University</Text>
              <Text style={styles.universityValue}>{property.university}</Text>
            </View>
            <View style={styles.universityRow}>
              <Text style={styles.universityLabel}>Distance</Text>
              <Text style={styles.universityValue}>
                {formatDistance(property.distance)} to campus
              </Text>
            </View>
          </View>

          {/* Operator */}
          {property.operator && (
            <View style={styles.operatorSection}>
              <Text style={styles.operatorLabel}>Operator</Text>
              <Text style={styles.operatorValue}>{property.operator}</Text>
            </View>
          )}

          {/* About */}
          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>{property.about}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Back Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={handleBack} style={styles.bottomBackButton}>
          <Text style={styles.bottomBackText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  scrollContent: {
    flex: 1,
  },
  imageSection: {
    position: 'relative',
    height: 300,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 48,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteButtonActive: {
    backgroundColor: '#fff',
  },
  favoriteIcon: {
    fontSize: 22,
  },
  galleryIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  galleryText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
  content: {
    padding: 16,
    gap: 20,
  },
  header: {
    gap: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  address: {
    paddingTop: 4,
  },
  addressText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  keyDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  detailItem: {
    flex: 1,
    minWidth: 140,
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  universitySection: {
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  universityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  universityLabel: {
    fontSize: 14,
    color: '#666',
  },
  universityValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  operatorSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  operatorLabel: {
    fontSize: 14,
    color: '#666',
  },
  operatorValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  aboutSection: {
    gap: 8,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  aboutText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  bottomBar: {
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  bottomBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  bottomBackText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});