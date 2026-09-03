import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FavoritesScreen from '@/screens/FavoritesScreen';

export default function FavoritesTabScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FavoritesScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});