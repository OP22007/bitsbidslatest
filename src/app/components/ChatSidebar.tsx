import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge, Divider, User } from "@nextui-org/react";
import { Textarea, Input } from "@nextui-org/input";
import UserList from "../components/userList";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Socket, io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { Avatar as MuiAvatar } from "@mui/material";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { SearchIcon } from "../SearchIcon";
import bg from "../../../public/ChatBg.jpg";
import TopBar from "./TopBar";

export function SidebarDemo() {
  const { data: session } = useSession();
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/myprofile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          {!open && (
            <div className="ml-16 font-bold text-xl bottom-2 relative">
              Chats
            </div>
          )}
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link}/>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${session?.user?.name}`,
                href: "#",
                icon: (
                  <Image
                    src={session?.user?.image}
                    className="h-7 w-7 flex-shrink-0 rounded-full cursor-default"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-black text-xl font-bold dark:text-white whitespace-pre"
      >
        BITSBids
      </motion.span>
    </Link>
  );
};

export const LogoIcon = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = () => {
  const { data: session } = useSession();
  const [chats, setChats] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [name, setName] = useState<string>("Click to Open Chat");
  const [email, setEmail] = useState<string>("Users Email appears here");
  const [receiverID, setReceiverID] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [roomCode, setRoomcode] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const user = session?.user;

  useEffect(() => {
    const newSocket = io("http://localhost:3002");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("addNewUser", user?.email);
      socket.on("getOnlineUsers", (res) => {
        setOnlineUsers(res);
      });
      socket.on("refresh", fetchChats);
      socket.on("Message", fetchChats);
    }
    return () => {
      if (socket) {
        socket.off("getOnlineUsers");
        socket.off("refresh");
        socket.off("Message");
      }
    };
  }, [socket, user?.email]);

  const createRoomCode = () => {
    const factor = user?.email?.localeCompare(email);
    const roomName = factor === -1 ? user?.email + email : email + user?.email;
    if (roomCode) {
      socket?.emit("LeaveRoom", roomCode);
    }
    setRoomcode(roomName);
    socket?.emit("joinRoom", roomName);
  };

  useEffect(() => {
    if (session && email) {
      createRoomCode();
      fetchChats();
    }
  }, [email, session]);

  const handleData = async (
    userID: string,
    username: string,
    useremail: string
  ) => {
    setReceiverID(userID);
    setName(username);
    setEmail(useremail);
    createRoomCode();
    await fetchChats();
  };

  const fetchChats = async () => {
    if (session && email) {
      const roomName =
        roomCode ||
        (user?.email?.localeCompare(email) === -1
          ? user?.email + email
          : email + user?.email);
      try {
        const response = await fetch(
          `http://localhost:3000/api/getchats?ChatID=${encodeURIComponent(
            roomName
          )}`,
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
    createRoomCode();
    const senderEmail = user?.email || "";
    const myChat = {
      ChatID: roomCode,
      senderID: senderEmail,
      receiverID: email,
      message: inputValue,
    };

    if (socket)
      socket.emit("private message", email, inputValue, senderEmail, roomCode);

    try {
      const res = await fetch("http://localhost:3000/api/addchats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myChat),
      });
      if (res.ok) {
        setInputValue("");
        socket?.emit("Refresh", roomCode);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  interface User {
    userID: string;
    name: string;
    age: Number;
    phone: Number;
    email: string;
  }

  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getusers", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        const filteredUsers = data.users.filter(
          (user: User) => user.email !== session?.user?.email
        );
        setUsers(filteredUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersByName = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getusers?name=${searchTerm}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        const filteredUsers = data.usersByName.filter(
          (user: User) => user.email !== session?.user?.email
        );
        setUsers(filteredUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [session]);

  useEffect(() => {
    getUsersByName();
  }, [searchTerm]);

  return (
    <div className="flex flex-1">
      <div className="p-2 md:mt-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={25} minSize={25}>
            <div className="flex flex-col h-full">
              <Input
                type="text"
                className="p-2"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                startContent={<SearchIcon />}
              />
              <div className="flex flex-grow overflow-y-scroll mb-10 h-full flex-col w-full xl:items-start z-10">
                <UserList
                  sendUserProfile={handleData}
                  onlineUsers={onlineUsers}
                  currentUserEmail={user?.email}
                  users={users}
                />
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className="bg-gray-500 w-0.5" />
          <Panel minSize={30}>
            <div className="flex flex-col h-full chat-panel-bg">
            <TopBar
              profile={session?.user?.image}
                name={name}
                email={email}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <div className="flex-grow overflow-y-auto">
                <div className="chat-content p-4">
                  {chats &&
                    chats.map((chat: any, index: number) => (
                      <div
                        key={index}
                        className={`flex flex-wrap whitespace-break-spaces justify-between z-0 p-2 rounded-lg my-1 max-w-[30%] ${
                          chat.senderID === user?.email
                            ? "ml-auto mr-4 mb-2 bg-emerald-600 rounded-br-none"
                            : "mr-auto ml-4 mb-2 bg-zinc-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-wrap w-full break-words tracking-wide">
                          {chat.content}
                        </p>
                        <span className="text-xs opacity-65 mt-2 ml-auto">
                          {new Date(chat.createdAt).toLocaleString()}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex items-center mb-7 p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                <Textarea
                  type="text"
                  placeholder="Enter your message here..."
                  className="flex-grow mr-2"
                  minRows={1}
                  maxRows={5}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  radius="none"
                />
                <Button
                  className="send h-10 rounded-l-none bg-green-700"
                  isIconOnly
                  type="submit"
                  aria-label="Send"
                  onClick={sendMessage}
                >
                  <IoSend />
                </Button>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default SidebarDemo;
