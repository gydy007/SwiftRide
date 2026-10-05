import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

export const PromoBanner: React.FC = () => {
  return (
    <LinearGradient
      colors={[theme.colors.primary, '#8265E6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>50% off your next 3 rides</Text>
        <Text style={styles.subtitle}>Use code SWIFT50</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.shadows.card,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.background,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
