"use client"

import { FormEvent, FormEventHandler, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { Button, Image, Input, Textarea, Link, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
const App = () => {
  const [init, setInit] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter()
  const handleSubmit:FormEventHandler<HTMLFormElement> = async (e:FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials",{
      email:email,
      password:password,
      redirect:false
    })
    console.log(res)
    // const data = {email,password}
    // const res = await fetch("http://localhost:3000/api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data)
    //   });
    //   let response =await res.json()
    //   console.log(response)
    //   setEmail('')
    //   setPassword('')
    //   if(response.success){
    //     alert("Login Succesfull")
    //     router.push("http://localhost:3000")
    //     localStorage.setItem('token',response.token)
    //   }else{
    //     alert("Please try again")
    //   }
  }
  // this should be run only once per application lifetime
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

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ebc923",
        },
        links: {
          color: "#ebc923",
          distance: 150,
          enable: true,
          opacity: 1,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 70,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <div className="flex flex-col justify-center" >
        <div
          aria-hidden="true"
          className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-10 rotate-12"
        >
          <img
            src="https://nextui.org/gradients/docs-right.png"
            className="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs right background"
            data-loaded="true"
          />
        </div >
        <div
          aria-hidden="true"
          className="fixed hidden dark:md:block dark:opacity-100 -bottom-[40%] -left-[15%] z-10"
        >
          <img
            src="https://nextui.org/gradients/docs-left.png"
            className="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs left background"
            data-loaded="true"
          />
        </div>
        <div
          aria-hidden="true"
          className="fixed md:hidden block dark:opacity-100 -bottom-[30%] -right-[95%] z-10 rotate-12"
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
          className="fixed md:hidden block dark:opacity-100 -top-[25%] -right-[95%] z-10 rotate-12"
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
          className="fixed md:hidden block dark:opacity-100 -top-[10%] -left-[80%] z-10"
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
          className="fixed md:hidden block dark:opacity-100 -bottom-[20%] -left-[70%] z-10"
        >
          <img
            src="https://mundum.com/images/Gradient-2-min.png"
            className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs left background"
            data-loaded="true"
          />
        </div>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
        <div
          className="flex flex-col justify-center mt-10 xl:mt-16 mb-20"
          style={{ alignItems: "center" }}
        >
            <Card className="w-full p-4 xl:p-4 mt-10 w-3/10 z-20 " style={{ alignItems: "center" }}>
            {/* <Image src={logo} width={300}/> */}
            <p className="text-2xl font-bold mt-10 xl:text-3xl lg:text-3xl">Welcome to BITSBids</p>
            <p className="text-xl font-bold mt-2 mb-4">Your own bidding platform</p>
            {/* <div className="framer-ku27eb backdrop-blur-3" style={{backgroundColor:'rgba(255, 255, 255, 0.03)',opacity:1,borderRadius:'16px',boxShadow:'rgba(255, 255, 255, 0.2)',inset:'0px 0px 4px 0px'}}></div> */}
              <form onSubmit={handleSubmit}>
                <Input
                  className="mt-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  label="Email"
                  placeholder="Enter your Email"
                  variant="bordered"
                  color="success"
                  isRequired
                />
                <Input
                  className="mt-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  label="Password"
                  placeholder="Enter your Password"
                  variant="bordered"
                  color="success"
                  isRequired
                />
                <Button
                  className="mt-10 w-full xl:w-96"
                  type="submit"
                //   color="success"
                  style={{
                    color: "white",
                    // width: "400px",
                    borderRadius: "20px",
                    background: 'linear-gradient(90deg,  rgba(3,86,147,1) 0%,rgba(1,213,22,1) 100%)'
                }}
                >
                  LOGIN
                </Button>
              </form>
              <div className="google flex flex-col items-center">
                <div className="font-extrabold text-2xl mt-4">OR</div>
                <Button
                  className="mt-4 w-full xl:w-96"
                  type="submit"
                //   color="success"
                  style={{
                    color: "white",
                    // width: "400px",
                    borderRadius: "20px",
                    background: 'linear-gradient(90deg,  rgba(3,86,147,1) 0%,rgba(1,213,22,1) 100%)'
                }}
                onClick={()=>signIn("google")}
                >Sign In With Google</Button>
              </div>
              <p className="mt-5 mb-5">
                Don{"'"}t have an account?{" "}
                <Link href="/signup">
                  <u className="text-green-500"> SIGNUP HERE</u>
                </Link>
              </p>
            </Card>
          </div>
      </div>
    );
  }
};
export default App;
