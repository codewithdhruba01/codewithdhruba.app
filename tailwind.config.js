export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        hind: ['Hind', 'sans-serif']
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