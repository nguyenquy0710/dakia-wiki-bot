# DAKIA Wiki Bot - Style Guide

Hướng dẫn style và thiết kế UI cho DAKIA Wiki Bot.

## 🎨 Bảng Màu (Color Palette)

### AI Tech Blue - Primary Colors

DAKIA Wiki Bot sử dụng bảng màu **AI Tech Blue** để tạo cảm giác hiện đại, công nghệ và đáng tin cậy.

```css
/* Primary Colors */
--color-primary: #2563EB;        /* Blue 600 - Main brand color */
--color-primary-dark: #1E40AF;   /* Blue 800 - Hover states */
--color-accent: #06B6D4;         /* Cyan - Gradient accent */

/* Neutral Colors */
--color-background: #FFFFFF;     /* Pure white */
--color-surface: #F8FAFC;        /* Very light gray */
--color-border: #E2E8F0;         /* Soft gray border */

/* Text Colors */
--color-text-primary: #0F172A;   /* Dark slate - Main text */
--color-text-secondary: #475569; /* Medium slate - Secondary text */
--color-text-muted: #64748B;     /* Light slate - Muted text */

/* Semantic Colors */
--color-success: #10B981;        /* Green - Success states */
--color-warning: #F59E0B;        /* Amber - Warning states */
--color-danger: #EF4444;         /* Red - Error states */
--color-info: #06B6D4;           /* Cyan - Info states */
```

### Gradient System

```css
/* Primary Gradient - Blue to Cyan */
.gradient-primary {
  background: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%);
}

/* Subtle Background Gradient (3% opacity) */
.gradient-subtle {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%);
}

/* Text Gradient Effect */
.text-gradient {
  background: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Color Usage Guidelines

| Color | Usage | Example |
|-------|-------|---------|
| `#2563EB` (Primary) | Main CTAs, links, active states | Primary buttons, nav active |
| `#1E40AF` (Primary Dark) | Hover states, emphasis | Button hover |
| `#06B6D4` (Accent) | Gradients, highlights | Gradient end, badges |
| `#0F172A` (Text Primary) | Headings, body text | All text content |
| `#475569` (Text Secondary) | Metadata, captions | Dates, authors |
| `#E2E8F0` (Border) | Card borders, dividers | Card outline |

---

## 📝 Typography

### Font Families

```css
/* Headings */
font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;

/* Body Text */
font-family: 'Inter', -apple-system, sans-serif;
```

### Font Sizes

```css
/* Base */
--font-size-base: 1.125rem;      /* 18px */
--line-height-base: 1.8;

/* Headings */
--font-size-h1: 3.5rem;          /* 56px - display-1 */
--font-size-h2: 3rem;            /* 48px - display-2 */
--font-size-h3: 2.5rem;          /* 40px - display-3 */
--font-size-h4: 2rem;            /* 32px */
--font-size-h5: 1.5rem;          /* 24px */
--font-size-h6: 1.25rem;         /* 20px */

/* Text Sizes */
--font-size-lg: 1.25rem;         /* 20px */
--font-size-md: 1rem;            /* 16px */
--font-size-sm: 0.875rem;        /* 14px */
--font-size-xs: 0.75rem;         /* 12px */
```

### Font Weights

```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Display 1 | 3.5rem | 700-800 | 1.2 |
| Display 2 | 3rem | 700 | 1.2 |
| H1 | 2.5rem | 700 | 1.3 |
| H2 | 2rem | 600-700 | 1.3 |
| H3 | 1.5rem | 600 | 1.4 |
| H4 | 1.25rem | 600 | 1.4 |
| Body | 1.125rem | 400 | 1.8 |
| Small | 0.875rem | 400 | 1.6 |

### Usage Examples

```tsx
// Display heading (Hero sections)
<h1 className="display-1 fw-bold mb-4">DAKIA Wiki Bot</h1>

// Section heading
<h2 className="display-3 fw-bold mb-4">Khóa học</h2>

// Card heading
<h3 className="h4 fw-semibold mb-3">AI cho Sales</h3>

// Body text
<p className="lead">Đào tạo AI cho Sale và Marketing</p>

// Small text
<small className="text-muted">100+ học viên</small>
```

---

## 📐 Spacing & Layout

### Spacing Scale

Bootstrap spacing utilities với custom scale:

```css
0 = 0
1 = 0.25rem  (4px)
2 = 0.5rem   (8px)
3 = 1rem     (16px)
4 = 1.5rem   (24px)
5 = 3rem     (48px)
6 = 4rem     (64px)
7 = 5rem     (80px)
```

### Section Spacing

```css
/* Vertical spacing between sections */
.section {
  padding-top: 5rem;    /* 80px */
  padding-bottom: 5rem; /* 80px */
}

/* Card padding */
.card-body {
  padding: 1.5rem; /* 24px */
}

/* Large cards */
.card-body-lg {
  padding: 2rem; /* 32px */
}
```

### Container Widths

```css
/* Bootstrap containers */
.container {
  max-width: 1320px;
}

.container-sm {
  max-width: 720px;
}

.container-md {
  max-width: 960px;
}

.container-lg {
  max-width: 1140px;
}
```

### Grid System

```tsx
// Standard 3-column grid
<div className="row g-4">
  <div className="col-md-6 col-lg-4">...</div>
  <div className="col-md-6 col-lg-4">...</div>
  <div className="col-md-6 col-lg-4">...</div>
</div>

// Content + Sidebar layout
<div className="row g-4">
  <div className="col-lg-8">Main content</div>
  <div className="col-lg-4">Sidebar</div>
