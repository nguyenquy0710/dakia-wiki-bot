# App/Admin Folder - Admin Panel Pages

## Purpose
Protected admin pages for managing wiki content, users, and system settings.

## Authentication
All routes under `/admin/*` are protected by middleware. Users must be authenticated via NextAuth.js.

## Pattern

### Server Component (Layout)
```typescript
// app/admin/layout.tsx
import { FC, ReactNode } from 'react';
import AdminSidebar from './components/AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="d-flex min-vh-100">
      <AdminSidebar />  {/* Client component */}
      <main className="flex-grow-1 bg-light">
        <div className="container-fluid p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
```

### Client Component Pattern
```typescript
'use client';

import { FC } from 'react';
import { useSession } from 'next-auth/react';

const AdminPage: FC = () => {
  const { data: session } = useSession();
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.name}</p>
    </div>
  );
};

export default AdminPage;
```

## Styling

Admin pages use:
- Bootstrap 5 for layout
- Inline styles for brand colors
- Consistent card-based layouts

```tsx
<div className="row g-4">
  <div className="col-md-3">
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h6 className="text-muted mb-2">Tổng bài viết</h6>
        <h2 className="mb-0 fw-bold" style={{ color: '#2563EB' }}>524</h2>
      </div>
    </div>
  </div>
</div>
```

## Components Organization

```
admin/
├── components/
│   └── AdminSidebar.tsx    # Shared admin components
├── dashboard/
│   └── page.tsx            # Dashboard page
├── articles/
│   └── page.tsx            # Article management
├── categories/
│   └── page.tsx            # Category management
└── layout.tsx              # Admin layout wrapper
```

## DO's ✅

- Keep layouts as server components
- Use client components for interactive UI
- Check authentication in components
- Use session data for user info
- Maintain consistent styling
- Use Bootstrap grid system
- Show loading states

## DON'Ts ❌

- Don't make entire layout client component
- Don't skip authentication checks
- Don't hardcode user data
- Don't forget error handling
- Don't mix styling approaches
