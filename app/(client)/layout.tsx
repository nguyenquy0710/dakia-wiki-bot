import { FC, ReactNode } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            <span style={{ color: '#2563EB' }}>DAKIA</span> Wiki Bot
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Trang chủ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/wiki">Wiki</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/categories">Danh mục</a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-primary text-white ms-2 px-3" href="/admin/dashboard">
                  Admin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container py-4">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-light py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-0 text-muted">
            © {new Date().getFullYear()} DAKIA Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;
