export const baseUrlApi =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : "https://web-02.bammietop.tech";
