// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password constraints
export const MIN_PASSWORD_LENGTH = 6;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ARTICLES: '/admin/articles',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_USERS: '/admin/users',
} as const;

// Validation helpers
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}
