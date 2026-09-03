import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useFiltersStore } from '@/store/filters';
import { getPriceRange } from '@/utils/filterUtils';
import { useProperties } from '@/hooks/useProperties';

interface PriceSliderProps {
  style?: StyleProp<ViewStyle>;
}

export const PriceSlider = React.memo(function PriceSlider({ style }: PriceSliderProps) {
  const { maxPrice, setMaxPrice } = useFiltersStore();
  const { allProperties } = useProperties();
  const { min, max } = getPriceRange(allProperties);

  const handleIncrement = () => {
    const step = Math.ceil((max - min) / 20);
    const current = maxPrice ?? max;
    setMaxPrice(Math.min(current + step, max));
  };

  const handleDecrement = () => {
    const step = Math.ceil((max - min) / 20);
    const current = maxPrice ?? max;
    setMaxPrice(Math.max(current - step, min));
  };

  const handleClear = () => {
    setMaxPrice(null);
  };

  const displayMax = maxPrice ?? max;
  const progress = (displayMax - min) / (max - min);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.label}>Max Price</Text>
        <Text style={styles.value}>
          {maxPrice ? `£${displayMax.toLocaleString()}/wk` : `Up to £${max.toLocaleString()}/wk`}
        </Text>
      </View>
      <View style={styles.sliderContainer}>
        <TouchableOpacity
          onPress={handleDecrement}
          disabled={displayMax <= min}
          style={[
            styles.stepButton,
            displayMax <= min && styles.stepButtonDisabled,
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
        <Text style={styles.rangeLabel}>£{min.toLocaleString()}</Text>
        <Text style={styles.rangeLabel}>£{max.toLocaleString()}</Text>
      </View>
      {maxPrice !== null && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear max price</Text>
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