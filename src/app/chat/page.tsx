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
      children: `${name.split(" ")[0][0].toLocaleUpperCase()}`,
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
  // socket.emit("joined","new user")
  // socket.connect();
  useEffect(() => {
    if (socket == null) return;
    socket.emit("addNewUser", user?.email);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [socket]);
  const CreateroomCode = () => {
    const factor = user?.email?.localeCompare(email);
    const roomName = factor == -1 ? user?.email + email : email + user?.email;
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
     // fetchChats();
      CreateroomCode();
    
    }
  }, [session,email]);
  const handleData = (userID: string, username: string, useremail: string) => {
    setReceiverID(userID);
    setName(username);
    setEmail(useremail);
    fetchChats()
    CreateroomCode();
  }
    if(socket==null)return;
    socket.on("refresh", () => {
      fetchChats();
    });
    if(socket==null)return;
    socket!.on("Message",(room)=>{
      // setloader(!loader)
           fetchChats();
           
    })
     

    
   
    

    const fetchChats = async () => {
      if (session && email) {
       await  CreateroomCode()
       const ChatID =roomCode
        try {
          const response = await fetch(
            `http://localhost:3000/api/getchats?ChatID=${encodeURIComponent(ChatID)}`,
            {
              method: "GET",
            }
          );
          if (response.ok) {
            const data = await response.json();
            setChats(data.messages || []);
           console.log(data)
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
     await CreateroomCode();
      const senderEmail = user?.email || "";
      const myChat = {
        ChatID:roomCode,
        senderID: senderEmail,
        receiverID: email,
        message: inputValue,
      };
     CreateroomCode();
     if(socket) 
     socket.emit("private message", email, inputValue, senderEmail,roomCode);
//Db saving Mech
      try {
        const res = await fetch("http://localhost:3000/api/addchats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(myChat),
        });
        if (res.ok) {
          setInputValue("");
          if(socket)
          socket.emit("Refresh",roomCode)
       
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
              <UserList
                sendUserProfile={handleData}
                onlineUsers={onlineUsers}
                currentUserEmail={user?.email}
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-8/12 h-screen xl:flex items-center ml-4">
            <div className="flex flex-col w-full h-5/6 overflow-y-scroll bg-black/30 backdrop-blur-3xl mb-10 p-2 mt-2 rounded-xl">
              <div className="flex sticky top-0 z-10 w-full bg-black border-b-1 border-gray-800 rounded-sm p-2">
                <User
                    name={name}
                    description={email}
                    avatarProps={{ color: "primary" }}
                    onChange={fetchChats}
                  />
                </div>
                <ScrollToBottom>
                  <div className="flex-grow  min-h-screen overflow-y-auto">
                    {chats &&
                      chats.map((chat: any, index: number) => (
                         
                        <div
                          key={index}
                          
                          className={` flex  flex-wrap over whitespace-break-spaces  justify-between p-2 rounded-lg my-1 max-w-[30%] ${
                            chat.senderID === user?.email
                              ? 'ml-auto mr-4 mb-2 bg-green-600 rounded-br-none'
                              : 'mr-auto ml-4 mb-2 bg-gray-500 rounded-bl-none'
                          }`}
                        >
                         <p className="text-wrap w-full break-words"> {chat.content}</p>
                          <span className="text-xs opacity-65  mt-2 ml-auto">
          {new Date(chat.createdAt).toLocaleString()}
        </span>
                        </div>
                      ))}
                  </div>
                </ScrollToBottom>
                <div className="flex  sticky bottom-0 z-10  w-full  items-center  mt-4">
                  <Textarea
                    
                    type="text"
                    placeholder="Enter your message here..."
                    className="chat-box w-full lg:w-11/12 flex items-center"
                    minRows={1}
                    maxRows={5}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    radius="none"
                  />
                  <div className="options flex items-center w-full lg:w-2/12 lg:mt-0">
                    <Button
                      className="send h-10 rounded-l-none z-11 bg-green-700"
                      isIconOnly
                      type="submit"
                    
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
  };

