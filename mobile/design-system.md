# StralsHund Design System 🎨

## Design Philosophy

**Modern | Playful | Trust | Community**

StralsHund kombiniert modernes, minimalistisches Design mit verspielten Hunde-Elementen. Die App soll Vertrauen schaffen (wichtig für private Treffplätze) und gleichzeitig Freude und Community-Gefühl vermitteln.

---

## Color Palette

### Primary Colors
```javascript
primary: {
  50:  '#FFF4E6',   // Lightest orange
  100: '#FFE4CC',
  200: '#FFCA99',
  300: '#FFAF66',
  400: '#FF9533',
  500: '#FF7A00',   // Main brand color - Energetic Orange
  600: '#CC6200',
  700: '#994900',
  800: '#663100',
  900: '#331800',   // Darkest
}
```

### Secondary Colors (Complementary Blue)
```javascript
secondary: {
  50:  '#E6F3FF',
  100: '#CCE7FF',
  200: '#99CEFF',
  300: '#66B6FF',
  400: '#339DFF',
  500: '#0085FF',   // Trustworthy Blue
  600: '#006ACC',
  700: '#005099',
  800: '#003566',
  900: '#001B33',
}
```

### Accent Colors
```javascript
accent: {
  green: '#10B981',   // Success, Active Routes
  red: '#EF4444',     // Danger, Lost Dogs
  yellow: '#F59E0B',  // Warning, Premium
  purple: '#8B5CF6',  // Special Features
  pink: '#EC4899',    // Hearts, Likes
}
```

### Neutral Colors
```javascript
gray: {
  50:  '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
}

white: '#FFFFFF'
black: '#000000'
```

### Semantic Colors
```javascript
success: '#10B981'
error: '#EF4444'
warning: '#F59E0B'
info: '#0085FF'
```

---

## Typography

### Font Families

**Primary (Headings):** `Inter` - Modern, clean, excellent readability
**Secondary (Body):** `Inter` - For consistency
**Accent (Special):** `Fredoka` - Playful for dog-related elements

### Font Scale

```javascript
fontSize: {
  xs: 12,    // Small labels, timestamps
  sm: 14,    // Secondary text, captions
  base: 16,  // Body text (default)
  lg: 18,    // Emphasized body
  xl: 20,    // Small headings
  '2xl': 24, // Section headings
  '3xl': 30, // Page headings
  '4xl': 36, // Hero headings
  '5xl': 48, // Large display
}

fontWeight: {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
}

lineHeight: {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
}
```

---

## Spacing & Layout

### Spacing Scale (8pt Grid System)
```javascript
spacing: {
  0: 0,
  1: 4,    // 0.25rem
  2: 8,    // 0.5rem
  3: 12,   // 0.75rem
  4: 16,   // 1rem (base)
  5: 20,   // 1.25rem
  6: 24,   // 1.5rem
  8: 32,   // 2rem
  10: 40,  // 2.5rem
  12: 48,  // 3rem
  16: 64,  // 4rem
  20: 80,  // 5rem
  24: 96,  // 6rem
}
```

### Border Radius
```javascript
borderRadius: {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,  // Circular
}
```

### Container Widths
```javascript
container: {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}
```

---

## Component Patterns

### Buttons

#### Primary Button
```
- Background: primary.500 (#FF7A00)
- Text: white
- Border Radius: md (12px)
- Padding: 16px 24px
- Font Weight: semibold
- Shadow: subtle elevation
- Hover: primary.600
- Active: primary.700
- Disabled: gray.300 with 50% opacity
```

#### Secondary Button
```
- Background: transparent
- Text: primary.500
- Border: 2px solid primary.500
- Hover: primary.50 background
```

#### Ghost Button
```
- Background: transparent
- Text: gray.700
- No border
- Hover: gray.100 background
```

#### Icon Button
```
- Size: 40x40px
- Border Radius: full
- Background: gray.100
- Icon: gray.700
- Hover: gray.200
```

### Cards

#### Standard Card
```
- Background: white
- Border Radius: lg (16px)
- Padding: 16px
- Shadow: 0 2px 8px rgba(0,0,0,0.08)
- Border: 1px solid gray.100
```

