"use client"

import React, { useState, useEffect, useMemo } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import { Magnify } from "magnify-zone";
import Image from "next/image";
import {
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Skeleton,
} from "@nextui-org/react";
import image from "../../../public/car.jpg";

const Bid = () => {
  const searchParams = useSearchParams()
  const slug = searchParams.get('id');
  console.log(slug)
  const [isLoaded, setIsLoaded] = React.useState(false);

  const toggleLoad = () => {
    setIsLoaded(true);
  };
  const myTimeout = setTimeout(toggleLoad,500)
  return (
    <div
      className="flex justify-center bg-opacity-30"
      style={{ alignItems: "center", height: "91vh",background:'',backgroundSize:'1536px 700px',backgroundClip:'padding-box' }}
    >
      <div
          aria-hidden="false"
          className="fixed block opacity-60  z-0 "
        >
          <img
            src='https://mundum.com/images/bg-partners.png'
            className="w-full"
            alt="docs right background"
            data-loaded="true"
            // style={{ height:''}}
          />
        </div>
      {/* <div
          aria-hidden="false"
          className="fixed block opacity-100 -top-[80%] -right-[60%] 2xl:-top-[35%] 2xl:-right-[15%] z-0 "
        >
          <img
            src='https://www.forbusiness.viber.com/images/viconnect/right2.png'
            className="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs right background"
            data-loaded="true"
            style={{width:'1000px', height:'1000px'}}
          />
        </div>
        <div
          aria-hidden="true"
          className="fixed  dark:md:block dark:opacity-100 -bottom-[10%] -top-[30%] -left-[80%] z-0 rotate-12"
        >
          <img
            src="https://mundum.com/images/Gradient-2-min.png"
            className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs left background"
            data-loaded="true"
          />
        </div> */}
      <div className="mb-5 z-20 " style={{}}>
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
              <Magnify
                className="flex z-16"
                imageUrl="https://m.media-amazon.com/images/I/71uQ8VB99rL._SL1291_.jpg"
                zoomFactor={3}
                zoomPosition="right"
                zoomWidth={600}
                zoomHeight={600}
                marginSize="20px"
                mainImageWidth="250px"

                // style={{background:'linear-gradient(180deg, rgba(224, 34, 153, 1) 0%, rgba(88, 0, 55, 1) 100%)'}}
              />
            </div>
            <div className="itemct">
              <div className="category">
                <Breadcrumbs size="lg">
                  <BreadcrumbItem>Category</BreadcrumbItem>
                  <BreadcrumbItem>Books</BreadcrumbItem>
                </Breadcrumbs>
              </div>
              <div className="title mt-5">
                <p className="font-bold text-3xl" style={{background:'linear-gradient(45deg,#85FFBD,#FFFB7D)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                  Machine Learning using Python
                </p>
              </div>
              <div className="description mt-5">
                <p>
                  Full Color EditionThrough a series of recent breakthroughs,
                  deep learning has boosted the entire field of machine
                  learning. Now, even programmers who know close to nothing
                  about this technology can use simple, efficient tools to
                  implement programs capable of learning from data. This
                  practical book shows you how. By using concrete examples,
                  minimal theory, and two production-ready Python
                  frameworks—Scikit-Learn and TensorFlow—author Aurélien Géron
                  helps you gain an intuitive understanding of the concepts and
                  tools for building intelligent systems.
                </p>
              </div>
              <div
                className="price font-extrabold text-4xl mt-5 w-fit p-2"
                style={{
                  background: "linear-gradient(45deg, cyan, yellow)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  border:'solid 3px #272829',
                  // borderWidth:'thin',
                  borderRadius:'15px'
                }}
              >
                Rs.200
              </div>
              <div className="btn mt-5">
                <Button variant="shadow" className="w-32 text-lg font-semibold text-rose-400" style={{background:'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)'}}>Bid Now</Button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
export default Bid;

