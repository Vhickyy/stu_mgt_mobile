/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./views/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF8A72",
        "primary-dark": "#F97360",
        "primary-light": "#FFB7A3",

        secondary: "#FFD8C2",
        "secondary-light": "#FFE9DE",

        background: "#FFF8F6",
        surface: "#FFFFFF",
        "surface-soft": "#FFF4EF",

        text: "#2F241F",
        "text-secondary": "#7B6A64",
        muted: "#A89790",

        border: "#F3DDD5",
        "border-strong": "#E8C9BE",

        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#6366F1",
      },
    },
  },
  plugins: [],
};
