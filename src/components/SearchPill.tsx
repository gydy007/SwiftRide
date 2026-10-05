import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts, radii, spacing } from '../theme';

interface SearchPillProps {
  onPress: () => void;
}

export function SearchPill({ onPress }: SearchPillProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.pill, pressed && styles.pressed]}>
      <Ionicons color={colors.textMuted} name="search" size={20} />
      <Text style={styles.placeholder}>Where to?</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 56,
    paddingHorizontal: spacing.lg,
  },
  pressed: {
    opacity: 0.85,
  },
  placeholder: {
    color: colors.textMuted,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
});