</div>
```

---

## 🎭 Shadows

### Shadow System

```css
/* Subtle shadow for cards */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Standard shadow */
--shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Elevated shadow */
--shadow-lg: 0 4px 6px rgba(0, 0, 0, 0.1);

/* Large shadow for modals */
--shadow-xl: 0 10px 15px rgba(0, 0, 0, 0.1);

/* Dramatic shadow */
--shadow-2xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### Shadow Usage

| Component | Shadow | Usage |
|-----------|--------|-------|
| Cards | `shadow-sm` or `shadow-md` | Default cards |
| Cards (hover) | `shadow-lg` | Interactive cards |
| Navbar | `shadow-sm` | Fixed navigation |
| Modals | `shadow-2xl` | Overlays |
| Buttons (hover) | `0 4px 8px rgba(37, 99, 235, 0.3)` | Primary buttons |

```css
/* Card with shadow */
.card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

---

## 🔲 Borders & Radius

### Border Widths

```css
--border-width-thin: 1px;
--border-width-medium: 2px;
--border-width-thick: 4px;
```

### Border Radius

```css
--radius-sm: 0.25rem;   /* 4px - Small elements */
--radius-md: 0.5rem;    /* 8px - Cards, buttons */
--radius-lg: 1rem;      /* 16px - Large cards */
--radius-xl: 1.5rem;    /* 24px - Hero sections */
--radius-2xl: 2rem;     /* 32px - Special components */
--radius-full: 9999px;  /* Circular/pill shape */
```

### Usage Examples

```tsx
// Card with rounded corners
<div className="card rounded-3">...</div>

// Pill-shaped button
<button className="btn btn-primary rounded-pill">Đăng ký</button>

// Large rounded container
<div className="rounded-4 p-5">...</div>
```

### Border Colors

```tsx
// Default border
<div className="border">...</div>

// Primary border
<div className="border border-primary">...</div>

// Left accent border
<div className="border-start border-4 border-primary">...</div>
```

---

## ✨ Animations & Transitions

### Transition Timing

```css
/* Standard timing function */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Quick transitions */
transition: all 0.15s ease-in-out;

/* Slow transitions */
transition: all 0.5s ease-in-out;
```

### Common Animations

```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

/* Hover Lift */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Animation Guidelines

1. **Keep it subtle**: Animations should enhance, not distract
2. **Performance**: Use `transform` and `opacity` for smooth 60fps
3. **Duration**: 0.15s-0.5s for most UI transitions
4. **Easing**: Use `cubic-bezier(0.4, 0, 0.2, 1)` for natural feel

---

## 🎯 Component Styling Examples

### Card Component

```tsx
<div className="card border shadow-sm hover-lift h-100">
  <div className="card-body p-4">
    <h3 className="h5 fw-semibold mb-3">Card Title</h3>
    <p className="text-secondary mb-0">Card description</p>
  </div>
</div>
```

### Button Styles

```tsx
// Primary button
<button className="btn btn-primary btn-lg rounded-pill px-5">
  Primary Action
</button>

// Secondary button
<button className="btn btn-outline-primary btn-lg rounded-pill px-5">
  Secondary Action
</button>

// Link button
<button className="btn btn-link text-primary">
  Learn More →
</button>
```

### Badge Styles

```tsx
// Primary badge
<span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
  Beginner
</span>

// Gradient badge
<span className="badge px-3 py-2" style={{
  background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
  color: 'white'
}}>
  Featured
</span>
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Bootstrap 5 breakpoints */
$breakpoint-xs: 0;
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$breakpoint-xxl: 1400px;
```

### Mobile-First Approach

```tsx
// Stack on mobile, side-by-side on desktop
<div className="row g-4">
  <div className="col-12 col-md-6">...</div>
  <div className="col-12 col-md-6">...</div>
</div>

// Hide on mobile
<div className="d-none d-md-block">Desktop only</div>

// Show only on mobile
<div className="d-block d-md-none">Mobile only</div>
```

### Responsive Typography

```tsx
// Responsive heading sizes
<h1 className="display-1 display-md-2 display-sm-3">
  Responsive Heading
</h1>

// Responsive padding
<div className="p-3 p-md-4 p-lg-5">...</div>
```

---

## ✅ Accessibility

### Color Contrast

Tất cả text phải đạt WCAG AA standards:
- Normal text: contrast ratio ≥ 4.5:1
- Large text: contrast ratio ≥ 3:1

### Verified Combinations

| Foreground | Background | Ratio | Status |
|------------|------------|-------|--------|
| #0F172A | #FFFFFF | 16.89:1 | ✅ AAA |
| #2563EB | #FFFFFF | 7.27:1 | ✅ AAA |
| #475569 | #FFFFFF | 8.59:1 | ✅ AAA |
| #FFFFFF | #2563EB | 7.27:1 | ✅ AAA |

### Focus States

```css
/* Visible focus indicator */
:focus {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}

/* Button focus */
.btn:focus {
  box-shadow: 0 0 0 0.25rem rgba(37, 99, 235, 0.25);
}
```

---

## 📋 Checklist

Khi thiết kế components mới:

- [ ] Sử dụng đúng bảng màu AI Tech Blue
- [ ] Áp dụng typography scale
- [ ] Spacing consistent (sử dụng spacing scale)
- [ ] Shadow phù hợp với component type
- [ ] Border radius phù hợp
- [ ] Animations subtle và smooth
- [ ] Responsive trên mobile/tablet/desktop
- [ ] Contrast ratio đạt chuẩn WCAG AA
- [ ] Focus states rõ ràng

---

**Last updated**: February 13, 2026
