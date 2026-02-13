import { FC } from 'react';

const WikiPage: FC = () => {
  return (
    <div>
      {/* Header */}
      <section className="mb-5">
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-3" style={{ color: '#0F172A' }}>
            📚 Wiki Articles
          </h1>
          <p className="lead text-muted">
            Khám phá kho kiến thức nội bộ của DAKIA Tech
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="🔍 Tìm kiếm bài viết..."
                />
              </div>
              <div className="col-md-4">
                <select className="form-select form-select-lg">
                  <option value="">Tất cả danh mục</option>
                  <option value="tech">Công nghệ</option>
                  <option value="process">Quy trình</option>
                  <option value="guide">Hướng dẫn</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mb-5">
        <h2 className="h4 fw-bold mb-4">⭐ Bài viết nổi bật</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-start mb-3">
                  <span className="badge bg-primary me-2">Công nghệ</span>
                  <span className="badge bg-info">Mới</span>
                </div>
                <h3 className="h5 fw-bold mb-3">
                  <a href="/wiki/getting-started" className="text-decoration-none text-dark">
                    Hướng dẫn bắt đầu với DAKIA Wiki Bot
                  </a>
                </h3>
                <p className="text-muted mb-3">
                  Tìm hiểu cách sử dụng nền tảng Wiki Bot để quản lý và chia sẻ kiến thức nội bộ...
                </p>
                <div className="d-flex align-items-center text-muted small">
                  <span className="me-3">👁️ 1,234 lượt xem</span>
                  <span>❤️ 89 lượt thích</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-start mb-3">
                  <span className="badge bg-success me-2">Quy trình</span>
                </div>
                <h3 className="h5 fw-bold mb-3">
                  <a href="/wiki/best-practices" className="text-decoration-none text-dark">
                    Best Practices khi viết Wiki
                  </a>
                </h3>
                <p className="text-muted mb-3">
                  Những nguyên tắc và phương pháp hay nhất khi tạo và quản lý nội dung wiki...
                </p>
                <div className="d-flex align-items-center text-muted small">
                  <span className="me-3">👁️ 987 lượt xem</span>
                  <span>❤️ 65 lượt thích</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="mb-5">
        <h2 className="h4 fw-bold mb-4">📝 Bài viết gần đây</h2>
        <div className="card border-0 shadow-sm">
          <div className="list-group list-group-flush">
            <a href="/wiki/article-1" className="list-group-item list-group-item-action p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-2">Cách sử dụng Markdown trong Wiki Bot</h5>
                  <p className="mb-2 text-muted">
                    Hướng dẫn chi tiết về cách sử dụng Markdown để tạo nội dung wiki...
                  </p>
                  <div className="d-flex gap-2">
                    <span className="badge bg-light text-dark">Hướng dẫn</span>
                    <span className="badge bg-light text-dark">Markdown</span>
                  </div>
                </div>
                <div className="text-end text-muted small">
                  <div>2 giờ trước</div>
                </div>
              </div>
            </a>
            <a href="/wiki/article-2" className="list-group-item list-group-item-action p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-2">Quản lý phiên bản trong Wiki</h5>
                  <p className="mb-2 text-muted">
                    Tìm hiểu về hệ thống quản lý phiên bản và cách khôi phục nội dung...
                  </p>
                  <div className="d-flex gap-2">
                    <span className="badge bg-light text-dark">Công nghệ</span>
                    <span className="badge bg-light text-dark">Version Control</span>
                  </div>
                </div>
                <div className="text-end text-muted small">
                  <div>5 giờ trước</div>
                </div>
              </div>
            </a>
            <a href="/wiki/article-3" className="list-group-item list-group-item-action p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-2">Tổ chức danh mục hiệu quả</h5>
                  <p className="mb-2 text-muted">
                    Cách tạo và quản lý danh mục để tổ chức kiến thức một cách khoa học...
                  </p>
                  <div className="d-flex gap-2">
                    <span className="badge bg-light text-dark">Quy trình</span>
                    <span className="badge bg-light text-dark">Tổ chức</span>
                  </div>
                </div>
                <div className="text-end text-muted small">
                  <div>1 ngày trước</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <span className="page-link">Trước</span>
          </li>
          <li className="page-item active">
            <span className="page-link">1</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="?page=2">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="?page=3">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="?page=2">Sau</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default WikiPage;
