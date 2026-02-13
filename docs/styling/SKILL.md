# Styling Patterns & Conventions

## Purpose
This document defines styling patterns, CSS conventions, and component styling approaches used in DAKIA Wiki Bot following the **AI Tech Blue** design system.

## 🎨 Color System Quick Reference

```typescript
// Primary Colors
const PRIMARY = '#2563EB';        // Blue 600 - Main brand
const PRIMARY_DARK = '#1E40AF';   // Blue 800 - Hover
const ACCENT = '#06B6D4';         // Cyan - Gradient accent

// Text Colors
const TEXT_PRIMARY = '#0F172A';   // Dark slate - Headings
const TEXT_SECONDARY = '#475569'; // Medium slate - Secondary
const TEXT_MUTED = '#64748B';     // Light slate - Muted

// Semantic
const SUCCESS = '#10B981';
const WARNING = '#F59E0B';
const DANGER = '#EF4444';
const INFO = '#06B6D4';
```

## Styling Approach

### Priority Order
1. **Bootstrap 5 utility classes** - for standard spacing, layout, typography
2. **Inline styles** - for component-specific colors, gradients, custom values
3. **Custom CSS classes** - for reusable patterns (from globals.css)
4. **CSS Modules** - NOT used in this project

**Rationale:**
- Bootstrap provides comprehensive utilities
- Inline styles keep colors co-located with components
- No build step needed for styling
- Easy to maintain and understand

## Bootstrap 5 Usage

### Layout & Grid
```tsx
// Container
<div className="container">
<div className="container-fluid">

// Grid system
<div className="row g-4">  {/* gap-4 between columns */}
  <div className="col-md-6">
  <div className="col-lg-4">
</div>

// Flexbox utilities
<div className="d-flex justify-content-between align-items-center">
<div className="d-flex gap-3 flex-wrap">
```

### Spacing (Bootstrap)
```tsx
// Margin: m-{size}, my-{size}, mx-{size}, mt-{size}, mb-{size}, ms-{size}, me-{size}
<div className="mb-4 mt-3">  {/* margin-bottom: 1.5rem, margin-top: 1rem */}

// Padding: p-{size}, py-{size}, px-{size}, pt-{size}, pb-{size}, ps-{size}, pe-{size}
<div className="p-5 px-4">  {/* padding: 3rem, padding-x: 1.5rem */}

// Sizes: 0, 1 (0.25rem), 2 (0.5rem), 3 (1rem), 4 (1.5rem), 5 (3rem)
```

### Typography (Bootstrap)
```tsx
<h1 className="fw-bold mb-4">  {/* font-weight: 700 */}
<p className="text-muted">     {/* color: gray-600 */}
<span className="fw-semibold"> {/* font-weight: 600 */}
<small className="text-muted"> {/* smaller text */}
```

### Display & Visibility
```tsx
<div className="d-none d-md-block">     {/* hidden on mobile, visible on md+ */}
<div className="d-flex d-md-none">      {/* visible on mobile, hidden on md+ */}
<div className="text-center">          {/* text-align: center */}
<div className="text-truncate">        {/* overflow ellipsis */}
```

## Inline Styles Pattern

### When to Use Inline Styles
1. **Colors** - Brand colors, gradients, custom colors
2. **Sizes** - Custom widths, heights, min/max dimensions
3. **Gradients** - Background gradients
4. **Component-specific values** - Unique to that component

### Color Inline Styles
```tsx
// Primary brand color
<span style={{ color: '#2563EB' }}>DAKIA</span>

// Multiple style properties
<div style={{ 
  color: '#475569',
  fontSize: '1.125rem',
  fontWeight: 500
}}>
```

### Background Gradients
```tsx
<section style={{ 
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)',
  minHeight: '600px',
  borderRadius: '1.5rem'
}}>
```

### Responsive Sizing
```tsx
// Using clamp for responsive font sizes
<h1 style={{ 
  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
  lineHeight: '1.1'
}}>

// Fixed with max-width
<p style={{ 
  maxWidth: '700px',
  fontSize: '1.125rem'
}}>
```

