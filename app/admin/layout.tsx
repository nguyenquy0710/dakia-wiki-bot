'use client';

import { FC, ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/auth/login');
  };

  if (status === 'loading') {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex">
      {/* Sidebar */}
      <aside className="bg-dark text-white" style={{ width: '250px' }}>
        <div className="p-4">
          <h4 className="fw-bold mb-4">
            <span style={{ color: '#2563EB' }}>DAKIA</span> Admin
          </h4>
          
          {/* User Info */}
          {session?.user && (
            <div className="mb-4 pb-3 border-bottom border-secondary">
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" 
                     style={{ width: '40px', height: '40px', fontSize: '1.25rem' }}>
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="ms-2 flex-grow-1" style={{ overflow: 'hidden' }}>
                  <div className="fw-semibold text-truncate" style={{ fontSize: '0.9rem' }}>
                    {session.user.name}
                  </div>
                  <small className="text-muted text-truncate d-block" style={{ fontSize: '0.75rem' }}>
                    {session.user.email}
                  </small>
                </div>
              </div>
            </div>
          )}

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
              <li className="nav-item mt-4 pt-3 border-top border-secondary">
                <button 
                  className="nav-link text-white btn btn-link text-start w-100 p-0"
                  onClick={handleLogout}
                >
                  🚪 Đăng xuất
                </button>
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
