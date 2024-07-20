/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler:{
        //remove Console logs in production
        removeConsole: process.env.NODE_ENV === 'production',
    },
    experimental: {
        serverActions: {

            bodySizeLimit: '5mb',

            allowedOrigins: [
                "https://jubilant-broccoli-vqwr5jgjrxj2rpg-3000.app.github.dev/",
                "localhost:3000",
                "https://vigilant-system-wgx54q9q5pghgjw5-3000.app.github.dev/"
            ],
        },
    },
};

export default nextConfig;