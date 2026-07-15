import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        diamond: {
          base: '#0b0d0e',
          surface: '#151718',
          glass: 'rgba(21, 23, 24, 0.65)',
          border: 'rgba(255, 255, 255, 0.06)',
          muted: '#4a4f52',
          text: '#e8edf0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        diamond: '24px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.6)',
        glow: '0 0 60px rgba(255, 255, 255, 0.03)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;