## Card Styling Pattern

### Standard Card (AI Tech Blue Style)
```tsx
// Modern card with subtle shadow
<div className="card border-0 shadow-sm rounded-3 hover-lift">
  <div className="card-body p-4">
    <h3 className="h5 fw-semibold mb-3" style={{ color: '#0F172A' }}>
      Card Title
    </h3>
    <p className="mb-0" style={{ color: '#475569' }}>
      Card description with secondary text color
    </p>
  </div>
</div>
```

### Card with Gradient Background
```tsx
<div className="card h-100 border-0 shadow-sm hover-lift rounded-3" style={{ 
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
  borderLeft: '4px solid #2563EB'
}}>
  <div className="card-body p-4">
    <h4 className="fw-semibold mb-3" style={{ color: '#2563EB' }}>
      Featured Card
    </h4>
    <p className="mb-0" style={{ color: '#475569' }}>
      Content here
    </p>
  </div>
</div>
```

### Card with Icon Badge
```tsx
<div className="card border-0 shadow-sm rounded-3 h-100">
  <div className="card-body p-4">
    {/* Icon with colored background */}
    <div className="d-flex align-items-center mb-3">
      <div 
        className="me-3 d-flex align-items-center justify-content-center"
        style={{ 
          fontSize: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',  // Primary with 10% opacity
        }}
      >
        📁
      </div>
      <div>
        <h5 className="mb-0 fw-semibold" style={{ color: '#0F172A' }}>
          Category Name
        </h5>
        <small style={{ color: '#64748B' }}>category-slug</small>
      </div>
    </div>
    
    <p className="mb-3" style={{ color: '#475569' }}>
      Description text
    </p>
    
    <div className="btn-group btn-group-sm">
      <button className="btn btn-outline-primary">Sửa</button>
      <button className="btn btn-outline-danger">Xóa</button>
    </div>
  </div>
</div>
```

### Card with Hover Effect
```tsx
// Add hover-lift class for automatic elevation on hover
<div className="card border-0 shadow-sm hover-lift rounded-3">
  {/* Content */}
</div>

// Custom hover effect
<div 
  className="card border-0 shadow-sm rounded-3"
  style={{
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  }}
>
  {/* Content */}
</div>
```

## Button Styling Pattern

### Primary Button (AI Tech Blue)
```tsx
<button 
  className="btn btn-primary btn-lg rounded-pill px-5 fw-semibold"
  style={{ 
    fontSize: '1rem',
    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.3)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.2)';
    e.currentTarget.style.transform = 'translateY(0)';
  }}
>
  Primary Action
</button>
```

### Outline Button
```tsx
<button 
  className="btn btn-outline-primary btn-lg rounded-pill px-5 fw-semibold"
  style={{ fontSize: '1rem' }}
>
  Secondary Action
</button>
```

### Link Button
```tsx
<button className="btn btn-link fw-semibold" style={{ color: '#2563EB' }}>
  Learn More →
</button>
```

### Button Group
```tsx
<div className="btn-group btn-group-sm">
  <button className="btn btn-outline-primary">Sửa</button>
  <button className="btn btn-outline-danger">Xóa</button>
</div>
```

### Button with Loading State
```tsx
<button 
  className="btn btn-primary btn-lg w-100 fw-semibold rounded-pill"
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status" />
      Đang xử lý...
    </>
  ) : (
    'Gửi'
  )}
</button>
```

### Gradient Button
```tsx
<button 
  className="btn btn-lg rounded-pill px-5 fw-semibold text-white border-0"
  style={{
    background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)'
  }}
>
  Get Started
</button>
```

## Badge Styling Pattern

### Primary Badge (Subtle)
```tsx
<span 
  className="badge px-3 py-2 rounded-pill fw-semibold"
  style={{ 
    background: 'rgba(37, 99, 235, 0.1)',
    color: '#2563EB',
    border: '1px solid rgba(37, 99, 235, 0.2)',
    fontSize: '0.875rem'
  }}
>
  Beginner
</span>
```

