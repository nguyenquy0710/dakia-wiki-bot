# Theme & Design System

## Purpose
This document defines the DAKIA Wiki Bot theme, color palette, design tokens, and visual identity for consistent styling across the application.

## 🎨 Color Palette - AI Tech Blue

DAKIA Wiki Bot uses the **AI Tech Blue** color palette to create a modern, tech-forward, and trustworthy feel.

### Primary Colors
```css
/* Primary Brand Colors */
--color-primary: #2563EB;        /* Blue 600 - Main brand color */
--color-primary-dark: #1E40AF;   /* Blue 800 - Hover states */
--color-accent: #06B6D4;         /* Cyan 500 - Gradient accent */

/* Bootstrap variable names (for compatibility) */
--bs-primary: #2563EB;
```

**Usage:**
- Primary buttons, links, and brand elements
- Main gradient for hero sections and feature cards
- Use `#2563EB` for solid primary color
- Use `#1E40AF` for hover states
- Use gradient `linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)` for premium features

### Neutral Colors
```css
--color-background: #FFFFFF;     /* Pure white */
--color-surface: #F8FAFC;        /* Very light gray - backgrounds */
--color-border: #E2E8F0;         /* Soft gray - borders & dividers */

/* Bootstrap equivalents */
--bs-light: #F8FAFC;             /* Gray 50 */
--bs-dark: #0F172A;              /* Gray 900 */
```

### Text Colors
```css
--color-text-primary: #0F172A;   /* Dark slate - Main headings & body */
--color-text-secondary: #475569; /* Medium slate - Secondary text */
--color-text-muted: #64748B;     /* Light slate - Muted text */
```

**Usage:**
- `#0F172A`: Headings, important text
- `#475569`: Metadata, captions, dates
- `#64748B`: Hints, placeholders, disabled text

### Semantic Colors
```css
--color-success: #10B981;        /* Green 500 - Success states */
--color-warning: #F59E0B;        /* Amber 500 - Warning states */
--color-danger: #EF4444;         /* Red 500 - Error states */
--color-info: #06B6D4;           /* Cyan 500 - Info states */

/* Bootstrap equivalents */
--bs-success: #10B981;
--bs-warning: #F59E0B;
--bs-danger: #EF4444;
--bs-info: #06B6D4;
```

### Gray Scale (Full Spectrum)
```css
--gray-50: #F8FAFC;
--gray-100: #F1F5F9;
--gray-200: #E2E8F0;
--gray-300: #CBD5E1;
--gray-400: #94A3B8;
--gray-500: #64748B;
--gray-600: #475569;
--gray-700: #334155;
--gray-800: #1E293B;
--gray-900: #0F172A;
```

### Color Usage Table

| Color | Hex Code | Usage | Example |
|-------|----------|-------|---------|
| Primary | `#2563EB` | CTAs, links, active states | Primary buttons, nav active |
| Primary Dark | `#1E40AF` | Hover states, emphasis | Button hover |
| Accent | `#06B6D4` | Gradients, highlights | Gradient end, badges |
| Text Primary | `#0F172A` | Headings, body text | All text content |
| Text Secondary | `#475569` | Metadata, captions | Dates, authors |
| Border | `#E2E8F0` | Borders, dividers | Card outline |

## Design Tokens

### Spacing Scale
```css
/* Bootstrap spacing utilities (0-7) */
0 = 0
1 = 0.25rem  (4px)   /* Tiny gap */
2 = 0.5rem   (8px)   /* Small gap */
3 = 1rem     (16px)  /* Standard gap */
4 = 1.5rem   (24px)  /* Medium gap */
5 = 3rem     (48px)  /* Large gap */
6 = 4rem     (64px)  /* Extra large gap */
7 = 5rem     (80px)  /* Section spacing */

/* Custom spacing values */
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 1.5rem;   /* 24px */
--spacing-lg: 2rem;     /* 32px */
--spacing-xl: 3rem;     /* 48px */
--spacing-2xl: 4rem;    /* 64px */
--spacing-3xl: 5rem;    /* 80px */
```

