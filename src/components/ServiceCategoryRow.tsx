import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '../theme';
import type { ServiceCategory, ServiceCategoryId } from '../types';

interface ServiceCategoryRowProps {
  categories: ServiceCategory[];
  selectedId: ServiceCategoryId;
  onSelect: (id: ServiceCategoryId) => void;
}

export function ServiceCategoryRow({
  categories,
  selectedId,
  onSelect,
}: ServiceCategoryRowProps) {
  return (
    <View style={styles.row}>
      {categories.map((category) => {
        const selected = category.id === selectedId;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={category.id}
            onPress={() => onSelect(category.id)}
            style={styles.item}
          >
            <View style={[styles.icon, selected && styles.iconSelected]}>
              {category.iconFamily === 'materialCommunity' ? (
                <MaterialCommunityIcons
                  color={selected ? colors.white : colors.primary}
                  name={category.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                  size={24}
                />
              ) : (
                <Ionicons
                  color={selected ? colors.white : colors.primary}
                  name={category.icon as keyof typeof Ionicons.glyphMap}
                  size={24}
                />
              )}
            </View>
            <Text style={[styles.label, selected && styles.labelSelected]}>{category.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.primaryMuted,
    borderRadius: 18,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  iconSelected: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.textSecondary,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  labelSelected: {
    color: colors.primary,
    fontFamily: fonts.semibold,
  },
});