### Solid Badges
```tsx
// Success
<span className="badge bg-success px-3 py-2 rounded-pill">
  Đã xuất bản
</span>

// Secondary/Draft
<span className="badge bg-secondary px-3 py-2 rounded-pill">
  Nháp
</span>

// Danger
<span className="badge bg-danger px-3 py-2 rounded-pill">
  Lỗi
</span>

// Info
<span className="badge bg-info px-3 py-2 rounded-pill">
  Mới
</span>
```

### Gradient Badge
```tsx
<span 
  className="badge px-3 py-2 rounded-pill text-white fw-semibold"
  style={{
    background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    fontSize: '0.875rem'
  }}
>
  Featured
</span>
```

### Icon Badge
```tsx
<span className="badge bg-primary me-2">
  ✓
</span>
<span style={{ color: '#475569' }}>Completed</span>
```

### Status Badge with Custom Colors
```tsx
// Active status
<span 
  className="badge px-3 py-2 rounded-pill"
  style={{
    background: 'rgba(16, 185, 129, 0.1)',
    color: '#10B981',
    border: '1px solid rgba(16, 185, 129, 0.2)'
  }}
>
  Hoạt động
</span>

// Warning status
<span 
  className="badge px-3 py-2 rounded-pill"
  style={{
    background: 'rgba(245, 158, 11, 0.1)',
    color: '#F59E0B',
    border: '1px solid rgba(245, 158, 11, 0.2)'
  }}
>
  Chờ duyệt
</span>
```

## Form Styling Pattern

### Input Field (AI Tech Blue)
```tsx
<div className="mb-3">
  <label 
    htmlFor="email" 
    className="form-label fw-semibold"
    style={{ color: '#0F172A' }}
  >
    Email
  </label>
  <input
    type="email"
    className="form-control form-control-lg rounded-3"
    id="email"
    placeholder="your.email@dakia.tech"
    style={{
      fontSize: '1rem',
      borderColor: '#E2E8F0'
    }}
    onFocus={(e) => {
      e.currentTarget.style.borderColor = '#2563EB';
      e.currentTarget.style.boxShadow = '0 0 0 0.25rem rgba(37, 99, 235, 0.15)';
    }}
    onBlur={(e) => {
      e.currentTarget.style.borderColor = '#E2E8F0';
      e.currentTarget.style.boxShadow = 'none';
    }}
  />
</div>
```

### Form with Validation
```tsx
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label fw-semibold" style={{ color: '#0F172A' }}>
      Tên <span style={{ color: '#EF4444' }}>*</span>
    </label>
    <input
      type="text"
      className="form-control form-control-lg rounded-3"
      required
      style={{ borderColor: '#E2E8F0' }}
    />
    <small style={{ color: '#64748B' }}>
      Tối thiểu 3 ký tự
    </small>
  </div>
</form>
```

### Color Picker
```tsx
<div className="mb-3">
  <label className="form-label fw-semibold" style={{ color: '#0F172A' }}>
    Màu sắc
  </label>
  <input
    type="color"
    className="form-control form-control-color rounded-3"
    value={color}
    onChange={(e) => setColor(e.target.value)}
    style={{ 
      width: '80px',
      height: '40px',
      borderColor: '#E2E8F0'
    }}
  />
</div>
```

### Textarea
```tsx
<div className="mb-3">
  <label className="form-label fw-semibold" style={{ color: '#0F172A' }}>
    Mô tả
  </label>
  <textarea
    className="form-control rounded-3"
    rows={4}
    placeholder="Nhập mô tả..."
    style={{ 
      fontSize: '1rem',
      borderColor: '#E2E8F0'
    }}
  />
</div>
```

