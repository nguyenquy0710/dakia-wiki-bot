/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // NextAdmin inspired color palette
        primary: {
          DEFAULT: '#5750F1',
          dark: '#4338CA',
          light: '#6366F1',
        },
        secondary: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
          light: '#3B82F6',
        },
        dark: {
          DEFAULT: '#111928',
          2: '#1F2A37',
          3: '#374151',
          4: '#4B5563',
          5: '#6B7280',
          6: '#9CA3AF',
          7: '#D1D5DB',
          8: '#E5E7EB',
        },
        gray: {
          DEFAULT: '#EFF4FB',
          dark: '#122031',
          1: '#F9FAFB',
          2: '#F3F4F6',
          3: '#E5E7EB',
          4: '#D1D5DB',
          5: '#9CA3AF',
          6: '#6B7280',
          7: '#374151',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#06B6D4',
      },
      fontSize: {
        'heading-5': ['28px', '40px'],
        'heading-6': ['24px', '30px'],
      },
      boxShadow: {
        'card': '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
        'card-2': '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        1: '0px 1px 2px 0px rgba(84, 87, 118, 0.12)',
        2: '0px 2px 3px 0px rgba(84, 87, 118, 0.15)',
      },
    },
  },
  plugins: [],
}
