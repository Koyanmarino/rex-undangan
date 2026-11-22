import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f5',
          100: '#fbe8eb',
          200: '#f8d5d9',
          300: '#f2b5bc',
          400: '#e88995',
          500: '#db6172',
          600: '#c54457',
          700: '#a53444',
          800: '#892e3c',
          900: '#732a36',
          950: '#40121a',
        },
        gold: {
          50: '#fbf9f1',
          100: '#f6f1de',
          200: '#ebe1ba',
          300: '#dcce90',
          400: '#cbba68',
          500: '#b8a349',
          600: '#9e863b',
          700: '#7e6631',
          800: '#67522c',
          900: '#564428',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
