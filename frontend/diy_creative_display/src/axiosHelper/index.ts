export const baseUrlApi =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_URL
    : "https://diy-creative-display.onrender.com";
