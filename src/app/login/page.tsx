"use client";

import { FormEvent, FormEventHandler, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Container, ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { Button, Input, Link, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const App = () => {
  const [init, setInit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: { value: "#000000" },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ebc923" },
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
          outModes: { default: OutMode.out },
          speed: 6,
        },
        number: {
          density: { enable: true },
          value: 70,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <div className="flex flex-col justify-center" >
      <div aria-hidden="false" className="fixed block opacity-60  z-0 ">
        <Particles className="z-0" id="tsparticles" options={options} />
        <img
          src="https://i.pinimg.com/originals/ff/07/af/ff07afea9ccd9907e4ecb97d2050af0a.jpg"
          className="w-full z-40"
          alt="docs right background"
          data-loaded="true"
          // style={{ height:''}}
        />
      </div>
      <div aria-hidden="true" className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-10 rotate-12">
        <img src="https://nextui.org/gradients/docs-right.png" className="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" alt="docs right background" data-loaded="true" />
      </div>
      <div aria-hidden="true" className="fixed hidden dark:md:block dark:opacity-100 -bottom-[40%] -left-[15%] z-10">
        <img src="https://nextui.org/gradients/docs-left.png" className="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" alt="docs left background" data-loaded="true" />
      </div>
      <div className="flex flex-col justify-center mt-10 xl:mt-16 mb-20" style={{ alignItems: "center" }}>
        <Card className="w-full p-4 xl:p-4 mt-10 w-3/10 z-20" style={{ alignItems: "center" }}>
          <p className="text-2xl font-bold mt-10 xl:text-3xl lg:text-3xl">Welcome to BITSBids</p>
          <p className="text-xl font-bold mt-2 mb-4">Your own bidding platform</p>
          <form onSubmit={handleSubmit}>
            <Input className="mt-5" value={email} onChange={(e) => setEmail(e.target.value)} type="email" label="Email" placeholder="Enter your Email" variant="bordered" color="success" isRequired />
            <Input className="mt-5" value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" placeholder="Enter your Password" variant="bordered" color="success" isRequired />
            <Button className="mt-10 w-full xl:w-96" type="submit" style={{ color: "white", borderRadius: "20px", background: 'linear-gradient(90deg,  rgba(3,86,147,1) 0%,rgba(1,213,22,1) 100%)' }}>
              LOGIN
            </Button>
          </form>
          <div className="google flex flex-col items-center">
            <div className="font-extrabold text-2xl mt-4">OR</div>
            <Button className="mt-4 w-full xl:w-96" style={{ color: "white", borderRadius: "20px", background: 'linear-gradient(90deg,  rgba(3,86,147,1) 0%,rgba(1,213,22,1) 100%)' }} onClick={() => signIn("google")}>
              Sign In With Google
            </Button>
          </div>
          <p className="mt-5 mb-5">Don{"'"}t have an account? <Link href="/signup"><u className="text-green-500"> SIGNUP HERE</u></Link></p>
        </Card>
      </div>
    </div>
  );
};

export default App;
