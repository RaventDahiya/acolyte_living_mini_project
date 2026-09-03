import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageStyle, GestureResponderEvent } from 'react-native';
import { PropertyImage } from './PropertyImage';
import { RatingStars } from './RatingStars';
import { formatCurrency, formatDistance } from '@/utils/formatters';
import { useFavoritesStore } from '@/store/favorites';
import type { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  style?: ImageStyle;
}

export const PropertyCard = React.memo(function PropertyCard({
  property,
  onPress,
  style,
}: PropertyCardProps) {
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const isFavorite = favoriteIds.includes(property.id);

  const handleFavoritePress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const imageSource = property.images.length > 0 ? property.images[0] : undefined;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, style]}
      activeOpacity={0.85}
    >
      <View style={styles.imageContainer}>
        <PropertyImage
          source={imageSource}
          style={styles.image}
          contentFit="cover"
          placeholder="blur"
        />
        <TouchableOpacity
          onPress={handleFavoritePress}
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
          activeOpacity={0.7}
        >
          <Text style={styles.favoriteIcon}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {property.name}
          </Text>
        </View>

        <View style={styles.locationRow}>
          <Text style={styles.locationText}>
            {property.city}{' '}
            {property.city && property.university ? '•' : ''}
            {' '}{property.university}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.priceText}>
            {formatCurrency(property.price, property.currency)}
          </Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>
              {formatDistance(property.distance)} to campus
            </Text>
          </View>
          <View style={styles.detailItem}>
            <RatingStars rating={property.rating} size={14} showValue />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 32,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteButtonActive: {
    backgroundColor: '#fff',
  },
  favoriteIcon: {
    fontSize: 18,
  },
  content: {
    padding: 12,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    flexWrap: 'wrap',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
});