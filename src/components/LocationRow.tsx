import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface LocationRowProps {
  title: string;
  address: string;
  icon: string;
  onPress: () => void;
}

export const LocationRow: React.FC<LocationRowProps> = ({
  title,
  address,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name={icon as any} size={18} color={theme.colors.textSecondary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    marginBottom: 4,
  },
  address: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
});
