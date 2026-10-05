import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface ServiceCategoryCardProps {
  title: string;
  icon: string;
  type?: string;
  isSelected: boolean;
  onPress: () => void;
}

export const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({
  title,
  icon,
  type = 'font-awesome-5',
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.containerSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
        {type === 'feather' ? (
          <Feather
            name={icon as any}
            size={24}
            color={isSelected ? theme.colors.background : theme.colors.primary}
          />
        ) : (
          <FontAwesome5
            name={icon as any}
            size={24}
            color={isSelected ? theme.colors.background : theme.colors.primary}
          />
        )}
      </View>
      <Text style={[styles.title, isSelected && styles.titleSelected]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    width: 72,
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    ...theme.shadows.card,
  },
  containerSelected: {
    backgroundColor: theme.colors.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  iconContainerSelected: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
  },
  titleSelected: {
    color: theme.colors.background,
    ...theme.typography.label, // or slightly bolder
  },
});
