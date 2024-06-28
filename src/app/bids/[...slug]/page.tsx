"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Magnify } from "magnify-zone";
import {
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Skeleton,
  Image
} from "@nextui-org/react";
import { io } from "socket.io-client";

interface Product {
  userID: string;
  productID: string;
  image: { url: string }[];
  name: string;
  description: string;
  category: string;
  price: number;
}

const Bid = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const productID = searchParams.get("id");
  const [socket, setSocket] = useState<any>(null);

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
  }, [price,productID]);

  const getProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/getbids?productID=${productID}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data.productbyID);
        setPrice(Number(data.productbyID.price));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productID]);

  const onSubmitForm = async () => {
    if (price === null || !socket) return;

    const body = { productID, price };
    const res = await fetch("http://localhost:3000/api/bidnow", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    let response = await res.json();
    if (response.success) {
      // alert("Bid Successful");
      socket.emit("new_bid", productID);
    } else {
      alert("Something is wrong");
    }
  };

  const [isLoaded, setIsLoaded] = useState(false);

  const toggleLoad = () => {
    setIsLoaded(true);
  };

  setTimeout(toggleLoad, 500);

  return (
    <div
      className="flex justify-center bg-opacity-30"
      style={{
        alignItems: "center",
        height: "91vh",
        background: "",
        backgroundSize: "1536px 700px",
        backgroundClip: "padding-box",
      }}
    >
      <div aria-hidden="false" className="fixed block opacity-60 z-0 ">
        <Image
          src="https://mundum.com/images/bg-partners.png"
          className="w-full"
          alt="docs right background"
          data-loaded="true"
          loading="eager"
        />
      </div>
      <div className="mb-5 z-20">
        <div
          className="item flex mt-10 p-6 z-10"
          style={{
            width: "1000px",
            border: "solid 1px #272829",
            borderWidth: "thin",
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <div
            className="img mr-10 flex justify-center"
            style={{
              width: "400px",
              height: "300px",
              alignItems: "center",
              background: "url(../../../public/grad2.png)",
            }}
          >
            {product && (
              <Magnify
                className="flex z-16"
                imageUrl={product.image[0].url}
                zoomFactor={3}
                zoomPosition="right"
                zoomWidth={600}
                zoomHeight={600}
                marginSize="20px"
                mainImageWidth="250px"
              />
            )}
          </div>
          <div className="itemct">
            <div className="category">
              <Breadcrumbs size="lg">
                <BreadcrumbItem>Category</BreadcrumbItem>
                <BreadcrumbItem>{product?.category}</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div className="title mt-5">
              <p
                className="font-bold text-3xl"
                style={{
                  background: "linear-gradient(45deg,#85FFBD,#FFFB7D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {product?.name}
              </p>
            </div>
            <div className="description mt-5">
              <p>{product?.description}</p>
            </div>
            <div
              className="price font-extrabold text-4xl mt-5 w-fit p-2"
              style={{
                background: "linear-gradient(45deg, cyan, yellow)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                border: "solid 3px #272829",
                borderRadius: "15px",
              }}
            >
              Rs.{price}
            </div>
            <div className="btn mt-5">
              <Button
                variant="shadow"
                type="submit"
                onClick={onSubmitForm}
                className="w-32 text-lg font-semibold text-rose-400"
                style={{
                  background: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
                }}
              >
                Bid Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bid;
