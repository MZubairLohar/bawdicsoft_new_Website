/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bawdicsoft.com',
            },
        ],
        formats: ["image/webp"],
    },
}

module.exports = nextConfig
