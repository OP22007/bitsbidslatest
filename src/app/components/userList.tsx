import React from "react";
import {User} from "@nextui-org/react";
import  samplejson from "./MOCK_DATA.json"
import { useState,useEffect } from "react";

// code to send a get req to fetch a users list

// some pre processing in list to personalise list for each user


    console.log(samplejson.users[0].first_name);

export default function App() {
    interface User {     
        userID: string;
        name: string;
        age : Number;
        phone: Number;
        email: string;
      }
const [users,setUsers]= useState<Array<User>>([]);
const getUsers =async ()=>{
  try {
    const responce  = await fetch("http://localhost:3000/api/getusers",{
        method :"GET",
    })
    if(responce){
        const data = await responce.json();
        console.log(data);
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
    <div id="userList" className="userlist mt-2 ">
     
    {
        users.map((element)=>(
            <div className="mb-4 p-2 rounded-xl" >
            
              
                <User   
             name={element.name}
             description={element.email}
             avatarProps={{
               src: `http://dummyimage.com/157x100.png/cc0000/ffffff`
             }}
           />
               
           </div>
        ))
    }
   
  
    </div>
    </>
  );
}

