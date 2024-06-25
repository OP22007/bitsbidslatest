/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true
    },
    images:{
        domains:['nextui.org','mundum.com','utfs.io']
    }
};

export default nextConfig;
