import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii, spacing } from '../theme';
import type { Destination } from '../types';

interface LocationRowProps {
  destination: Destination;
  onPress: (destination: Destination) => void;
  showDivider?: boolean;
}

export function LocationRow({ destination, onPress, showDivider = true }: LocationRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(destination)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <Ionicons color={colors.primary} name="time-outline" size={18} />
      </View>
      <View style={[styles.copy, showDivider && styles.divider]}>
        <Text style={styles.title}>{destination.title}</Text>
        <Text numberOfLines={1} style={styles.address}>
          {destination.address}
        </Text>
      </View>
      <Ionicons color={colors.textMuted} name="chevron-forward" size={18} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 64,
  },
  pressed: {
    opacity: 0.72,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  copy: {
    flex: 1,
    paddingVertical: spacing.md,
  },
  divider: {
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 15,
  },
  address: {
    color: colors.textSecondary,
    fontFamily: fonts.regular,
    fontSize: 13,
    marginTop: 2,
  },
});
