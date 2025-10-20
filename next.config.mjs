/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { optimizeCss: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fgnbjsjqiwubumsvfngn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
