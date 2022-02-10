const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    mode: "all",
    content: ["./**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    borderRadius: {
      'none': 0
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        'spp-yellow': '#F4EA97',
        'spp-brown': '#856429',
        'spp-blue-light': '#86A6CC',
        'spp-blue-dark': '#2767A6',
        'spp-accent-beige': '#989500',
        'spp-accent-cream': '#F2FEDC',
        'spp-accent-green': '#1B3D2F',
        'spp-accent-orange': '#DDA01D',
        'spp-accent-gray': '#DFE0DF',
        'spp-accent-brown': '#402E32',
        'spp-accent-blue': '#0051B6',
        'spp-accent-gray-light': '#E6F4F1',
        'spp-accent-blue-light': '#00B0FF',
        'spp-accent-green-light': '#91E885',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [
      require("@tailwindcss/typography"),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms')
  ],
};
