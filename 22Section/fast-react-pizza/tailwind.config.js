/** @type {import('tailwindcss').Config} */
export default {
  content: [`./index.html`, `./src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    fontFamily: {
      sans: `Roboto Mono, monospace`,
    },
    extend: {
      backdropBlur: {
        sm: `4px`,
      },
      height: {
        screen: `100dvh`,
      },
    },
  },
  variants: {
    extend: {
      backdropBlur: [`responsive`],
    },
  },
  plugins: [],
};
