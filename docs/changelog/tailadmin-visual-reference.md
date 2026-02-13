# TailAdmin Theme - Visual Code Reference

## 🎨 TailAdmin Sidebar Component

### Key Features Implemented

```tsx
// app/admin/components/TailAdminSidebar.tsx

// 1. Responsive Sidebar with State Management
const TailAdminSidebar: FC<TailAdminSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  // Mobile responsive classes
  return (
    <aside className={`
      absolute left-0 top-0 z-9999 
      flex h-screen w-72.5 flex-col 
      overflow-y-hidden bg-black 
      duration-300 ease-linear 
      dark:bg-boxdark 
      lg:static lg:translate-x-0 
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {/* Sidebar content */}
    </aside>
  );
};
```

### Visual Structure

```
┌─────────────────────────────┐
│  DAKIA Admin (Logo)    [X]  │  ← Header with close button
├─────────────────────────────┤
│  ┌──┐                       │
│  │ A │ Admin User           │  ← User profile section
│  └──┘ admin@dakia.tech      │
├─────────────────────────────┤
│  MENU                       │
│                             │
│  ■ Dashboard     (active)   │  ← Navigation menu
│  □ Bài viết                 │
│  □ Danh mục                 │
│  □ Người dùng               │
│  ─────────────────          │
│  □ Về trang chủ             │
│  □ Đăng xuất                │
└─────────────────────────────┘
```

## 📊 TailAdmin Dashboard Layout

### Stats Cards Grid

```tsx
// 4-column responsive grid
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
  {/* Card 1 - Total Articles */}
  <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default">
    <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2">
      {/* SVG Icon */}
    </div>
    <div className="mt-4">
      <h4 className="text-title-md font-bold text-black">524</h4>
      <span className="text-sm font-medium">Tổng bài viết</span>
    </div>
  </div>
  
  {/* Cards 2, 3, 4 ... */}
</div>
```

### Layout Visualization

```
┌─────────────────────────────────────────────────────────────┐
│  Trang Quản Trị                           Admin User [A]    │  ← Header
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Dashboard                                                   │  ← Page Title
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │  [👁]   │  │  [🛒]   │  │  [👥]   │  │  [📊]   │       │  ← Stats Cards
│  │   524   │  │    48   │  │   156   │  │  2,341  │       │
│  │ Articles │  │Categories│  │  Users  │  │  Views  │       │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│                                                              │
│  ┌─────────────────────────────────┐  ┌────────────────┐   │
│  │ Hoạt động gần đây              │  │ Bài viết       │   │
│  ├─────────────────────────────────┤  │ phổ biến       │   │
│  │ Loại | Nội dung | Thời gian    │  ├────────────────┤   │
│  ├─────────────────────────────────┤  │ Next.js  1.2K  │   │
│  │ Bài viết mới | API | 5 phút    │  │ MongoDB   987  │   │
│  │ Cập nhật | React | 1 giờ       │  │ TypeScript 856 │   │
│  └─────────────────────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 TailAdmin Color System

### Primary Palette
```css
/* TailAdmin Colors */
primary: #3C50E0      /* Main blue */
black: #1C2434        /* Dark text */
boxdark: #24303F      /* Dark background */
strokedark: #2E3A47   /* Dark borders */
bodydark: #AEB7C0     /* Muted text */
graydark: #333A48     /* Hover states */

/* Semantic Colors */
meta-3: #10B981       /* Success green */
meta-6: #FFBA00       /* Warning yellow */
meta-7: #FF6766       /* Danger red */
```

### Usage Examples
```tsx
// Background colors
bg-black              // Sidebar background
bg-white              // Card backgrounds
bg-boxdark           // Dark mode backgrounds
bg-meta-2            // Icon backgrounds

// Text colors
text-black           // Headings
text-bodydark1       // Menu items
text-meta-3          // Success messages

// Border colors
border-stroke        // Light borders
border-strokedark    // Dark mode borders
```

## 📱 Responsive Breakpoints

