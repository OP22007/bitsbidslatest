import React from "react";
import { Input, Checkbox } from "@nextui-org/react";
import { RangeCalendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { categories } from "../categories";
import { SearchIcon } from "../SearchIcon";
import Scroll from "./SmoothScroll";

interface Category {
  key: number;
  label: string;
  value: string;
}

interface SidebarProps {
  searchpn: string;
  setSearchpn: (value: string) => void;
  searchsn: string;
  setSearchsn: (value: string) => void;
  value: { start: any; end: any };
  setValue: (value: { start: any; end: any }) => void;
  selectedCategories: string[];
  handleCategoryChange: (category: string, isSelected: boolean) => void;
}

function Sidebar({
  searchpn,
  setSearchpn,
  searchsn,
  setSearchsn,
  value,
  setValue,
  selectedCategories,
  handleCategoryChange,
}: SidebarProps) {
  return (
    <div className="left-menu xl:ml-16 overflow-y-auto h-full p-2 z-20 fixed" >
      <div className="hidden xl:flex flex-col my-8 mr-8">
        <h1 className="font-extrabold text-xl mb-4">Search By Product Name</h1>
        <Input
          classNames={{
            base: "max-w-full h-10",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="md"
          type="search"
          value={searchpn}
          onChange={(e) => setSearchpn(e.target.value)}
          startContent={<SearchIcon />}
        />
      </div>
      <div className="hidden xl:flex flex-col my-8 mr-8">
        <h1 className="font-extrabold text-xl mb-4">Search By Seller Name</h1>
        <Input
          classNames={{
            base: "max-w-full h-10",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          value={searchsn}
          onChange={(e) => setSearchsn(e.target.value)}
          size="md"
          type="search"
          startContent={<SearchIcon />}
        />
      </div>
      <div className="hidden xl:flex flex-col my-8 mr-8">
        <h1 className="font-extrabold text-xl mb-4">Filter By Date</h1>
        <RangeCalendar
          className="flex w-full justify-center opacity-90"
          aria-label="Data (Controlled)"
          value={value}
          onChange={setValue}
          style={{ border: "solid #272829", borderWidth: "thin" }}
        />
      </div>
      <div className="hidden xl:flex flex-col mb-28">
        <h1 className="mb-3 font-extrabold text-xl">Filter By Category</h1>
        {categories.map((category: Category) => (
          <Checkbox
            key={category.key}
            className="mb-1"
            size="md"
            color="danger"
            isSelected={selectedCategories.includes(category.value.toString())}
            onValueChange={(isSelected) => handleCategoryChange(category.value, isSelected)}
          >
            {category.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
