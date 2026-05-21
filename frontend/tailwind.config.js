/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#effaf7',
          100: '#d8f3ec',
          600: '#0f8f7f',
          700: '#0b7469',
          900: '#13413d',
        },
        brass: '#d69e2e',
      },
    },
  },
  plugins: [],
};