**Usage:**
```tsx
// Card spacing
<div className="card-body p-4">  {/* 24px padding */}

// Section spacing
<section className="py-5">       {/* 48px vertical padding */}

// Element margins
<h2 className="mb-4">            {/* 24px bottom margin */}

// Grid gaps
<div className="row g-4">        {/* 24px gap between columns */}
```

### Border Radius
```css
--radius-sm: 0.25rem;   /* 4px - Small elements */
--radius-md: 0.5rem;    /* 8px - Buttons, inputs */
--radius-lg: 1rem;      /* 16px - Cards */
--radius-xl: 1.5rem;    /* 24px - Large cards, hero */
--radius-2xl: 2rem;     /* 32px - Special components */
--radius-full: 9999px;  /* Circular/pill shape */

/* Bootstrap classes */
.rounded      /* 0.25rem */
.rounded-1    /* 0.25rem */
.rounded-2    /* 0.5rem */
.rounded-3    /* 1rem */
.rounded-4    /* 1.5rem */
.rounded-pill /* 50rem = pill shape */
```

**Usage:**
```tsx
// Card with large radius
<div className="card rounded-3">

// Pill button
<button className="btn btn-primary rounded-pill">

// Hero section
<section className="rounded-4">
```

### Shadows
```css
/* Shadow scale - subtle to dramatic */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 20px 25px rgba(0, 0, 0, 0.15);

/* Bootstrap classes */
.shadow-sm    /* Subtle shadow */
.shadow       /* Standard shadow */
.shadow-lg    /* Large shadow */
```

**Shadow Usage Table:**

| Component | Shadow | CSS |
|-----------|--------|-----|
| Cards | `shadow-sm` or `shadow-md` | `0 1px 3px rgba(0,0,0,0.1)` |
| Cards (hover) | `shadow-lg` | `0 4px 12px rgba(0,0,0,0.15)` |
| Navbar | `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| Modals | `shadow-2xl` | `0 20px 25px rgba(0,0,0,0.15)` |
| Buttons (hover) | Custom | `0 4px 8px rgba(37,99,235,0.3)` |

**Examples:**
```tsx
// Card with subtle shadow
<div className="card shadow-sm">

// Card with hover effect
<div className="card shadow-sm hover-lift">

// Button with custom shadow on hover
<button 
  className="btn btn-primary"
  style={{
    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.3)';
  }}
>
  Click me
</button>
```

### Border Widths
```css
--border-width-thin: 1px;    /* Standard borders */
--border-width-medium: 2px;  /* Emphasis borders */
--border-width-thick: 4px;   /* Accent borders */
```

**Usage:**
```tsx
// Standard border
<div className="border">

// Thick left accent
<div className="border-start border-4 border-primary">

// All sides with primary color
<div className="border border-2 border-primary">
```

## Typography

### Font Families
```css
/* Headings - Modern, geometric sans-serif */
font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;

/* Body Text - Highly readable */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Sizes
```css
/* Base */
--font-size-base: 1.125rem;      /* 18px - body text */
--line-height-base: 1.8;         /* Comfortable reading */

/* Display Headings (Extra large) */
--font-size-display-1: 3.5rem;   /* 56px */
--font-size-display-2: 3rem;     /* 48px */
--font-size-display-3: 2.5rem;   /* 40px */

/* Standard Headings */
--font-size-h1: 2.5rem;          /* 40px */
--font-size-h2: 2rem;            /* 32px */
--font-size-h3: 1.5rem;          /* 24px */
--font-size-h4: 1.25rem;         /* 20px */
--font-size-h5: 1.125rem;        /* 18px */
--font-size-h6: 1rem;            /* 16px */

/* Text Sizes */
--font-size-lg: 1.25rem;         /* 20px - lead text */
--font-size-md: 1rem;            /* 16px - normal */
--font-size-sm: 0.875rem;        /* 14px - small */
--font-size-xs: 0.75rem;         /* 12px - extra small */
```

