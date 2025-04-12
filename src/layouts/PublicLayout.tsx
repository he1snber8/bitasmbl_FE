import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { TimelineDemo } from "../TimelineDemo";
import { Button } from "@material-tailwind/react";
import { BackgroundBeams } from "../components/BackgroundBeams";
import "../index.css";

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
      <main>
        <div className="max- w md:mx-auto py-8 md:py-20 px-4 md:px-8 h-full -x border-ash lg:px-10">
          <h2 className="text-6xl mb-8 text-wheat dark:text-white max-w-4xl">
            Find the right people, build the right projects.
          </h2>

          <div className="">
            <p className="text-ash  dark:text-neutral-300 text-xl  max-w-sm">
              begin your journey to building the right projects with the right
              people.
            </p>
          </div>
          <div className="flex md:flex-row  flex-col mt-20 gap-2  md:max-w-sm">
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter email here"
              className="grow placeholder:text-concrete text-xl h-10 md:text-base border border-raisin outline-none bg-transparent px-2 text"
            />
            <Button
              onClick={() => setSupplyEmail(emailRef.current?.value)}
              className="rounded-none font-mona  normal-case font-medium text-lg md:text-base   bg-gradient-to-r  from-coal to-gray-900  text-white h-full py-2"
            >
              Join us now
            </Button>
          </div>
        </div>
        <BackgroundBeams />
        <TimelineDemo />
        <Outlet />
      </main>
    </>
  );
}
