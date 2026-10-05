export const colors = {
  primary: '#4B2CE0',
  primaryMuted: '#EDE8FF',
  accent: '#00C2A8',
  background: '#FFFFFF',
  surface: '#F6F5FB',
  text: '#111118',
  textSecondary: '#6B6B7A',
  textMuted: '#9A9AAB',
  border: '#ECEAF4',
  overlay: 'rgba(17, 17, 24, 0.45)',
  star: '#F5B400',
  danger: '#E5484D',
  white: '#FFFFFF',
} as const;

export type ColorName = keyof typeof colors;
