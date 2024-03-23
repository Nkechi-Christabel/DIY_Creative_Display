export const baseUrlApi =
  process.env.NODE_ENV === "production"
    ? process.env.DIY_APP_URL
    : "http://127.0.0.1:8000";
