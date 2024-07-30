import React from "react";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "../SearchIcon";
import { Avatar } from "@nextui-org/react";

const TopBar = ({ profile, name, email, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-between items-center p-4 h-12 border-b bg-neutral-800 relative z-20">
      <div className="flex">
        <div>
          <Avatar className="mt-0.5" src={profile} />
        </div>
        <div className="flex-col ml-5">
          <p className="text-md font-bold">{name}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>
      <div className="mr-5">
        <form role="search" method="get" className="search-form" action="">
          <label>
            <input
              type="search"
              className="search-field ml-2"
              placeholder="Search messages…"
              value=""
              name="s"
              title="Search for:"
            />
          </label>
          <input type="submit" className="search-submit" value="Search" />
        </form>
      </div>
    </div>
  );
};

export default TopBar;