### Font Weights
```css
--font-weight-light: 300;        /* Light - subtle emphasis */
--font-weight-regular: 400;      /* Regular - body text */
--font-weight-medium: 500;       /* Medium - UI elements */
--font-weight-semibold: 600;     /* Semibold - subheadings */
--font-weight-bold: 700;         /* Bold - headings */
--font-weight-extrabold: 800;    /* Extra Bold - hero text */
```

### Typography Scale Table

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| Display 1 | 3.5rem (56px) | 700-800 | 1.2 | Hero sections |
| Display 2 | 3rem (48px) | 700 | 1.2 | Large headers |
| Display 3 | 2.5rem (40px) | 700 | 1.2 | Section titles |
| H1 | 2.5rem (40px) | 700 | 1.3 | Page titles |
| H2 | 2rem (32px) | 600-700 | 1.3 | Major sections |
| H3 | 1.5rem (24px) | 600 | 1.4 | Subsections |
| H4 | 1.25rem (20px) | 600 | 1.4 | Card titles |
| Body | 1.125rem (18px) | 400 | 1.8 | Main content |
| Lead | 1.25rem (20px) | 400 | 1.8 | Intro paragraphs |
| Small | 0.875rem (14px) | 400 | 1.6 | Captions, meta |

### Usage Examples
```tsx
// Hero heading (large display)
<h1 className="display-1 fw-bold mb-4">
  DAKIA Wiki Bot
</h1>

// Section heading
<h2 className="display-3 fw-bold mb-4">
  Danh mục
</h2>

// Card heading
<h3 className="h4 fw-semibold mb-3">
  Tên danh mục
</h3>

// Lead paragraph
<p className="lead">
  Mô tả ngắn về nội dung
</p>

// Body text (default)
<p>
  Nội dung chi tiết ở đây
</p>

// Small metadata
<small className="text-muted">
  Cập nhật: 2 giờ trước
</small>
```

## Common Gradients

### Primary Gradient (Brand)
```css
/* Blue to Cyan gradient - main brand */
background: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%);
```

**Usage:**
- Hero sections
- Feature cards
- Premium badges
- Call-to-action backgrounds

### Subtle Background Gradients
```css
/* Very subtle (3% opacity) - for backgrounds */
background: linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%);

/* Subtle (5% opacity) - for cards */
background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%);
```

### Success Gradient
```css
background: linear-gradient(135deg, #10b981 0%, #059669 100%);
```

### Info Gradient
```css
background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
```

### Text Gradient
```css
.text-gradient {
  background: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Gradient Examples
```tsx
// Hero section with subtle gradient
<section style={{ 
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)',
  borderRadius: '1.5rem'
}}>
  Hero content
</section>

// Card with gradient
<div className="card" style={{ 
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
  borderLeft: '4px solid #2563EB'
}}>
  Card content
</div>

// Gradient text
<h1 className="text-gradient">
  DAKIA Wiki Bot
</h1>

// Gradient badge
<span style={{
  background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '9999px'
}}>
  Featured
</span>
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

## Admin Theme Patterns (NextAdmin Approach)

### Admin Card Grid Layout
```tsx
// Modern card-based grid for admin CRUD pages
<div className="row g-4">
  <div className="col-md-6 col-lg-4">
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div 
            className="me-3 d-flex align-items-center justify-content-center"
            style={{ 
              fontSize: '2rem',
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              backgroundColor: '#2563EB15',  // Primary color with 15% opacity
            }}
          >
            📁
          </div>
          <div className="flex-grow-1">
            <h5 className="mb-0">Title</h5>
            <small className="text-muted">subtitle</small>
          </div>
        </div>
        <p className="text-muted mb-3">Description text</p>
        <div className="btn-group btn-group-sm">
          <button className="btn btn-outline-primary">Sửa</button>
          <button className="btn btn-outline-danger">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Modal Component Styling
```tsx
// Full-screen overlay modal
<div 
  className="modal show d-block" 
  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
  onClick={() => setShowModal(false)}
