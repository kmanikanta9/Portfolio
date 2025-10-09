/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Using 'class' for dark mode control
  theme: {
    extend: {
      // Custom colors based on CSS variables
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--color-primary))",
        secondary: "hsl(var(--color-secondary))",
        accent: "hsl(var(--color-accent))",
        warning: "hsl(var(--color-warning))",
        error: "hsl(var(--color-error))",
        success: "hsl(var(--color-success))",
        lightHover: "#fcf4ff",
        darkHover: "#2a004a",
        darkTheme: "#11001F",
      },

      // Custom fonts
      fontFamily: {
        Outfit: ["Outfit", "sans-serif"],
        Ovo: ["Ovo", "serif"],
      },

      // Custom grid
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },

      // Animations
      animation: {
        spin_slow: "spin 6s linear infinite",
      },

      // Box shadows
      boxShadow: {
        black: "4px 4px 0 #000",
        white: "4px 4px 0 #fff",
      },
    },
  },
  plugins: [],
};
