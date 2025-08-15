import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Add standalone output for optimized deployment
  // output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.suddha.com.bd",
        port: "",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.77.10",
        port: "5000",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.77.5",
        port: "5000",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.6",
        port: "5000",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

// Export with next-intl plugin
export default createNextIntlPlugin()(nextConfig);
