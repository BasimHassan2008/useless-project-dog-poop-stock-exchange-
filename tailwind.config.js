/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#080c14',
          panel: '#0d131f',
          card: '#111927',
          border: '#1f293d',
          accent: '#22c55e',
          loss: '#ef4444',
          warning: '#f59e0b',
          muted: '#64748b',
          gold: '#eab308'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        flashGreen: {
          '0%': { backgroundColor: 'rgba(34, 197, 94, 0.4)' },
          '100%': { backgroundColor: 'transparent' },
        },
        flashRed: {
          '0%': { backgroundColor: 'rgba(239, 68, 68, 0.4)' },
          '100%': { backgroundColor: 'transparent' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        }
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        flashGreen: 'flashGreen 1.2s ease-out',
        flashRed: 'flashRed 1.2s ease-out',
        shake: 'shake 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
}