```tsx
// Tailwind breakpoints used in TailAdmin

// Mobile first (default)
className="col-span-12"  // Full width

// Tablet (md: 768px)
className="md:col-span-6"  // Half width

// Desktop (xl: 1280px)
className="xl:col-span-4"  // Third width

// Example grid
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
  {/* Cards */}
</div>
```

## 🔧 Custom Spacing Scale

```tsx
// Extended Tailwind spacing
w-72.5     // 290px - Sidebar width
py-5.5     // 22px - Vertical padding
px-7.5     // 30px - Horizontal padding
gap-7.5    // 30px - Grid gap
h-11.5     // 46px - Icon container
```

## 🎨 Component Patterns

### Card Component
```tsx
<div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark">
  <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
    Card Title
  </h4>
  {/* Card content */}
</div>
```

### Button Pattern
```tsx
<button className="flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
  {/* Icon */}
  Button Text
</button>
```

### Table Header
```tsx
<div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
  <div className="p-2.5 xl:p-5">
    <h5 className="text-sm font-medium uppercase xsm:text-base">
      Header
    </h5>
  </div>
</div>
```

## 🌙 Dark Mode Support

```tsx
// Dark mode variants
className="bg-white dark:bg-boxdark"           // Backgrounds
className="text-black dark:text-white"         // Text
className="border-stroke dark:border-strokedark" // Borders
className="shadow-default dark:drop-shadow-none"  // Shadows
```

## 📐 Typography Scale

```tsx
// Title sizes
text-title-xxl   // 44px/55px
text-title-xl    // 36px/45px
text-title-lg    // 28px/35px
text-title-md    // 24px/30px
text-title-md2   // 26px/30px
text-title-sm    // 20px/26px
text-title-xsm   // 18px/24px

// Font weights
font-semibold    // 600
font-bold        // 700
font-medium      // 500
```

## ⚡ Animations

```tsx
// Transition classes
duration-300        // 300ms transition
ease-in-out        // Smooth easing
delay-[0]          // No delay

// Example usage
className="transform duration-300 ease-in-out hover:translate-y-[-4px]"
```

## 🎯 Best Practices Implemented

### 1. Mobile-First Design
```tsx
// Start with mobile, add larger breakpoints
className="w-full md:w-1/2 xl:w-1/4"
```

### 2. Consistent Spacing
```tsx
// Use Tailwind scale
className="p-4 md:p-6 2xl:p-10"  // Padding
className="gap-4 md:gap-6 xl:gap-7.5"  // Grid gaps
```

### 3. Semantic HTML
```tsx
<nav>      // Navigation
<main>     // Main content
<aside>    // Sidebar
<header>   // Page header
```

### 4. Accessibility
```tsx
aria-controls="sidebar"      // For screen readers
role="status"               // Loading indicators
className="visually-hidden" // Hidden text for SR
```

## 📊 Component Hierarchy

```
AdminLayout (Client Component)
├── TailAdminSidebar (Mobile responsive)
│   ├── Logo/Brand
│   ├── User Profile
│   └── Navigation Menu
│       ├── Dashboard
│       ├── Articles
│       ├── Categories
│       └── Users
│
└── ContentArea
    ├── TailAdminHeader
    │   ├── Hamburger Menu (Mobile)
    │   ├── Page Title
    │   └── User Avatar
    │
    └── Main Content
        └── {children} (Dashboard, etc.)
```

## ✨ Key Improvements Over Bootstrap

1. **Utility-first CSS** - Faster development
2. **Better dark mode** - Built-in support
3. **Smaller bundle** - Tree-shaking
4. **Modern design** - Professional look
5. **Responsive by default** - Mobile-first
6. **Better customization** - Tailwind config

## 🚀 Performance Benefits

- **Purged CSS**: Only used classes in production
- **JIT Mode**: Just-in-time compilation
- **Optimized**: Minified and compressed
- **Tree-shaking**: Unused code removed
- **Caching**: Better browser caching

---

**Result:** A modern, professional admin interface that maintains functionality while providing enhanced user experience and visual appeal.
