/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ['"Fraunces"','serif'],
        grotesk: ['"Space Grotesk"','sans-serif'],
        mono: ['"JetBrains Mono"','monospace'],
      },
    },
  },
  plugins: [],
}
