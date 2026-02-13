import { FC } from 'react';

const AdminDashboard: FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
        <p className="mt-1 text-gray-600">Chào mừng đến với DAKIA Wiki Admin</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng bài viết</p>
              <h3 className="mt-2 text-3xl font-bold text-dark">524</h3>
              <p className="mt-2 flex items-center text-sm text-success">
                <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% so với tháng trước
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-3xl">
              📝
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Danh mục</p>
              <h3 className="mt-2 text-3xl font-bold text-dark">48</h3>
              <p className="mt-2 flex items-center text-sm text-success">
                <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                5% so với tháng trước
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-info/10 text-3xl">
              📂
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Người dùng</p>
              <h3 className="mt-2 text-3xl font-bold text-dark">156</h3>
              <p className="mt-2 flex items-center text-sm text-success">
                <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                8% so với tháng trước
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-3xl">
              👥
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lượt xem hôm nay</p>
              <h3 className="mt-2 text-3xl font-bold text-dark">2,341</h3>
              <p className="mt-2 flex items-center text-sm text-danger">
                <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                3% so với hôm qua
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warning/10 text-3xl">
              👁️
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Tables Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-dark">Hoạt động gần đây</h2>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xl">
                    📝
                  </div>
                  <div>
                    <p className="font-medium text-dark">Bài viết mới</p>
                    <p className="text-sm text-gray-600">"Hướng dẫn sử dụng API"</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">5 phút trước</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-info/10 text-xl">
                    ✏️
                  </div>
                  <div>
                    <p className="font-medium text-dark">Cập nhật bài viết</p>
                    <p className="text-sm text-gray-600">"Best Practices cho React"</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 giờ trước</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-xl">
                    👤
                  </div>
                  <div>
                    <p className="font-medium text-dark">Người dùng mới</p>
                    <p className="text-sm text-gray-600">nguyenvan@dakia.tech</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 giờ trước</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10 text-xl">
                    📂
                  </div>
                  <div>
                    <p className="font-medium text-dark">Danh mục mới</p>
                    <p className="text-sm text-gray-600">"DevOps & CI/CD"</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">3 giờ trước</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-dark">Bài viết phổ biến</h2>
            </div>
            <div className="divide-y divide-gray-100">
              <a href="#" className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50">
                <span className="font-medium text-gray-700">Hướng dẫn Next.js</span>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">1.2K</span>
              </a>
              <a href="#" className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50">
                <span className="font-medium text-gray-700">MongoDB Best Practices</span>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">987</span>
              </a>
              <a href="#" className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50">
                <span className="font-medium text-gray-700">TypeScript Guide</span>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">856</span>
              </a>
              <a href="#" className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50">
                <span className="font-medium text-gray-700">React Hooks</span>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">743</span>
              </a>
              <a href="#" className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50">
                <span className="font-medium text-gray-700">API Security</span>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">621</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
