export const theme = {
  colors: {
    primary: '#4B2CE0',
    accent: '#00C2A8',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#1A1A1A',
    textSecondary: '#666666',
    border: '#E0E0E0',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 9999,
  },
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
  },
  typography: {
    h1: {
      fontFamily: 'Inter_700Bold',
      fontSize: 28,
      lineHeight: 34,
    },
    h2: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 22,
      lineHeight: 28,
    },
    h3: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
      lineHeight: 24,
    },
    bodyLarge: {
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      lineHeight: 24,
    },
    bodyMedium: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      lineHeight: 20,
    },
    bodySmall: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      lineHeight: 16,
    },
    label: {
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      lineHeight: 16,
      textTransform: 'uppercase' as const,
    },
  },
};
