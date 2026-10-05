import { TextStyle } from 'react-native';

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const typography = {
  greeting: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 20,
  } satisfies TextStyle,
  display: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.4,
  } satisfies TextStyle,
  title: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 24,
  } satisfies TextStyle,
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  } satisfies TextStyle,
  bodyMedium: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
  } satisfies TextStyle,
  caption: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
  } satisfies TextStyle,
  label: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
  } satisfies TextStyle,
  tab: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 14,
  } satisfies TextStyle,
} as const;
