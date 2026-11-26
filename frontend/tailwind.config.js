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
          bg: "#F7F1E9",        // Main background — warm cream
          dark: "#4A3428",      // Main text, primary buttons, footer background
          taupe: "#B89B7D",     // Accent
          brown: "#8B6B50",     // Secondary buttons & warm accent
          gray: "#7A6355",      // Muted warm brown subtext
          sand: "#E8D8C5",      // Secondary background
          stone: "#E8D8C5",     // Secondary surface / hover states
          cream: "#FFFFFF",     // Pure white — cards & surfaces
          accent: "#6D513C",    // Deep warm brown hover
          border: "#D8C8B7",    // Borders
          charcoal: "#4A3428",  // Footer & dark sections
          muted: "#B89B7D",     // Muted accent
          gold: "#B89B7D"       // Warm accent
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
        'elora-soft': '0 8px 30px rgba(74, 52, 40, 0.06)',
        'elora-card': '0 10px 40px -10px rgba(74, 52, 40, 0.10)',
        'elora-float': '0 20px 50px -15px rgba(74, 52, 40, 0.16)',
      }
    },
  },
  plugins: [],
}
