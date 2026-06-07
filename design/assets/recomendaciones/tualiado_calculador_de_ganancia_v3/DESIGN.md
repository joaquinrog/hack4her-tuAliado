---
name: Warm & Approachable Advisor
colors:
  surface: '#fff8f5'
  surface-dim: '#e0d8d5'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ee'
  surface-container: '#f4ece8'
  surface-container-high: '#eee7e3'
  surface-container-highest: '#e9e1dd'
  on-surface: '#1e1b19'
  on-surface-variant: '#584237'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f7efeb'
  outline: '#8c7164'
  outline-variant: '#e0c0b1'
  surface-tint: '#9d4300'
  primary: '#9d4300'
  on-primary: '#ffffff'
  primary-container: '#f97316'
  on-primary-container: '#582200'
  inverse-primary: '#ffb690'
  secondary: '#645d58'
  on-secondary: '#ffffff'
  secondary-container: '#eae1da'
  on-secondary-container: '#6a635e'
  tertiary: '#006398'
  on-tertiary: '#ffffff'
  tertiary-container: '#00a2f4'
  on-tertiary-container: '#003554'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb690'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783200'
  secondary-fixed: '#eae1da'
  secondary-fixed-dim: '#cec5bf'
  on-secondary-fixed: '#1f1b17'
  on-secondary-fixed-variant: '#4b4641'
  tertiary-fixed: '#cde5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004b74'
  background: '#fff8f5'
  on-background: '#1e1b19'
  surface-variant: '#e9e1dd'
typography:
  display:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  label-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  caption:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1120px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The brand personality is that of a "trusted neighbor"—expert yet humble, encouraging, and deeply accessible. The target audience includes small business owners and first-time digital users who require clarity and reassurance. 

The design style is a refined **Minimalism** blended with **Tactile** warmth. It avoids "tech-heavy" aesthetics in favor of a human-centric interface that prioritizes low cognitive load. Success is measured by how "quiet" and helpful the interface feels, utilizing generous whitespace and high-contrast elements to guide the user without intimidation.

## Colors
This design system uses a palette rooted in warmth and high legibility. 
- **Primary Orange (#F97316):** Used sparingly for primary actions, progress indicators, and key highlights to draw attention without causing visual fatigue.
- **Background Warm White (#FAFAF9):** Replaces harsh pure whites to reduce eye strain and provide a softer, more paper-like canvas.
- **Text Black (#1C1917):** A soft charcoal that ensures maximum contrast for accessibility while feeling less clinical than pure black.
- **Muted Gray (#78716C):** Reserved for secondary information and subtle borders, maintaining a clear visual hierarchy.

## Typography
Outfit was chosen for its geometric clarity and friendly, open counters. To support older users, the base body size is set to a generous 18px (body-md) and 20px (body-lg). 

Headlines use a tighter letter-spacing to appear grounded, while body text maintains standard spacing for maximum readability. Always ensure a minimum contrast ratio of 4.5:1 for all text elements. Avoid using thin font weights; stick to Regular (400), Medium (500), and SemiBold (600).

## Layout & Spacing
The layout follows a **Fixed Grid** on desktop (centered 1120px) to prevent line lengths from becoming too wide for comfortable reading. On mobile, it shifts to a fluid 1-column layout.

Spacing is governed by an 8px linear scale. We prioritize "stacking" vertical rhythm over horizontal density. Elements are given significant breathing room (stack-lg) to separate distinct ideas or sections, helping users focus on one task at a time. All tap targets (buttons, links) must maintain a minimum height/width of 48px to accommodate limited dexterity.

## Elevation & Depth
To keep the UI non-intimidating, this design system avoids complex shadows. Hierarchy is established through **Tonal Layers** and **Low-contrast Outlines**.

- **Level 0 (Background):** #FAFAF9.
- **Level 1 (Cards/Containers):** Pure white (#FFFFFF) with a 1px border of #E7E5E4 (a lighter version of our muted gray).
- **Interactive Depth:** Only the primary buttons use a soft, very diffused ambient shadow (10% opacity Primary Orange) to suggest "pressability" without looking overly digital or "floating."

## Shapes
The shape language is consistently **Rounded** (0.5rem base). This choice removes the perceived "sharpness" or clinical feel of the software, making it feel more like a friendly physical tool. 

- **Buttons:** Use `rounded-lg` (1rem) to emphasize their interactive nature.
- **Input Fields:** Use `rounded-md` (0.5rem) to provide a stable, clear container for text.
- **Modals & Large Cards:** Use `rounded-xl` (1.5rem) to create a soft, welcoming frame for major content.

## Components
- **Buttons:** High-contrast containers. The primary button is Primary Orange with White text. Labels are Bold. No icons-only buttons; always pair icons with text for clarity.
- **Input Fields:** Large 56px height for ease of selection. Use a thick 2px border on focus in Primary Orange to provide clear visual feedback. Labels always sit above the field, never as placeholder text.
- **Cards:** White background, 1px soft border. Use for grouping related information like "Recent Tips" or "Business Stats."
- **Chips:** Used for filtering categories. Use a secondary gray background with a 1px border. When selected, they transition to Primary Orange.
- **Lists:** High vertical padding (16px - 20px) between list items. Use chevron icons to indicate "drill-down" navigation.
- **Empty States:** Use friendly, warm illustrations and a single "Call to Action" button to guide the user back to a productive path.