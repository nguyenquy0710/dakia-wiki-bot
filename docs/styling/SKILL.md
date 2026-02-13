# Styling Patterns & Conventions

## Purpose
This document defines styling patterns, CSS conventions, and component styling approaches used in DAKIA Wiki Bot.

## Styling Approach

### Priority Order
1. **Bootstrap 5 utility classes** - for standard spacing, layout, typography
2. **Inline styles** - for component-specific colors, gradients, and custom values
3. **CSS classes from globals.css** - for reusable utilities and animations
4. **CSS Modules** - NOT used in this project

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

### Standard Card
```tsx
<div className="card border-0 shadow-sm">
  <div className="card-body p-4">
    <h3 className="card-title">Title</h3>
    <p className="card-text">Content</p>
  </div>
</div>
```

### Card with Gradient Background
```tsx
<div className="card h-100 border-0 shadow-soft hover-lift" style={{ 
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
  borderLeft: '4px solid #2563EB'
}}>
  <div className="card-body p-4">
    {/* Content */}
  </div>
</div>
```

### Card with Hover Effect
```tsx
<div className="card border h-100 hover-lift">
  {/* Add hover-lift class for elevation on hover */}
</div>
```

## Button Styling Pattern

### Primary Button
```tsx
<button 
  className="btn btn-primary btn-lg px-5 py-3 fw-semibold"
  style={{ fontSize: '1rem', borderRadius: '0.75rem' }}
>
  Click Me
</button>
```

### Outline Button
```tsx
<button 
  className="btn btn-outline-primary btn-lg px-5 py-3 fw-semibold"
  style={{ fontSize: '1rem', borderRadius: '0.75rem' }}
>
  Secondary Action
</button>
```

### Button with Loading State
```tsx
<button 
  className="btn btn-primary btn-lg w-100 fw-semibold"
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status" />
      Loading...
    </>
  ) : (
    'Submit'
  )}
</button>
```

## Form Styling Pattern

### Input Field
```tsx
<div className="mb-3">
  <label htmlFor="email" className="form-label fw-semibold">
    Email
  </label>
  <input
    type="email"
    className="form-control form-control-lg"
    id="email"
    placeholder="email@example.com"
  />
</div>
```

### Form with Validation
```tsx
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label fw-semibold">
      Name <span className="text-danger">*</span>
    </label>
    <input
      type="text"
      className="form-control form-control-lg"
      required
    />
  </div>
</form>
```

## Badge Styling Pattern

```tsx
// Subtle badge with border
<span className="badge px-4 py-2 rounded-pill" style={{ 
  background: 'rgba(37, 99, 235, 0.1)',
  color: '#2563EB',
  fontWeight: 600,
  fontSize: '0.875rem',
  border: '1px solid rgba(37, 99, 235, 0.2)'
}}>
  Category
</span>

// Solid badge
<span className="badge bg-primary me-2">✓</span>
```

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
<span className="badge bg-success">Đã xuất bản</span>

{/* Secondary/Draft badge */}
<span className="badge bg-secondary">Nháp</span>

{/* Custom colored badge */}
<span 
  className="badge"
  style={{
    background: 'rgba(37, 99, 235, 0.1)',
    color: '#2563EB',
    border: '1px solid rgba(37, 99, 235, 0.2)'
  }}
>
  Custom
</span>
```
