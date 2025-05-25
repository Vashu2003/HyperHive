export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background-light': '#ffffff',
        'background-dark': '#000000',
        'text-light': '#111111',
        'text-dark': '#eeeeee',
        'muted-light': '#f4f4f5',
        'muted-dark': '#1f1f1f',
        'border-light': '#e4e4e7',
        'border-dark': '#27272a',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
