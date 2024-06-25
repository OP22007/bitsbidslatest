"use client";
import React, { useEffect, useState } from "react";
import { User } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import UserList from "../components/userList";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import AutoScrollContainer from 'react-auto-scroll-container';

export default function Chat() {
  const {data: session} = useSession();
  const [chats, setChats] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [name, setName] = useState<string>("Click to Open Chat");
  const [email, setEmail] = useState<string>("Users Email appears here");
  const [receiverID, setReceiverID] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const user = session?.user;
  const socket = io("http://localhost:3001");
  socket.emit("joined","new user")
  const handleData = (userID: string, username: string, useremail: string) => {
    setReceiverID(userID);
    setName(username);
    setEmail(useremail);
  };
  socket.on("refresh",()=>{
    fetchChats();
  })
  useEffect(() => {
    if (session) {
      fetchChats();
    }
  }, [session, email]);

  const fetchChats = async () => {
    if (session && email) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/getchats?senderID=${user?.email}&receiverID=${email}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChats(data.messages || []);
        }
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) {
      alert("Cannot send an empty text");
      return;
    }

    const senderEmail = user?.email || "";
    const myChat = {
      senderID: senderEmail,
      receiverID: email,
      message: inputValue,
    };
    socket.emit('private message',email,inputValue,senderEmail)
    try {
      const res = await fetch("http://localhost:3000/api/addchats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myChat),
      });
      if (res.ok) {
        setInputValue("");
        fetchChats();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <>
      <div id="chatbox">
        <div className="grads">
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
        <div className="flex flex-col lg:flex-row w-full justify-center xl:justify-start">
          <div className="flex mt-5 w-full lg:w-8/12 min-w-2xl sm:max-w-xl xl:w-3/12 xl:ml-10 overflow-y-scroll">
            <div className="flex flex-col w-full xl:items-start z-10 p-2 bg-transparent">
              <p className="text-xl font-bold ml-1">Chats</p>
              <UserList sendUserProfile={handleData} />
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-8/12 h-screen xl:flex items-center ml-4">
            <div className="flex flex-col w-full h-5/6 overflow-y-scroll bg-black/30 backdrop-blur-3xl mb-10 p-2 mt-2 rounded-xl">
              <div className="w-full bg-transparent border-b-1 border-gray-800 rounded-sm p-2">
                <User
                  name={name}
                  description={email}
                  avatarProps={{ color: "primary" }}
                  onChange={fetchChats}
                />
              </div>
              <ScrollToBottom>
              <div className="flex-grow overflow-y-auto">
                {chats &&
                  chats.map((chat: any, index: number) => (
                    <div key={index} className="bg-gray-800 p-2 rounded my-1">
                      {chat.message}
                    </div>
                  ))}
              </div>
              </ScrollToBottom>
              <div className="flex flex-col w-full lg:flex-row items-center justify-between mt-4">
                <Textarea
                  type="text"
                  placeholder="Enter your message here..."
                  className="chat-box w-full lg:w-10/12 flex items-center"
                  minRows={1}
                  maxRows={5}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />
                <div className="options flex items-center justify-around w-full lg:w-2/12 mt-2 lg:mt-0">
                  <Button
                    className="send h-9 ml-2 z-11"
                    isIconOnly
                    type="submit"
                    color="success"
                    aria-label="Send"
                    onClick={sendMessage}
                  >
                    <Image src="send2.png" />
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
