import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '../theme';
import type { UserProfile } from '../types';

interface GreetingHeaderProps {
  user: UserProfile;
  pickupLabel: string;
  onAvatarPress: () => void;
}

function greetingForHour(hour: number): string {
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 18) {
    return 'Good afternoon';
  }
  return 'Good evening';
}

export function GreetingHeader({ user, pickupLabel, onAvatarPress }: GreetingHeaderProps) {
  const greeting = greetingForHour(new Date().getHours());

  return (
    <View style={styles.header}>
      <View style={styles.copy}>
        <Text style={styles.greeting}>{greeting},</Text>
        <Text style={styles.name}>{user.firstName}</Text>
        <View style={styles.location}>
          <Ionicons color={colors.primary} name="location" size={14} />
          <Text numberOfLines={1} style={styles.locationText}>
            {pickupLabel}
          </Text>
        </View>
      </View>
      <Pressable accessibilityRole="button" onPress={onAvatarPress} style={styles.avatar}>
        <Text style={styles.avatarText}>{user.avatarInitials}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  copy: {
    flex: 1,
    paddingRight: spacing.md,
  },
  greeting: {
    color: colors.textSecondary,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  name: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 30,
    letterSpacing: -0.5,
    lineHeight: 36,
    marginTop: 2,
  },
  location: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  locationText: {
    color: colors.textSecondary,
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  avatarText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 14,
  },
});
