import { FC } from 'react';

const AdminDashboard: FC = () => {
  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted mb-2">Tổng bài viết</h6>
              <h2 className="mb-0 fw-bold" style={{ color: '#2563EB' }}>524</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted mb-2">Danh mục</h6>
              <h2 className="mb-0 fw-bold" style={{ color: '#06b6d4' }}>48</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted mb-2">Người dùng</h6>
              <h2 className="mb-0 fw-bold" style={{ color: '#10b981' }}>156</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted mb-2">Lượt xem hôm nay</h6>
              <h2 className="mb-0 fw-bold" style={{ color: '#f59e0b' }}>2,341</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row g-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Hoạt động gần đây</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Bài viết mới:</strong> "Hướng dẫn sử dụng API"
                    </div>
                    <small className="text-muted">5 phút trước</small>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Cập nhật:</strong> "Best Practices cho React"
                    </div>
                    <small className="text-muted">1 giờ trước</small>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Người dùng mới:</strong> nguyenvan@dakia.tech
                    </div>
                    <small className="text-muted">2 giờ trước</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Bài viết phổ biến</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex justify-content-between">
                    <span>Hướng dẫn Next.js</span>
                    <span className="badge bg-primary">1.2K</span>
                  </div>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex justify-content-between">
                    <span>MongoDB Best Practices</span>
                    <span className="badge bg-primary">987</span>
                  </div>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex justify-content-between">
                    <span>TypeScript Guide</span>
                    <span className="badge bg-primary">856</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
