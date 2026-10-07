---
name: Urban Velocity
colors:
  surface: '#f8f9fd'
  surface-dim: '#d9dade'
  surface-bright: '#f8f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3f7'
  surface-container: '#edeef2'
  surface-container-high: '#e7e8ec'
  surface-container-highest: '#e1e2e6'
  on-surface: '#191c1f'
  on-surface-variant: '#474556'
  inverse-surface: '#2e3134'
  inverse-on-surface: '#eff1f5'
  outline: '#787587'
  outline-variant: '#c8c4d8'
  surface-tint: '#573ceb'
  primary: '#3300c0'
  on-primary: '#ffffff'
  primary-container: '#4b2ce0'
  on-primary-container: '#c7c0ff'
  inverse-primary: '#c6bfff'
  secondary: '#006b5c'
  on-secondary: '#ffffff'
  secondary-container: '#65fade'
  on-secondary-container: '#007262'
  tertiary: '#3a3b49'
  on-tertiary: '#ffffff'
  tertiary-container: '#515260'
  on-tertiary-container: '#c6c6d7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4dfff'
  primary-fixed-dim: '#c6bfff'
  on-primary-fixed: '#170066'
  on-primary-fixed-variant: '#3e13d4'
  secondary-fixed: '#65fade'
  secondary-fixed-dim: '#41ddc2'
  on-secondary-fixed: '#00201b'
  on-secondary-fixed-variant: '#005045'
  tertiary-fixed: '#e1e1f3'
  tertiary-fixed-dim: '#c5c5d6'
  on-tertiary-fixed: '#191b27'
  on-tertiary-fixed-variant: '#444654'
  background: '#f8f9fd'
  on-background: '#191c1f'
  surface-variant: '#e1e2e6'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system establishes a premium, frictionless mobility experience centered on clarity, safety, and effortless navigation. It targets urban professionals, commuters, and daily travelers who value promptness and reliability. The visual language blends precision minimalism with energetic micro-interactions.

The aesthetic pairs ultra-clean surfaces with tactile physical presence. High-contrast typographic hierarchy ensures critical trip details (fare, driver ETA, vehicle license plate) are immediately legible in varied lighting situations, including direct sunlight. Accent gradients transitioning from deep purple into radiant teal introduce a sense of dynamic momentum without cluttering the interface.

## Colors
The color hierarchy is purpose-built to guide riders through booking and active journeys:

- **Primary (`#4B2CE0`)**: Represents brand identity, active trip confirmation, primary CTAs, and navigational focal points.
- **Secondary (`#00C2A8`)**: Reserved for live status indicators, pickup confirmations, route progression highlights, and secondary callouts.
- **Tertiary (`#121420`)**: Deep slate for authoritative titles, high-contrast labels, and essential transactional text.
- **Neutral Canvas (`#F8F9FD`)**: Subtle off-white base that offsets pure white surface cards, eliminating screen fatigue.
- **Functional States**: Success (`#00C2A8`), Warning (`#FFB020`), Critical / Error (`#FA3E3E`), Driver En Route (`#4B2CE0`).
- **Gradients**: Linear gradient `135deg, #4B2CE0 0%, #00C2A8 100%` is reserved strictly for primary promotional banners, payment celebration, and vehicle tier distinction.

## Typography
Inter delivers optical clarity across both iOS and Android platforms, substituting seamlessly for native system typography (SF Pro / Roboto) while maintaining unified brand geometry.

- **Headline XL / LG**: Screen entry headers, onboarding titles, and completed trip summaries.
- **Headline MD**: Rider greeting ("Where to?"), vehicle category selections, and modal titles.
- **Title LG / MD**: Station names, driver names, and address headers.
- **Body LG / MD / SM**: Subtitles, estimated arrival descriptions, receipt line items, and terms.
- **Label LG / MD / SM**: Button labels, ETA badges, car plate placards, and micro status pills.

## Layout & Spacing
The layout follows an 8pt base grid with 4pt half-steps for micro-alignments (such as vehicle icons, pins, and badge padding).

