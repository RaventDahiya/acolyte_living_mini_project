import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useFiltersStore } from '@/store/filters';
import { useProperties } from '@/hooks/useProperties';

interface DistanceSliderProps {
  style?: StyleProp<ViewStyle>;
}

export const DistanceSlider = React.memo(function DistanceSlider({ style }: DistanceSliderProps) {
  const { maxDistance, setMaxDistance } = useFiltersStore();
  const { allProperties } = useProperties();

  const maxDistanceInData = allProperties.reduce(
    (acc, p) => Math.max(acc, p.distance),
    0
  );
  const max = Math.ceil(Math.max(maxDistanceInData, 5) * 2) / 2;

  const handleIncrement = () => {
    const step = 0.5;
    setMaxDistance(Math.min((maxDistance || max) + step, max));
  };

  const handleDecrement = () => {
    const step = 0.5;
    setMaxDistance(Math.max((maxDistance || max) - step, 0));
  };

  const handleClear = () => {
    setMaxDistance(null);
  };

  const displayMax = maxDistance ?? max;
  const progress = displayMax / max;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.label}>Max Distance</Text>
        <Text style={styles.value}>
          {maxDistance !== null ? `${displayMax} km` : `Up to ${max} km`}
        </Text>
      </View>
      <View style={styles.sliderContainer}>
        <TouchableOpacity
          onPress={handleDecrement}
          disabled={displayMax <= 0}
          style={[
            styles.stepButton,
            displayMax <= 0 && styles.stepButtonDisabled,
          ]}
        >
          <Text style={styles.stepButtonText}>−</Text>
        </TouchableOpacity>
        <View style={styles.track}>
          <View
            style={[
              styles.progress,
              { width: `${Math.max(0, Math.min(100, progress * 100))}%` },
            ]}
          />
        </View>
        <TouchableOpacity
          onPress={handleIncrement}
          disabled={displayMax >= max}
          style={[
            styles.stepButton,
            displayMax >= max && styles.stepButtonDisabled,
          ]}
        >
          <Text style={styles.stepButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeLabel}>0 km</Text>
        <Text style={styles.rangeLabel}>{max} km</Text>
      </View>
      {maxDistance !== null && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear max distance</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  value: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stepButtonDisabled: {
    opacity: 0.4,
  },
  stepButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
  },
  track: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  rangeLabel: {
    fontSize: 11,
    color: '#999',
  },
  clearButton: {
    marginTop: 4,
  },
  clearText: {
    fontSize: 13,
    color: '#007AFF',
    textAlign: 'center',
  },
});