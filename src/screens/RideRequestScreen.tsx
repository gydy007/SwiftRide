import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '../navigation/types';
import { colors, fonts, radii, spacing } from '../theme';

export function RideRequestScreen({ navigation }: RootStackScreenProps<'RideRequest'>) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + spacing.lg }]}>
      <Text style={styles.title}>Where to?</Text>
      <Text style={styles.body}>
        Destination search is the next screen. Home is complete first so we can match the design
        before building the rest of the ride flow.
      </Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonLabel}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  body: {
    color: colors.textSecondary,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  buttonLabel: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 15,
  },
});
