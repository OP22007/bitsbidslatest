import React from "react";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { Reveal } from "./Reveal";

const Footer = () => {
  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px] ">
        <div className="w-full flex flex-col items-center justify-center m-auto">
            <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
                

                <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                    <Reveal>
                    <div className="font-bold text-[16px]">Community</div>
                    </Reveal>
                    <Reveal>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                        <FaYoutube />
                        <Link href='www.youtube.com' className="text-[15px] ml-[6px]">Youtube</Link>    
                    </p>
                    </Reveal>
                    <Reveal>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                        <RxGithubLogo />
                        <span className="text-[15px] ml-[6px]">Github</span>    
                    </p>
                    </Reveal>
                    <Reveal>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                        <RxDiscordLogo />
                        <span className="text-[15px] ml-[6px]">Discord</span>    
                    </p>
                    </Reveal>
                </div>
                <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                    <Reveal>
                    <div className="font-bold text-[16px]">Social Media</div>
                    </Reveal>
                    <Reveal>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                        <FaYoutube />
                        <span className="text-[15px] ml-[6px]">Instagram</span>    
                    </p></Reveal>
                    <Reveal>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                        <RxGithubLogo />
                        <span className="text-[15px] ml-[6px]">Twitter</span>    
                    </p>
                    </Reveal>
                    <Reveal>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                        <RxDiscordLogo />
                        <span className="text-[15px] ml-[6px]">Linkedin</span>    
                    </p>
                    </Reveal>
                </div>
                <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                    <Reveal>
                    <div className="font-bold text-[16px]">About</div></Reveal>
                    <Reveal>
                   <p className="flex flex-row items-center my-[15px] cursor-pointer">
                     
                        <span className="text-[15px] ml-[6px]">Become Sponsor</span>    
                    </p>
                    </Reveal>
                    <Reveal>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                      
                        <span className="text-[15px] ml-[6px]">Learning about me</span>    
                    </p>
                    </Reveal>
                    <Reveal>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                  
                        <span className="text-[15px] ml-[6px]">Mail here</span>    
                    </p>
                    </Reveal>
                </div>
            </div>
            <Reveal>
            <div className="mb-[20px] text-[15px] text-center">

                &copy; Om And Aryan 2024 Inc. All rights reserved
            </div>
            </Reveal>
        </div>
    </div>
  )
}

export default Footer