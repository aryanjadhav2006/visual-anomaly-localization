/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        danger: "#ef4444",
        warning: "#f59e0b",
        ok: "#22c55e",
      },
    },
  },
  plugins: [],
}