### Checkbox
```tsx
<div className="form-check">
  <input
    type="checkbox"
    className="form-check-input"
    id="published"
    checked={isPublished}
    onChange={(e) => setIsPublished(e.target.checked)}
    style={{ borderColor: '#E2E8F0' }}
  />
  <label 
    className="form-check-label" 
    htmlFor="published"
    style={{ color: '#0F172A' }}
  >
    Xuất bản
  </label>
</div>
```

## Badge Styling Pattern



## Animation Classes

Available animation classes from globals.css:

```tsx
// Fade in from bottom
<div className="fade-in">

// Fade in upward
<div className="fade-in-up">

// Scale in
<div className="scale-in">

// Hover lift effect
<div className="hover-lift">

// Pulse animation
<div className="pulse">
```

## Custom Utility Classes

From globals.css:

```tsx
// Border radius
<div className="rounded-xl">   {/* 1.5rem */}
<div className="rounded-2xl">  {/* 2rem */}

// Shadows
<div className="shadow-soft">  {/* medium shadow */}
<div className="shadow-glow">  {/* blue glow */}

// Gradients
<div className="hero-gradient">
<div className="gradient-primary">
<div className="gradient-success">

// Text
<span className="text-gradient">  {/* gradient text */}
```

## Responsive Patterns

### Mobile-First Breakpoints
```tsx
// Stack on mobile, row on desktop
<div className="row g-4">
  <div className="col-12 col-md-6">  {/* Full width on mobile, half on md+ */}

// Hide/show based on screen size
<div className="d-none d-lg-block">  {/* Hidden on mobile, visible on lg+ */}
```

### Responsive Spacing
```tsx
<div className="py-4 py-md-5">  {/* padding-y: 1.5rem on mobile, 3rem on md+ */}
<div className="px-3 px-lg-5">  {/* padding-x: 1rem on mobile, 3rem on lg+ */}
```

## Glassmorphism Pattern

```tsx
<div className="card-glass">
  {/* Automatically applies glassmorphism effect */}
</div>

// Or custom glassmorphism
<div style={{
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.18)'
}}>
```

## Navigation Styling

### Navbar
```tsx
<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
  <div className="container">
    <a className="navbar-brand fw-bold" href="/">
      <span style={{ color: '#2563EB' }}>DAKIA</span> Wiki
    </a>
    {/* ... */}
  </div>
</nav>
```

### Sidebar (Admin)
```tsx
<aside className="bg-dark text-white" style={{ width: '250px' }}>
  <div className="p-4">
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="/admin/dashboard">
            📊 Dashboard
          </a>
        </li>
      </ul>
    </nav>
  </div>
</aside>
```

## AI Agent Styling Guidelines

### DO:
✅ Use Bootstrap utility classes for layout, spacing, and standard styles
✅ Use inline styles for colors, gradients, and custom values
✅ Combine classes: `className="card border-0 shadow-sm"` with `style={{ borderRadius: '1rem' }}`
✅ Use CSS variables for colors when possible: `color: 'var(--bs-primary)'`
✅ Apply hover effects with utility classes: `hover-lift`, `hover-bg-secondary`
✅ Use responsive classes: `col-md-6`, `d-none d-md-block`

### DON'T:
❌ Create new CSS files or modules
❌ Use !important unless absolutely necessary
❌ Hardcode spacing values - use Bootstrap spacing scale
❌ Create duplicate utility classes
❌ Use CSS-in-JS libraries (styled-components, emotion)

## Common Patterns Summary

```tsx
// Section with gradient background
<section className="py-5 mb-5" style={{ 
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)',
  borderRadius: '1.5rem'
}}>

// Heading with brand color
<h1 className="fw-bold mb-4">
  <span style={{ color: '#2563EB' }}>DAKIA</span> Wiki Bot
</h1>

// Card grid
<div className="row g-4">
  <div className="col-md-4">
    <div className="card h-100 border-0 shadow-sm hover-lift">
      {/* Content */}
    </div>
  </div>
</div>

// Centered content with max-width
<div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
      {/* Centered content */}
    </div>
  </div>
</div>
```

