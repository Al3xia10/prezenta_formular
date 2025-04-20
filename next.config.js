/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eliminăm output: 'export' pentru a permite Next.js să folosească server-side logic
  reactStrictMode: true,
  // Adaugă orice alte configurații de care ai nevoie
};

module.exports = nextConfig;
