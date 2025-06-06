export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        'background-light': '#f9fafb',
        'text-light': '#1a1a1a',
        'muted-light': '#e5e7eb',
        'border-light': '#d1d5db',

        // Dark mode
        'background-dark': '#121212',
        'text-dark': '#e4e4e7',
        'muted-dark': '#2a2a2a',
        'border-dark': '#3a3a3c',

        // Accents
        'primary': '#6366f1',
        'primary-hover': '#818cf8',
        'accent': '#22d3ee',
        'error': '#ef4444',
        'success': '#10b981',

        // Dark mode overrides
        'primary-dark': '#22d3ee',
        'primary-hover-dark': '#67e8f9',
        'accent-dark': '#67e8f9',
        'error-dark': '#f87171',
        'success-dark': '#34d399',
      },

      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },

      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      animation: {
        marquee: 'marquee 60s linear infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
