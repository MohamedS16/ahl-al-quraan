export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'urdu': ['"Noto Nastaliq Urdu"', 'serif'],
      },
      backgroundImage: {
        'landing-bg': "url('./assets/islamic-new-year-concept-with-copy-space.webp')",
      }
    },
  },
  plugins: [],
}