'use client'

import React, { use, useEffect, useState } from "react";
import { Chart as ChartJS,ArcElement,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,Filler, } from "chart.js";
import {Line} from 'react-chartjs-2'
import { useSession } from "next-auth/react";
import { Button,Image } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import Link from "next/link";
import { HeartIcon } from "../HeartIcon";

import Sidebar from "../components/Sidebar";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,PointElement,LineElement,Title,Tooltip,Legend,Filler
)

interface Bid {
    userID: string;
    productID: string;
    image: { url: string }[];
    name: string;
    description: string;
    category: string;
    price: number;
  }

export default function App(){
    const { data: session } = useSession();
    const [charData,setChartData] = useState({})
    const userEmail = session?.user?.email
    const [bids,setBids] = useState([])

    const [value, setValue] = useState({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      });
      const [searchpn, setSearchpn] = useState<string>("");
      const [searchsn, setSearchsn] = useState<string>("");
      const [isLoaded, setIsLoaded] = useState(false);
      const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
      for (let category of selectedCategories) {
        console.log(category);
      }


    const getBidsByUser = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/getbids?userEmail=${userEmail}`
          );
          if (response.ok) {
            const data = await response.json();
            setBids(data.productbyUserID);
          }
        } catch (e) {
          console.error(e);
        }
      };
      useEffect(()=>{
        getBidsByUser()
      },[bids])
      console.log(bids)


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
      {/* <div className="left-menu xl:ml-16 overflow-y-auto h-screen fixed top-0 left-0 p-4"> */}
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
      {/* </div> */}
      <div className="flex-1 z-10">
        <div className="flex flex-wrap " style={{marginLeft:'400px'}}>
          {bids.map((bid: Bid) => (
            <div
              key={bid.productID}
              className="flex flex-col baseinfo h-fit mx-4 my-2 p-5"
              style={{
                border: "solid #272829",
                width: "340px",
                borderWidth: "thin",
                borderRadius: "5px",
              }}
            >
              <Image
                src={bid.image[0].url}
                className="w-full h-1/2"
                width={300}
                height={300}
                style={{ borderRadius: "5px" }}
                alt={bid.name}
              />
              <div
                className="flex justify-between name font-extrabold my-4 text-2xl"
                style={{ alignItems: "center" }}
              >
                <h1>{bid.name}</h1>
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Like"
                  startContent={<HeartIcon />}
                  style={{ color: "white" }}
                ></Button>
              </div>
              <div
                className="price font-extrabold text-2xl"
                style={{
                  background: "linear-gradient(45deg, cyan, yellow)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Rs {bid.price}
              </div>
              <div className="buttons flex justify-around mx-8 mt-8">
                <Button variant="ghost" color="success">
                  Buy Now
                </Button>
                <Button variant="ghost" color="danger">
                  <Link
                    passHref={true}
                    href={{ pathname: `/yourbids/${bid.productID}`, query: { id: bid.productID } }}
                  >
                    More Details
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      )
}