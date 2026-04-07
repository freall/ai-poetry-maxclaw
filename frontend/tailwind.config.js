/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f23',
        surface: '#1a1a2e',
        'surface-2': '#16213e',
        border: 'rgba(255,255,255,0.08)',
        'border-2': 'rgba(255,255,255,0.15)',
        text: '#f5f0e8',
        'text-2': '#9ca3af',
        'text-3': '#6b7280',
        gold: '#d4a843',
        coral: '#e07a5f',
        jade: '#81b29a',
        ink: '#4a5568',
      },
      fontFamily: {
        display: ['"Ma Shan Zheng"', '"Noto Serif SC"', 'serif'],
        body: ['"LXGW WenKai"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        poem: ['3rem', { lineHeight: '2.2' }],
        'poem-lg': ['4rem', { lineHeight: '2.2' }],
      },
      backgroundImage: {
        'grad-gold': 'linear-gradient(135deg, #d4a843, #f4d03f)',
        'grad-hero': 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.3)',
        gold: '0 4px 20px rgba(212,168,67,0.3)',
        glow: '0 0 20px rgba(212,168,67,0.2)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '200%' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
