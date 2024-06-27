'use client'
import Encryption from "./components/Encryption";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import StarsCanvas from "./components/StarsBackground";
import React,{useEffect,useRef} from "react";
import {motion,useInView,useAnimation} from 'framer-motion'
import { Reveal } from "./components/Reveal";

export default function Home() {
  
  return (
    <div className="h-full w-full">

      <div className="flex flex-col gap-20">
        <StarsCanvas/>
        <Hero />
        <Encryption/>
        <Footer/>
      </div>
    </div>
  );
}