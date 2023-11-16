/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        'base-strong': 'var(--base-strong)',
        base: 'var(--base)',
        'base-moderate': 'var(--base-moderate)',
        'base-subtle': 'var(--base-subtle)',
        'base-weak': 'var(--base-weak)',
        onBase: 'var(--onBase)',
        primary: 'var(--primary)',
      }
    },
},
  plugins: [],
};
