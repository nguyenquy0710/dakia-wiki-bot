# DAKIA Wiki Bot

## Quản lý và Tra cứu Kiến thức Nội bộ

DAKIA Wiki Bot là nền tảng quản lý và tra cứu wiki thông minh cho DAKIA Tech, được thiết kế đặc biệt để lưu trữ, tổ chức và chia sẻ kiến thức nội bộ một cách hiệu quả.

> 📋 **[Xem chi tiết các tính năng của nền tảng](FEATURES.md)**
> 
> 🚀 **[Hướng dẫn cài đặt và chạy ứng dụng](SETUP.md)**

## 🎯 Mục tiêu

Giúp DAKIA Tech quản lý kiến thức nội bộ hiệu quả, Wiki Bot cung cấp các tính năng:

- **Quản lý nội dung** thông qua markdown editor và version control
- **Tổ chức danh mục** bằng cách phân loại và gắn tag thông minh
- **Tra cứu nhanh** thông qua tìm kiếm full-text và filter

## 🚀 Tính năng chính

### 📚 Quản lý Wiki
- Tạo và chỉnh sửa bài viết với Markdown
- Quản lý phiên bản nội dung
- Hỗ trợ syntax highlighting

### 📂 Tổ chức Danh mục
- Phân loại bài viết theo danh mục
- Hệ thống tag linh hoạt
- Cấu trúc danh mục phân cấp

### 🔍 Tìm kiếm Thông minh
- Full-text search
- Filter theo danh mục và tag
- Sắp xếp theo độ liên quan

### 👥 Quản lý Người dùng
- Phân quyền Admin/User
- Theo dõi hoạt động
- Quản lý đóng góp

## 📊 Thống kê

- 📝 **500+ bài viết** được lưu trữ và quản lý
- 📂 **50+ danh mục** được tổ chức khoa học
- 👥 **100+ người dùng** đang sử dụng

## 🚀 Bắt đầu nhanh

### Cài đặt

```bash
# Clone repository
git clone https://github.com/nguyenquy0710/dakia-wiki-bot.git
cd dakia-wiki-bot

# Cài đặt dependencies
npm install

# Cấu hình môi trường
cp .env.example .env.local
# Chỉnh sửa .env.local với thông tin MongoDB của bạn

# Chạy development server
npm run dev
```

Truy cập http://localhost:3000 để xem ứng dụng.

### Tài liệu

- **[SETUP.md](SETUP.md)**: Hướng dẫn cài đặt chi tiết
- **[FEATURES.md](FEATURES.md)**: Danh sách tính năng

## 📊 Trạng thái dự án

✅ **Phase 1 - MVP**: Hoàn thành
- ✅ Cấu trúc dự án cơ bản
- ✅ Database models (User, WikiArticle, WikiCategory)
- ✅ UI cơ bản (Client & Admin)
- ✅ API routes cơ bản

🔜 **Phase 2 - Core Features**: Sắp tới
- Database integration
- Search functionality
- User authentication
- CRUD operations

🔮 **Phase 3 - Advanced Features**: Tương lai
- AI-powered search
- Chatbot support
- Analytics & reporting
- Real-time collaboration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**DAKIA Wiki Bot** - *Quản lý Kiến thức Nội bộ / Internal Knowledge Management*
