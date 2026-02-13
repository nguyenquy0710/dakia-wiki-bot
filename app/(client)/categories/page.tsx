import { FC } from 'react';

const CategoriesPage: FC = () => {
  return (
    <div>
      {/* Header */}
      <section className="mb-5">
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-3" style={{ color: '#0F172A' }}>
            📂 Danh mục Wiki
          </h1>
          <p className="lead text-muted">
            Khám phá kiến thức theo danh mục
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <a href="/categories/technology" className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm hover-lift" style={{
              borderLeft: '4px solid #2563EB'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2.5rem' }}>💻</div>
                  <h3 className="h5 fw-bold mb-0" style={{ color: '#0F172A' }}>Công nghệ</h3>
                </div>
                <p className="text-muted mb-3">
                  Kiến thức về công nghệ, lập trình, và các công cụ phát triển
                </p>
                <div className="text-muted small">
                  <span className="me-3">📝 150 bài viết</span>
                  <span>👁️ 12,345 lượt xem</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href="/categories/process" className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm hover-lift" style={{
              borderLeft: '4px solid #06b6d4'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2.5rem' }}>⚙️</div>
                  <h3 className="h5 fw-bold mb-0" style={{ color: '#0F172A' }}>Quy trình</h3>
                </div>
                <p className="text-muted mb-3">
                  Quy trình làm việc, workflow và best practices
                </p>
                <div className="text-muted small">
                  <span className="me-3">📝 85 bài viết</span>
                  <span>👁️ 8,234 lượt xem</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href="/categories/guide" className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm hover-lift" style={{
              borderLeft: '4px solid #10b981'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2.5rem' }}>📖</div>
                  <h3 className="h5 fw-bold mb-0" style={{ color: '#0F172A' }}>Hướng dẫn</h3>
                </div>
                <p className="text-muted mb-3">
                  Hướng dẫn sử dụng các công cụ và dịch vụ
                </p>
                <div className="text-muted small">
                  <span className="me-3">📝 120 bài viết</span>
                  <span>👁️ 15,678 lượt xem</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href="/categories/sales" className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm hover-lift" style={{
              borderLeft: '4px solid #f59e0b'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2.5rem' }}>💼</div>
                  <h3 className="h5 fw-bold mb-0" style={{ color: '#0F172A' }}>Bán hàng</h3>
                </div>
                <p className="text-muted mb-3">
                  Kỹ năng bán hàng, chiến lược và case studies
                </p>
                <div className="text-muted small">
                  <span className="me-3">📝 95 bài viết</span>
                  <span>👁️ 9,876 lượt xem</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href="/categories/marketing" className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm hover-lift" style={{
              borderLeft: '4px solid #8b5cf6'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2.5rem' }}>📢</div>
                  <h3 className="h5 fw-bold mb-0" style={{ color: '#0F172A' }}>Marketing</h3>
                </div>
                <p className="text-muted mb-3">
                  Chiến lược marketing, content và analytics
                </p>
                <div className="text-muted small">
                  <span className="me-3">📝 78 bài viết</span>
                  <span>👁️ 7,543 lượt xem</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href="/categories/hr" className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm hover-lift" style={{
              borderLeft: '4px solid #ec4899'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2.5rem' }}>👥</div>
                  <h3 className="h5 fw-bold mb-0" style={{ color: '#0F172A' }}>Nhân sự</h3>
                </div>
                <p className="text-muted mb-3">
                  Chính sách nhân sự, onboarding và training
                </p>
                <div className="text-muted small">
                  <span className="me-3">📝 62 bài viết</span>
                  <span>👁️ 5,432 lượt xem</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Popular Tags */}
      <section className="mt-5">
        <h2 className="h4 fw-bold mb-4">🏷️ Tags phổ biến</h2>
        <div className="d-flex flex-wrap gap-2">
          <a href="/tags/ai" className="badge bg-light text-dark p-2 text-decoration-none">
            AI
          </a>
          <a href="/tags/automation" className="badge bg-light text-dark p-2 text-decoration-none">
            Automation
          </a>
          <a href="/tags/nodejs" className="badge bg-light text-dark p-2 text-decoration-none">
            Node.js
          </a>
          <a href="/tags/react" className="badge bg-light text-dark p-2 text-decoration-none">
            React
          </a>
          <a href="/tags/mongodb" className="badge bg-light text-dark p-2 text-decoration-none">
            MongoDB
          </a>
          <a href="/tags/api" className="badge bg-light text-dark p-2 text-decoration-none">
            API
          </a>
          <a href="/tags/security" className="badge bg-light text-dark p-2 text-decoration-none">
            Security
          </a>
          <a href="/tags/devops" className="badge bg-light text-dark p-2 text-decoration-none">
            DevOps
          </a>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
