/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.escuelajs.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "http2.mlstatic.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "img4.dhresource.com" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "placeimg.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "adband.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "basicjeans.co" },
      { protocol: "https", hostname: "leclee.com.co" },
      { protocol: "https", hostname: "www.herbazest.com" },
      { protocol: "https", hostname: "www.falabella.com.co" },
      { protocol: "https", hostname: "cdnx.jumpseller.com" },
      { protocol: "https", hostname: "e7.pngegg.com" },
    ],
  },
};

module.exports = nextConfig;
