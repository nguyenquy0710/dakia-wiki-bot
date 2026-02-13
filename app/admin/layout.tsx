import { FC, ReactNode } from 'react';
import AdminSidebar from './components/AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex">
      {/* Sidebar */}
      <AdminSidebar />

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
