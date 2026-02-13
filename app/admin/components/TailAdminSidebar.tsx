'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => React.ReactNode;
  activeCondition: boolean;
}

const SidebarLinkGroup: FC<SidebarLinkGroupProps> = ({
  children,
  activeCondition,
}) => {
  const [open, setOpen] = useState<boolean>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <>{children(handleClick, open)}</>;
};

interface TailAdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const TailAdminSidebar: FC<TailAdminSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const sidebar = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(ROUTES.LOGIN);
  };

  if (status === 'loading') {
    return (
      <aside
        ref={sidebar}
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href={ROUTES.ADMIN_DASHBOARD}>
          <h2 className="text-2xl font-bold text-white">
            <span className="text-primary">DAKIA</span> Admin
          </h2>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* SIDEBAR HEADER */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* User Info */}
          {session?.user && (
            <div className="mb-6 flex items-center gap-3.5 rounded-sm border border-stroke px-4 py-3 dark:border-strokedark">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <span className="text-xl font-semibold">
                  {session.user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold text-white">
                  {session.user.name}
                </p>
                <p className="truncate text-xs text-bodydark">
                  {session.user.email}
                </p>
              </div>
            </div>
          )}

          {/* Menu Group */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Menu Item Dashboard */}
              <li>
                <Link
                  href={ROUTES.ADMIN_DASHBOARD}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === ROUTES.ADMIN_DASHBOARD &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                      fill=""
                    />
                  </svg>
                  Dashboard
                </Link>
              </li>

              {/* Menu Item Articles */}
              <li>
                <Link
                  href={ROUTES.ADMIN_ARTICLES}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/admin/articles') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                      fill=""
                    />
                  </svg>
                  Bài viết
                </Link>
              </li>

              {/* Menu Item Categories */}
              <li>
                <Link
                  href={ROUTES.ADMIN_CATEGORIES}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/admin/categories') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1999 0.899902H1.7999C1.29365 0.899902 0.899902 1.29365 0.899902 1.7999V3.5999C0.899902 4.10615 1.29365 4.4999 1.7999 4.4999H16.1999C16.7062 4.4999 17.0999 4.10615 17.0999 3.5999V1.7999C17.0999 1.29365 16.7062 0.899902 16.1999 0.899902ZM15.7999 3.1999H2.1999V2.1999H15.7999V3.1999Z"
                      fill=""
                    />
                    <path
                      d="M16.1999 6.89941H1.7999C1.29365 6.89941 0.899902 7.29316 0.899902 7.79941V9.59941C0.899902 10.1057 1.29365 10.4994 1.7999 10.4994H16.1999C16.7062 10.4994 17.0999 10.1057 17.0999 9.59941V7.79941C17.0999 7.29316 16.7062 6.89941 16.1999 6.89941ZM15.7999 9.19941H2.1999V8.19941H15.7999V9.19941Z"
                      fill=""
                    />
                    <path
                      d="M16.1999 12.8994H1.7999C1.29365 12.8994 0.899902 13.2932 0.899902 13.7994V15.5994C0.899902 16.1057 1.29365 16.4994 1.7999 16.4994H16.1999C16.7062 16.4994 17.0999 16.1057 17.0999 15.5994V13.7994C17.0999 13.2932 16.7062 12.8994 16.1999 12.8994ZM15.7999 15.1994H2.1999V14.1994H15.7999V15.1994Z"
                      fill=""
                    />
                  </svg>
                  Danh mục
                </Link>
              </li>

              {/* Menu Item Users */}
              <li>
                <Link
                  href={ROUTES.ADMIN_USERS}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/admin/users') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 0.787598C7.19395 0.787598 5.7002 2.2251 5.7002 3.9876C5.7002 5.7501 7.1377 7.1876 9.0002 7.1876C10.8627 7.1876 12.3002 5.7501 12.3002 3.9876C12.3002 2.2251 10.8065 0.787598 9.0002 0.787598ZM9.0002 5.9251C7.81895 5.9251 6.9627 5.0126 6.9627 3.9876C6.9627 2.9626 7.8752 2.0501 9.0002 2.0501C10.1252 2.0501 11.0377 2.9626 11.0377 3.9876C11.0377 5.0126 10.1815 5.9251 9.0002 5.9251Z"
                      fill=""
                    />
                    <path
                      d="M15.1877 16.3501H2.8127C2.39395 16.3501 2.0627 15.9626 2.0627 15.6001C2.0627 12.6001 4.4377 10.2251 7.4377 10.2251H10.5627C13.5627 10.2251 15.9377 12.6001 15.9377 15.6001C15.9377 15.9626 15.6065 16.3501 15.1877 16.3501ZM3.38145 15.0876H14.6502C14.3752 12.9376 12.6565 11.4876 10.5627 11.4876H7.4377C5.34395 11.4876 3.6252 12.9376 3.38145 15.0876Z"
                      fill=""
                    />
                  </svg>
                  Người dùng
                </Link>
              </li>

              {/* Divider */}
              <li className="my-2 border-t border-stroke dark:border-strokedark"></li>

              {/* Menu Item Home */}
              <li>
                <Link
                  href={ROUTES.HOME}
                  className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                      fill=""
                    />
                  </svg>
                  Về trang chủ
                </Link>
              </li>

              {/* Menu Item Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="group relative flex w-full items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7 8.4H5.5C5.1 8.4 4.8 8.7 4.8 9.1C4.8 9.5 5.1 9.8 5.5 9.8H13.7L11.6 11.9C11.3 12.2 11.3 12.7 11.6 13C11.8 13.2 12 13.3 12.2 13.3C12.4 13.3 12.7 13.2 12.8 13L16.2 9.6C16.5 9.3 16.5 8.8 16.2 8.5L12.8 5.1C12.5 4.8 12 4.8 11.7 5.1C11.4 5.4 11.4 5.9 11.7 6.2L13.7 8.4Z"
                      fill=""
                    />
                    <path
                      d="M11.8 14.4C11.4 14.4 11.1 14.7 11.1 15.1V16.3C11.1 16.6 10.9 16.8 10.6 16.8H2.5C2.2 16.8 2 16.6 2 16.3V1.7C2 1.4 2.2 1.2 2.5 1.2H10.6C10.9 1.2 11.1 1.4 11.1 1.7V2.9C11.1 3.3 11.4 3.6 11.8 3.6C12.2 3.6 12.5 3.3 12.5 2.9V1.7C12.5 0.7 11.7 0 10.7 0H2.5C1.5 0 0.7 0.8 0.7 1.8V16.4C0.7 17.4 1.5 18.2 2.5 18.2H10.6C11.6 18.2 12.4 17.4 12.4 16.4V15.2C12.5 14.7 12.2 14.4 11.8 14.4Z"
                      fill=""
                    />
                  </svg>
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </nav>
        {/* Sidebar Menu */}
      </div>
    </aside>
  );
};

export default TailAdminSidebar;
