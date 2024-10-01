/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.js
import NextPWA from 'next-pwa';

const withPWA = NextPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
});

export default withPWA(nextConfig);