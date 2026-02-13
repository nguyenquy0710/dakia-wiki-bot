import { FC, ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex">
      {/* Sidebar */}
      <aside className="bg-dark text-white" style={{ width: '250px' }}>
        <div className="p-4">
          <h4 className="fw-bold mb-4">
            <span style={{ color: '#2563EB' }}>DAKIA</span> Admin
          </h4>
          <nav>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a className="nav-link text-white" href="/admin/dashboard">
                  📊 Dashboard
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-white" href="/admin/articles">
                  📝 Bài viết
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-white" href="/admin/categories">
                  📂 Danh mục
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-white" href="/admin/users">
                  👥 Người dùng
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-white" href="/">
                  🏠 Về trang chủ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 bg-light">
        <div className="container-fluid p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
