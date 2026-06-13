/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
     remotePatterns: [
      {
        protocol: "https",
        hostname: "carsy.astechnologies.pk",
      },
    ],
  },
};

export default nextConfig;
