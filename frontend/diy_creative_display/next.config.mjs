/** @type {import('next').NextConfig} */
// import middleware from "./src/middleware";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
