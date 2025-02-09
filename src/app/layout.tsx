import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from './components/Navbar'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import {motion,useInView,useAnimation} from 'framer-motion'

import { ourFileRouter } from "./api/uploadthing/core";
import Scroll from "./components/SmoothScroll";
import StarsCanvas from "./components/StarsBackground";
const inter = Inter({ subsets: ["latin"] });

 export const metadata: Metadata = {
  title: "Bits-Bids",
  description: "Created By Om and Aryan ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
        <NextSSRPlugin
      
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
         <Navbar></Navbar>
         
        {children}
       
        </Providers>
      </body>
    </html>
  );
}

