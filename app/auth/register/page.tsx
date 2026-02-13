'use client';

import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    position: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          department: formData.department,
          position: formData.position,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Có lỗi xảy ra khi đăng ký');
        return;
      }

      // Success - redirect to login
      router.push('/auth/login?registered=true');
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng ký');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{
      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                {/* Logo & Title */}
                <div className="text-center mb-4">
                  <h1 className="fw-bold mb-2" style={{ fontSize: '2rem' }}>
                    <span style={{ color: '#2563EB' }}>DAKIA</span> Wiki
                  </h1>
                  <p className="text-muted">Tạo tài khoản mới</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setError('')}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                {/* Register Form */}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Họ và tên <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="name"
                        name="name"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        name="email"
                        placeholder="name@dakia.tech"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="form-label fw-semibold">
                        Mật khẩu <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        minLength={6}
                      />
                      <small className="text-muted">Tối thiểu 6 ký tự</small>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmPassword" className="form-label fw-semibold">
                        Xác nhận mật khẩu <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="department" className="form-label fw-semibold">
                        Phòng ban
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="department"
                        name="department"
                        placeholder="VD: IT Department"
                        value={formData.department}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="position" className="form-label fw-semibold">
                        Vị trí
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="position"
                        name="position"
                        placeholder="VD: Software Engineer"
                        value={formData.position}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3 fw-semibold"
                    disabled={isLoading}
                    style={{ borderRadius: '0.75rem' }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Đang đăng ký...
                      </>
                    ) : (
                      '✨ Tạo tài khoản'
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-muted">Đã có tài khoản? </span>
                    <a 
                      href="/auth/login" 
                      className="text-decoration-none fw-semibold"
                      style={{ color: '#2563EB' }}
                    >
                      Đăng nhập
                    </a>
                  </div>
                </form>

                {/* Back to Home */}
                <div className="text-center mt-4 pt-3 border-top">
                  <a 
                    href="/" 
                    className="text-muted text-decoration-none d-flex align-items-center justify-content-center"
                  >
                    <span className="me-2">←</span> Quay về trang chủ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
