/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/App.{js,jsx}",
    "./src/auth/**/*.{js,jsx}",
    "./src/component/resume/**/*.{js,jsx}",
    "./src/component/EditProfile/**/*.{js,jsx}",
    "./src/component/Sidebar.{js,jsx}",
    "./src/component/Navbar.{js,jsx}",
    "./src/component/PageLoader.{js,jsx}",
    "./src/component/Loader.{js,jsx}",
    "./src/component/ProtectedRoute.{js,jsx}",
    "./src/pages/Main.{js,jsx}",
    "./src/pages/user/ResumeBuilder.{js,jsx}",
    "./src/pages/user/ATSScore.{js,jsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        updown: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
      animation: {
        updown: "updown 3s ease-in-out infinite", // Slow, infinite animation
        bounce: "bounce 1.2s infinite ease-in-out", // Bouncing animation
      },
      select: {
        option: {
          hover: "#0d9488",
        },
      },
      screens: {
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
};
