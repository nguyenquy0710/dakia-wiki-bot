import { FC, ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xác thực - DAKIA Wiki Bot',
  description: 'Đăng nhập hoặc đăng ký vào hệ thống quản trị DAKIA Wiki Bot',
};

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default AuthLayout;
