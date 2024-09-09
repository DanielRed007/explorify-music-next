/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['platform-lookaside.fbsbx.com', 'i.scdn.co'],
  },
};

export default nextConfig;
