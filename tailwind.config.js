/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617', // slate-950
        surface: '#0f172a', // slate-900
        primary: '#10b981', // emerald-500
        secondary: '#06b6d4', // cyan-500
        textMain: '#f8fafc', // slate-50
        textMuted: '#94a3b8', // slate-400
      }
    },
  },
  plugins: [],
}
