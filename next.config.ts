import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: {
    // appIsrStatus is not a valid property in some Next versions
  },
  experimental: {
    // If the user sees cross-origin errors, adding the server IP here can help
    // allowedDevOrigins: ["192.168.1.21"], 
  }
};

export default nextConfig;
