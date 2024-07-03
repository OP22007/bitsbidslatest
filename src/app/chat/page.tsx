"use client";
import React, { useEffect, useState } from "react";
import { Badge, User } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import UserList from "../components/userList";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Socket, io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import AutoScrollContainer from "react-auto-scroll-container";
import { Avatar as MuiAvatar } from "@mui/material";
import chatBg from '../../../public/ChatBg.jpg'
import { url } from "inspector";
import { IoSend } from "react-icons/io5";
import ChatLayout from "../chatLayout";
export default function Chat() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [name, setName] = useState<string>("Click to Open Chat");
  const [email, setEmail] = useState<string>("Users Email appears here");
  const [receiverID, setReceiverID] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [roomCode, setRoomcode] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
    
  console.log("onlineUsers", onlineUsers);
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }
  function stringAvatar(name: string) {   
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0].toUpperCase()}`,
    };
  }

  const user = session?.user;
  useEffect(() => {
    const newSocket = io("http://localhost:3002");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket == null) return;
    socket.emit("addNewUser", user?.email);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [socket]);

  const createRoomCode = () => {
    const factor = user?.email?.localeCompare(email);
    const roomName = factor === -1 ? user?.email + email : email + user?.email;
    if (roomCode) {
      if (socket == null) return;
      socket.emit("LeaveRoom", roomCode);
    }
    setRoomcode(roomName);
    if (socket == null) return;
    socket.emit("joinRoom", roomName);
  };

  useEffect(() => {
    if (session) {
      createRoomCode();
    }
  }, [email, session]);

  const handleData = async (userID: string, username: string, useremail: string) => {
    setReceiverID(userID);
    setName(username);
    setEmail(useremail);
    await createRoomCode();
    fetchChats();
  }

  useEffect(() => {
    if (socket == null) return;
    socket.on("refresh", () => {
      fetchChats();
    });
    socket.on("Message", () => {
      fetchChats();
    });
  }, [socket]);

  const fetchChats = async () => {
    if (session && email) {
      const roomName = roomCode || (user?.email?.localeCompare(email) === -1 ? user?.email + email : email + user?.email);
      try {
        const response = await fetch(
          `http://localhost:3000/api/getchats?ChatID=${encodeURIComponent(roomName)}`,
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
    await createRoomCode();
    const senderEmail = user?.email || "";
    const myChat = {
      ChatID: roomCode,
      senderID: senderEmail,
      receiverID: email,
      message: inputValue,
    };

    if (socket) socket.emit("private message", email, inputValue, senderEmail, roomCode);

    try {
      const res = await fetch("http://localhost:3000/api/addchats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myChat),
      });
      if (res.ok) {
        setInputValue("");
        if (socket) socket.emit("Refresh", roomCode);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <>
   <ChatLayout>
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
        <div  className="md:hidden absolute z-20">
    
        </div>
        <div className="flex flex-col lg:flex-row w-full  overflow-y-hidden">
       
         <div className="flex mt-5 w-8/12  md:2/12 lg:w-3/12 min-w-56  ml-10">
            <div className="flex flex-grow overflow-y-auto  h-5/6 flex-col w-full xl:items-start z-10 p-2 bg-transparent">
              <p className="text-xl font-bold ml-1">Chats</p>
              <UserList
                sendUserProfile={handleData}
                onlineUsers={onlineUsers}
                currentUserEmail={user?.email}
              />
            </div>
          </div>
      
          <div className="flex flex-col w-full  lg:w-9/12 h-screen xl:flex items-center justify-start ml-4">
          <div className="flex fixed   overflow-hidden  z-20 w-9/12 bg-black border-b-1 border-gray-800 rounded-sm p-2">
                <User
                  name={name}
                  description={email}
                  avatarProps={{ color: "primary" }}
                  onChange={fetchChats}
                />
              </div>
            <div className={`flex flex-col w-full h-full overflow-y-scroll b-10 p-2 mt-2 rounded-xl  `} style={{backgroundImage:"url('ChatBg.jpg')",backgroundSize:'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}>
              
              <ScrollToBottom>
                <div className="flex-grow relative z-10 overflow-y-auto mt-24 mb-28 ">
                  {chats &&
                    chats.map((chat: any, index: number) => (
                      <div
                        key={index}
                        className={`flex flex-wrap whitespace-break-spaces justify-between p-2 rounded-lg my-1 max-w-[30%] ${
                          chat.senderID === user?.email
                            ? 'ml-auto mr-4 mb-2 bg-green-600 rounded-br-none'
                            : 'mr-auto ml-4 mb-2 bg-gray-500 rounded-bl-none'
                        }`}
                      >
                        <p className="text-wrap w-full break-words">
                          {chat.content}
                        </p>
                        <span className="text-xs opacity-65 mt-2 ml-auto">
                          {new Date(chat.createdAt).toLocaleString()}
                        </span>
                      </div>
                    ))}
                </div>
              </ScrollToBottom>
              <div className="absolute inset-0 bg-black opacity-50"></div>
   
            </div>
            <div className=" hidden lg:flex z-20 w-9/12  items-center justify-end mt-4">
                <Textarea
                  type="text"
                  placeholder="Enter your message here..."
                  className="chat-box  fixed right-16 bottom-1 w-8/12 items-center"
                  minRows={1}
                  maxRows={5}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  radius="none"
                />
                <div className="options flex items-center w-full lg:w-2/12 lg:mt-0">
                  <Button
                    className="send h-10 fixed z-20   bottom-1 right-6 rounded-l-none z-11 bg-green-700"
                    isIconOnly
                    type="submit"
                    aria-label="Send"
                    onClick={sendMessage}
                  >
                 <IoSend />
                  </Button>
                </div>
              </div>
          </div>
          
        </div>
      </div>
      </ChatLayout>
      </>
    
  );
}
