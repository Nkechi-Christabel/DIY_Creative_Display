export const baseUrlApi =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : "http://127.0.0.1:8000";

// "http://127.0.0.1:8000"
