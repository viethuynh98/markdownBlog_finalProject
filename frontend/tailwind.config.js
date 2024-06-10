export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md': '1050px', // Thay đổi breakpoint 'md' thành 900px
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Thêm breakpoint tùy chỉnh
        'custom': '950px',
      },
    },
  },
  plugins: [],
}
