import { ChildProcess } from 'child_process';

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true
    },

        reactStrictMode: false,
     
    
    images:{
        domains:['nextui.org','mundum.com','utfs.io','assets.aceternity.com','lh3.googleusercontent.com']
    },
};

export default nextConfig;
