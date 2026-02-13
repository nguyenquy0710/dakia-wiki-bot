# DAKIA Wiki Bot - Setup Guide

Hướng dẫn cài đặt và chạy ứng dụng DAKIA Wiki Bot.

## Yêu cầu hệ thống

- Node.js 18+ hoặc mới hơn
- npm hoặc yarn
- MongoDB (local hoặc cloud như MongoDB Atlas)

## Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/nguyenquy0710/dakia-wiki-bot.git
cd dakia-wiki-bot
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env.local` từ file mẫu:

```bash
cp .env.example .env.local
```

Sau đó chỉnh sửa `.env.local` với thông tin cơ sở dữ liệu của bạn:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dakia-wiki-bot
# hoặc dùng MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dakia-wiki-bot

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000

# JWT Secret
JWT_SECRET=your-jwt-secret-key-here-change-in-production
```

**Lưu ý**: Thay đổi các giá trị secret trước khi deploy lên production!

### 4. Chạy ứng dụng

#### Development mode

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:3000

#### Production mode

```bash
# Build ứng dụng
npm run build

# Chạy production server
npm start
```

## Cấu trúc ứng dụng

### Client (Trang công khai)

- **Trang chủ**: http://localhost:3000
- **Danh sách bài viết**: http://localhost:3000/wiki
- **Danh mục**: http://localhost:3000/categories

### Admin (Quản trị)

- **Dashboard**: http://localhost:3000/admin/dashboard
- **Quản lý bài viết**: http://localhost:3000/admin/articles
- **Quản lý danh mục**: http://localhost:3000/admin/categories

### API

- **Health check**: http://localhost:3000/api/health
- **Articles**: http://localhost:3000/api/articles
- **Categories**: http://localhost:3000/api/categories
- **Users**: http://localhost:3000/api/users

## Scripts có sẵn

```bash
# Chạy development server
npm run dev

# Build ứng dụng cho production
npm run build

# Chạy production server
npm start

# Kiểm tra lỗi TypeScript
npm run type-check

# Chạy linter
npm run lint
```

## Kiến trúc

### Công nghệ sử dụng

- **Framework**: Next.js 16+ với App Router
- **Language**: TypeScript
- **Database**: MongoDB với Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Bootstrap 5 + Custom CSS
- **Markdown**: unified, remark, rehype

### Thư mục

```
dakia-wiki-bot/
├── app/                    # Next.js App Router
│   ├── (client)/          # Client pages (public)
│   │   ├── page.tsx       # Homepage
│   │   ├── wiki/          # Wiki articles listing
│   │   └── categories/    # Categories page
│   ├── (admin)/           # Admin pages (protected)
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── articles/      # Article management
│   │   └── categories/    # Category management
│   ├── api/               # API routes
│   │   ├── health/        # Health check
│   │   ├── articles/      # Articles API
│   │   ├── categories/    # Categories API
│   │   └── users/         # Users API
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── lib/                   # Utility functions
│   ├── db/               # Database utilities
│   │   └── mongoose.ts   # MongoDB connection
│   ├── markdown/         # Markdown processing
│   │   └── converter.ts  # Markdown to HTML
│   └── auth/             # Authentication
│       └── password.ts   # Password hashing
├── models/                # MongoDB models
│   ├── User.ts
│   ├── WikiArticle.ts
│   └── WikiCategory.ts
├── types/                 # TypeScript types
│   └── models.ts
├── content/               # Wiki content (optional)
└── public/                # Static assets
```

## Phát triển tiếp

Các tính năng đang được phát triển:

### Phase 1 - MVP (Hoàn thành)
- ✅ Cấu trúc cơ bản
- ✅ Database models
- ✅ UI cơ bản
- ✅ API routes placeholders

### Phase 2 - Core Features (Sắp tới)
- ⏳ Database integration
- ⏳ Authentication system
- ⏳ CRUD operations
- ⏳ Search functionality

### Phase 3 - Advanced Features (Tương lai)
- AI-powered search
- Real-time collaboration
- Version comparison
- Analytics & reporting

## Troubleshooting

### Lỗi kết nối MongoDB

Nếu gặp lỗi kết nối MongoDB:

1. Kiểm tra MongoDB có đang chạy không
2. Kiểm tra `MONGODB_URI` trong `.env.local`
3. Nếu dùng MongoDB Atlas, kiểm tra IP whitelist

### Lỗi build

Nếu build fail:

```bash
# Xóa cache và node_modules
rm -rf .next node_modules
npm install
npm run build
```

### Lỗi dependencies

Nếu gặp lỗi dependencies:

```bash
# Xóa package-lock.json và node_modules
rm -rf package-lock.json node_modules
npm install
```

## Đóng góp

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - xem file [LICENSE](LICENSE)
