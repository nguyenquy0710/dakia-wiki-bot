import { FC } from 'react';

const AdminArticlesPage: FC = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Quản lý Bài viết</h1>
        <a href="/admin/articles/new" className="btn btn-primary">
          ➕ Tạo bài viết mới
        </a>
      </div>

      {/* Search and Filter */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Tìm kiếm bài viết..."
              />
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option value="">Tất cả danh mục</option>
                <option value="tech">Công nghệ</option>
                <option value="process">Quy trình</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option value="">Tất cả trạng thái</option>
                <option value="published">Đã xuất bản</option>
                <option value="draft">Nháp</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th>Tiêu đề</th>
                <th>Danh mục</th>
                <th>Tác giả</th>
                <th>Lượt xem</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Hướng dẫn sử dụng Next.js</strong>
                  <br />
                  <small className="text-muted">Cập nhật: 2 giờ trước</small>
                </td>
                <td>
                  <span className="badge bg-primary">Công nghệ</span>
                </td>
                <td>Admin</td>
                <td>1,234</td>
                <td>
                  <span className="badge bg-success">Đã xuất bản</span>
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <a href="#" className="btn btn-outline-primary">Sửa</a>
                    <button className="btn btn-outline-danger">Xóa</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminArticlesPage;
