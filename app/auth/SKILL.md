# App/Auth Folder - Authentication Pages

## Purpose
Authentication pages (login, register) with NextAuth.js integration.

## Pattern

All auth pages must be client components:

```typescript
'use client';

import { FC, FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

const LoginPage: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(ROUTES.ADMIN_DASHBOARD);
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};

export default LoginPage;
```

## Form Pattern

### State Management
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
```

### Error Handling
```typescript
const [error, setError] = useState('');

if (!validateEmail(email)) {
  setError('Email không hợp lệ');
  return;
}
```

### Loading State
```typescript
const [isLoading, setIsLoading] = useState(false);

<button disabled={isLoading}>
  {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
</button>
```

## Styling Pattern

```tsx
<div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)'
}}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card border-0 shadow-lg rounded-4">
          <div className="card-body p-5">
            {/* Form content */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## DO's ✅

- Use 'use client' directive
- Handle loading states
- Show error messages
- Validate input (client + server)
- Use ROUTES constants
- Redirect after success
- Clear errors on retry
- Use Vietnamese error messages

## DON'Ts ❌

- Don't skip validation
- Don't forget loading states
- Don't hardcode routes
- Don't expose technical errors
- Don't skip error handling
