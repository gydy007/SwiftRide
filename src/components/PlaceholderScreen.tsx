import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '../theme';

interface PlaceholderScreenProps {
  title: string;
  body: string;
}

export function PlaceholderScreen({ title, body }: PlaceholderScreenProps) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  body: {
    color: colors.textSecondary,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
});
