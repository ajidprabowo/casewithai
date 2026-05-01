/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        display: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#1a5cff',
          light: '#e8eeff',
          dark: '#0e3acc',
        },
        cream: '#f5f2eb',
        brand: {
          black: '#0a0a0a',
          white: '#fafaf8',
        }
      },
      animation: {
        'ticker': 'ticker 25s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-dot': 'pulseDot 2s infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.3)' },
        },
      },
    },
  },
  plugins: [],
};
