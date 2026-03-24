/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#eef9ff",
          100: "#d9f2ff",
          500: "#2490eb",
          600: "#1778ca",
          700: "#1260a3"
        }
      },
      boxShadow: {
        card: "0 10px 25px -15px rgba(15, 23, 42, 0.35)"
      }
    }
  },
  plugins: []
};
