"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // optimized package for tsparticles
import { Button, Input, Link, Card } from "@nextui-org/react";

const App = () => {
  const [init, setInit] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [phone, setPhone] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { name, age, phone, email, password };
    const res = await fetch("http://localhost:3000/api/adduser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    if (response.success) {
      alert("User signup successful please login to continue");
    } else {
      alert("Something went wrong");
    }
    setName("");
    setAge(0);
    setPhone(0);
    setEmail("");
    setPassword("");
  };

  const validateEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isInvalidEmail = useMemo(() => {
    if (email === "") return false;
    return !validateEmail(email);
  }, [email]);

  const validatePhone = (phone: number) => phone.toString().length === 10;

  const isInvalidPhone = useMemo(() => {
    if (phone === 0) return false;
    return !validatePhone(phone);
  }, [phone]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {};

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
          value: 100,
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
      <div>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
        
        <div
          className="flex flex-col justify-center mt-10 xl:mt-0"
          style={{ alignItems: "center" }}
        >
          
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
          <Card
            className="p-4 mb-20 xl:p-4 mt-10 w-3/10 z-20"
            style={{ alignItems: "center" }}
          >
            <p className="text-2xl font-bold mt-10 xl:text-3xl">
              Welcome to BITSBids
            </p>
            <p className="text-xl font-bold mt-2 xl:text-xl">
              Your own bidding platform
            </p>
            <form onSubmit={onSubmitForm}>
              <Input
                className="mt-10 xl:w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                label="Name"
                placeholder="Enter your Name"
                variant="bordered"
                color="success"
                isRequired
              />
              <Input
                className="mt-5 xl:w-full"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                type="number"
                label="Age"
                placeholder="Enter your Age"
                variant="bordered"
                color="success"
                isRequired
              />
              <Input
                className="mt-5 xl:w-full"
                value={phone}
                onChange={(e) => setPhone(Number(e.target.value))}
                type="number"
                label="Mobile Number"
                placeholder="Enter your mobile number"
                variant="bordered"
                isInvalid={isInvalidPhone}
                color={isInvalidPhone ? "danger" : "success"}
                errorMessage="Please enter a correct 10 digit mobile number"
                isRequired
              />
              <Input
                className="mt-5 xl:w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                isInvalid={isInvalidEmail}
                placeholder="Enter your Email"
                variant="bordered"
                color={isInvalidEmail ? "danger" : "success"}
                errorMessage="Please enter a valid email"
                isRequired
              />
              <Input
                className="mt-5 xl:w-full"
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
                color="success"
                style={{
                  color: "white",
                  borderRadius: "20px",
                }}
              >
                SIGN UP
              </Button>
            </form>
            <p className="mt-5 mb-5">
              Already have an account?{" "}
              <Link href="/login">
                <u className="text-green-500">LOGIN HERE</u>
              </Link>
            </p>
          </Card>
        </div>
      </div>
    );
  }
};

export default App;
