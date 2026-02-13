# Khắc phục lỗi "Cannot find module '@tailwindcss/postcss'"

**Ngày**: 13/02/2026  
**Loại**: Build Error / Dependency Issue  
**Mức độ**: Critical  

## Mô tả lỗi

Khi chạy lệnh `npm run dev` hoặc `npm run build`, gặp lỗi:

```
Error evaluating Node.js code
Error: Cannot find module '@tailwindcss/postcss'
```

## Nguyên nhân

Lỗi này xảy ra khi:

1. **Dependencies chưa được cài đặt**: Package `@tailwindcss/postcss` đã được khai báo trong `package.json` nhưng chưa được cài đặt vào `node_modules`
2. **Thư mục node_modules bị xóa**: Sau khi clone repository hoặc sau khi clean/delete `node_modules`
3. **Package-lock.json không đồng bộ**: Có sự khác biệt giữa package.json và package-lock.json

## Giải pháp

### Bước 1: Cài đặt dependencies

Chạy lệnh sau để cài đặt tất cả dependencies:

```bash
npm install
```

Hoặc nếu dùng Yarn:

```bash
yarn install
```

### Bước 2: Xác nhận cài đặt thành công

Kiểm tra xem `@tailwindcss/postcss` đã được cài đặt:

```bash
npm list @tailwindcss/postcss
```

Kết quả mong đợi:

```
dakia-wiki-bot@1.0.0
└── @tailwindcss/postcss@4.1.18
```

### Bước 3: Test build

Chạy build để đảm bảo không còn lỗi:

```bash
npm run build
```

### Bước 4: Chạy dev server

```bash
npm run dev
```

## Tại sao cần @tailwindcss/postcss?

### Next.js 16 với Turbopack

Next.js 16 sử dụng Turbopack làm bundler mặc định. Turbopack yêu cầu sử dụng plugin PostCSS mới của Tailwind CSS thay vì plugin cũ:

**❌ Cách cũ (không hoạt động với Turbopack):**
```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},  // ❌ Không tương thích với Turbopack
    autoprefixer: {},
  },
}
```

**✅ Cách mới (tương thích với Turbopack):**
```js
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},  // ✅ Plugin mới cho Next.js 16
    autoprefixer: {},
  },
}
```

### Dependencies trong package.json

```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "autoprefixer": "^10.4.24",
    "tailwindcss": "^4.1.18"
  }
}
```

## Lỗi thường gặp khác

### 1. Lỗi khi clone repository lần đầu

**Triệu chứng**: Lỗi ngay sau khi `git clone`

**Giải pháp**: Luôn chạy `npm install` sau khi clone:

```bash
git clone https://github.com/nguyenquy0710/dakia-wiki-bot.git
cd dakia-wiki-bot
npm install  # ← Bước quan trọng
```

### 2. Lỗi "Module not found" với package khác

**Giải pháp**: Xóa node_modules và cài đặt lại:

```bash
rm -rf node_modules package-lock.json
npm install
```

### 3. Lỗi cache của Next.js

**Giải pháp**: Xóa cache Next.js và rebuild:

```bash
rm -rf .next
npm run build
```

## Checklist troubleshooting

Nếu vẫn gặp lỗi, kiểm tra các bước sau:

- [ ] Đã chạy `npm install`?
- [ ] File `package.json` có `@tailwindcss/postcss` trong devDependencies?
- [ ] File `postcss.config.js` sử dụng `'@tailwindcss/postcss'` (có dấu ngoặc đơn)?
- [ ] Node.js version >= 18.x? (kiểm tra với `node --version`)
- [ ] npm version >= 8.x? (kiểm tra với `npm --version`)
- [ ] Thư mục `node_modules` tồn tại và chứa `@tailwindcss` folder?

## Version requirements

### Minimum versions

- **Node.js**: >= 18.17.0
- **npm**: >= 8.0.0
- **Next.js**: 16.1.6
- **Tailwind CSS**: 4.1.18
- **@tailwindcss/postcss**: 4.1.18

### Kiểm tra versions

```bash
node --version   # Should be >= 18.17.0
npm --version    # Should be >= 8.0.0
```

## Best practices

### 1. Luôn commit package-lock.json

File `package-lock.json` đảm bảo tất cả developers sử dụng cùng version dependencies:

```bash
git add package-lock.json
git commit -m "chore: update dependencies lock file"
```

### 2. Sử dụng .nvmrc

Tạo file `.nvmrc` để đảm bảo đúng Node.js version:

```bash
echo "18.17.0" > .nvmrc
```

Sau đó team members có thể chạy:

```bash
nvm use
```

### 3. CI/CD configuration

Trong GitHub Actions hoặc CI pipeline, luôn chạy `npm ci` thay vì `npm install`:

```yaml
# .github/workflows/ci.yml
- name: Install dependencies
  run: npm ci  # Faster và deterministic hơn npm install
```

## Tài liệu tham khảo

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 PostCSS Plugin](https://tailwindcss.com/docs/installation/using-postcss)
- [Next.js Turbopack](https://nextjs.org/docs/architecture/turbopack)

## Liên hệ hỗ trợ

Nếu vẫn gặp vấn đề sau khi làm theo hướng dẫn:

1. Mở issue trên GitHub repository
2. Cung cấp thông tin:
   - Output của `node --version`
   - Output của `npm --version`
   - Full error message
   - OS (Windows/Mac/Linux)
   - Các bước đã thử

---

**Tác giả**: DAKIA Tech Team  
**Cập nhật lần cuối**: 13/02/2026
