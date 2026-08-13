import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

// iPhone 14 width (390) as the design base
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Scale based on screen width
const widthScale = width / BASE_WIDTH;
const heightScale = height / BASE_HEIGHT;

/**
 * Scale any size based on screen width
 */
export const scale = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * widthScale);
};

/**
 * Scale vertically based on screen height
 */
export const verticalScale = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * heightScale);
};

/**
 * Moderate scale (recommended for fonts and UI)
 * factor = 0.5 gives a balanced scaling
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  const scaledSize = size + (scale(size) - size) * factor;
  return PixelRatio.roundToNearestPixel(scaledSize);
};

/**
 * Font scaling
 */
export const scaleFont = (size: number): number => {
  return moderateScale(size, 0.5);
};

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export const fontSize = {
  xs: scaleFont(11),
  sm: scaleFont(13),
  base: scaleFont(15),
  md: scaleFont(16),
  lg: scaleFont(18),
  xl: scaleFont(20),
  "2xl": scaleFont(24),
  "3xl": scaleFont(30),
  "4xl": scaleFont(36),
};

export const lineHeight = {
  xs: scaleFont(16),
  sm: scaleFont(18),
  base: scaleFont(22),
  md: scaleFont(24),
  lg: scaleFont(26),
  xl: scaleFont(28),
  "2xl": scaleFont(30),
  "3xl": scaleFont(36),
  "4xl": scaleFont(44),
};

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

// // -----------------------------------------------------------------------------
// // Spacing
// // -----------------------------------------------------------------------------

export const spacing = {
  1: moderateScale(4),
  2: moderateScale(6),
  3: moderateScale(12),
  4: moderateScale(16),
  5: moderateScale(20),
  6: moderateScale(24),
  7: moderateScale(28),
  8: moderateScale(32),
  10: moderateScale(40),
  12: moderateScale(48),
  16: moderateScale(64),
};

// -----------------------------------------------------------------------------
// Border Radius
// -----------------------------------------------------------------------------

export const radius = {
  sm: moderateScale(10),
  md: moderateScale(14),
  lg: moderateScale(18),
  xl: moderateScale(22),
  "2xl": moderateScale(28),
  "3xl": moderateScale(36),
  full: 999,
};

// -----------------------------------------------------------------------------
// Icon Sizes
// -----------------------------------------------------------------------------

export const iconSize = {
  xs: moderateScale(14),
  sm: moderateScale(18),
  md: moderateScale(22),
  lg: moderateScale(28),
  xl: moderateScale(36),
};

// -----------------------------------------------------------------------------
// Device Helpers
// -----------------------------------------------------------------------------

export const device = {
  width,
  height,
  isSmall: width < 360,
  isMedium: width >= 360 && width < 414,
  isLarge: width >= 414,
};

export const typography = {
  display: {
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
    fontWeight: fontWeight.bold,
  },
  heading: {
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.bold,
  },
  title: {
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.bold,
  },
  subtitle: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.medium,
  },
  body: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.regular,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.regular,
  },
  caption: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.regular,
  },
} as const;
// -----------------------------------------------------------------------------
// Example Usage
// -----------------------------------------------------------------------------
//
// import { fontSize, spacing, radius } from '@/utils/responsive';
//
// <Text style={{ fontSize: fontSize['3xl'] }}>
//   Good morning, Victoria 👋
// </Text>
//
// <View style={{ padding: spacing[5], borderRadius: radius['2xl'] }} />
//

// export const gradients = {
//   hero: ['#FFF3EE', '#FFE4D6'],
//   card: ['#FFF7F3', '#FFEDE4'],
//   primary: ['#FF9E80', '#FF8A72'],
//   soft: ['#FFFFFF', '#FFF4EF'],
// };
// <LinearGradient
//   colors={['#FFF3EE', '#FFE4D6']}
//   start={{ x: 0, y: 0 }}
//   end={{ x: 1, y: 1 }}
//   className="rounded-3xl p-5"
// />
