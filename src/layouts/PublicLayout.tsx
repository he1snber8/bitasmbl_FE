import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { TimelineDemo } from "../TimelineDemo";
import { Button, Input, Typography } from "@material-tailwind/react";
import { BackgroundBeams } from "../components/BackgroundBeams";
import "../index.css";
import { motion } from "framer-motion";
import AI from "../components/AI";
import { HeroSectionOne } from "../sections/HeroSection";
import PricingOptions from "../sections/PricingOptions";
import AIChatInterface from "../components/AiChatInterface";
import { CoolTextDisplay } from "../sections/CoolTextDisplay";

export default function PublicLayout() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [supplyEmail, setSupplyEmail] = useState<string | undefined>(undefined);

  const emailRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <NavBar
        suppliedEmail={supplyEmail}
        setSupplyEmail={setSupplyEmail}
        isAuthenticated={false}
        setOpenRegistration={setOpenRegistration}
        openRegistration={openRegistration}
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
      />
      <main className=" flex flex-col">
        <HeroSectionOne />
        <CoolTextDisplay />
        <TimelineDemo />
        <PricingOptions />

        {/* <AIChatInterface additionalPrompt="" /> */}
        {/* <div className="md:mx-auto py-8 md:py-20 px-4 md:px-8 h-full -x border-ash lg:px-10">
          <h2 className="text-6xl mb-8 text-wheat font-bold dark:text-white max-w-4xl">
            Find the right people, build the right projects.
          </h2>

          <div className="">
            <p className="text-ash  dark:text-neutral-300 text-xl  max-w-sm">
              begin your journey to building the right projects with the right
              people.
            </p>
          </div>
          <div className="flex md:flex-row  flex-col mt-20 md:max-w-sm">
            <motion.input
              // style={{ borderColor: "#4f46e5" }}
              // whileHover={{
              //   boxShadow: "0 0 20px #4f46e5",
              // }}
              // className="bg-[#18161b] rounded-md border border-concrete h-1/2 my-auto p-2  text-sm md:text-base"
              ref={emailRef}
              type="email"
              placeholder="Enter email here"
              className="grow bg-white placeholder:text-concrete placeholder:text-lg rounded-l-md text-black bg-transparent   md:text-base outline-none  px-2 p-4 text"
            />
            <Button
              onClick={() => setSupplyEmail(emailRef.current?.value)}
              className="rounded-none   normal-case font-medium text-lg md:text-lg rounded-r-md bg-[#4e06e5]/70  text-white  py-2"
            >
              Join us now
            </Button>
          </div>
        </div> */}
        {/* <BackgroundBeams /> */}

        <Outlet />
      </main>

      <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
        <Typography color="blue-gray" className="font-normal">
          &copy; 2023 Material Tailwind
        </Typography>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </footer>
    </>
  );
}
