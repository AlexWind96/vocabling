// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
        ],
        mono: [
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
        ],
      },
      screens: {
        xs: '576px',
        sm: '768px',
        md: '992px',
        lg: '1200px',
        xl: '1400px',
        '2xl': '1536px',
      },
      borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '4px',
        DEFAULT: '2px',
        md: '8px',
        lg: '16px',
        xl: '32px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
