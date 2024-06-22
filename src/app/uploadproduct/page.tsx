"use client"

import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import Link from "next/link";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import {
  Button,
  Input,
  Textarea,
  Image,
  Card,
  Autocomplete,
  AutocompleteItem,
  CircularProgress,
} from "@nextui-org/react";
import { categories } from "../categories";
import cloud from "../../../public/cloud.png";
import { UploadButton } from "../utils/uploadthing";
import { error } from "console";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import { color } from "framer-motion";
import { useSession } from "next-auth/react";
function Uploadproduct() {
  const [init, setInit] = useState<boolean>(false);
  // const [ctg,setCtg] = useState<string>("")
  const [categor, setCategory] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  // console.log(categories[category - 1]);
  const onSubmitForm = async(e:InputEvent) => {
    e.preventDefault();
      const category = categories[categor-1].value
      const image = images
      const body = {image,name,price,description,category};
      // console.log(body)
      const res = await fetch("http://localhost:3000/api/uploadproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      let response = await res.json()
      // console.log(response)
      if(response.success){
        alert("Product Uploaded Sucessfully")
      }else{
        alert("Something is wrong")
      }
      setName('')
      setDescription('')
      setPrice(0)
      setImages([])
      setCategory(0)
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {};

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 90,
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
          },
        },
        color: {
          value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
        },
        size: {
          value: { min: 1, max: 3 },
        },
        move: {
          enable: true,
          speed: 6,
          random: false,
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
        },
      },
      background: {
        image: "",
      },
    }),
    []
  );
  const [images, setImages] = useState<{
    fileUrl: string;
    fileKey: string;
}[]>([])

const title = images.length ? (
    <>
        <p>Upload Complete!</p>
        <p className="mt-2">{images.length} files</p>
    </>
) : null

