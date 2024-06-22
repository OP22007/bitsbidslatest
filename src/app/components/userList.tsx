import React from "react";
import {User} from "@nextui-org/react";
import  samplejson from "./MOCK_DATA.json"
import { useState,useEffect } from "react";

// code to send a get req to fetch a users list

// some pre processing in list to personalise list for each user



export default function App({sendUserProfile}){
 
   
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
     
const [users,setUsers]= useState<Array<User>>([]);
const getUsers =async ()=>{
  try {
    const responce  = await fetch("http://localhost:3000/api/getusers",{
        method :"GET",
    })
    if(responce){
        const data = await responce.json();
      //  console.log(data);
        setUsers(data.users)

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
            
              
                <User   
            id={element.userID}
             name={element.name}
             description={element.email}
            
             avatarProps={{
             color:"primary"
             }}
           onClick={()=>{OpenChat(element.userID,element.name, element.email)}}></User>
               
           </div>
        ))
     
    }
   
  
    </div>
    </>
  );
}