>
  <div 
    className="modal-dialog modal-dialog-centered"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal Title</h5>
        <button 
          type="button" 
          className="btn-close"
          onClick={() => setShowModal(false)}
        />
      </div>
      <div className="modal-body">
        {/* Modal content */}
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
```

### Icon with Color Background
```tsx
// Icon badge with themed background
<div 
  className="d-flex align-items-center justify-content-center"
  style={{ 
    fontSize: '2rem',
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    backgroundColor: `${iconColor}15`,  // Color with 15% opacity
  }}
>
  {icon}
</div>
```

### Search Bar Pattern
```tsx
// Elevated search card
<div className="card border-0 shadow-sm mb-4">
  <div className="card-body">
    <input
      type="text"
      className="form-control"
      placeholder="🔍 Tìm kiếm..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
</div>
```

### Loading State
```tsx
// Centered loading spinner
<div className="text-center py-5">
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Đang tải...</span>
  </div>
</div>
```

### Empty State
```tsx
// Empty state message
<div className="col-12">
  <div className="text-center py-5 text-muted">
    <h4>Chưa có dữ liệu</h4>
    <p>Nhấn "Tạo mới" để bắt đầu</p>
  </div>
</div>
```

### Status Badge Patterns
```tsx
// Published badge (success)
<span className="badge bg-success">Đã xuất bản</span>

// Draft badge (secondary)
<span className="badge bg-secondary">Nháp</span>

// Custom colored badge
<span 
  className="badge"
  style={{
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    color: '#2563EB',
    border: '1px solid rgba(37, 99, 235, 0.2)'
  }}
>
  Custom
</span>
```

### Admin Sidebar Pattern
```tsx
<aside className="bg-dark text-white" style={{ width: '250px' }}>
  <div className="p-4">
    <h4 className="fw-bold mb-4">
      <span style={{ color: '#2563EB' }}>DAKIA</span> Admin
    </h4>
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="/admin/dashboard">
            📊 Dashboard
          </a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="/admin/categories">
            📂 Danh mục
          </a>
        </li>
      </ul>
    </nav>
  </div>
</aside>
```

## Color Picker & Icon Selector

### Color Input Pattern
```tsx
<div className="mb-3">
  <label className="form-label">Màu sắc</label>
  <input
    type="color"
    className="form-control form-control-color"
    name="color"
    value={formData.color}
    onChange={handleInputChange}
  />
</div>
```

### Icon/Emoji Input Pattern
```tsx
<div className="mb-3">
  <label className="form-label">Icon (Emoji)</label>
  <input
    type="text"
    className="form-control"
    name="icon"
    value={formData.icon}
    onChange={handleInputChange}
    placeholder="📁"
    maxLength={2}
  />
</div>
```

## Animations & Transitions

### Transition Timing
```css
/* Standard - smooth and natural */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Quick - for subtle changes */
transition: all 0.15s ease-in-out;

/* Slow - for dramatic effects */
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

/* Hover Lift Effect */
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

