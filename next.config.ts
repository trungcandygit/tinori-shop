import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "next-auth",
    "bcryptjs",
    "@prisma/client",
    "@prisma/adapter-libsql",
    "@libsql/client",
    "prisma",
    "nodemailer",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
