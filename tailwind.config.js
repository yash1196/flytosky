/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#05101f',
          900: '#0a1a30',
          800: '#0f2444',
          700: '#163357',
          600: '#1e4576',
          500: '#2a5c96',
        },
        cream: {
          50:  '#fdfbf5',
          100: '#f5f0e0',
          200: '#ece3c4',
          300: '#ddd0a6',
        },
      },
    },
  },
  plugins: [],
}
