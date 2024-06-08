"use client"
import React, { useEffect, useState } from "react";
import { User } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import UserList from "../components/userList";
import { Button } from "@nextui-org/react";
export default function Chat() {
 
    {
        return (
            <>
          <div id="chatbox">
              {/* main grad desktop  */}
              <div className="grads ">
                <div
                  aria-hidden="true"
                  className="fixed hidden dark:md:block dark:opacity-60 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-left-[45%] z-0 rotate-12"
                >
                  <img
                    src="https://nextui.org/gradients/docs-right.png"
                    className="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                    alt="docs right background"
                    data-loaded="true"
                  />
                </div>
                {/* mobile grad */}
                <div
                  aria-hidden="true"
                  className="fixed md:hidden block dark:opacity-100 -bottom-[30%] -right-[95%] z-0 rotate-12"
                >
                  <img
                    src="https://nextui.org/gradients/docs-right.png"
                    className="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                    alt="docs right background"
                    data-loaded="true"
                  />
                </div>
                {/* grad2 desktop */}
                <div
                  aria-hidden="true"
                  className="fixed hidden dark:md:block dark:opacity-60 -top-[30%] -left-[60%] z-0"
                >
                  <img
                    src="https://mundum.com/images/Gradient-2-min.png"
                    className="relative z-10 opacity- shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                    alt="docs left background"
                    data-loaded="true"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="fixed md:hidden block dark:opacity-100 -top-[9%] -left-[70%] z-0"
                >
                  <img
                    src="https://mundum.com/images/Gradient-2-min.png"
                    className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                    alt="docs left background"
                    data-loaded="true"
                  />
                </div>
              </div>
        
              <div className="flex w-full justify-center  xl:justify-start ">
                <div className="flex mt-5 w-8/12 min-w-2xl sm:max-w-xl xl:w-3/12  xl:ml-10 overflow-y-scroll">
                  <div className="flex flex-col  w-full  xl:items-start   p-2 bg-black">
                    <p className="text-xl  font-bold ml-1">Chats</p>
                    <UserList></UserList>
                  </div>
                </div>
                <div className=" hidden right-8 fixed xl:w-8/12 overflow-y-auto  h-screen xl:flex items-center ml-4 ">
                  <div className=" flex flex-col w-full h-5/6 overflow-y-scroll bg-black/30 backdrop-blur-3xl mb-10 p-2 mt-2 rounded-xl ">
                    <div className="w-full bg-transparent border-b-1 border-gray-800 rounded-sm  p-2">
                    <User   
              name="Jane Doe"
              description="Product Designer"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
              }}
            />
           
                    </div>
                     
        <div className="flex top-14  gap-2.5">
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                 <p className="text-sm font-normal text-gray-900 dark:text-white"> That's awesome. I think our users will really appreciate the improvements.</p>
              </div>
        </div>
        
                
                    <div className="w-11/12 right-8 bottom-4 flex fixed  h-12 flex-wrap flex-wrap-reverse items-center  justify-start">
                      <Textarea
                        className="chat-box w-11/12 flex  items-center"
                        minRows={1}
                        maxRows={5}
                        style={{}}
                      ></Textarea>
                      <div className="options flex items-center justify-around w-1/12 h-12">
                        <Button
                          className="send h-9 ml-2"
                          isIconOnly
                          color="success"
                          aria-label="Like"
                        >
                          <Image src="send2.png"></Image>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
              </div>
            </>
          );
    }
}


