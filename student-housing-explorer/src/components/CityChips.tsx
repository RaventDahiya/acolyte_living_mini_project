import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { useFiltersStore } from '@/store/filters';
import { getUniqueCities } from '@/utils/filterUtils';
import { useProperties } from '@/hooks/useProperties';

interface CityChipsProps {
  style?: StyleProp<ViewStyle>;
}

export const CityChips = React.memo(function CityChips({ style }: CityChipsProps) {
  const { selectedCities, toggleCity } = useFiltersStore();
  const { allProperties } = useProperties();
  const cities = getUniqueCities(allProperties);

  if (cities.length === 0) return null;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>City</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cities.map((city) => {
          const isSelected = selectedCities.includes(city);
          return (
            <TouchableOpacity
              key={city}
              onPress={() => toggleCity(city)}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
});