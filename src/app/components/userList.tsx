import React from "react";
import {Avatar, User} from "@nextui-org/react";
import  samplejson from "./MOCK_DATA.json"
import { useState,useEffect } from "react";
import { Badge } from "@nextui-org/react";
import { Avatar as MuiAvatar } from "@mui/material";


// code to send a get req to fetch a users list

// some pre processing in list to personalise list for each user

export default function App({sendUserProfile,onlineUsers,currentUserEmail}){
  
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }
  console.log(onlineUsers)
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0].toLocaleUpperCase()}`,
    };
  }
 
   
    interface User {     
        userID: string;
        name: string;
        age : Number;
        phone: Number;
        email: string;
      }
    
  
      const OpenChat = async(userID:string,name:string, email:string)=>{
        
                await  sendUserProfile(userID,name, email);
      }
     console.log(currentUserEmail)
const [users,setUsers]= useState<Array<User>>([]);
const getUsers =async ()=>{
  try {
    const response  = await fetch("http://localhost:3000/api/getusers",{
        method :"GET",
    })
    if(response){
        const data = await response.json();
        const filteredUsers = data.users.filter(
          (user: User) => user.email !== currentUserEmail
        );
        setUsers(filteredUsers);

    }
}
    catch(err)
    {
        console.log(err)
    }

  };
  useEffect(()=>{
    getUsers();
  },[]);
  return (
    <>
    <div id="userList flex flex-col" className="userlist mt-2 ">
     
    {
        users.map((element)=>(
           
            <div key={element.userID} className="mb-4  p-2 rounded-xl" onClick={()=>{OpenChat(element.userID,element.name, element.email)}}>
            
                <div   
                className="flex"
                style={{alignItems:'center'}}
                onClick={()=>{OpenChat(element.userID,element.name, element.email)}}>
                {onlineUsers?.some((user:any)=>user?.userID===element.email)&&
               <Badge content='5' size="sm" color="success" className="text-transparent">
               <MuiAvatar
                  isBordered
                  // as="button"
                  className="transition-transform"
                  {...stringAvatar(`${element.name}`)}
                />
               </Badge>
                }
                {!onlineUsers?.some((user:any)=>user?.userID===element.email)&&
               <Badge content='5' size="sm" color="danger" className="text-transparent">
               <MuiAvatar
                  isBordered
                  // as="button"
                  className="transition-transform"
                  {...stringAvatar(`${element.name}`)}
                />
               </Badge>
                }
               <div>
                <p className="ml-3 font-bold text-md">{element.name}</p>
                <p className="ml-3 text-sm font-extralight">{element.email}</p>
                </div>
           </div>
           </div>
        ))
     
    }
   
  
    </div>
    </>
  );
}