## Admin CRUD Page Styling Patterns

### CRUD Page Header
```tsx
<div className="d-flex justify-content-between align-items-center mb-4">
  <h1>Quản lý Danh mục</h1>
  <button className="btn btn-primary">
    ➕ Tạo mới
  </button>
</div>
```

### Search Card
```tsx
<div className="card border-0 shadow-sm mb-4">
  <div className="card-body">
    <input
      type="text"
      className="form-control"
      placeholder="🔍 Tìm kiếm..."
    />
  </div>
</div>
```

### Item Card with Icon
```tsx
<div className="card border-0 shadow-sm h-100">
  <div className="card-body">
    {/* Icon + Title */}
    <div className="d-flex align-items-center mb-3">
      <div 
        className="me-3 d-flex align-items-center justify-content-center"
        style={{ 
          fontSize: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          backgroundColor: '#2563EB15',
        }}
      >
        📁
      </div>
      <div className="flex-grow-1">
        <h5 className="mb-0">Category Name</h5>
        <small className="text-muted">category-slug</small>
      </div>
      <span className="badge bg-success">Active</span>
    </div>
    
    {/* Description */}
    <p className="text-muted mb-3">
      Description text goes here
    </p>
    
    {/* Actions */}
    <div className="d-flex justify-content-between align-items-center">
      <div className="text-muted small">
        <span>Additional info</span>
      </div>
      <div className="btn-group btn-group-sm">
        <button className="btn btn-outline-primary">Sửa</button>
        <button className="btn btn-outline-danger">Xóa</button>
      </div>
    </div>
  </div>
</div>
```

### Modal Styling
```tsx
{/* Full screen overlay */}
<div 
  className="modal show d-block" 
  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
  onClick={closeModal}
>
  {/* Modal dialog */}
  <div 
    className="modal-dialog modal-dialog-centered"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Tạo mới</h5>
        <button 
          type="button" 
          className="btn-close"
          onClick={closeModal}
        />
      </div>
      
      <div className="modal-body">
        {/* Form fields */}
        <div className="mb-3">
          <label className="form-label">Tên *</label>
          <input type="text" className="form-control" required />
        </div>
      </div>
      
      <div className="modal-footer">
        <button className="btn btn-secondary">Hủy</button>
        <button className="btn btn-primary">Lưu</button>
      </div>
    </div>
  </div>
</div>
```

### Loading State Pattern
```tsx
{loading && (
  <div className="text-center py-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Đang tải...</span>
    </div>
  </div>
)}
```

### Empty State Pattern
```tsx
{!loading && items.length === 0 && (
  <div className="col-12">
    <div className="text-center py-5 text-muted">
      <h4>Chưa có dữ liệu</h4>
      <p>Nhấn "Tạo mới" để bắt đầu</p>
    </div>
  </div>
)}
```

### Error Alert Pattern
```tsx
{error && (
  <div className="alert alert-danger" role="alert">
    {error}
  </div>
)}
```

### Grid Layout for Items
```tsx
<div className="row g-4">
  {items.map((item) => (
    <div key={item.id} className="col-md-6 col-lg-4">
      <div className="card border-0 shadow-sm h-100">
        {/* Card content */}
      </div>
    </div>
  ))}
</div>
```

### Form Grid Layout
```tsx
{/* Two-column form layout */}
<div className="row">
  <div className="col-md-6 mb-3">
    <label className="form-label">Icon</label>
    <input type="text" className="form-control" />
  </div>
  
  <div className="col-md-6 mb-3">
    <label className="form-label">Color</label>
    <input type="color" className="form-control form-control-color" />
  </div>
</div>
```

### Badge Status Patterns
```tsx
{/* Success badge */}
<span className="badge bg-success px-3 py-2 rounded-pill">
  Đã xuất bản
</span>

{/* Secondary/Draft badge */}
<span className="badge bg-secondary px-3 py-2 rounded-pill">
  Nháp
</span>

{/* Custom colored badge */}
<span 
  className="badge px-3 py-2 rounded-pill"
  style={{
    background: 'rgba(37, 99, 235, 0.1)',
    color: '#2563EB',
    border: '1px solid rgba(37, 99, 235, 0.2)'
  }}
>
  Custom
</span>
```

