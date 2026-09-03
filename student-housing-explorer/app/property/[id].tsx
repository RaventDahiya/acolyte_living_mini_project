import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PropertyDetailScreen from '@/screens/PropertyDetailScreen';

export default function PropertyDetailRoute() {
  return (
    <SafeAreaView style={styles.container}>
      <PropertyDetailScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});