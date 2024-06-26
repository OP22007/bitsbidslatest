/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true
    },

        reactStrictMode: true,
     
    
    images:{
        domains:['nextui.org','mundum.com','utfs.io']
    }
};

export default nextConfig;