## AI Agent Styling Guidelines

### DO's ✅

1. **Colors**
   - Use `#2563EB` for primary brand color
   - Use `#0F172A` for main text
   - Use `#475569` for secondary text
   - Use `#64748B` for muted text
   - Use defined semantic colors (#10B981, #EF4444, etc.)

2. **Layout**
   - Use Bootstrap 5 utility classes for spacing
   - Use responsive grid: `col-md-6 col-lg-4`
   - Apply `g-4` for consistent gaps
   - Use `shadow-sm` for cards
   - Apply `rounded-3` (1rem) for modern feel

3. **Typography**
   - Use `fw-bold` (700) for headings
   - Use `fw-semibold` (600) for subheadings
   - Use `fw-regular` (400) for body
   - Use `lead` class for intro text
   - Apply proper hierarchy (h1-h6)

4. **Components**
   - Add `hover-lift` for interactive cards
   - Use `rounded-pill` for buttons
   - Apply `btn-lg` for primary CTAs
   - Use inline styles for brand colors
   - Add proper focus states

5. **Accessibility**
   - Ensure color contrast ≥4.5:1
   - Add aria labels when needed
   - Use semantic HTML
   - Include visible focus states
   - Test with screen readers

### DON'Ts ❌

1. **Avoid**
   - Creating new CSS files or modules
   - Using !important unless necessary
   - Hardcoding spacing values
   - Inconsistent color usage
   - Missing responsive classes
   - Skipping accessibility

2. **Don't use**
   - CSS-in-JS libraries
   - Tailwind CSS classes
   - Custom CSS variables not defined
   - Colors not in the palette
   - Font sizes not in the scale
   - Shadow values not defined

## Component Patterns Summary

### Quick Reference
```tsx
// Hero Section
<section className="py-5 mb-5" style={{ 
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)',
  borderRadius: '1.5rem'
}}>
  <h1 className="display-1 fw-bold mb-4" style={{ color: '#0F172A' }}>
    <span style={{ color: '#2563EB' }}>DAKIA</span> Wiki Bot
  </h1>
</section>

// Card Grid
<div className="row g-4">
  <div className="col-md-6 col-lg-4">
    <div className="card border-0 shadow-sm rounded-3 hover-lift h-100">
      <div className="card-body p-4">
        <h3 className="h5 fw-semibold mb-3" style={{ color: '#0F172A' }}>
          Title
        </h3>
        <p style={{ color: '#475569' }}>Content</p>
      </div>
    </div>
  </div>
</div>

// Primary Button
<button className="btn btn-primary btn-lg rounded-pill px-5 fw-semibold">
  Action
</button>

// Badge
<span 
  className="badge px-3 py-2 rounded-pill"
  style={{
    background: 'rgba(37, 99, 235, 0.1)',
    color: '#2563EB',
    border: '1px solid rgba(37, 99, 235, 0.2)'
  }}
>
  Label
</span>
```

## Checklist

Before implementing new UI components:

- [ ] Uses AI Tech Blue color palette (#2563EB primary)
- [ ] Text colors: #0F172A (primary), #475569 (secondary), #64748B (muted)
- [ ] Bootstrap 5 spacing scale (0-7)
- [ ] Border radius minimum 0.5rem (rounded-3)
- [ ] Shadows: shadow-sm for cards
- [ ] Typography scale properly applied
- [ ] Hover states defined
- [ ] Focus states visible
- [ ] Responsive on all breakpoints
- [ ] Color contrast meets WCAG AA
- [ ] Consistent with existing components

---

**Last updated**: February 13, 2026  
**See also**: 
- `docs/STYLE-GUIDE.md` - Complete style guide
- `docs/theme/SKILL.md` - Theme & design tokens
