import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropertyListScreen from '@/screens/PropertyListScreen';

export default function IndexScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <PropertyListScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});