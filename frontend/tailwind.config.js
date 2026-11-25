/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elora: {
          bg: "#FAF7F2",
          dark: "#1D1D1D",
          taupe: "#D8C9B8",
          brown: "#8B6B4E",
          gray: "#777777",
          sand: "#F2ECE3",
          stone: "#E4DCD3",
          cream: "#FCF9F5",
          accent: "#A17C58",
          border: "#E7DFD5",
          charcoal: "#2C2A29",
          muted: "#9E9E9E",
          gold: "#C4A67B"
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Tenor Sans"', '"Cormorant Garamond"', 'serif']
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.28em'
      },
      boxShadow: {
        'elora-soft': '0 8px 30px rgba(29, 29, 29, 0.05)',
        'elora-card': '0 10px 40px -10px rgba(29, 29, 29, 0.08)',
        'elora-float': '0 20px 50px -15px rgba(29, 29, 29, 0.12)',
      }
    },
  },
  plugins: [],
}
