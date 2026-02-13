import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-5 mb-5 fade-in" style={{ 
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '1.5rem'
      }}>
        <div className="container">
          <div className="mb-4">
            <span className="badge px-4 py-2 rounded-pill mb-3" style={{ 
              background: 'rgba(37, 99, 235, 0.1)',
              color: '#2563EB',
              fontWeight: 600,
              fontSize: '0.875rem',
              border: '1px solid rgba(37, 99, 235, 0.2)'
            }}>
              Nền tảng quản lý kiến thức
            </span>
          </div>
          <h1 className="fw-bold mb-4" style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: '1.1',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            color: '#0F172A'
          }}>
            DAKIA Wiki Bot
          </h1>
          <p className="mb-4" style={{ 
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            fontWeight: 500,
            color: '#475569'
          }}>
            Quản lý và Tra cứu Kiến thức Nội bộ
          </p>
          <p className="mb-5 px-md-5 mx-auto" style={{ 
            maxWidth: '700px', 
            fontSize: '1.125rem', 
            lineHeight: '1.8',
            color: '#64748B'
          }}>
            Nền tảng quản lý và tra cứu wiki thông minh cho DAKIA Tech, được thiết kế để lưu trữ, 
            tổ chức và chia sẻ kiến thức nội bộ một cách hiệu quả.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <a 
              href="/wiki" 
              className="btn btn-primary btn-lg px-5 py-3 fw-semibold"
              style={{ fontSize: '1rem', borderRadius: '0.75rem' }}
            >
              Khám phá Wiki
            </a>
            <a 
              href="/categories" 
              className="btn btn-outline-primary btn-lg px-5 py-3 fw-semibold"
              style={{ fontSize: '1rem', borderRadius: '0.75rem' }}
            >
              Danh mục
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-5 py-4">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="card border h-100">
              <div className="card-body p-4">
                <div className="fw-bold mb-2" style={{ fontSize: '3rem', color: '#2563EB' }}>500+</div>
                <p className="mb-0" style={{ color: '#64748B', fontSize: '1rem' }}>Bài viết Wiki</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border h-100">
              <div className="card-body p-4">
                <div className="fw-bold mb-2" style={{ fontSize: '3rem', color: '#2563EB' }}>50+</div>
                <p className="mb-0" style={{ color: '#64748B', fontSize: '1rem' }}>Danh mục</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border h-100">
              <div className="card-body p-4">
                <div className="fw-bold mb-2" style={{ fontSize: '3rem', color: '#2563EB' }}>100+</div>
                <p className="mb-0" style={{ color: '#64748B', fontSize: '1rem' }}>Người dùng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-5 py-5 fade-in-up">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem', color: '#0F172A' }}>Tính năng nổi bật</h2>
          <p className="lead" style={{ color: '#64748B' }}>Quản lý và chia sẻ kiến thức hiệu quả</p>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border">
              <div className="card-body p-5 text-center">
                <div className="mb-4" style={{ fontSize: '3rem' }}>📚</div>
                <h3 className="h5 fw-semibold mb-3" style={{ color: '#0F172A' }}>Quản lý Wiki</h3>
                <p className="mb-0" style={{ color: '#64748B' }}>
                  Tạo, chỉnh sửa và quản lý bài viết wiki dễ dàng với trình soạn thảo Markdown
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border">
              <div className="card-body p-5 text-center">
                <div className="mb-4" style={{ fontSize: '3rem' }}>🔍</div>
                <h3 className="h5 fw-semibold mb-3" style={{ color: '#0F172A' }}>Tìm kiếm thông minh</h3>
                <p className="mb-0" style={{ color: '#64748B' }}>
                  Tìm kiếm nhanh chóng và chính xác thông tin cần thiết
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border">
              <div className="card-body p-5 text-center">
                <div className="mb-4" style={{ fontSize: '3rem' }}>📊</div>
                <h3 className="h5 fw-semibold mb-3" style={{ color: '#0F172A' }}>Phân loại danh mục</h3>
                <p className="mb-0" style={{ color: '#64748B' }}>
                  Tổ chức nội dung theo danh mục và thẻ tag để dễ dàng quản lý
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Areas */}
      <section className="mb-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">🚀 Khả năng của Wiki Bot</h2>
          <p className="text-muted lead">Công cụ mạnh mẽ cho quản lý kiến thức</p>
        </div>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-soft hover-lift" style={{ 
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
              borderLeft: '4px solid #2563EB'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2.5rem' }}>✍️</div>
                  <h3 className="card-title h5 fw-bold mb-0">Markdown Editor</h3>
                </div>
                <ul className="list-unstyled ms-5">
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-primary me-2">✓</span>
                    Soạn thảo Markdown dễ dàng
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-primary me-2">✓</span>
                    Hỗ trợ syntax highlighting
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-primary me-2">✓</span>
                    Preview real-time
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-soft hover-lift" style={{ 
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(8, 145, 178, 0.05) 100%)',
              borderLeft: '4px solid #06b6d4'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2.5rem' }}>🔄</div>
                  <h3 className="card-title h5 fw-bold mb-0">Version Control</h3>
                </div>
                <ul className="list-unstyled ms-5">
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-info me-2">✓</span>
                    Lưu trữ lịch sử thay đổi
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-info me-2">✓</span>
                    Khôi phục phiên bản cũ
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-info me-2">✓</span>
                    So sánh thay đổi
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-soft hover-lift" style={{ 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
              borderLeft: '4px solid #10b981'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2.5rem' }}>🔐</div>
                  <h3 className="card-title h5 fw-bold mb-0">Quản lý Quyền truy cập</h3>
                </div>
                <ul className="list-unstyled ms-5">
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-success me-2">✓</span>
                    Phân quyền admin và user
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-success me-2">✓</span>
                    Bảo mật thông tin
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-success me-2">✓</span>
                    Kiểm soát truy cập
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-soft hover-lift" style={{ 
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%)',
              borderLeft: '4px solid #f59e0b'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2.5rem' }}>📈</div>
                  <h3 className="card-title h5 fw-bold mb-0">Thống kê và Báo cáo</h3>
                </div>
                <ul className="list-unstyled ms-5">
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-warning text-dark me-2">✓</span>
                    Theo dõi lượt xem
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-warning text-dark me-2">✓</span>
                    Phân tích xu hướng
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span className="badge bg-warning text-dark me-2">✓</span>
                    Báo cáo tổng quan
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-5 mb-4">
        <div className="card border-0 shadow-xl rounded-xl overflow-hidden">
          <div className="card-body p-5 hero-gradient text-white">
            <h2 className="display-5 fw-bold mb-3">Bắt đầu sử dụng Wiki Bot</h2>
            <p className="lead mb-4">Quản lý kiến thức nội bộ một cách chuyên nghiệp</p>
            <a 
              href="/wiki" 
              className="btn btn-light btn-lg px-5 py-3 fw-semibold rounded-pill shadow-lg hover-lift"
            >
              📚 Khám phá ngay
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
