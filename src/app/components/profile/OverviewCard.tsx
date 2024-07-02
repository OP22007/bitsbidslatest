// import { Button } from "@mui/material";
'use client'
import { Divider,Button } from "@nextui-org/react"
import { BarIcon } from "./BarIcon";
import {useSpring,animated} from 'react-spring'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
function Number({n}){
  const {number} = useSpring({
    from:{number:0},
    number:n,
    delay:200,
    config:{mass:1,tension:20,friction:10}
  })
  return <animated.div >{number.to((n)=>n.toFixed(0))}</animated.div>
}
export default function OverviewCard() {
    const session = useSession();
    const user = session.data?.user
    console.log(user?.email)
    const [numberOfBids,setNumberOfBids] = useState<number>(0)
    const [numberOfProducts,setNumberOfProducts] = useState<number>(0)
    const [totalBids,setTotalBids] = useState<number>(0)
    const getBids = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getusers?email=${user?.email}`);
        if (response.ok) {
          const data = await response.json();
          setNumberOfBids(data.numberOfBids);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const getProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getproducts?email=${user?.email}`);
        if (response.ok) {
          const data = await response.json();
          setNumberOfProducts(data.numberOfProducts);
          setTotalBids(data.totalBids)
        }
      } catch (e) {
        console.error(e);
      }
    };
    useEffect(()=>{
      getBids()
      getProducts()
    },[session])
    console.log(numberOfBids)
    return (
      <div className="p-10 w-[400px] h-fit  bg-opacity-70 bg-zinc-800 rounded-lg text-white " style={{borderRadius:'50px'}}>
        <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <Button className="bg-transparent" style={{borderRadius:'50%'}}><BarIcon/></Button>
        </div>
        <div className="flex justify-between">
          <div className="products">
            <p className="font-extrabold text-4xl"><Number n={numberOfProducts} /></p>
            <p className="font-light text-sm mt-4">products uploaded by you</p>
          </div>
          <div className="bids">
            <p className="font-extrabold text-4xl"><Number n={numberOfBids}/></p>
            <p className="font-light text-sm mt-4">bids done by you</p>
          </div>
        </div>
        <Divider className="mt-10" orientation="horizontal"/>
        <p className="mt-10 font-light text-sm "><span className="font-extrabold text-2xl"><Number n={totalBids}/></span>bids done till now</p>
      </div>
    );
  }
  