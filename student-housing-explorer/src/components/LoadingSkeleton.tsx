import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LoadingSkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const LoadingSkeleton = React.memo(function LoadingSkeleton({
  width = 200,
  height = 16,
  borderRadius = 8,
  style,
}: LoadingSkeletonProps) {
  return (
    <LinearGradient
      colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
      style={[
        styles.skeleton,
        { width, height, borderRadius },
        style,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0, 0.5, 1]}
    />
  );
});

interface PropertyCardSkeletonProps {
  count?: number;
}

export const PropertyCardSkeleton = React.memo(function PropertyCardSkeleton({
  count = 3,
}: PropertyCardSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <View style={styles.container}>
      {items.map((i) => (
        <View key={i} style={styles.card}>
          <LoadingSkeleton width={300} height={160} borderRadius={12} />
          <View style={styles.content}>
            <LoadingSkeleton width={200} height={20} borderRadius={4} />
            <LoadingSkeleton width={150} height={14} borderRadius={4} />
            <View style={styles.row}>
              <LoadingSkeleton width={100} height={18} borderRadius={4} />
              <LoadingSkeleton width={80} height={14} borderRadius={4} />
              <LoadingSkeleton width={60} height={14} borderRadius={4} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#f0f0f0',
  },
  container: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    padding: 12,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
});