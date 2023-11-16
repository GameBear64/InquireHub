/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        'base-strong': 'var(--base-strong)',
        'base': 'var(--base)',
        'base-moderate': 'var(--base-moderate)',
        'base-subtle': 'var(--base-subtle)',
        'base-weak': 'var(--base-weak)',
        'onBase': 'var(--onBase)',
        'primary-light': 'var(--primary-light)',
        'primary': 'var(--primary)',
        'primary-shade': 'var(--primary-shade)',
        'primary-dark': 'var(--primary-dark)',
      }
    },
},
  plugins: [],
};
