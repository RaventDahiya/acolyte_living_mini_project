import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, SafeAreaView, Modal, ScrollView, Animated, Dimensions } from 'react-native';
import { useFiltersStore } from '@/store/filters';
import { SearchBar } from './SearchBar';
import { CityChips } from './CityChips';
import { PriceSlider } from './PriceSlider';
import { DistanceSlider } from './DistanceSlider';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilterCount: number;
}

export const FilterSheet = React.memo(function FilterSheet({
  isOpen,
  onClose,
  activeFilterCount,
}: FilterSheetProps) {
  const {
    clearAll,
  } = useFiltersStore();

  const hasActiveFilters = activeFilterCount > 0;

  const handleBackdropPress = () => {
    Keyboard.dismiss();
    onClose();
  };

  const handleApply = () => {
    Keyboard.dismiss();
    onClose();
  };

  const handleClearAll = () => {
    clearAll();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Filters</Text>
      {hasActiveFilters && (
        <TouchableOpacity onPress={handleClearAll} style={styles.clearAllButton}>
          <Text style={styles.clearAllText}>Clear all</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleBackdropPress}
    >
      <TouchableOpacity onPress={handleBackdropPress} style={styles.overlay} />
      <Animated.View style={styles.bottomSheet}>
        <View style={styles.handle} />
        {renderHeader()}
        <SafeAreaView style={styles.content}>
          <SearchBar />
          <CityChips />
          <PriceSlider />
          <DistanceSlider />
          <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>
              Apply {hasActiveFilters ? `(${activeFilterCount})` : ''}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  content: {
    paddingTop: 8,
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  clearAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  clearAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  applyButton: {
    margin: 16,
    paddingVertical: 16,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});