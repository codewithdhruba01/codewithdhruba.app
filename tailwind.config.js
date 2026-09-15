export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cabinet: ['Cabinet Grotesk', 'sans-serif'],
        general: ['General Sans', 'sans-serif'],
        boska: ['Boska', 'serif'],
        switzer: ['Switzer', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        supreme: ['Supreme', 'sans-serif'],
        rowan: ['Rowan', 'serif'],
        quilon: ['Quilon', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        excon: ['Excon', 'sans-serif'],
        synonym: ['Synonym', 'sans-serif'],
        amulya: ['Amulya', 'sans-serif'],
        neco: ['Neco', 'serif'],
        pally: ['Pally', 'sans-serif'],
        hind: ['Hind', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        hanken: ['Hanken Grotesk', 'HK Grotesk', 'sans-serif'],
        bricolage: ['Bricolage Grotesque', 'sans-serif']
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#00DC82',
              '&:hover': {
                color: '#00b368',
              },
            },
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            strong: {
              color: '#fff',
            },
            code: {
              color: '#00DC82',
            },
            blockquote: {
              borderLeftColor: '#00DC82',
              color: '#fff',
            },
            'ul > li::before': {
              backgroundColor: '#00DC82',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
