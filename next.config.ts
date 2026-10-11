import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    // Do not mirror the browser console into the terminal: wallet extensions are noisy.
    browserToTerminal: false,
  },
};

export default nextConfig;
