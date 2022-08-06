/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        gradient1: 'linear-gradient(180deg, #A687FF 0%, #FF79E9 100%)',
        gradient2:
          'linear-gradient(180deg, #713dff 0%, #713dff 46%, #ff3ce0 150%)',
      },
      colors: {
        primary: 'var(--text-primary)',
        success: 'var(--text-success)',
        'primary-2': 'var(--primary-2)',
        secondary: 'var(--text-secondary)',
        'secondary-2': 'var(--secondary-2)',
        'accent-1': 'var(--text-accent)',
        'btn-primary': 'var(--btn-primary)',
        'btn-tertiary': 'var(--btn-tertiary)',
        'btn-secondary': 'var(--bg-primary)',

        hover: 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',

        green: 'var(--green)',
        red: 'var(--red)',
      },
    },
  },
  plugins: [],
};
