// import strip from ''
import { Image, Avatar, Button } from "@nextui-org/react";
import { BillIcon } from "./BillIcon";
import { Divider } from "@nextui-org/react";
import { Cube } from "./Cube";
interface User {
  userId: string;
  name: string;
  age: number;
  phone: number;
  email: string;
  createdAt: Date;
  lastLoginAt:Date;
}

interface HeaderProps {
  user: User | null;
}
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function Header({ user }: HeaderProps) {
  return (
    <div className="mx-6 bg-zinc-800 h-fit rounded-3xl mt-2">
      <div className="flex relative text-xl font-bold w-[100%] text-white top-20 z-10 justify-end right-10">
        Free Subscription
      </div>
      <Image
        src="/strip2.png"
        className="w-[1700px] rotate-180 scale-y-[-1] h-[150px] relative z-1"
      />
      {user && (
        <>
          <Avatar
            isBordered
            src="/car.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full ml-20 relative z-3 bottom-12"
          />
          <div className="flex items-center justify-between ml-16 relative bottom-8">
            <div className="flex items-center">
              <div className="ml-4 text-white">
                <div className="flex items-center">
                  <h1 className="text-4xl font-bold mb-2 mr-7">{user.name}</h1>
                  <Button className="rounded-[100px]" variant="shadow">
                    Change
                  </Button>
                </div>
                <p className="text-sm text-[#999999]">
                  Registered at{" "}
                  <span>{months[new Date(user.createdAt).getMonth()]}</span>{" "}
                  {new Date(user.createdAt).getDate()},{" "}
                  {new Date(user.createdAt).getFullYear()}
                </p>
              </div>
              <Divider orientation="vertical" className="h-20 ml-12"/>
              <div className="flex flex-col justify-start ml-12">
              <Button startContent={<Cube/>} className="bg-transparent" isIconOnly/>
              <p className="text-sm ml-3 text-[#999999]">Last Login at{' '}<span>{months[new Date(user.lastLoginAt).getMonth()]}</span>{" "}
                  {new Date(user.lastLoginAt).getDate()},{" "}
                  {new Date(user.lastLoginAt).getFullYear()}</p>
              </div>
            </div>
            <Button
              className="bg-blue-700 px-4 py-2 rounded-3xl mr-10 text-white"
              startContent={<BillIcon />}
            >
              Manage Subscription
            </Button>
          </div>
        </>
      )}
      {!user && (
        <div className="ml-16 relative bottom-8 text-white">
          <p className="text-2xl">Loading user information...</p>
        </div>
      )}
    </div>
  );
}
