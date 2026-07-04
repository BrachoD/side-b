import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#141A18",
        surfaceHover: "#1A221F",
        accent: "#4ade80", //green-400
      },
    },
  },
  plugins: [animate],
};
