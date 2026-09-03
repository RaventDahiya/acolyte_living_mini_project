import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { useFiltersStore } from '@/store/filters';

interface SearchBarProps {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export const SearchBar = React.memo(function SearchBar({
  placeholder = 'Search by name or address...',
  style,
}: SearchBarProps) {
  const { searchQuery, setSearchQuery, clearAll } = useFiltersStore();

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    paddingVertical: 10,
  },
  clearButton: {
    padding: 4,
  },
  clearText: {
    fontSize: 18,
    color: '#999',
  },
});