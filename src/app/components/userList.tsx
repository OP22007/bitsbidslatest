import React from "react";
import {User} from "@nextui-org/react";
import  samplejson from "./MOCK_DATA.json"

// code to send a get req to fetch a users list

// some pre processing in list to personalise list for each user


    console.log(samplejson.users[0].first_name);

export default function App() {
  return (
    <>
    <div id="userList" className="userlist mt-2 ">
     
    {
        samplejson.users.map((element)=>(
            <div className="mb-4 p-2 rounded-xl" >
            
              
                <User   
             name={element.first_name}
             description="Last message frm user is displayed here"
             avatarProps={{
               src: `${element.image}`
             }}
           />
               
           </div>
        ))
    }
   
  
    </div>
    </>
  );
}

