import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii, spacing, theme } from '../theme';
import type { PromoOffer } from '../types';

interface PromoBannerProps {
  offer: PromoOffer;
  onPress: () => void;
}

export function PromoBanner({ offer, onPress }: PromoBannerProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.wrap}>
      <LinearGradient
        colors={['#4B2CE0', '#3A22C4', '#00C2A8']}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.copy}>
          <Text style={styles.eyebrow}>{offer.eyebrow}</Text>
          <Text style={styles.title}>{offer.title}</Text>
          <Text style={styles.subtitle}>{offer.subtitle}</Text>
          <View style={styles.cta}>
            <Text style={styles.ctaLabel}>{offer.ctaLabel}</Text>
            <Ionicons color={colors.primary} name="arrow-forward" size={14} />
          </View>
        </View>
        <View style={styles.badge}>
          <Ionicons color={colors.white} name="pricetag" size={28} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radii.lg,
    ...theme.shadow.card,
  },
  gradient: {
    borderRadius: radii.lg,
    minHeight: 132,
    overflow: 'hidden',
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
  },
  copy: {
    flex: 1,
    paddingRight: spacing.md,
  },
  eyebrow: {
    color: 'rgba(255,255,255,0.78)',
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 6,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.86)',
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ctaLabel: {
    color: colors.primary,
    fontFamily: fonts.semibold,
    fontSize: 13,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 22,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
});
