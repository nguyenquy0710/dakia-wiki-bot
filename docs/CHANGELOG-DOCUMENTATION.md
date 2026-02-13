# Documentation Update Changelog

## 📅 Date: February 13, 2026

## 🎯 Purpose
This document tracks the major documentation updates made to reflect the latest coding patterns, conventions, and best practices in the DAKIA Wiki Bot project.

## 🔄 What Changed

### 1. ⚠️ CRITICAL: Next.js 16 Breaking Changes

#### Dynamic Route Params are Now Async

**Before (Next.js 15 and earlier):**
```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }  // ❌ OLD
) {
  const { id } = params;  // Direct access
}
```

**After (Next.js 16):**
```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // ✅ NEW
) {
  const { id } = await params;  // ✅ Must await!
}
```

**Impact:**
- All dynamic API routes (`app/api/*/[id]/route.ts`) must be updated
- Build will fail if not updated
- Applies to GET, POST, PUT, DELETE methods

**Files Updated:**
- `docs/coding-conventions/SKILL.md` - Added complete examples
- `.github/copilot-instructions.md` - Added warning section

---

### 2. 🇻🇳 Vietnamese Slug Generation Pattern

Added proper Vietnamese text to URL-slug conversion pattern.

**Key Discovery:**
- Replace `đ/Đ` characters **BEFORE** `normalize('NFD')`
- Otherwise normalization doesn't work correctly

**Implementation:**
```typescript
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/đ/g, 'd')      // ✅ Do this FIRST
    .replace(/Đ/g, 'd')      // ✅ Do this FIRST
    .normalize('NFD')        // Then normalize
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
```

**Examples:**
- "Công nghệ" → `cong-nghe` ✅
- "Đào tạo" → `dao-tao` ✅
- "Lập trình" → `lap-trinh` ✅

**Files Updated:**
- `docs/coding-conventions/SKILL.md` - Added function with explanation
- `.github/copilot-instructions.md` - Added examples

---

### 3. 🎨 Admin Theme Patterns (NextAdmin Approach)

Added comprehensive documentation for modern admin interface patterns.

#### New Patterns Documented:

**A. Card Grid Layout**
- Modern card-based design for CRUD pages
- Icon with colored background (15% opacity)
- Responsive grid: `col-md-6 col-lg-4`
- Shadow effects: `border-0 shadow-sm`

**B. Modal Component**
- Full-screen overlay with backdrop
- Centered dialog
- Proper click-through prevention
- Standard header/body/footer structure

**C. State Management Patterns**
- Loading state with spinner
- Error state with alert
- Empty state with helpful message
- Search bar in elevated card

**D. Status Badges**
- Published: `badge bg-success`
- Draft: `badge bg-secondary`
- Custom: Colored with opacity

**Files Updated:**
- `docs/theme/SKILL.md` - Added all patterns
- `docs/styling/SKILL.md` - Added styling examples
- `.github/copilot-instructions.md` - Added quick reference

---

### 4. 📋 Complete CRUD Page Pattern

Added full-featured CRUD component template.

**Key Features:**
- State management with proper types
- `useCallback` for performance optimization
- Search functionality
- Modal for create/edit
- Proper loading/error/empty states
- Vietnamese UI text

**Pattern Includes:**
```typescript
'use client';

import { FC, useState, useCallback, useEffect } from 'react';

const AdminCRUDPage: FC = () => {
  // ✅ State management
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // ✅ useCallback for fetch
  const fetchItems = useCallback(async () => {
    // Implementation
  }, [searchQuery]);
  
  // ✅ Effect with proper dependencies
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);
  
  // Handlers and render...
};
```

**Files Updated:**
- `docs/coding-conventions/SKILL.md` - Full example
- `.github/copilot-instructions.md` - Simplified version

---

### 5. 🚀 Performance Optimization Patterns

#### useCallback Pattern
```typescript
// ✅ Good - Prevents infinite loops
const fetchData = useCallback(async () => {
  // Fetch logic
}, [searchQuery]);

useEffect(() => {
  fetchData();
}, [fetchData]);  // Safe dependency
```

#### Debounced Search
```typescript
const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery);
  }, 500);
  
  return () => clearTimeout(timer);
}, [searchQuery]);
```

**Files Updated:**
- `docs/coding-conventions/SKILL.md` - Added optimization section

---

### 6. 📚 Technology Stack Updates

Updated to reflect current implementation:

