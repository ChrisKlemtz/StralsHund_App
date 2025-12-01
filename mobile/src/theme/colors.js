export const colors = {
  primary: {
    50: '#FFF4E6',
    100: '#FFE4CC',
    200: '#FFCA99',
    300: '#FFAF66',
    400: '#FF9533',
    500: '#FF7A00', // Main brand color
    600: '#CC6200',
    700: '#994900',
    800: '#663100',
    900: '#331800',
  },
  secondary: {
    50: '#E6F3FF',
    100: '#CCE7FF',
    200: '#99CEFF',
    300: '#66B6FF',
    400: '#339DFF',
    500: '#0085FF',
    600: '#006ACC',
    700: '#005099',
    800: '#003566',
    900: '#001B33',
  },
  accent: {
    green: '#10B981',
    red: '#EF4444',
    yellow: '#F59E0B',
    purple: '#8B5CF6',
    pink: '#EC4899',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Semantic colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#0085FF',

  // Dark mode
  dark: {
    background: {
      primary: '#111827',
      secondary: '#1F2937',
      tertiary: '#374151',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      tertiary: '#9CA3AF',
    },
  },
};

// Shorthand for commonly used colors
export const c = {
  primary: colors.primary[500],
  secondary: colors.secondary[500],
  success: colors.success,
  error: colors.error,
  warning: colors.warning,
  white: colors.white,
  black: colors.black,
  gray: colors.gray[500],
  grayLight: colors.gray[300],
  grayDark: colors.gray[700],
};

export default colors;
