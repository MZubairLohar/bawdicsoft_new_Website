/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bawdicsoft.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',  // 🔥 yeh add karein
            },
        ],
        formats: ["image/webp"],
    },
}

module.exports = nextConfig