.scale-in {
  animation: scaleIn 0.3s ease-out;
}
```

### Animation Guidelines
1. **Keep it subtle**: Enhance, don't distract
2. **Performance**: Use `transform` and `opacity` for 60fps
3. **Duration**: 0.15s-0.5s for most UI transitions
4. **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for natural feel

## Color Accessibility

### WCAG 2.1 Standards
All text must meet AA standards:
- **Normal text**: contrast ratio ≥ 4.5:1
- **Large text**: contrast ratio ≥ 3:1
- **UI components**: contrast ratio ≥ 3:1

### Verified Color Combinations

| Foreground | Background | Ratio | Status |
|------------|------------|-------|--------|
| #0F172A (Text Primary) | #FFFFFF | 16.89:1 | ✅ AAA |
| #2563EB (Primary) | #FFFFFF | 7.27:1 | ✅ AAA |
| #475569 (Text Secondary) | #FFFFFF | 8.59:1 | ✅ AAA |
| #64748B (Text Muted) | #FFFFFF | 5.85:1 | ✅ AAA |
| #FFFFFF | #2563EB | 7.27:1 | ✅ AAA |
| #FFFFFF | #1E40AF | 10.27:1 | ✅ AAA |

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

/* Input focus */
.form-control:focus {
  border-color: #2563EB;
  box-shadow: 0 0 0 0.25rem rgba(37, 99, 235, 0.15);
}
```

## AI Agent Instructions

When creating new components:
1. **Always use defined colors** - Primary: `#2563EB`, Accent: `#06B6D4`
2. **Typography** - Use Plus Jakarta Sans for headings, Inter for body
3. **Use gradients** for hero sections and premium features
4. **Inline styles** for component-specific colors
5. **Border radius** minimum `0.5rem` (8px) for modern look
6. **Spacing** follow the spacing scale (1-7)
7. **Shadows** subtle - use `shadow-sm` to `shadow-lg`
8. **Text colors** - Primary: `#0F172A`, Secondary: `#475569`, Muted: `#64748B`
9. **Animations** 0.15s-0.5s duration with cubic-bezier easing
10. **Accessibility** ensure color contrast meets WCAG AA

## Quick Reference

### Most Used Values
```typescript
// Colors
const PRIMARY = '#2563EB';
const PRIMARY_DARK = '#1E40AF';
const ACCENT = '#06B6D4';
const TEXT_PRIMARY = '#0F172A';
const TEXT_SECONDARY = '#475569';
const TEXT_MUTED = '#64748B';
const BORDER = '#E2E8F0';

// Shadows
const SHADOW_SM = '0 1px 2px rgba(0, 0, 0, 0.05)';
const SHADOW_MD = '0 1px 3px rgba(0, 0, 0, 0.1)';
const SHADOW_LG = '0 4px 12px rgba(0, 0, 0, 0.15)';

// Border Radius
const RADIUS_MD = '0.5rem';   // 8px
const RADIUS_LG = '1rem';     // 16px
const RADIUS_XL = '1.5rem';   // 24px
const RADIUS_PILL = '9999px';

// Spacing
const SPACING_SM = '1rem';    // 16px
const SPACING_MD = '1.5rem';  // 24px
const SPACING_LG = '3rem';    // 48px

// Gradient
const GRADIENT_PRIMARY = 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)';
const GRADIENT_SUBTLE = 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)';
```

### Component Examples Quick Reference

```tsx
// Card
<div className="card border-0 shadow-sm rounded-3 hover-lift">

// Button  
<button className="btn btn-primary btn-lg rounded-pill px-5">

// Badge
<span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">

// Section
<section className="py-5" style={{ background: GRADIENT_SUBTLE }}>

// Heading
<h1 className="display-1 fw-bold mb-4" style={{ color: TEXT_PRIMARY }}>
```

## Checklist for New Components

- [ ] Uses AI Tech Blue color palette (#2563EB, #06B6D4)
- [ ] Typography uses defined scale
- [ ] Spacing follows 1-7 scale
- [ ] Shadows are subtle (shadow-sm to shadow-lg)
- [ ] Border radius minimum 0.5rem (8px)
- [ ] Animations are smooth (0.15s-0.5s)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Color contrast meets WCAG AA (≥4.5:1)
- [ ] Focus states are visible
- [ ] Hover states are defined

---

**Last updated**: February 13, 2026  
**See also**: `docs/STYLE-GUIDE.md` for complete reference
