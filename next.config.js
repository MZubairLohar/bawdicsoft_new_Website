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
                hostname: 'res.cloudinary.com',
            },
            // 🟢 YEHS WALA ADD KARO (error waala domain)
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
            },
        ],
        formats: ["image/webp"],
    },
}

module.exports = nextConfig





// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'bawdicsoft.com',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'res.cloudinary.com',  // 🔥 yeh add karein
//             },
//         ],
//         formats: ["image/webp"],
//     },
// }

// module.exports = nextConfig