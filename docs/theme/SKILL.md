# Theme & Design System

## Purpose
This document defines the DAKIA Wiki Bot theme, color palette, design tokens, and visual identity for consistent styling across the application.

## Color Palette

### Primary Colors (AI Tech Blue Theme)
```css
--primary-gradient-start: #2563EB  /* Blue 600 - Primary brand color */
--primary-gradient-end: #06B6D4    /* Cyan 500 - Accent color */
--bs-primary: #2563EB              /* Main primary color */
--bs-primary-dark: #1E40AF         /* Primary dark variant */
```

**Usage:**
- Primary buttons, links, and brand elements
- Main gradient for hero sections and feature cards
- Use `#2563EB` for solid primary color
- Use gradient `linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)` for premium features

### Secondary Colors
```css
--bs-secondary: #64748b  /* Gray 500 */
--bs-success: #10b981    /* Green 500 */
--bs-info: #06b6d4       /* Cyan 500 */
--bs-warning: #f59e0b    /* Amber 500 */
--bs-danger: #ef4444     /* Red 500 */
```

### Neutral Colors (Gray Scale)
```css
--bs-light: #f8fafc      /* Gray 50 */
--bs-dark: #0f172a       /* Gray 900 */
--gray-50: #f8fafc
--gray-100: #f1f5f9
--gray-200: #e2e8f0
--gray-300: #cbd5e1
--gray-400: #94a3b8
--gray-500: #64748b
--gray-600: #475569
--gray-700: #334155
--gray-800: #1e293b
--gray-900: #0f172a
```

## Design Tokens

### Spacing Scale
```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 1rem     /* 16px */
--spacing-md: 1.5rem   /* 24px */
--spacing-lg: 2rem     /* 32px */
--spacing-xl: 3rem     /* 48px */
```

### Border Radius
```css
--radius-sm: 0.5rem    /* 8px - Small elements */
--radius-md: 0.75rem   /* 12px - Buttons, inputs */
--radius-lg: 1rem      /* 16px - Cards */
--radius-xl: 1.5rem    /* 24px - Large sections */
--radius-full: 9999px  /* Fully rounded - Pills, badges */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

## Typography

### Font Families
```css
/* Headings */
font-family: 'Plus Jakarta Sans', sans-serif

/* Body Text */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
```

### Font Weights
- 300: Light
- 400: Regular (body text)
- 500: Medium
- 600: Semibold (buttons, labels)
- 700: Bold (headings)
- 800: Extra Bold (hero text)

### Font Sizes (Responsive)
```css
/* Hero Heading */
fontSize: 'clamp(2.5rem, 6vw, 4.5rem)'

/* Large Heading */
fontSize: 'clamp(1.25rem, 3vw, 2rem)'

/* Body Text */
fontSize: '1.125rem' /* 18px base */

/* Small Text */
fontSize: '0.875rem' /* 14px */
```

## Common Gradients

### Primary Gradient (Brand)
```css
background: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)
```

### Success Gradient
```css
background: linear-gradient(135deg, #10b981 0%, #059669 100%)
```

### Info Gradient
```css
background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)
```

### Subtle Background Gradient
```css
background: linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)
```

### Hero Gradient (Very Subtle)
```css
background: linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(6, 182, 212, 0.04) 100%)
```

## Component-Specific Colors

### Badges
```typescript
// Primary badge
style={{
  background: 'rgba(37, 99, 235, 0.1)',
  color: '#2563EB',
  border: '1px solid rgba(37, 99, 235, 0.2)'
}}
```

### Cards
```typescript
// Default card
border: '1px solid var(--gray-200)'
background: 'white'
boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'

// Card with left border accent
borderLeft: '4px solid #2563EB'
```

### Buttons
```typescript
// Primary button
background: '#2563EB'
color: 'white'
boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'

// On hover
background: '#1E40AF'
boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)'
```

## Glassmorphism
```css
--glass-bg: rgba(255, 255, 255, 0.8)
--glass-border: rgba(255, 255, 255, 0.18)

/* Apply to elements */
background: var(--glass-bg);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
border: 1px solid var(--glass-border);
```

## Usage Examples

### Hero Section
```tsx
<section style={{ 
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)',
  borderRadius: '1.5rem'
}}>
```

### Feature Card
```tsx
<div className="card" style={{ 
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
  borderLeft: '4px solid #2563EB'
}}>
```

### Text with Brand Color
```tsx
<span style={{ color: '#2563EB' }}>DAKIA</span>
```

## AI Agent Instructions

When creating new components:
1. **Always use CSS variables** from globals.css when available
2. **Primary brand color** is `#2563EB` (blue)
3. **Use gradients** for hero sections and premium features
4. **Inline styles** are preferred for component-specific colors
5. **Border radius** should be at least `0.75rem` for modern look
6. **Spacing** should follow the spacing scale (xs, sm, md, lg, xl)
7. **Shadows** should be subtle - use `--shadow-sm` to `--shadow-lg`
8. **Text colors** - dark text: `#0F172A`, medium: `#475569`, light: `#64748B`

## Color Accessibility

Ensure color contrast ratios meet WCAG 2.1 AA standards:
- Normal text: minimum 4.5:1
- Large text: minimum 3:1
- UI components: minimum 3:1

Primary color `#2563EB` on white background: ✅ 8.59:1 (AAA)
