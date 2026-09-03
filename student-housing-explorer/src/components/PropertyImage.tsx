import React from 'react';
import { View, StyleSheet, ActivityIndicator, StyleProp, ImageStyle } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

interface PropertyImageProps {
  source?: string;
  style?: StyleProp<ImageStyle>;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: string;
  transition?: number;
}

export const PropertyImage = React.memo(function PropertyImage({
  source,
  style,
  contentFit = 'cover',
  placeholder = 'blur',
  transition = 200,
}: PropertyImageProps) {
  return (
    <ExpoImage
      source={source}
      style={style}
      contentFit={contentFit}
      transition={transition}
      placeholder={placeholder}
    />
  );
});

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});