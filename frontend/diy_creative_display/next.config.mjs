/** @type {import('next').NextConfig} */
// import middleware from "./src/middleware";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "**",
      },
    ],
  },
  //   server: {
  //     middleware: [middleware],
  //   },
};

export default nextConfig;

// export const images = {
//   remotePatterns: [
//     {
//       protocol: ["https", "http"],
//       hostname: "localhost",
//       port: "5000",
//       pathname: "/account123/**",
//     },
//   ],
// };
