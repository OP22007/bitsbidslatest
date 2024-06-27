"use client";
import React from "react";

import { motion } from "framer-motion";
import { slideInFromTop } from "../utils/motion";
import Image from "next/image";
import { Reveal } from "./Reveal";

const Encryption = () => {
  return (
    <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full">
      <div className="absolute w-auto h-auto top-0 z-[5]">
        <Reveal>
        <motion.div
          variants={slideInFromTop}
          className="text-[40px] font-medium text-center text-gray-200"
        >
          Performance
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "}
            &{" "}
          </span>
          Security
        </motion.div>
          </Reveal>
      </div>

      <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
        <Reveal>
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          <Image
            src="/LockTop.png"
            alt="Lock top"
            width={50}
            height={50}
            className="w-[50px] translate-y-5 transition-all duration-200 group-hover:translate-y-11"
          />
          <Image
            src="/LockMain.png"
            alt="Lock Main"
            width={70}
            height={70}
            className=" z-10"
          />
        </div>
        </Reveal>
        <div className="Welcome-box px-[15px] py-[4px] z-[20] brder my-[20px] border-[#7042f88b] opacity-[0.9]">
          <Reveal>
          <h1 className="Welcome-text text-[12px]">Encryption</h1>
          </Reveal>
        </div>
      </div>
      <div className="absolute z-[20] bottom-[10px] px-[5px]">
        <Reveal>
        <div className="cursive text-[30px] font-medium text-center text-gray-300">
          All your bids and chats are end-to-end encryption
        </div>
        </Reveal>
      </div>

      <div className="w-full flex items-start justify-center absolute">
        <Reveal>
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-auto"
          src="/encryption.webm/"
        />
        </Reveal>
      </div>
    </div>
  );
};

export default Encryption;