**Before:**
- Framework: Next.js (generic)
- Styling: CSS Modules / Tailwind / Styled Components
- State: Context API / Zustand
- Form Validation: zod / yup

**After:**
- Framework: **Next.js 16** (App Router)
- Styling: **Bootstrap 5 + Inline Styles**
- State: **React Hooks** (useState, useCallback, useEffect)
- Form Validation: **HTML5 + TypeScript**

**Files Updated:**
- `.github/copilot-instructions.md` - Technology stack section

---

## 📊 Documentation Statistics

### Lines Added/Updated:
- `docs/coding-conventions/SKILL.md`: **+870 lines**
- `docs/theme/SKILL.md`: **+150 lines**
- `docs/styling/SKILL.md`: **+200 lines**
- `.github/copilot-instructions.md`: **+300 lines**

**Total: ~1,520 lines of new documentation**

### New Patterns Documented:
- ✅ Next.js 16 async params (CRITICAL)
- ✅ Vietnamese slug generation
- ✅ Complete CRUD page pattern
- ✅ Admin theme patterns
- ✅ Modal component pattern
- ✅ Loading/Error/Empty states
- ✅ useCallback optimization
- ✅ Debounced search
- ✅ Search bar styling
- ✅ Status badges
- ✅ Icon with colored background

---

## 🎯 Key Takeaways for Developers

### For API Development:
1. **Always await params in dynamic routes** (Next.js 16 requirement)
2. Use Vietnamese error messages for user-facing errors
3. Validate ObjectId with `isValidObjectId()` before queries
4. Include proper error handling with try-catch
5. Return appropriate HTTP status codes

### For Admin UI Development:
1. Use the **card grid pattern** for list views
2. Use **modals** for create/edit forms
3. Always include **loading, error, and empty states**
4. Use **useCallback** for fetch functions
5. Follow the **Vietnamese slug generation** pattern
6. Use **Bootstrap 5** utilities + inline styles for colors

### For Code Quality:
1. Write code in **English**, UI text in **Vietnamese**
2. Use **TypeScript** for all files
3. Prefer **functional components** with hooks
4. Use **server components** by default
5. Only use `'use client'` when necessary

---

## 📖 Where to Find Documentation

### Quick Reference:
- **API Patterns**: `docs/coding-conventions/SKILL.md` (lines 253-520)
- **Theme/Colors**: `docs/theme/SKILL.md`
- **Styling**: `docs/styling/SKILL.md`
- **Main Guide**: `.github/copilot-instructions.md`

### Specific Topics:
- Next.js 16 async params: `docs/coding-conventions/SKILL.md` line 297
- Vietnamese slug: `docs/coding-conventions/SKILL.md` line 463
- CRUD pattern: `docs/coding-conventions/SKILL.md` line 562
- Admin theme: `docs/theme/SKILL.md` line 230
- Modal pattern: `docs/styling/SKILL.md` line 440

---

## 🔍 Real-World Examples

All patterns documented are based on the actual implementation in:
- `app/admin/categories/page.tsx` - Complete CRUD example
- `app/api/categories/route.ts` - Basic API routes
- `app/api/categories/[id]/route.ts` - Dynamic routes with Next.js 16

These files serve as reference implementations for the documented patterns.

---

## 🚨 Breaking Changes Alert

### Immediate Action Required:

If you're working on dynamic API routes, update them to use async params:

```typescript
// ❌ Will break in Next.js 16
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
}

// ✅ Correct for Next.js 16
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
}
```

---

## ✅ Verification Checklist

Before implementing new features, verify:

- [ ] Using Next.js 16 async params pattern for dynamic routes
- [ ] Vietnamese slug generation uses correct order (đ/Đ before NFD)
- [ ] CRUD pages include all state patterns (loading/error/empty)
- [ ] useCallback wraps fetch functions
- [ ] Vietnamese text for UI, English for code
- [ ] Bootstrap 5 + inline styles (not CSS modules)
- [ ] Proper TypeScript types everywhere
- [ ] Error messages in Vietnamese

---

## 📞 Questions?

If you're unsure about any pattern, refer to:
1. The documentation files mentioned above
2. The reference implementation in `app/admin/categories/`
3. The SKILL.md files in each code folder

---

**Last Updated:** February 13, 2026  
**Updated By:** GitHub Copilot Agent  
**Reason:** Reflect latest project patterns and Next.js 16 migration
