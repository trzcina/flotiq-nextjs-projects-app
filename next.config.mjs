/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.flotiq.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
