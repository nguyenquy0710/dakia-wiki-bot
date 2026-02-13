import { FC } from 'react';

const AdminCategoriesPage: FC = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Quản lý Danh mục</h1>
        <button className="btn btn-primary">
          ➕ Tạo danh mục mới
        </button>
      </div>

      {/* Categories Grid */}
      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="me-3" style={{ fontSize: '2rem' }}>💻</div>
                <div>
                  <h5 className="mb-0">Công nghệ</h5>
                  <small className="text-muted">technology</small>
                </div>
              </div>
              <p className="text-muted mb-3">
                Kiến thức về công nghệ, lập trình, và các công cụ phát triển
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted small">
                  <span className="me-3">📝 150 bài viết</span>
                </div>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-primary">Sửa</button>
                  <button className="btn btn-outline-danger">Xóa</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
