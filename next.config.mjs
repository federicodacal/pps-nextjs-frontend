/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost','admin-audiolibre-api.vercel.app','pps-flask-api.vercel.app'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pps-flask-api.vercel.app',
        port: '',
        pathname: '/api/**',
      },
    ],
},
    async headers() {
        return [
          {
            // matching all API routes
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
          },
          {
            // matching all API routes
            source: "/api/data/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
          }
        ]
      },
      async rewrites() {
          return [
            {
              source: '/api/:path*',
              destination: 'https://pps-flask-api.vercel.app/:path*',
            },
            {
              source: '/data/:path*',
              destination: 'https://pps-flask-api.vercel.app/:path*',
            },
          ]
        },
};

export default nextConfig;
