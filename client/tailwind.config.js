/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enables dark mode by adding 'class' to html
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff', // White background
          dark: '#000000',   // Black background
        },
        text: {
          light: '#111111',  // Almost black text (better for readability)
          dark: '#eeeeee',   // Light text for dark backgrounds
        },
        muted: {
          light: '#f4f4f5',  // Light muted background
          dark: '#1f1f1f',   // Dark muted background
        },
        border: {
          light: '#e4e4e7',  // Light gray border
          dark: '#27272a',   // Dark border
        },
      },
      borderRadius: {
        'xl': '1rem',   // For softer rounded edges
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};

