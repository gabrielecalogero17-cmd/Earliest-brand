---
name: Clinical Precision & Vital Glow
colors:
  surface: '#f6fafd'
  surface-dim: '#d6dbdd'
  surface-bright: '#f6fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f4f7'
  surface-container: '#eaeef1'
  surface-container-high: '#e5e9ec'
  surface-container-highest: '#dfe3e6'
  on-surface: '#171c1f'
  on-surface-variant: '#45464f'
  inverse-surface: '#2c3134'
  inverse-on-surface: '#edf1f4'
  outline: '#767680'
  outline-variant: '#c6c5d0'
  surface-tint: '#4f5c8e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#081747'
  on-primary-container: '#7581b6'
  inverse-primary: '#b8c4fd'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#68e1fe'
  on-secondary-container: '#006374'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#341000'
  on-tertiary-container: '#dc5d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b8c4fd'
  on-primary-fixed: '#081747'
  on-primary-fixed-variant: '#374475'
  secondary-fixed: '#abedff'
  secondary-fixed-dim: '#5ad6f3'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb692'
  on-tertiary-fixed: '#341000'
  on-tertiary-fixed-variant: '#7a3000'
  background: '#f6fafd'
  on-background: '#171c1f'
  surface-variant: '#dfe3e6'
  vivid-red: '#FF0000'
  obsidian-black: '#050505'
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '800'
    lineHeight: 14px
    letterSpacing: 0.15em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

The design system is defined by a sophisticated duality: **Clinical Precision & Vital Glow**. It navigates the intersection of high-fidelity medical technology and empathetic human care. The visual language is rooted in **Corporate Modernism** with a high-end, boutique clinic feel—prioritizing absolute clarity, cleanliness, and structural integrity.

The brand personality is authoritative yet approachable, replacing "white coat anxiety" with a sense of security and revitalizing energy. This is achieved through generous whitespace, high-contrast typography, and a "clinical-luxe" aesthetic that balances rigid grids with soft, organic photography. The target audience seeks excellence in Dentistry, Gynecology, and Aesthetic Medicine, expecting a premium experience that promises both health and harmony.

## Colors

The palette uses **Clinical Royal Navy Blue** as its foundation to convey institutional authority and scientific rigor. **Pure Medical Ice White** serves as the primary canvas, ensuring a sterile and airy environment.

**Fresh Clinical Cyan** is used for interactive elements and accents that symbolize hygiene and modern technology. **Vibrant Coral Orange** and **Bright Vivid Fire Red** are used strategically as "Vitality Accents"—they represent life, blood flow, and the "glow" of aesthetic health, and should be used sparingly for CTA buttons or critical highlights to prevent overwhelming the clinical calmness.

## Typography

The typographic system pairs the geometric precision of **Outfit** with the humanist accessibility of **Plus Jakarta Sans**. 

- **Outfit** is reserved for headlines. Its technical, circular forms mirror the advanced medical imaging and digital precision of the clinic.
- **Plus Jakarta Sans** handles all long-form reading and UI labels. It provides a warm, stable, and highly legible experience that softens the technical edge of the headlines.

Hierarchy is strictly enforced to ensure medical information is digestible. Use tight tracking for large headlines and generous leading for body text to maintain an "airy" feel.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop to maintain the "The Earliest" inspired editorial authority, transitioning to a fluid model for mobile.

- **Desktop:** 12-column grid, 1280px max-width, with 24px gutters.
- **Spacing Philosophy:** Emphasize vertical "breathing room." Section gaps are intentionally large (80px+) to prevent information density from causing patient fatigue or anxiety.
- **Alignment:** Content is generally center-aligned for institutional pages and left-aligned for educational/clinical blog content.

## Elevation & Depth

Visual hierarchy is primarily achieved through **Tonal Layers** rather than heavy shadows. The surface architecture relies on the interplay between Pure Medical Ice White and soft, low-contrast neutral tints.

- **Surface Levels:** Backgrounds use the Ice White base. Cards and containers use absolute white (#FFFFFF) with a very subtle, light-blue tinted ambient shadow (0px 4px 20px rgba(0, 14, 63, 0.04)) to create a floating effect.
- **Glassmorphism:** Use sparingly for navigation bars or mobile overlays. A backdrop blur of 12px with a 70% transparent Ice White fill suggests modern, translucent technology.
- **Outlines:** Use 1px borders in high-transparency Navy (10% opacity) for input fields and secondary containers to maintain structure without adding visual weight.

## Shapes

The shape language balances "Clinical Precision" (geometric) with "Empathetic Reassurance" (rounded). 

Avoid sharp 0px corners, as they feel aggressive in a medical context. Instead, use a consistent **0.5rem (8px)** corner radius for buttons and input fields. For larger containers, such as clinical cards or service modules, use **1rem (16px)** to emphasize the "soft/welcoming" nature of the clinic's environment.

## Components

### Buttons
- **Primary:** Solid Clinical Royal Navy Blue with White Outfit Bold text. High-contrast, authoritative.
- **Action/Vital:** Vibrant Coral Orange for booking/emergency actions only.
- **Secondary:** Ghost style with a Fresh Clinical Cyan border and Navy text.

### Cards
- White background with a 16px corner radius and a subtle Navy-tinted shadow.
- Use a "Label" (Plus Jakarta Sans Bold) at the top of cards to categorize services (e.g., ODONTOIATRIA).

### Input Fields
- Understated. 1px border (#000E3F at 15% opacity), 8px radius. 
- Focus state: Border color shifts to Fresh Clinical Cyan with a 2px outer glow.

### Chips & Badges
- Used for "Philosophy of Naturalness" tags or clinical certifications. 
- Soft cyan backgrounds with Navy text, fully pill-shaped.

### Lists
- Use custom iconography for bullet points (e.g., thin geometric plus signs or medical crosses in Cyan) rather than standard discs.