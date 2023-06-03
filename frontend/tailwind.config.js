/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      fontFamily: {
        display: ['Quicksand', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      extend: {
        colors: {
          'primary' : '#0e7589',
          'secondary' : '#e6e4d5',
          'muted' : '#e8eaec'
        },
        backgroundColor: {
          'primary' : '#0e7589',
          'secondary' : '#e6e4d5',
  
        },
        borderWidth: {
          1: '1px',
        },
        borderColor: {
          'primary' : '#0e7589',
          'secondary' : '#e6e4d5'
        },
      },
    },
  
  plugins: [],
}




