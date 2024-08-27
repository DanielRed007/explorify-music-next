/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['platform-lookaside.fbsbx.com'],
  },
};

export default nextConfig;
