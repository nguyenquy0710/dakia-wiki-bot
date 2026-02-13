'use client';

import { FC, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

interface NavItem {
  title: string;
  icon: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', icon: '📊', href: ROUTES.ADMIN_DASHBOARD },
  { title: 'Bài viết', icon: '📝', href: ROUTES.ADMIN_ARTICLES },
  { title: 'Danh mục', icon: '📂', href: ROUTES.ADMIN_CATEGORIES },
  { title: 'Người dùng', icon: '👥', href: ROUTES.ADMIN_USERS },
];

interface NewAdminSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const NewAdminSidebar: FC<NewAdminSidebarProps> = ({ isOpen, onClose }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(ROUTES.LOGIN);
  };

  const handleNavClick = (href: string) => {
    router.push(href);
    if (onClose) onClose();
  };

  if (status === 'loading') {
    return (
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[290px] border-r border-gray-200 bg-white transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full items-center justify-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[290px] border-r border-gray-200 bg-white transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-full flex-col py-6 px-4">
          {/* Logo */}
          <div className="mb-6 px-2">
            <button
              onClick={() => handleNavClick(ROUTES.ADMIN_DASHBOARD)}
              className="flex items-center gap-2 text-left w-full"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-info text-white text-xl font-bold">
                D
              </div>
              <div>
                <h1 className="text-xl font-bold text-dark">
                  <span className="text-primary">DAKIA</span> Wiki
                </h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </button>
          </div>

          {/* User Info */}
          {session?.user && (
            <div className="mb-6 rounded-lg bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-info text-white text-sm font-semibold">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-semibold text-dark truncate">
                    {session.user.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {session.user.email}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className="mb-4">
              <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Menu
              </h2>
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto rounded-full bg-danger px-2 py-0.5 text-xs text-white">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Other Links */}
            <div className="border-t border-gray-200 pt-4">
              <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Khác
              </h2>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => handleNavClick(ROUTES.HOME)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
                  >
                    <span className="text-lg">🏠</span>
                    <span>Về trang chủ</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-danger transition-all hover:bg-red-50"
                  >
                    <span className="text-lg">🚪</span>
                    <span>Đăng xuất</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <p className="text-center text-xs text-gray-500">
              © 2026 DAKIA Tech
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default NewAdminSidebar;
