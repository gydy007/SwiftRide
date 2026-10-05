import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export const Activity: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Activity Screen</Text>
    </View>
  );
};

export const Wallet: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wallet Screen</Text>
    </View>
  );
};

export const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
});
