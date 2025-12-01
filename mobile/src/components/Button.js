import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

export default function Button({
  children,
  onPress,
  variant = 'primary', // primary, secondary, ghost, danger
  size = 'md', // sm, md, lg
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
  textStyle,
}) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${variant}`], styles[`button_${size}`]];

    if (fullWidth) baseStyle.push(styles.fullWidth);
    if (disabled) baseStyle.push(styles.disabled);
    if (style) baseStyle.push(style);

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`text_${variant}`], styles[`text_${size}`]];
    if (textStyle) baseStyle.push(textStyle);
    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={getButtonStyle()}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.white : colors.primary[500]} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={getTextStyle()}>{children}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },

  // Variants
  button_primary: {
    backgroundColor: colors.primary[500],
  },
  button_secondary: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary[500],
  },
  button_ghost: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  button_danger: {
    backgroundColor: colors.error,
  },

  // Sizes
  button_sm: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    minHeight: 36,
  },
  button_md: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    minHeight: 48,
  },
  button_lg: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
    minHeight: 56,
  },

  fullWidth: {
    width: '100%',
  },

  disabled: {
    opacity: 0.5,
  },

  // Text variants
  text: {
    ...typography.button,
    textAlign: 'center',
  },
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.primary[500],
  },
  text_ghost: {
    color: colors.gray[700],
  },
  text_danger: {
    color: colors.white,
  },

  // Text sizes
  text_sm: {
    fontSize: 14,
  },
  text_md: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
});
