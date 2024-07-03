"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { io } from "socket.io-client";
import Image from "next/image";
import { BagIcon } from "./BagIcon";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { RightArrowIcon } from "./RightArrowIcon";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Magnify } from "magnify-zone";
import ReactImageMagnifier from "simple-image-magnifier/react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  registerables,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables, zoomPlugin);

interface Bid {
  bidID: string;
  bidderID: string;
  price: number;
  time: Date;
}

interface Product {
  userID: string;
  productID: string;
  image: { url: string }[];
  name: string;
  description: string;
  category: string;
  price: number;
}

interface User {
  userId: string;
  name: string;
  age: number;
  phone: number;
  email: string;
}

export default function Bid() {
  const [product, setProduct] = useState<Product | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [seller, setSeller] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const productID = searchParams.get("id");
  const [socket, setSocket] = useState<any>(null);
  const [chartData, setChartData] = useState({});
  const [bids, setBids] = useState<Bid[]>([]);
  const [filter, setFilter] = useState<string>("today");
  const chartRef = useRef(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:3002");
    setSocket(socketInstance);

    const joinRoom = () => {
      socketInstance.emit("joinRoom", productID);
    };

    const handleNewBid = (productID: string) => {
      if (price !== null) {
        setPrice((prevPrice) => (prevPrice !== null ? prevPrice + 50 : null));
      }
    };

    socketInstance.on("connect", joinRoom);
    socketInstance.on("new_bid", handleNewBid);

    return () => {
      socketInstance.off("connect", joinRoom);
      socketInstance.off("new_bid", handleNewBid);
      socketInstance.disconnect();
    };
  }, [price, productID]);

  const getProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getbids?productID=${productID}`
      );
      if (response.ok) {
        const data = await response.json();
        setProduct(data.productbyID);
        setPrice(Number(data.productbyID.price));
        getSeller(data.productbyID.userID); // Fetch the seller as soon as the product is fetched
        setBids(
          data.productbyID.bids.map((bid: any) => ({
            ...bid,
            time: new Date(bid.time),
          }))
        );
        setSelectedImage(data.productbyID.image[0].url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getSeller = async (userID: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getusers?userID=${userID}`
      );
      if (response.ok) {
        const data = await response.json();
        setSeller(data.userByID);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productID]);

  useEffect(() => {
    const filteredBids = bids.filter((bid) => {
      const now = new Date();
      const bidTime = new Date(bid.time);
      switch (filter) {
        case "today":
          return bidTime.toDateString() === now.toDateString();
        case "1day":
          return bidTime >= new Date(now.setDate(now.getDate() - 1));
        case "2days":
          return bidTime >= new Date(now.setDate(now.getDate() - 2));
        case "week":
          return bidTime >= new Date(now.setDate(now.getDate() - 7));
        default:
          return true;
      }
    });

    if (filteredBids.length > 0) {
      setChartData({
        labels: filteredBids.map((item: Bid) =>
          item.time.toLocaleDateString()
        ),
        datasets: [
          {
            label: "Filtered Bids",
            data: filteredBids.map((item: Bid) => item.price),
            fill: true,
            borderColor: "rgb(255,99,132)",
            backgroundColor: "rgba(255,99,132,0.3)",
            hoverBackgroundColor: "green",
            pointHitRadius: 4,
            pointHoverBackgroundColor: "green",
          },
        ],
      });
    } else {
      setChartData({
        labels: [],
        datasets: [],
      });
    }
  }, [bids, filter]);

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  const onSubmitForm = async () => {
    if (price === null || !socket) return;

    const body = { productID, price };
    const res = await fetch("http://localhost:3000/api/bidnow", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let response = await res.json();
    if (response.success) {
      socket.emit("new_bid", productID);
    } else {
      alert("Something is wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="flex gap-2 ml-36">
          <div className="text-[#999999] cursor-pointer">
            {product?.category} {" >"}
          </div>
          <div>{product?.name}</div>
        </div>
        <div className="flex flex-wrap -mx-4 mt-10">
          <div className="w-full md:w-1/2 px-4">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md ml-20">
                <ReactImageMagnifier
                  className="cursor-pointer w-[200px] h-[100px]"
                  srcPreview={selectedImage || product?.image[0].url}
                  srcOriginal={selectedImage || product?.image[0].url}
                  width={350}
                  height={450}
                />
              </div>
              <div className="flex space-x-4 mt-4">
                {product &&
                  product?.image?.length > 1 &&
                  product.image.map((img) => (
                    <Image
                      key={img.url}
                      src={img.url}
                      alt="Thumbnail"
                      width={75}
                      height={150}
                      className="rounded-lg cursor-pointer"
                      onClick={() => setSelectedImage(img.url)}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl tracking-wide mb-4">{product?.name}</h2>
              <div>
                <p
                  className="text-2xl font-semibold mr-40"
                  style={{
                    background: "linear-gradient(45deg,#85FFBD,#FFFB7D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ${price}
                </p>
                <p
                  className="text-sm font-extralight mb-4 mr-40"
                  style={{
                    background: "linear-gradient(45deg,#85FFBD,#FFFB7D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Inc. taxes
                </p>
              </div>
            </div>
            <p className="text-zinc-400 mb-10">Seller : {seller?.name}</p>
            <Accordion
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    height: "auto",
                    transition: {
                      height: {
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 1,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 1,
                      },
                    },
                  },
                  exit: {
                    y: -10,
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: {
                        easings: "ease",
                        duration: 0.25,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 0.3,
                      },
                    },
                  },
                },
              }}
              variant="bordered"
              className="mb-8 mr-40"
              style={{ width: "580px" }}
            >
              <AccordionItem
                className="text-zinc-400 p-2"
                title="Product Description"
              >
                {product?.description}
              </AccordionItem>
              <AccordionItem className="p-2" title="Previous Bids">
                <div>
                  <label>
                    Filter:
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="today">Today's Bids</option>
                      <option value="1day">1 Day Ago</option>
                      <option value="2days">2 Days Ago</option>
                      <option value="week">A Week Ago</option>
                    </select>
                  </label>
                  <button onClick={resetZoom}>Reset Zoom</button>
                </div>
                <div className="chart" style={{ width: "520px" }}>
                  {chartData.labels && chartData.labels.length > 0 && (
                    <Line
                      ref={chartRef}
                      data={chartData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: "top" },
                          title: { display: true, text: "Filtered Bids" },
                          zoom: {
                            zoom: {
                              wheel: { enabled: true },
                              pinch: { enabled: true },
                              mode: "xy",
                            },
                            pan: {
                              enabled: true,
                              mode: "xy",
                            },
                          },
                        },
                      }}
                    />
                  )}
                </div>
              </AccordionItem>
            </Accordion>
            <div className="mb-8 mt-12">
              <div className="flex justify-between items-center mr-48">
                <div className="flex space-x-5">
                  <button className="px-4 py-2 bg-zinc-800 rounded-full">S</button>
                  <button
                    className="px-4 py-2 bg-zinc-800 rounded-full text-[#6EE39A]"
                    style={{ border: "solid 2px #6EE39A" }}
                  >
                    M
                  </button>
                  <button className="px-4 py-2 bg-zinc-800 rounded-full">L</button>
                  <button className="px-4 py-2 bg-zinc-800 rounded-full">XL</button>
                </div>
                <u className="mb-2 underline-offset-4 text-[#999999]">
                  Sizing guide
                </u>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-12 mb-8">
              <Button
                startContent={<BagIcon />}
                type="submit"
                onClick={onSubmitForm}
                className="flex justify-center px-8 py-4 w-48 bg-[#1E1E1E] rounded hover:bg-zinc-800"
                style={{ border: "solid #777777 1px", borderWidth: "thin" }}
              >
                Bid Now
              </Button>
              <Button className="px-8 py-4 bg-[#6EE39A] text-black font-bold rounded">
                Chat With Seller
                <RightArrowIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
