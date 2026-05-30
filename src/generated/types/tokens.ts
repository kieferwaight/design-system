/**
 * Design tokens mirror the SEMANTIC (Tier 2) CSS custom properties.
 * Use these when a token must be referenced from TS (dynamic inline styles,
 * Framer Motion). For static styling prefer Tailwind utilities (text-fg,
 * bg-bg-sunken, …) which resolve to the same vars. Never reference Tier 1
 * primitives (--neutral-*, --accent-300) here — only semantic aliases.
 */

export const color = {
  // Backgrounds — grouped roles (default) + plain set.
  bg: "var(--color-bg)",
  bgElevated: "var(--color-bg-elevated)",
  bgSunken: "var(--color-bg-sunken)",
  bgBase: "var(--color-bg-base)",
  bgSecondary: "var(--color-bg-secondary)",
  bgTertiary: "var(--color-bg-tertiary)",
  // Content (label hierarchy).
  fg: "var(--color-fg)",
  fgSecondary: "var(--color-fg-secondary)",
  fgTertiary: "var(--color-fg-tertiary)",
  fgQuaternary: "var(--color-fg-quaternary)",
  fgOnAccent: "var(--color-fg-on-accent)",
  placeholder: "var(--color-placeholder)",
  // Fills (control/element backgrounds over content).
  fill: "var(--color-fill)",
  fillSecondary: "var(--color-fill-secondary)",
  fillTertiary: "var(--color-fill-tertiary)",
  fillQuaternary: "var(--color-fill-quaternary)",
  // Accent + link.
  accent: "var(--color-accent)",
  accentHover: "var(--color-accent-hover)",
  accentPress: "var(--color-accent-press)",
  accentSubtle: "var(--color-accent-subtle)",
  link: "var(--color-link)",
  // Borders / separators.
  border: "var(--color-border)",
  separator: "var(--color-separator)",
  separatorOpaque: "var(--color-separator-opaque)",
  // Status + component roles.
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  pin: "var(--color-pin)",
  flag: "var(--color-flag)",
  favorite: "var(--color-favorite)",
} as const;

/** The Apple system color palette (dynamic light/dark) — the tintable set. */
export const systemColor = {
  red: "var(--sys-red)",
  orange: "var(--sys-orange)",
  yellow: "var(--sys-yellow)",
  green: "var(--sys-green)",
  mint: "var(--sys-mint)",
  teal: "var(--sys-teal)",
  cyan: "var(--sys-cyan)",
  blue: "var(--sys-blue)",
  indigo: "var(--sys-indigo)",
  purple: "var(--sys-purple)",
  pink: "var(--sys-pink)",
  brown: "var(--sys-brown)",
  gray: "var(--sys-gray)",
  gray2: "var(--sys-gray2)",
  gray3: "var(--sys-gray3)",
  gray4: "var(--sys-gray4)",
  gray5: "var(--sys-gray5)",
  gray6: "var(--sys-gray6)",
} as const;

/** The four HIG thickness materials (pair with a backdrop blur / `.material-*`). */
export const material = {
  ultraThin: "var(--material-ultra-thin)",
  thin: "var(--material-thin)",
  regular: "var(--material-regular)",
  thick: "var(--material-thick)",
} as const;

export const radius = {
  xs: "var(--radius-xs)",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  full: "var(--radius-full)",
} as const;

/**
 * Layer radii for concentric nesting. `inner = outer − gap`; the ladder assumes
 * a one-unit (`--space-1`) gap between layers. Layer 0 is the outermost frame
 * (desktop window / iOS device screen); deeper layers are nested surfaces.
 */
export const radiusLayer = {
  0: "var(--radius-layer-0)",
  1: "var(--radius-layer-1)",
  2: "var(--radius-layer-2)",
  3: "var(--radius-layer-3)",
  4: "var(--radius-layer-4)",
  5: "var(--radius-layer-5)",
  6: "var(--radius-layer-6)",
} as const;

export const shadow = {
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
} as const;

export const ease = {
  standard: "var(--ease-standard)",
  decel: "var(--ease-decel)",
  accel: "var(--ease-accel)",
} as const;

/**
 * Spring presets for Framer Motion — mirror the CSS preset params in
 * primitives.css (--spring-*). Prefer springs over fixed durations for
 * position/size ("nature, not software"); use `ease` only for color/opacity.
 */
export const spring = {
  /** Buttons, taps, chip toggles. */
  snappy: { type: "spring", stiffness: 400, damping: 30, mass: 1 },
  /** Slide-overs, standard navigation transitions. */
  smooth: { type: "spring", stiffness: 250, damping: 28, mass: 1 },
  /** Playful expand/compress (more overshoot). */
  bouncy: { type: "spring", stiffness: 320, damping: 18, mass: 1.1 },
  /** Large surfaces — sheets, full-screen transitions. */
  gentle: { type: "spring", stiffness: 160, damping: 24, mass: 1 },
} as const;
