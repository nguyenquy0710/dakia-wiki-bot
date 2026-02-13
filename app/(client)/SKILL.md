# App/(client) Folder - Public Pages

## Purpose
Public-facing pages accessible without authentication. This is a route group (parentheses prevent '/client' in URL).

## Pattern

Use server components for SEO and performance:

```typescript
// app/(client)/page.tsx
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-5" style={{ 
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)',
        minHeight: '600px',
        borderRadius: '1.5rem'
      }}>
        <div className="container">
          <h1 className="fw-bold mb-4" style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: '#0F172A'
          }}>
            DAKIA Wiki Bot
          </h1>
          {/* Content */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
```

## Layout Pattern

```typescript
// app/(client)/layout.tsx
import { FC, ReactNode } from 'react';

const ClientLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        {/* Navigation */}
      </nav>
      
      <main className="flex-grow-1">
        <div className="container py-4">
          {children}
        </div>
      </main>
      
      <footer className="bg-light py-4 mt-auto">
        {/* Footer */}
      </footer>
    </div>
  );
};

export default ClientLayout;
```

## Styling Pattern

### Hero Section
```tsx
<section className="text-center py-5 mb-5 fade-in" style={{ 
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)',
  minHeight: '600px',
  borderRadius: '1.5rem'
}}>
```

### Cards Grid
```tsx
<div className="row g-4">
  <div className="col-md-4">
    <div className="card h-100 border-0 shadow-soft hover-lift">
      <div className="card-body p-5 text-center">
        <div className="mb-4" style={{ fontSize: '3rem' }}>📚</div>
        <h3 className="h5 fw-semibold mb-3">Title</h3>
        <p className="mb-0 text-muted">Description</p>
      </div>
    </div>
  </div>
</div>
```

### Brand Colors
```tsx
<span style={{ color: '#2563EB' }}>DAKIA</span>
```

## DO's ✅

- Use server components (no 'use client')
- Optimize for SEO
- Use responsive design
- Follow brand colors
- Use Bootstrap grid
- Add loading states
- Use semantic HTML

## DON'Ts ❌

- Don't make pages client components unnecessarily
- Don't skip responsive breakpoints
- Don't hardcode content that should be dynamic
- Don't forget accessibility
