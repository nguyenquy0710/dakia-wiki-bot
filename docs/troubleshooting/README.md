# Troubleshooting Guide - DAKIA Wiki Bot

Hướng dẫn khắc phục các lỗi thường gặp khi phát triển DAKIA Wiki Bot.

## 📋 Mục lục

### Build & Dependency Errors

1. **[Cannot find module '@tailwindcss/postcss'](tailwindcss-postcss-error.md)**
   - Lỗi xảy ra khi chạy `npm run dev` hoặc `npm run build`
   - Nguyên nhân: Dependencies chưa được cài đặt
   - Giải pháp: Chạy `npm install`

### Database Errors

_(Sẽ bổ sung)_

### Authentication Errors

_(Sẽ bổ sung)_

## 🚨 Lỗi phổ biến

### 1. Module Not Found Errors

**Triệu chứng**:
```
Error: Cannot find module 'package-name'
```

**Giải pháp**:
```bash
# Cài đặt lại dependencies
npm install

# Nếu vẫn lỗi, xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### 2. Build Errors với Next.js

**Triệu chứng**:
```
Build error occurred
Error: ...
```

**Giải pháp**:
```bash
# Xóa cache Next.js
rm -rf .next

# Rebuild
npm run build
```

### 3. Port Already in Use

**Triệu chứng**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Giải pháp**:
```bash
# Tìm process đang chạy trên port 3000
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)

# Hoặc chạy trên port khác
PORT=3001 npm run dev
```

### 4. MongoDB Connection Errors

**Triệu chứng**:
```
MongooseError: Connection failed
```

**Giải pháp**:
1. Kiểm tra MongoDB có đang chạy không:
   ```bash
   # Linux/Mac
   systemctl status mongod
   
   # Windows - kiểm tra Services
   ```

2. Kiểm tra connection string trong `.env.local`:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/dakia-wiki-bot
   ```

3. Test connection:
   ```bash
   # Sử dụng mongosh
   mongosh "mongodb://localhost:27017/dakia-wiki-bot"
   ```

### 5. TypeScript Errors

**Triệu chứng**:
```
Type error: ...
```

**Giải pháp**:
```bash
# Chạy type check
npm run type-check

# Rebuild TypeScript declarations
rm -rf node_modules/@types
npm install
```

## 🔍 Debug Tips

### 1. Kiểm tra Environment Variables

```bash
# Đảm bảo file .env.local tồn tại
ls -la .env*

# Xem nội dung (cẩn thận với secrets!)
cat .env.local
```

### 2. Kiểm tra Node.js & npm Versions

```bash
node --version  # Nên >= 18.17.0
npm --version   # Nên >= 8.0.0
```

### 3. Xem Build Logs Chi Tiết

```bash
# Development với verbose logging
DEBUG=* npm run dev

# Build với verbose
npm run build --verbose
```

### 4. Kiểm tra Package Versions

```bash
# Xem dependencies tree
npm list --depth=0

# Kiểm tra outdated packages
npm outdated
```

## 📞 Nhận Hỗ trợ

Nếu vẫn gặp vấn đề:

1. **Kiểm tra Issues hiện có**: https://github.com/nguyenquy0710/dakia-wiki-bot/issues
2. **Tạo Issue mới** với thông tin:
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Operating System
   - Full error message
   - Các bước đã thử

## 🔗 Liên kết hữu ích

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Cập nhật lần cuối**: 13/02/2026
