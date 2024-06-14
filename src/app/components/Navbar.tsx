'use client';

import React,{useState} from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button,Input,Checkbox,RangeCalendar,Dropdown,DropdownItem,DropdownMenu,DropdownTrigger} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";
// import { Avatar } from "@mui/material";
import {Avatar as Avatar2} from "@mui/material";
import { Avatar } from "@nextui-org/react";
import { categories } from "../categories";
// import { SearchIcon } from "@/pages/SearchIcon";
import { today, getLocalTimeZone } from "@internationalized/date";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
type NavbarProps= {
  logout:boolean
  user:Object
  key:number
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selected, setSelected] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(true);
  const session = useSession()
  const user = session.data?.user
  console.log(user?.image)
  let [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });
  interface Category {
    key: number;
    label: string;
    value: string;
  }
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0].toLocaleUpperCase()}`,
    };
  }
  
  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

        <NavbarBrand className="hidden sm:flex">
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 justify-center" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">   
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      {!user&&<NavbarContent justify="end">
       <NavbarItem >
        <Button variant="flat" color="success"><Link href="/login" color="success">Login</Link></Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="danger" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>}
      {user?.image&&<NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src={user.image}
              // color="secondary"
              // size="sm"
              // {...stringAvatar(`${user.name}`)}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" color="success" className="h-14 gap-1">
              <p className="font-semibold">Signed in as <span className="font-extrabold text-lg mx-1">{user.name}</span></p>
            </DropdownItem>
            <DropdownItem key="profile" color="warning">My Profile</DropdownItem>
            <DropdownItem key="update_profile" color="warning" >Update Profile</DropdownItem>
            <DropdownItem key="bids" color="warning">My Bids</DropdownItem>
            <DropdownItem onClick={()=>{signOut()}} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>}
      {user&&!(user?.image)&&<NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar2
              isBordered
              as="button"
              className="transition-transform"
              // color="secondary"
              // size="sm"
              {...stringAvatar(`${user.name}`)}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" color="success" className="h-14 gap-1">
              <p className="font-semibold">Signed in as <span className="font-extrabold text-lg mx-1">{user.name}</span></p>
            </DropdownItem>
            <DropdownItem key="profile" color="warning">My Profile</DropdownItem>
            <DropdownItem key="update_profile" color="warning" >Update Profile</DropdownItem>
            <DropdownItem key="bids" color="warning">My Bids</DropdownItem>
            <DropdownItem onClick={()=>{signOut()}} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>}

      <NavbarMenu className="dark">
            <NavbarMenuItem>
            <h1 className="font-extrabold text-xl mb-4 text-white">Search By Product Name</h1>
              <Input classNames={{
                base: "max-w-full h-10",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }} placeholder="Type to search..." size='md' type="search" />
            </NavbarMenuItem>
            <NavbarMenuItem className="mt-5">
            <h1 className="font-extrabold text-xl mb-4 text-white">Search By Seller Name</h1>
              <Input classNames={{
                base: "max-w-full h-10",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }} placeholder="Type to search..." size='md' type="search" />
            </NavbarMenuItem>
            <NavbarMenuItem className="flex flex-col mt-5" style={{width:'265px'}}>
              <h1 className="font-extrabold text-xl mb-4 text-white">Filter By Date</h1>
            </NavbarMenuItem>
            <NavbarMenuItem className="flex flex-col justify-center" style={{alignItems:'center'}}>
              <RangeCalendar
                className="flex w-full justify-center opacity-90 justify-self-center"
                aria-label="Data (Controlled)"
                value={value}
                onChange={setValue}
                style={{border: "solid #272829",borderWidth:'thin',alignSelf:'center',width:'262px'}}
              />
              </NavbarMenuItem>
            <NavbarMenuItem className="mt-5 mb-20">
            <h1 className="mb-3 font-extrabold text-xl text-white">
                Filter By Category
              </h1>
              {categories.map((category: Category) => (
                <Checkbox
                  key={category.key}
                  className="mb-1 mx-2"
                  size="md"
                  color="danger"
                  isSelected={selected}
                  onValueChange={setSelected}
                >
                  {category.label}
                </Checkbox>
              ))}
            </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
