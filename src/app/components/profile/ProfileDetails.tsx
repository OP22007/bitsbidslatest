'use client';
// import { Button } from "@nextui-org/react";
// import { Button } from "@mui/material";
import { EditIcon } from "./EditIcon";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Input,Button } from "@nextui-org/react";
interface User{
  userId:string,
  name:string,
  age:number,
  phone:number,
  email:string,
}
interface HeaderProps {
  user:User
}
export default function ProfileDetails({user}:HeaderProps) {
  const session = useSession();
  const email = session.data?.user?.email;
  const [edit,setEdit] = useState<boolean>(false)
  const[phone,setPhone] = useState<number>(user?user.phone:0);
  const [age,setAge] = useState<number>(user?user.age:0)
  const [name,setName] = useState<string>(user?user.name:"");
  // const [user, setUser] = useState(null);
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { email,name,age,phone };
    const res = await fetch("http://localhost:3000/api/adduser", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    if (response.success) {
      alert("Profile Details Succesfully changed");
    } else {
      alert("Something went wrong");
    }
    // setName("");
    // setAge(0);
    // setPhone(0);
 };
  
  return (
    <div className="p-9 w-[430px] bg-zinc-900 rounded-lg border-small text-white" style={{ border: "solid #303136 2px", borderRadius: '50px' }}>
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-5">Customer Details</h2>
        <Button onClick={()=>setEdit(!edit)} className="w-fit bg-transparent" style={{ borderRadius: '50%' }}><EditIcon /></Button>
      </div>
      <div className="flex flex-col w-full">
        {user &&!edit && (
          <ul className="">
            <li className="mb-5"><span className="mr-28 text-[#999999]">Email:</span>{email}</li>
            <li className="my-5"><span className="mr-10 text-[#999999]">Phone number:</span> (+91) {user.phone}</li>
            <li className="my-5"><span className="mr-[120px] text-[#999999]">Age:</span>{user.age}</li>
            <li className="my-5"><span className="mr-[77px] text-[#999999]">Username:</span>{user.name}</li>
            <li className="mt-5"><span className="mr-[113px] text-[#999999]">Role: </span>UI/UX Designer</li>
          </ul>
        )}
        {user &&edit && (
          <form className="flex flex-col gap-4 justify-center" onSubmit={onSubmitForm}>
            <div className="flex">
            <span className="mr-[111px] text-[#999999]">Email:</span>
            <Input size="sm" isDisabled className="h-[10px]" value={user.email} variant="bordered" color="success"/>
            </div>
            <div className="flex">
            <span className="w-3/4  text-[#999999]">Phone number:</span> 
            <Input size='sm' className="h-[10px]" variant="bordered" color="success" value={phone} onChange={(e)=>{setPhone(Number(e.target.value))}}/>
            </div>
            <div className="flex">
            <span className="mr-[120px] text-[#999999]">Age:</span> 
            <Input size='sm' className="h-[10px]" variant="bordered" color="success" value={age} onChange={(e)=>{setAge(Number(e.target.value))}} />
            </div>
            <div className="flex">
            <span className="mr-[77px] text-[#999999]">Username:</span> 
            <Input size='sm' variant="bordered" value={name} onChange={(e)=>{setName(e.target.value)}} color="success"/>
            </div>
            <div className="flex">
            <span className="mr-[117px] text-[#999999]">Role:</span> 
            <Input size='sm'className="h-[10px]" isDisabled value={"UI/UX Designer"} variant="bordered" color="success"/>
            </div>
            <div className="flex">
            <Button size='sm'className="" type="submit" variant="ghost" color="success">Submit</Button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
