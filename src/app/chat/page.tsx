"use client"
import React, { useEffect, useState } from "react";
import { User } from "@nextui-org/react";
import ChatModel,{Message,ChatDocument,Conversation,ChatInput} from "../../../models/chat.models";
import { Textarea } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import UserList from "../components/userList";
import { Button } from "@nextui-org/react";
<<<<<<< HEAD
import { useSession } from "next-auth/react";
export default function Chat() {
  const session = useSession()
  const [chats,setChats]= useState();
=======
import { io } from "socket.io-client";
import { useSession } from 'next-auth/react';
import { Socket } from "socket.io";
export default function Chat() {
  const session = useSession()
  const user = session.data?.user
  const socket = io('http://localhost:3001',{autoConnect:false})
 const [inbox,setInbox] = useState<any>([])
 const [message,setMessage] = useState<string>("")
 const [roomName,setRoomName] = useState("")
>>>>>>> 0e5f718 (Added Google OAuth now users can login both by Google and Credentials)
 const [name,setName]=useState("Click to Open Chat ");
 const [inputValue, setInputValue] = useState<string>('');
 const [email,setEmail]=useState(" Users Email appeares here");
<<<<<<< HEAD
 const handleData =   (username:string, useremail:string)=>{
  setName(username);
 setEmail(useremail);
 fetchChats();
  // console.log(name+ " "+email)
=======
 
 function handleSubmit(e:{preventDefault:()=>void}){
   e.preventDefault();
   socket.emit("private message",{to:email,message,from:user})
   console.log(message)
   setMessage("")
 }
  if(user){
    const email = user.email
    socket.auth={email}
    socket.connect()
  }
  io.on("connection", (socket:Socket) => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        email: socket.email,
      });
    }
    socket.emit("users", users);
    // ...
  });
  const handleData =   (username:string, useremail:string)=>{
    setName(username);
    setEmail(useremail);
    // console.log(name+ " "+email)
>>>>>>> 0e5f718 (Added Google OAuth now users can login both by Google and Credentials)
 }
 const fetchChats =async()=>{
  if(session)
    {


  console.log("here fetch")
  try {
    const response = await fetch(`http://localhost:3000/api/getchats?email=${encodeURIComponent(email)}`, {
      method: "GET",
    
    });
    if (response) {
      const data = await response.json();
      setChats(data.chatBlock);
      console.log(data)
    }
  } catch (e) {
    console.log(e);
  }
 }
}

 const Send= async()=>{

  if (inputValue === "null" || inputValue ===" ")
    {
         alert("Cannot send an empty text")
    }
    const user:String = session.data?.user?.name || '';
    const senderEmail:String = session.data?.user?.email || '';
    
  //console.log(user, senderEmail)

    console.log("sent something")
    const myChat = {
        username:`${user}`,
        userEmail: `${senderEmail}`,
        conversation: [
          {
            participantName: `${name}`,
            participantEmail: `${email}`,
            messages: [
              {
                content: `${inputValue}`,
                timestamp:`${new Date().toISOString()}`,
                sender: `${user}`
              },
            

            ]
          },

        ]
      };
    const res = await fetch("http://localhost:3000/api/addchats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myChat)
      });
      setInputValue("");
       }

  
 
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
                  <div className="flex flex-col  w-full  xl:items-start  z-10 p-2 bg-transparent">
                    <p className="text-xl  font-bold ml-1">Chats</p>
                    <UserList  sendUserProfile={handleData}></UserList>
                  </div>
                </div>
                <div className=" hidden right-8 fixed xl:w-8/12 overflow-y-auto  h-screen xl:flex items-center ml-4 ">
                  <div className=" flex flex-col w-full h-5/6 overflow-y-scroll bg-black/30 backdrop-blur-3xl mb-10 p-2 mt-2 rounded-xl ">
                    <div className="w-full bg-transparent border-b-1 border-gray-800 rounded-sm  p-2">
                    <User   
              name={name}
              description={email}
              avatarProps={{
                color:'primary'
              }}
              onChange={()=>{fetchChats()}}
            />
           
                    </div>
                     
        {/* <div className="flex top-14  gap-2.5">
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                 <p className="text-sm font-normal text-gray-900 dark:text-white"> That's awesome. I think our users will really appreciate the improvements.</p>
              </div>
        </div>
         */}
                    {inbox.map((message:string,index:number)=>(
                <div key={index}>{message}</div>
            ))}
                    <div className="w-11/12 right-8 bottom-4 flex fixed  h-12 flex-wrap flex-wrap-reverse items-center  justify-start">
                      <Textarea
                        type="text"
                        placeholder="Enter your message here..."
                        value={message}
                        onChange={(e)=>{setMessage(e.target.value)}}
                        className="chat-box w-11/12 flex  items-center"
                        minRows={1}
                        maxRows={5}
                        style={{}}
                        value={inputValue}
                        onChange={(event)=>{setInputValue(event.target.value);}}
                      ></Textarea>
                      <div className="options flex items-center justify-around w-1/12 h-12">
                        <Button
                          className="send h-9 ml-2 z-11 "
                          isIconOnly
                          type="submit"
                          onClick={handleSubmit}
                          color="success"
                          aria-label="Like"
                          onClick={()=>{Send()}}
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