- **Mobile Viewport**: Primary surface with edge margin of `1rem` (16px) extending over full-bleed interactive map views. Bottom sheets utilize fluid height states (collapsed 25%, mid-expanded 50%, fully expanded 90%).
- **Tablet / Responsive Extensions**: Centers ride sheets into floating overlays pinned to bottom-left or bottom-center with a maximum container width of `480px`.
- **Vertical Rhythm**: Related trip items use `space-xs` (4px) to `space-sm` (8px). Independent vehicle cards and address fields use `space-md` (16px) separation. Major sheet view state changes utilize `space-xl` (32px).

## Elevation & Depth
Elevation mimics stacked physical card layers floating seamlessly over map views. Depth is conveyed using dual-layer ambient tinted drop shadows rather than sharp borders:

- **Level 0 (Flat)**: Map canvas, `#F8F9FD` background areas.
- **Level 1 (Card & Bottom Sheet Base)**: Clean `#FFFFFF` fill with primary shadow: `0 4px 20px -2px rgba(75, 44, 224, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)`.
- **Level 2 (Floating Action Items / Search Bar)**: `0 8px 28px -4px rgba(75, 44, 224, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)`. Used for the omnipresent floating search bar and re-center map buttons.
- **Level 3 (Modals / Overlays)**: `0 16px 40px -8px rgba(18, 20, 32, 0.18)`.
- **Dividers & Outlines**: Avoid stark borders. Where division is necessary, use `1px solid rgba(75, 44, 224, 0.08)` or subtle background contrast.

## Shapes
The design adopts a modern, approachable roundedness scale:

- **12px (`rounded-lg`)**: Secondary buttons, ride tier cards, address input fields, and driver rating indicators.
- **16px (`rounded-xl`)**: Primary bottom sheets, action modal containers, trip summary cards, and promotion tiles.
- **Pill (`full`)**: Floating search pill, filter chips, vehicle tag types (e.g., "Fastest", "Eco"), and primary circular map controls.

## Components

### Buttons
- **Primary**: Full-width `#4B2CE0` background, pure white `label-lg` text, `16px` height padding, 12px or 16px corner radius. On active press, subtle scale-down (`0.98`) with 85% opacity.
- **Secondary**: Clean `#FFFFFF` with `1px solid rgba(75, 44, 224, 0.15)` border and `#4B2CE0` text.
- **Floating Action Pill**: Height 52px, pure white surface, elevation level 2, pill radius, containing search icon, placeholder text, and right-aligned time indicator.

### Input Fields & Address Selectors
- Two-tier destination inputs (Pickup & Drop-off) wrapped in a unified card container.
- Route indicator dots: Pickup represented by a 10px `#00C2A8` circle; Destination represented by a 10px `#4B2CE0` square; connected by a 2px vertical dashed line.
- Background: `#F8F9FD` within `#FFFFFF` cards, transitioning to active focus ring `1.5px solid #4B2CE0`.

### Ride Selection Cards
- Horizontal cards featuring vehicle illustration, title (`title-md`), passenger capacity, arrival time estimate (`body-sm`), and right-aligned fare (`title-md`).
- Selected state: Pure white background, `2px solid #4B2CE0` border, surface shadow level 1, with a glowing teal route badge.
- Unselected state: Transparent or `#F8F9FD` fill, no border.

### Chips & Badges
- **ETA Badge**: `#00C2A8` light tint background (`rgba(0, 194, 168, 0.12)`) with deep `#007A6A` or `#121420` text for readability.
- **Ride Filters**: Rounded pill shape with 8px horizontal padding, 6px vertical padding, label-md styling.

### Lists & Activity Rows
- Clean flat row layout with 16px vertical padding. Icon indicators nested inside 40px rounded squares with 10% opacity tints. 
- Right side displays chevron or contextual time stamp.

### Driver & Trip Live Tracker
- Sticky bottom card displaying driver avatar, verified badge, rating star with numerical value, car model, and a prominent license plate box styled with monospace characters on a high-contrast `#F8F9FD` container.
- Quick action buttons (Call, Message, Safety Shield) rendered as circular 48px buttons with tinted surface fills.