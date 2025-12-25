const colors = {
  // Brand
  primary: "#6D5BD0",
  primaryLight: "#EDE9FE",
  primaryBorder: "#C4B5FD",

  // Backgrounds
  background: "#6D5BD0",
  card: "#FFFFFF",
  inputBg: "#FFFFFF",

  // Text
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  textWhite: "#FFFFFF",

  // Borders
  border: "#E5E7EB",
  divider: "#F3F4F6",

  // Category Colors
  work: {
    bg: "#DBEAFE",
    text: "#2563EB"
  },
  personal: {
    bg: "#EDE9FE",
    text: "#7C3AED"
  },
  health: {
    bg: "#D1FAE5",
    text: "#059669"
  },
  finance: {
    bg: "#FEF3C7",
    text: "#D97706"
  },

  // Status
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444"
};

const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28
};

const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  pill: 999
};

const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24
};

const shadow = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6
  }
};

const theme = {
  colors,
  spacing,
  radius,
  fontSize,
  shadow
};

export default theme;
