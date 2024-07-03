"use client";

import React, { useState, useEffect } from "react";
import { Input, Checkbox, Button, Image } from "@nextui-org/react";
import { HeartIcon } from "../HeartIcon";
import Link from "next/link";
import { RangeCalendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { categories } from "../categories";
import { SearchIcon } from "../SearchIcon";
import Sidebar from "../components/Sidebar";
import {motion} from 'framer-motion'
import { slideInFromLeft, slideInFromTop } from "../utils/motion";


interface Category {
  key: number;
  label: string;
  value: string;
}

interface Bid {
  userID: string;
  productID: string;
  image: { url: string }[];
  name: string;
  description: string;
  category: string;
  price: number;
}

function Bids() {
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });
  const [searchpn, setSearchpn] = useState<string>("");
  const [searchsn, setSearchsn] = useState<string>("");
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  for (let category of selectedCategories) {
    console.log(category);
  }
  const getBids = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getbids");
      if (response.ok) {
        const data = await response.json();
        setBids(data.products);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getBidsByProductandSellerName = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getbids?productName=${searchpn}&sellerName=${searchsn}&category=${selectedCategories}`
      );
      if (response.ok) {
        const data = await response.json();
        setBids(data.productsBySandPName);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCategoryChange = (category: string, isSelected: boolean) => {
    setSelectedCategories((prev) =>
      isSelected ? [...prev, category] : prev.filter((cat) => cat !== category)
    );
  };

  useEffect(() => {
    getBids();
    const timeout = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    getBidsByProductandSellerName();
  }, [searchpn, searchsn,selectedCategories]);

  return (
    
    <div className="flex mt-10">

      <div aria-hidden="true" className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-10 rotate-12">
        <img src="https://nextui.org/gradients/docs-right.png" className="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" alt="docs right background" data-loaded="true" />
      </div>
      <div aria-hidden="true" className="fixed hidden dark:md:block dark:opacity-100 -bottom-[40%] -left-[15%] z-0">
        <img src="https://nextui.org/gradients/docs-left.png" className="relative z-0 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" alt="docs left background" data-loaded="true" />
      </div>
      <motion.div initial="hidden" animate="visible" variants={slideInFromLeft(0.5)} className="">
        <Sidebar
          searchpn={searchpn}
          setSearchpn={setSearchpn}
          searchsn={searchsn}
          setSearchsn={setSearchsn}
          value={value}
          setValue={setValue}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
        />
      </motion.div>
      <div className="flex-1 z-10">
        <div className="hidden md:flex flex-wrap" style={{marginLeft:'400px'}}>
          {bids.map((bid: Bid) => (
            <motion.div
              key={bid.productID}
              initial="hidden"
              animate="visible"
              variants={slideInFromTop}
              className="flex flex-col baseinfo mx-4 my-2 p-5"
              style={{
                border: "solid #272829",
                width: "240px",
                height:"440px",
                borderWidth: "thin",
                borderRadius: "5px",
              }}
            >
              <Image
                src={bid.image[0].url}
                className="w-full"
                // width={300}
                // height={300}
                style={{ borderRadius: "5px",width:'200px',height:'250px' }}
                alt={bid.name}
              />
              <div
                className="flex justify-between name font-bold mt-4 h-10 text-lg"
                style={{ alignItems: "start" }}
              >
                <h1 className="h-fit">{bid.name}</h1>
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Like"
                  startContent={<HeartIcon />}
                  style={{ color: "white" }}
                ></Button>
              </div>
              <div
                className="price font-extrabold text-lg mt-2"
                style={{
                  background: "linear-gradient(45deg, cyan, yellow)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Rs {bid.price}
              </div>
              <div className="buttons flex justify-around mt-4 gap-3">
                <Button variant="ghost" color="success">
                  Buy Now
                </Button>
                <Button variant="ghost" color="danger">
                  <Link
                    passHref={true}
                    href={{ pathname: `/bids/${bid.productID}`, query: { id: bid.productID } }}
                  >
                    More Details
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center md:hidden">
          {bids.map((bid: Bid) => (
            <motion.div
              key={bid.productID}
              initial="hidden"
              animate="visible"
              variants={slideInFromTop}
              className="flex flex-col baseinfo mx-3 my-2 p-3"
              style={{
                border: "solid #272829",
                width: "170px",
                borderWidth: "thin",
                borderRadius: "5px",
              }}
            >
              <Image
                src={bid.image[0].url}
                className="w-full"
                // width={300}
                // height={300}
                style={{ borderRadius: "5px",width:'170px',height:'160px' }}
                alt={bid.name}
              />
              <div
                className="flex justify-between name font-bold mt-4 text-lg"
                style={{ alignItems: "center" }}
              >
                <h1 className="overflow-hidden h-8">{bid.name}</h1>
                {/* <Button
                  isIconOnly
                  color="danger"
                  // size="sm"
                  aria-label="Like"
                  startContent={<HeartIcon />}
                  style={{ color: "white",width:'10px' }}
                ></Button> */}
              </div>
              <div
                className="price font-extrabold text-lg"
                style={{
                  background: "linear-gradient(45deg, cyan, yellow)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Rs {bid.price}
              </div>
              <div className="buttons flex  mt-2">
                <Button className="mr-2" variant="ghost"size="sm" color="success">
                  Buy Now
                </Button>
                <Button variant="ghost" size="sm" color="danger" style={{width:'100px'}}>
                  <Link
                    passHref={true}
                    href={{ pathname: `/bids/${bid.productID}`, query: { id: bid.productID } }}
                  >
                    More Details
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bids;
