export const baseUrlApi =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : "https://diy-creative-display.onrender.com";

// "http://127.0.0.1:8000"
