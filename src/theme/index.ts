import { colors } from './colors';
import { radii, spacing } from './spacing';
import { fonts, typography } from './typography';

export const theme = {
  colors,
  spacing,
  radii,
  fonts,
  typography,
  shadow: {
    card: {
      shadowColor: '#1A1240',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
    },
    tab: {
      shadowColor: '#1A1240',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 12,
    },
  },
} as const;

export type Theme = typeof theme;

export { colors, fonts, radii, spacing, typography };
