import colors, { c } from './colors';
import typography, { fontSize, fontWeight, lineHeight } from './typography';
import { spacing, borderRadius, iconSize, avatarSize } from './spacing';
import shadows from './shadows';

// Complete theme object
export const theme = {
  colors,
  c, // shorthand colors
  typography,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  borderRadius,
  iconSize,
  avatarSize,
  shadows,

  // Animation durations
  duration: {
    fast: 150,
    base: 200,
    slow: 300,
    slower: 500,
  },
};

export default theme;

// Export individual modules
export { colors, c, typography, fontSize, fontWeight, lineHeight, spacing, borderRadius, iconSize, avatarSize, shadows };
