import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RatingStarsProps {
  rating: number | null;
  size?: number;
  color?: string;
  showValue?: boolean;
}

export const RatingStars = React.memo(function RatingStars({
  rating,
  size = 16,
  color = '#FFD700',
  showValue = false,
}: RatingStarsProps) {
  if (rating === null) {
    return showValue ? (
      <Text style={[styles.ratingText, { fontSize: size * 0.8 }]}>—</Text>
    ) : null;
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars: React.ReactNode[] = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Text key={`full-${i}`} style={[styles.star, { fontSize: size, color }]}>
        ★
      </Text>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Text key="half" style={[styles.star, { fontSize: size, color }]}>
        ½
      </Text>
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Text key={`empty-${i}`} style={[styles.star, { fontSize: size, color: '#ccc' }]}>
        ★
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.starsRow}>{stars}</View>
      {showValue && (
        <Text style={[styles.ratingText, { fontSize: size * 0.7 }]}>{rating.toFixed(1)}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  starsRow: {
    flexDirection: 'row',
  },
  star: {
    lineHeight: 1,
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
    fontWeight: '500',
  },
});