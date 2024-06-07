"use client"

import React, { useState } from "react";
import Image from "next/image";
import car from "../../../public/car.jpg";
import { Input,Checkbox, Button } from "@nextui-org/react";
import { HeartIcon } from "../HeartIcon";
import Link from "next/link";
import { RangeCalendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { categories } from "../categories";
import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import grad1 from '../../public/grad1.jpg'
import { SearchIcon } from "../SearchIcon";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
function Bids() {
  const [selected, setSelected] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(true);

  let [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });
  interface Category {
    key: number;
    label: string;
    value: string;
  }
  const [isLoaded, setIsLoaded] = React.useState(false);

  const toggleLoad = () => {
    setIsLoaded(true);
  };
  const myTimeout = setTimeout(toggleLoad,500)
  if (init) {
    return (
      <div>
        <div
          aria-hidden="true"
          className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12"
        >
          <img
            src="https://nextui.org/gradients/docs-right.png"
            className="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs right background"
            data-loaded="true"
          />
        </div>
        <div
          aria-hidden="true"
          className="fixed md:hidden block dark:opacity-100 -bottom-[30%] -right-[95%] z-0 rotate-12"
        >
          <img
            src="https://nextui.org/gradients/docs-right.png"
            className="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs right background"
            data-loaded="true"
          />
        </div>
        <div
          aria-hidden="true"
          className="fixed hidden dark:md:block dark:opacity-80 -top-[30%] -left-[60%] z-0"
        >
          <img
            src="https://mundum.com/images/Gradient-2-min.png"
            className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs left background"
            data-loaded="true"
          />
        </div>
        <div
          aria-hidden="true"
          className="fixed md:hidden block dark:opacity-100 -bottom-[20%] -left-[70%] z-0"
        >
          <img
            src="https://mundum.com/images/Gradient-2-min.png"
            className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs left background"
            data-loaded="true"
          />
        </div>

        <div className="flex mt-10 z-16">
          <div className="left-menu xl:ml-16">
            <div className="hidden xl:flex flex-col my-8 mr-8 date">
              <h1 className="font-extrabold text-xl mb-4">Search By Product Name</h1>
              <Input classNames={{
                base: "max-w-full h-10",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }} placeholder="Type to search..." size='md' type="search" startContent={<SearchIcon/>}/>
            </div>
            <div className="hidden xl:flex flex-col my-8 mr-8 date">
              <h1 className="font-extrabold text-xl mb-4">Search By Seller Name</h1>
              <Input classNames={{
                base: "max-w-full h-10",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }} placeholder="Type to search..." size='md' type="search" startContent={<SearchIcon/>}/>
            </div>
            <div className="hidden xl:flex flex-col my-8 mr-8 date">
              <h1 className="font-extrabold text-xl mb-4">Filter By Date</h1>
              <RangeCalendar
                className="flex w-full justify-center opacity-90"
                aria-label="Data (Controlled)"
                value={value}
                onChange={setValue}
                style={{border: "solid #272829",borderWidth:'thin'}}
              />
            </div>
            <div className="hidden xl:flex flex-col category">
              <h1 className="mb-3 font-extrabold text-xl">
                Filter By Category
              </h1>
              {categories.map((category: Category) => (
                <Checkbox
                  key={category.key}
                  className="mb-1"
                  size="md"
                  color="danger"
                  isSelected={selected}
                  onValueChange={setSelected}
                >
                  {category.label}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="flex flex-col flex-wrap bids xl:flex-row overflow-x-hidden" style={{alignItems:'center'}}>
            <div
              // key={item.prodId}
              className="flex flex-col baseinfo h-fit mx-4 my-2 p-5"
              style={{
                border: "solid #272829",
                width:'340px',
                // padding: "14px",
                borderWidth: "thin",
                borderRadius: "5px",
              }}
            >
              <Image
                src={car}
                className="w-full"
                style={{ borderRadius: "5px" }}
                alt="hello"
              />
              <div
                className="flex justify-between name font-extrabold my-4 text-2xl"
                style={{ alignItems: "center" }}
              >
                <h1>Electric Kettle</h1>
                <Button isIconOnly color="danger" aria-label="Like" startContent={<HeartIcon/>} style={{color:'white'}}>
                  
                </Button>
              </div>
              <div
                className="price font-extrabold text-2xl"
                style={{
                  background: "linear-gradient(45deg, cyan, yellow)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Rs.200
              </div>
              <div className="buttons flex justify-around mx-8 mt-8">
                <Button variant="ghost" color="success">
                  Buy Now
                </Button>
                <Button variant="ghost" color="danger">
                  <Link passHref={true} href={`/product/1`}>
                    More Details
                  </Link>
                </Button>
              </div>
            </div>
            <div
              // key={item.prodId}
              className="flex flex-col baseinfo h-fit mx-4 my-2 p-5"
              style={{
                border: "solid #272829",
                width:'340px',
                // padding: "14px",
                borderWidth: "thin",
                borderRadius: "5px",
              }}
            >
              <Image
                src={car}
                className="w-full"
                style={{ borderRadius: "5px" }}
                alt="hello"
              />
              <div
                className="flex justify-between name font-extrabold my-4 text-2xl"
                style={{ alignItems: "center" }}
              >
                <h1>Electric Kettle</h1>
                <Button isIconOnly color="danger" aria-label="Like">
                  {/* <HeartIcon x /> */}
                </Button>
              </div>
              <div
                className="price font-extrabold text-2xl"
                style={{
                  background: "linear-gradient(45deg, cyan, yellow)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Rs.200
              </div>
              <div className="buttons flex justify-around mx-8 mt-8">
                <Button variant="ghost" color="success">
                  Buy Now
                </Button>
                <Button variant="ghost" color="danger">
                  <Link passHref={true} href={`/product/1`}>
                    More Details
                  </Link>
                </Button>
              </div>
            </div>
            <div
              // key={item.prodId}
              className="flex flex-col baseinfo h-fit mx-4 my-2 p-5"
              style={{
                border: "solid #272829",
                width:'340px',
                // padding: "14px",
                borderWidth: "thin",
                borderRadius: "5px",
              }}
            >
              <Image
                src={car}
                className="w-full"
                style={{ borderRadius: "5px" }}
                alt="hello"
              />
              <div
                className="flex justify-between name font-extrabold my-4 text-2xl"
                style={{ alignItems: "center" }}
              >
                <h1>Electric Kettle</h1>
                <Button isIconOnly color="danger" aria-label="Like">
                  {/* <HeartIcon x /> */}
                </Button>
              </div>
              <div
                className="price font-extrabold text-2xl"
                style={{
                  background: "linear-gradient(45deg, cyan, yellow)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Rs.200
              </div>
              <div className="buttons flex justify-around mx-8 mt-8">
                <Button variant="ghost" color="success">
                  Buy Now
                </Button>
                <Button variant="ghost" color="danger">
                  <Link passHref={true} href={`/product/1`}>
                    More Details
                  </Link>
                </Button>
              </div>
            </div>
            <div
              // key={item.prodId}
              className="flex flex-col baseinfo h-fit mx-4 my-2 p-5"
              style={{
                border: "solid #272829",
                width:'340px',
                // padding: "14px",
                borderWidth: "thin",
                borderRadius: "5px",
              }}
            >
              <Image
                src={car}
                className="w-full"
                style={{ borderRadius: "5px" }}
                alt="hello"
              />
              <div
                className="flex justify-between name font-extrabold my-4 text-2xl"
                style={{ alignItems: "center" }}
              >
                <h1>Electric Kettle</h1>
                <Button isIconOnly color="danger" aria-label="Like">
                  {/* <HeartIcon x /> */}
                </Button>
              </div>
              <div
                className="price font-extrabold text-2xl"
                style={{
                  background: "linear-gradient(45deg, cyan, yellow)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Rs.200
              </div>
              <div className="buttons flex justify-around mx-8 mt-8">
                <Button variant="ghost" color="success">
                  Buy Now
                </Button>
                <Button variant="ghost" color="danger">
                  <Link passHref={true} href={`/product/1`}>
                    More Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bids;
