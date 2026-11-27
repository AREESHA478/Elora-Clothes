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
          bg: "#FFFFFF",        // Fullstop primary background
          dark: "#171717",      // Fullstop primary ink, buttons & dark surfaces
          taupe: "#E5E5E5",     // Fullstop subtle line / light grey
          brown: "#171717",     // Primary accent/hover ink
          gray: "#666666",      // Secondary muted text
          sand: "#F5F5F5",      // Soft grey surfaces
          stone: "#F3F3F3",     // Card placeholder & pill hover
          cream: "#FFFFFF",     // Pure white surface
          accent: "#333333",    // Hover ink
          border: "#E5E5E5",    // Hairline borders
          charcoal: "#111111",  // Deep black
          muted: "#737373",     // Muted placeholder text
          gold: "#171717"       // Monochrome
        }
      },
      fontFamily: {
        serif: ['Arial', 'Helvetica', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Arial', 'Helvetica', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Arial Rounded MT Bold"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        cursive: ['"Cedarville Cursive"', 'cursive']
      },
      letterSpacing: {
        widest: '.15em',
        ultra: '.2em'
      },
      boxShadow: {
        'elora-soft': '0 2px 7px rgba(0, 0, 0, 0.04)',
        'elora-card': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'elora-float': '0 16px 40px rgba(0, 0, 0, 0.14)',
      }
    },
  },
  plugins: [],
}
