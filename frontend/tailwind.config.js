// tailwind.config.js

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
  variants: {
    extend: {
      scrollbar: ['rounded'],
      // Define no-scrollbar variant
      scrollbar: ['rounded'],
      // Extend utilities with no-scrollbar
      extend: {
        scrollbar: ['rounded'],
        // Extend utilities with no-scrollbar
        extend: {
          scrollbar: ['rounded'],
          'scrollbar-hide': ['rounded'],
        },
      },
    },
  },
};
