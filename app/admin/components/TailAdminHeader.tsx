'use client';

import { FC } from 'react';
import { useSession } from 'next-auth/react';

interface TailAdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const TailAdminHeader: FC<TailAdminHeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* Hamburger Toggle BTN */}
        </div>

        <div className="hidden sm:block">
          <h1 className="text-title-md2 font-semibold text-black dark:text-white">
            Trang Quản Trị
          </h1>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* User Area */}
          <div className="flex items-center gap-4">
            {session?.user && (
              <>
                <span className="hidden text-right lg:block">
                  <span className="block text-sm font-medium text-black dark:text-white">
                    {session.user.name}
                  </span>
                  <span className="block text-xs">{session.user.email}</span>
                </span>

                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </>
            )}
          </div>
          {/* User Area */}
        </div>
      </div>
    </header>
  );
};

export default TailAdminHeader;