const imgList = (
    <>
        <ul>
            {images.map(image => (
                <li key={image.fileUrl} className="flex my-4">
                    <Image src={image.url} alt="ds" width={50} height={50} style={{borderRadius:'0px'}}/>
                    <p className="ml-4">{image.name}</p>
                </li>
            ))}
        </ul>
    </>
)
// console.log(images)
  const HandleProgress = (p:number) =>{
    
  }
  const [prog,setProg] = useState<number>(0)
  const session = useSession()
  if(session.status==='authenticated'){
  return (
    <div className="flex justify-center " style={{ alignItems: "center" }}>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
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
        className="fixed hidden dark:md:block dark:opacity-80 -top-[30%] -left-[60%] z-0"
      >
        <img
          src="https://mundum.com/images/Gradient-2-min.png"
          className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="docs left background"
          data-loaded="true"
        />
      </div>
      <form className="hidden md:flex w-full xl:h-screen  justify-center items-center mt-10 mb-10" onSubmit={onSubmitForm}>
        
        <Card
          className="hidden md:flex flex-col xl:flex-row h-full p-4  mt-10 xl:mt-0  w-full xl:w-8/12 md:max-w-2xl xl:max-w-full   items-center justify-center   bg-neutral-900 bg-opacity-60"
          style={{}}
        >
          <div className="img w-full max-w-md max-h-md mt-10 mb-20">
            <h1 className="font-extrabold text-2xl mb-4 xl:text-center">
              Upload Image
            </h1>
            <div
              className="cloud h-full flex justify-center bg-gradient-to-tr from-amber-500 to-fuchsia-700 rounded-lg p-1 "
              style={{ alignItems: "center" }}
            >
              <div className="hidden md:flex w-full ">
                <div className="bg-neutral-900 rounded-lg p-4  w-full flex justify-center items-center ">
                  <div className="flex flex-col items-center  justify-center ">
                    <CircularProgress
                      classNames={{
                        svg: " w-48 h-48 drop-shadow-md ",
                        indicator: "stroke-pink-600",
                        track: "stroke-white/10",
                        value: "text-3xl font-semibold text-white",
                      }}
                      strokeWidth={1}
                      value={70}
                      showValueLabel={false}
                      className=" md:hidden"
                    />
                    <CircularProgress
                      classNames={{
                        svg: " w-80 h-80 drop-shadow-md ",
                        indicator: "stroke-pink-600",
                        track: "stroke-white/10",
                        value: "text-3xl font-semibold text-white",
                      }}
                      strokeWidth={1}
                      value={100}
                      showValueLabel={false}
                      className="hidden xl:flex"
                    />
                    {/* <Image
                      className="flex mb-16 items-center mt-5"
                      style={{ position: "absolute" }}
                      src={cloud}
                      width={80}
                    />
                    <p className=" mt-1 text-lg font-extrabold xl:text-xl">
                      Drag and Drop
                    </p>
                    <p className=" mt-1 text-lg font-extrabold xl:text-xl">
                      or Upload
                    </p> */}
                    <UploadDropzone<OurFileRouter>
                      className="border-0 flex items-center absolute"
                      appearance={{
                          uploadIcon:{
                            // background:'-webkit-linear-gradient(45deg,#eee, #333)',
                            // WebkitBackgroundClip:'text',
                            // WebkitTextFillColor:'transparent'
                            

                            color:'-webkit-linear-gradient(45deg,#0093E9, #80D0C7)'
                          },
                          label:{
                            fontSize:'18px',
                            fontWeight:'bold'
                          },
                          container:{
                            fontSize:'14px'
                          },
                          button:{
                            width:'100px',
                            marginTop:'15px',
                            color:'black',
                            background:'wheat'
                          }
                        }
                      }
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (res) {
                        setImages(res)
                        const json = JSON.stringify(res)
                        // Do something with the response
                        // console.log(json);
                    }
                    //alert("Upload Completed");
                }}
                onUploadProgress={HandleProgress()}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
                  </div>
                </div>
              </div>
            </div>
            
          <div>
            {imgList}
          </div>
          </div>
          <div className="remdetails flex flex-col h-full md:ml-20 justify-center  ">
            <div className="title mb-5">
              <h1 className="font-extrabold text-xl md:text-2xl  mb-4">
                Product Name
              </h1>
              <Input
                color="success"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-96 "
                variant="bordered"
                type="text"
                size="md"
                placeholder="Enter product name"
              />
            </div>
            <div className="price mb-5">
              <h1 className="font-extrabold text-xl md:text-2xl  mb-4">
                Product Price
              </h1>
              <Input
                color="success"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-96 "
                variant="bordered"
                type="text"
                size="md"
                placeholder="Enter bid start price"
              />
            </div>
            <div className="description mb-5">
              <h1 className="font-extrabold text-xl  xl:text-2xl mb-4">
                Product Description
              </h1>
              <Textarea
                color="success"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minRows={5}
                variant="bordered"
                type="text"
                size="md"
                placeholder="Enter product description"
              />
            </div>
            <div className=" category mb-5 self-start w-full">
              <h1 className="font-extrabold text-xl  xl:text-2xl mb-5">
                Select category
              </h1>
              <Autocomplete
                isRequired
                color="success"
                variant="bordered"
                placeholder="Select a category"
                size="lg"
                className=" max-w-xs"
                selectedKey={categor}
                onSelectionChange={setCategory}
                aria-label="a"
              >
                {categories.map((category) => (
                  <AutocompleteItem
                    key={category.key}
                    value={category.value}
                    aria-label="Hello"
                    style={{ color: "white" }}
                  >
                    {category.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
            <div className="button mt-5">
              <Button color="danger">Cancel</Button>
              <Button className="mx-5" type="submit" color="success" variant="ghost">
                Upload
              </Button>
              

            </div>
          </div>
        </Card>
      </form>
      <div className=" md:hidden w-full xl:h-screen flex justify-center items-center">
        <div className="bg-black phone w-full md:hidden">
          <Card
            className="flex flex-col z-20 bg-black bg-opacity-60 w-full"
            style={{}}
          >
            <div className="flex w-full flex-col items-center">
              <div className="img  mt-10 mb-10 w-10/12 flex flex-col items-center ">
                <h1 className="font-extrabold text-2xl mb-4 ml-4">
                  Upload Image
                </h1>
                <div className="cloud h-full w-11/12 flex justify-center bg-gradient-to-tr from-amber-500 to-fuchsia-700 rounded-lg p-1 ">
                  <div className="bg-neutral-900 rounded-lg p-1 w-full flex justify-center items-center h-full">
                    <div className="flex flex-col items-center justify-center">
                      <CircularProgress
                        classNames={{
                          svg: "w-48 h-48 drop-shadow-md",
                          indicator: "stroke-pink-600",
                          track: "stroke-white/10",
                          value: "text-3xl font-semibold text-white",
                        }}
                        strokeWidth={1}
                        value={70}
                        showValueLabel={false}
                      />
                      
                      <Image
                        className="mb-7"
                        src={cloud}
                        width={80}
                        style={{ position: "absolute" }}
                      />
                      <UploadButton<OurFileRouter>
                      className="border-0 flex items-center absolute"
                      appearance={{
                          
                          label:{
                            fontSize:'18px',
                            fontWeight:'bold'
                          },
                          button:{
                            marginTop:'10px',
                            color:'black',
                            background:'blue'
                          }
                        }
                      }
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (res) {
                        setImages(res)
                        const json = JSON.stringify(res)
                        // Do something with the response
                        // console.log(json);
                    }
                    //alert("Upload Completed");
                }}
                onUploadProgress={HandleProgress()}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="remdetails flex flex-col w-full items-center">
              <div className="remdetails flex flex-col w-9/12 items-center">
                <div className="title mb-5 w-full">
                  <p className="font-extrabold mb-2 ml-1">Product Name</p>
                  <Input
                    color="success"
                    className=""
                    variant="bordered"
                    type="text"
                    size="md"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="description mb-5 w-full">
                  <h1 className="font-extrabold text-md ml-1 mb-2">Product Description</h1>
                  <Textarea
                    color="success"
                    minRows={5}
                    variant="bordered"
                    type="text"
                    size="md"
                    placeholder="Enter product description"
                  />
                </div>
                <div className="category mr-3 mb-5">
                  <h1 className="font-extrabold ml-1 mb-2">Select category</h1>
                  <Autocomplete
                    isRequired
                    color="success"
                    variant="bordered"
                    placeholder="Select a category"
                    size="lg"
                    className="max-w-xs"
                    selectedKey={categor}
                    onSelectionChange={setCategory}
                  >
                    {categories.map((category) => (
                      <AutocompleteItem
                        key={category.key}
                        value={category.value}
                      >
                        {category.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
                <div className="button mt-2">
                  <Button color="danger">Cancel</Button>
                  <Button className="mx-5" color="success" variant="ghost">
                    Upload
                  </Button>
                  
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}else{
  return(
    <div>
      Please login to view this page
    </div>
  )
}
}

export default Uploadproduct;
