# App Folder - Next.js App Router

## Purpose
This folder contains all Next.js App Router pages, layouts, and route handlers following Next.js 16+ conventions.

## Folder Structure

```
app/
├── (client)/        # Public-facing pages (route group)
├── admin/           # Admin panel pages (protected)
├── auth/            # Authentication pages (login, register)
├── api/             # API route handlers
├── layout.tsx       # Root layout (includes SessionProvider)
├── providers.tsx    # Client providers wrapper
└── globals.css      # Global styles
```

## Coding Patterns

### File Naming
- **Pages**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx` (Next.js convention)
- **API Routes**: `route.ts` (Next.js convention)
- **Components**: PascalCase (e.g., `AdminSidebar.tsx`)

### Server Components (Default)
```typescript
// app/some-page/page.tsx
import { FC } from 'react';

const SomePage: FC = () => {
  // Can fetch data directly, no useState/useEffect
  return <div>Server rendered</div>;
};

export default SomePage;
```

### Client Components
```typescript
'use client';  // Required directive at top

import { FC, useState } from 'react';

const InteractiveComponent: FC = () => {
  const [state, setState] = useState('');
  return <div onClick={() => setState('clicked')}>{state}</div>;
};

export default InteractiveComponent;
```

### Layout Pattern
```typescript
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <nav>Navigation</nav>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
```

## Styling

### Priority Order
1. **Bootstrap 5 classes** for layout and standard elements
2. **Inline styles** for colors, gradients, component-specific values
3. **CSS classes** from globals.css for animations and utilities

### Example
```tsx
<div className="container py-5">
  <div className="card border-0 shadow-sm" style={{
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
    borderRadius: '1rem'
  }}>
    <h1 className="fw-bold" style={{ color: '#2563EB' }}>
      Title
    </h1>
  </div>
</div>
```

## Route Groups

### (client) - Public Pages
- No authentication required
- Server components for SEO
- Examples: homepage, wiki pages, categories

### admin - Protected Pages  
- Authentication required via middleware
- Mix of server and client components
- Examples: dashboard, article management

### auth - Authentication Pages
- Login, register pages
- Client components for form handling
- Redirect after successful auth

### api - API Routes
- RESTful endpoints
- Always connect to DB first
- Proper error handling

## DO's ✅

- Use server components by default
- Add `'use client'` only when needed (hooks, browser APIs)
- Keep layouts as server components when possible
- Extract interactive parts to separate client components
- Use Bootstrap utilities for spacing and layout
- Use inline styles for brand colors and gradients
- Follow Next.js file conventions (page.tsx, layout.tsx, route.ts)
- Import shared constants from `@/lib/constants`

## DON'Ts ❌

- Don't make entire layouts client components unnecessarily
- Don't use CSS modules (use inline styles + Bootstrap)
- Don't skip error boundaries
- Don't forget loading states for async operations
- Don't hardcode routes (use ROUTES constants)
- Don't mix authentication logic in components (use middleware)

## Related Documentation

See `/docs/` folder for comprehensive guidelines:
- `/docs/architecture/SKILL.md` - Overall architecture
- `/docs/styling/SKILL.md` - Styling conventions
- `/docs/coding-conventions/SKILL.md` - TypeScript patterns
