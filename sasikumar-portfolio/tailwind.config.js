/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: "#00f0ff",
          glow: "#66f4ff",
          dark: "#00b4d8",
          light: "#99f6ff",
          muted: "rgba(0, 240, 255, 0.15)",
        },
        neon: {
          DEFAULT: "#00f0ff",
          glow: "#66f4ff",
          dark: "#0088cc",
          cobalt: "#0066ff",
          muted: "rgba(0, 240, 255, 0.15)",
        },
        dark: {
          bg: "#0a0a0a",
          surface: "#121212",
          card: "#171717",
          elevated: "#1f1f1f",
          border: "rgba(255, 255, 255, 0.08)",
          muted: "#888888",
        },
        light: {
          bg: "#f5f5f0",
          surface: "#ffffff",
          card: "#ffffff",
          elevated: "#eaeae5",
          border: "rgba(0, 0, 0, 0.08)",
          muted: "#666666",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