#### Interactive Card (Clickable)
```
- Hover: slight lift (translateY: -2px)
- Hover Shadow: 0 4px 12px rgba(0,0,0,0.12)
- Transition: smooth (200ms)
```

### Input Fields

```
- Height: 48px
- Border Radius: md (12px)
- Border: 1.5px solid gray.300
- Padding: 12px 16px
- Font Size: base (16px)
- Focus: border primary.500, shadow
- Error: border error red
- Success: border success green
```

### Avatars

```
Sizes:
- xs: 24px
- sm: 32px
- md: 40px
- lg: 56px
- xl: 80px
- 2xl: 120px

- Border Radius: full (circular)
- Border: 2px white (for overlays)
```

---

## Iconography

### Icon Library
**Lucide React Native** - Modern, consistent, customizable

### Icon Sizes
```javascript
iconSize: {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
}
```

### Icon Colors
- Primary Actions: primary.500
- Secondary Actions: gray.600
- Success: green
- Error: red
- Inactive: gray.400

---

## Navigation

### Bottom Tab Bar
```
- Height: 64px + safe area
- Background: white
- Shadow: top shadow
- Active Tab: primary.500
- Inactive Tab: gray.400
- Icon Size: 24px
- Label Size: 12px
- Selected Indicator: small pill above icon
```

### Header
```
- Height: 56px + safe area
- Background: white or gradient
- Title: Center or Left aligned
- Font Size: lg (18px)
- Font Weight: semibold
- Actions: Right side icons
```

---

## Elevation & Shadows

```javascript
shadows: {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 12,
  },
}
```

---

## Animations & Transitions

### Timing
```javascript
duration: {
  fast: 150,    // Quick interactions
  base: 200,    // Default
  slow: 300,    // Deliberate
  slower: 500,  // Emphasized
}

easing: {
  default: 'ease-in-out',
  in: 'ease-in',
  out: 'ease-out',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
}
```

### Common Animations
- **Fade In:** opacity 0 → 1, duration 200ms
- **Slide Up:** translateY 20 → 0, duration 300ms
- **Scale:** scale 0.95 → 1, duration 200ms
- **Bounce:** spring animation for success feedback

---

## Screen Patterns

### Onboarding
- Full-screen illustrations
- Gradient backgrounds
- Large, friendly typography
- Smooth swipe transitions

### Home/Feed
- Card-based layout
- Pull-to-refresh
- Infinite scroll
- Floating action button (primary action)

### Map View
- Full-screen map
- Overlay cards (bottom sheet)
- Cluster markers
- Custom dog paw markers

### Profile
- Hero section with cover photo
- Avatar overlay
- Tab navigation for content
- Action buttons (Edit, Settings)

---

## Accessibility

### Touch Targets
- Minimum: 44x44px
- Recommended: 48x48px

### Contrast Ratios
- Normal Text: 4.5:1 minimum
- Large Text: 3:1 minimum
- UI Components: 3:1 minimum

### Text Scaling
- Support dynamic type
- Test with large accessibility fonts

---

## Brand Elements

### Logo
- Primary: Orange paw print with "StralsHund" wordmark
- Icon Only: Paw print for app icon
- Monochrome: For watermarks

### Illustrations
- Friendly, rounded dog illustrations
- Warm color palette
- Simple, recognizable style

### Patterns
- Subtle paw print pattern for backgrounds
- Bone shapes for dividers (used sparingly)

---

## Dark Mode Support

```javascript
dark: {
  background: {
    primary: '#111827',    // gray.900
    secondary: '#1F2937',  // gray.800
    tertiary: '#374151',   // gray.700
  },
  text: {
    primary: '#F9FAFB',    // gray.50
    secondary: '#D1D5DB',  // gray.300
    tertiary: '#9CA3AF',   // gray.400
  },
  primary: {
    // Slightly muted for dark mode
    main: '#FF9533',       // primary.400
  }
}
```

---

## Implementation

All colors, spacing, typography will be implemented as:
- `/mobile/src/theme/` directory
- Exported constants for easy access
- TypeScript types for autocomplete
- Compatible with React Native's StyleSheet
