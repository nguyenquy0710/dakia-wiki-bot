# DAKIA Wiki Bot - Documentation

📚 Comprehensive documentation for AI agents and developers working on DAKIA Wiki Bot.

## Purpose

This documentation is specifically designed for **agentic AI systems** to understand and maintain consistent patterns across the codebase. Each SKILL.md file contains detailed patterns, conventions, and best practices.

## Documentation Structure

### 📝 [changelog/](./changelog/)
**Update Logs & Changelogs**
- Documentation updates
- Feature changes
- Style guide updates
- Breaking changes
- Migration guides

All changelog files documenting project updates are stored here.

### 📁 [theme/](./theme/SKILL.md)
**Theme & Design System**
- Color palette (AI Tech Blue theme)
- Design tokens (spacing, radius, shadows)
- Typography (fonts, sizes, weights)
- Gradients and visual effects
- Glassmorphism patterns
- Component-specific colors

**Key Colors:**
- Primary: `#2563EB` (Blue 600)
- Accent: `#06B6D4` (Cyan 500)
- Success: `#10b981` (Green 500)
- Neutral: Gray scale from `#f8fafc` to `#0f172a`

### 🎨 [styling/](./styling/SKILL.md)
**Styling Patterns & Conventions**
- Bootstrap 5 usage
- Inline styles pattern
- Card styling
- Button patterns
- Form styling
- Animation classes
- Responsive patterns
- Glassmorphism

**Approach:**
1. Bootstrap 5 utilities first
2. Inline styles for colors/gradients
3. CSS classes from globals.css
4. NO CSS Modules

### 💻 [coding-conventions/](./coding-conventions/SKILL.md)
**TypeScript & React Conventions**
- File naming (PascalCase, camelCase, kebab-case)
- Interface naming (`I` prefix for models)
- Component structure (functional with hooks)
- Server vs Client components
- Import/export patterns
- State management
- Error handling
- Form handling

**Key Rules:**
- Code in English, UI in Vietnamese
- TypeScript for all files
- Functional components only
- Server components by default

### 🏗️ [architecture/](./architecture/SKILL.md)
**Project Architecture**
- Next.js 16 App Router structure
- Folder organization
- Server vs Client components
- Route patterns
- API route conventions
- Database integration
- Environment variables
- Build & deployment

**Tech Stack:**
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- MongoDB + Mongoose
- NextAuth.js 4
- Bootstrap 5

### 🔐 [authentication/](./authentication/SKILL.md)
**Authentication & Security**
- NextAuth.js configuration
- Credentials provider pattern
- JWT sessions
- Password security (bcrypt)
- Route protection (middleware)
- Type augmentation
- Session management
- Registration flow

**Security:**
- bcrypt hashing (10+ rounds)
- JWT sessions
- Middleware protection
- Input validation
- Generic error messages

### 💾 [database/](./database/SKILL.md)
**MongoDB & Mongoose Patterns**
- Connection pattern
- Model definition
- Schema patterns
- CRUD operations
- Query operators
- Validation
- Middleware (hooks)
- Aggregation
- Pagination

**Critical Pattern:**
```typescript
const Model = mongoose.models.ModelName || 
              mongoose.model('ModelName', schema);
```

## Quick Reference

### For AI Agents

When working on DAKIA Wiki Bot:

1. **Read relevant SKILL.md** before making changes
2. **Follow established patterns** exactly
3. **Use constants** from `lib/constants.ts`
4. **Maintain consistency** with existing code
5. **Write code in English**, UI text in Vietnamese

### Common Patterns

#### Component
```typescript
import { FC } from 'react';

interface ComponentProps {
  title: string;
}

const Component: FC<ComponentProps> = ({ title }) => {
  return <div>{title}</div>;
};

export default Component;
```

#### API Route
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    // Logic
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Message' }, { status: 500 });
  }
}
```

#### Styling
```tsx
<div className="card border-0 shadow-sm" style={{
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
  borderRadius: '1rem'
}}>
  <div className="card-body p-4">
    <h3 className="fw-bold mb-3">
      <span style={{ color: '#2563EB' }}>Title</span>
    </h3>
  </div>
</div>
```

## Validation

Before submitting code, verify:

- [ ] Follows patterns in relevant SKILL.md
- [ ] TypeScript types defined
- [ ] Error handling in place
- [ ] Vietnamese UI text
- [ ] English code/comments
- [ ] Consistent naming
- [ ] Bootstrap + inline styles
- [ ] Server components where possible
- [ ] Database connection called
- [ ] Security best practices

## Updates

These SKILL.md files are living documents. When patterns change:

1. Update the relevant SKILL.md
2. Ensure all code follows new pattern
3. Document the reasoning
4. Update this README if needed

## Contributing

When adding new patterns:

1. Document in appropriate SKILL.md
2. Include code examples
3. Explain when to use
4. Add to DO/DON'T sections
5. Update Quick Reference if major

## Version

- **Project**: DAKIA Wiki Bot v1.0
- **Docs Version**: 1.0.0
- **Last Updated**: 2026-02-13
- **Next.js**: 16.1.6
- **React**: 19.2.4
- **TypeScript**: 5.9.3

---

📝 **Note for AI Agents**: Each SKILL.md file is self-contained with complete patterns and examples. Read the entire file before making changes in that area.

🎯 **Goal**: Maintain consistency, quality, and best practices across the entire codebase.
