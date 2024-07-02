'use client';

import React, { useState } from "react";
import { 
  Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, 
  NavbarMenu, NavbarContent, NavbarItem, Link, Button, Input, 
  Checkbox, RangeCalendar, Dropdown, DropdownItem, DropdownMenu, 
  DropdownTrigger 
} from "@nextui-org/react";
import { Avatar as NextAvatar } from "@nextui-org/react";
import { Avatar as MuiAvatar } from "@mui/material";
import { categories } from "../categories";
import { today, getLocalTimeZone } from "@internationalized/date";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import logo from '../../../public/bitsbids.png'
import Sidebar from "./Sidebar";

type NavbarProps = {
  logout: boolean;
  user: Object;
  key: number;
};

interface Bid {
  userID: string;
  productID: string;
  image: { url: string }[];
  name: string;
  description: string;
  category: string;
  price: number;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(true);
  const session = useSession();
  const user = session.data?.user;


  let [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const [searchpn, setSearchpn] = useState<string>("");
  const [searchsn, setSearchsn] = useState<string>("");
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleCategoryChange = (category: string, isSelected: boolean) => {
    setSelectedCategories((prev) =>
      isSelected ? [...prev, category] : prev.filter((cat) => cat !== category)
    );
  };

  interface Category {
    key: number;
    label: string;
    value: string;
  }

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

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0].toLocaleUpperCase()}`,
    };
  }

  return (
    <Navbar className="dark" isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-xl text-inherit">BITSBids</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarBrand className="hidden sm:flex">
        <p className="font-bold text-2xl text-inherit">BITSBids</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 justify-center">
        <NavbarItem>
          <Link color="foreground" href="#">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">   
            Bids
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Chats
          </Link>
        </NavbarItem>
      </NavbarContent>

      {session.status==='unauthenticated' && (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button variant="flat" color="success">
              <Link href="/login" color="success">Login</Link>
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} color="danger" href="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      {session.status==='loading' && (
        <NavbarContent justify="end">
          
        </NavbarContent>
      )}

      {session.status==='authenticated' && (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {user.image ? (
                <NextAvatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src={user.image}
                />
              ) : (
                <MuiAvatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  {...stringAvatar(`${user.name}`)}
                />
              )}
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" color="success" className="h-14 gap-1">
                <p className="font-semibold">Signed in as <span className="font-extrabold text-lg mx-1">{user.name}</span></p>
              </DropdownItem>
              <DropdownItem key="profile" href="/myprofile" color="warning">My Profile</DropdownItem>
              <DropdownItem key="update_profile" color="warning">Update Profile</DropdownItem>
              <DropdownItem key="bids" color="warning" href="/yourbids" >My Bids</DropdownItem>
              <DropdownItem onClick={() => signOut()} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}

      <NavbarMenu className="dark">
          <Sidebar searchpn={searchpn}
          setSearchpn={setSearchpn}
          searchsn={searchsn}
          setSearchsn={setSearchsn}
          value={value}
          setValue={setValue}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}/>
        {/* <NavbarMenuItem>
          <h1 className="font-extrabold text-xl mb-4 text-white">Search By Product Name</h1>
          <Input 
            classNames={{
              base: "max-w-full h-10",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }} 
            placeholder="Type to search..." 
            size='md' 
            type="search" 
          />
        </NavbarMenuItem>
        <NavbarMenuItem className="mt-5">
          <h1 className="font-extrabold text-xl mb-4 text-white">Search By Seller Name</h1>
          <Input 
            classNames={{
              base: "max-w-full h-10",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }} 
            placeholder="Type to search..." 
            size='md' 
            type="search" 
          />
        </NavbarMenuItem>
        <NavbarMenuItem className="flex flex-col mt-5" style={{ width: '265px' }}>
          <h1 className="font-extrabold text-xl mb-4 text-white">Filter By Date</h1>
          <RangeCalendar
            className="flex w-full justify-center opacity-90 justify-self-center"
            aria-label="Data (Controlled)"
            value={value}
            onChange={setValue}
            style={{ border: "solid #272829", borderWidth: 'thin', alignSelf: 'center', width: '262px' }}
          />
        </NavbarMenuItem>
        <NavbarMenuItem className="mt-5 mb-20">
          <h1 className="mb-3 font-extrabold text-xl text-white">Filter By Category</h1>
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
        </NavbarMenuItem> */}
      </NavbarMenu>
    </Navbar>
  );
}
