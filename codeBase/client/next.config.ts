import type { NextConfig } from "next";


const cspHeaders = `
    default-src 'self';
    style-src 'self' 'unsafe-inline';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    img-src 'self' blob: data: https://res.cloudinary.com;
    font-src 'self';
    connect-src 'self' https://accept.paymob.com ws://acceptable-contentment-production-ac53.up.railway.app/ wss://acceptable-contentment-production-ac53.up.railway.app;
    frame-src 'self' https://accept.paymob.com;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    `; 

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeaders.replace(/\n/g, ""),
          },
          {
            key: "strict-transport-security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "x-content-type-options",
            value: "nosniff",
          },
          {
            key: "x-frame-options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];

  }
};

export default nextConfig;
