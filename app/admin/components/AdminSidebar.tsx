'use client';

import { FC } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

const AdminSidebar: FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(ROUTES.LOGIN);
  };

  if (status === 'loading') {
    return (
      <aside className="bg-dark text-white" style={{ width: '250px' }}>
        <div className="p-4 d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </aside>
    );
  }

  return (
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
  );
};

export default AdminSidebar;
