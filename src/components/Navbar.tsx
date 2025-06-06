import React, { useState } from "react";
import { Collapse, IconButton, Tooltip } from "@material-tailwind/react";
import ModalRegistration from "./ModalRegistration";
import { Drawer } from "./Drawer";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BalanceView from "./BalanceView";
import Lottie from "lottie-react";
import coinAnimation from "./animations/wired-flat-290-coin-hover-pinch.json";
import ChatPopUp from "./ChatPopUp";
import NotificationsDrawer from "./NotificationsDrawer";
// import { GetProjectApplicationModel } from "../interfaces/projects/user-specific-projects/GetUserProjectModel";
import { useGetProfileQuery } from "../api/UsersApi";
import { LiaPlusSolid } from "react-icons/lia";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { TbCoins } from "react-icons/tb";
import { GetClientProjectApplicationModel } from "../interfaces/PROJECTS2/getClientProjectModel";

export function NavBar({
  isAuthenticated,
  openRegistration,
  setOpenRegistration,
  openLogin,
  setOpenLogin,
  suppliedEmail,
  setSupplyEmail,
}: {
  isAuthenticated: boolean | null;
  openRegistration?: boolean | null;
  openLogin?: boolean;
  setOpenLogin?: React.Dispatch<React.SetStateAction<boolean>> | null;
  setOpenRegistration?: React.Dispatch<React.SetStateAction<boolean>> | null;
  suppliedEmail?: string;
  setSupplyEmail?: (value: React.SetStateAction<string | undefined>) => void;
}) {
  // const [drop, setDrop] = useState<boolean>(false);
  // const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [balanceViewOpen, setBalanceViewOpen] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<number>(0);
  const [appliedProjectsList, setAppliedProjectsList] = useState<
    GetClientProjectApplicationModel[]
  >([]);

  const navigate = useNavigate();

  const { data: profile } = useGetProfileQuery();
  const [openNav, setOpenNav] = useState(false);

  const navItems = [
    { title: "Sign In", href: "#" },
    { title: "Register", href: "#" },
  ];

  return (
    <>
      <div>
        <div className="flex justify-between  bg-transparent h-12">
          <div
            onClick={() => navigate("/home")}
            className="ml-4 my-auto flex items-center gap-2"
          >
            <div className="size-7 bg-gradient-to-br from-[#4940f3] to-[#9b91ed] rounded-md " />
            <h1 className="text-2xl">Bitasmbl</h1>
            {/* <img src="/Logo.png" className="md:w-40 w-28  max-w-full" alt="" /> */}
          </div>
          <div className="flex gap-4 ">
            {isAuthenticated ? (
              <>
                <div className="hover:text-white cursor-pointer">
                  {/* <NotificationsDrawer
                    projectApplicants={appliedProjectsList}
                    setProjectApplicants={setAppliedProjectsList}
                    setRoomId={setRoomId}
                  /> */}
                  {/* <AnimatePresence>
                    {roomId > 0 && (
                      <ChatPopUp roomId={roomId} onClose={() => setRoomId(0)} />
                    )}
                  </AnimatePresence> */}
                </div>
                <motion.div className="content-center hidden md:block hover:text-white  cursor-pointer">
                  <Tooltip
                    className="bg-[#171717] text-wheat rounded-none"
                    content="Current balance"
                    placement="bottom"
                  >
                    <motion.h2
                      onClick={() => setBalanceViewOpen((prev) => !prev)}
                      whileHover={{
                        backgroundColor: "#171717",
                        borderColor: "#cac6bf",
                      }}
                      className="text-white h-full  flex items-center gap-2  font-light text-base px-4 p-1"
                    >
                      {/* <CoinAnimation /> */}
                      <motion.h2
                        whileHover={{
                          backgroundColor: "#171717",
                          borderColor: "#cac6bf",
                        }}
                        className="text-ash h-full  px-2 hover:text-white flex items-center gap-2 font-medium text-sm "
                      >
                        Credits
                        <TbCoins size={12} opacity={0.8} />
                      </motion.h2>
                      {profile?.balance}
                    </motion.h2>
                  </Tooltip>

                  <AnimatePresence>
                    {balanceViewOpen && (
                      <BalanceView
                        onClose={() => setBalanceViewOpen((prev) => !prev)}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                <div className="hidden md:block hover:text-white cursor-pointer">
                  {/* <SearchBar className=" " /> */}
                  <div className="place-content-center px-2 h-full  ">
                    <input
                      className={`bg-transparent align-middle placeholder:text-sm outline-none`}
                      type="text"
                      placeholder="Search..."
                      onChange={(e) => {}}
                    />
                  </div>
                </div>

                <div
                  onClick={() => navigate("/home/projects/create")}
                  className="content-center hidden md:block cursor-pointer"
                >
                  <Tooltip
                    className="bg-[#171717] text-wheat rounded-none"
                    content="Create new project"
                    placement="bottom"
                  >
                    <motion.h2
                      whileHover={{
                        backgroundColor: "#171717",
                        borderColor: "#cac6bf",
                      }}
                      className="text-ash h-full hover:text-white flex items-center gap-1 font-medium px-4  text-sm "
                    >
                      Create
                      <LiaPlusSolid />
                    </motion.h2>
                  </Tooltip>
                </div>

                <Drawer />
              </>
            ) : (
              <div className="hidden md:flex">
                <div onClick={() => navigate("/onboarding")}>
                  <motion.h2
                    whileHover={{
                      backgroundColor: "#171717",
                      borderColor: "#cac6bf",
                    }}
                    className="text-white h-full font-bold  cursor-pointer flex items-center gap-2  px-4  text-base  content-center"
                  >
                    Register
                  </motion.h2>
                </div>
                <div onClick={() => setOpenLogin!(true)}>
                  <motion.h2
                    whileHover={{
                      backgroundColor: "#171717",
                      borderColor: "#cac6bf",
                    }}
                    className="text-white cursor-pointer font-bold  flex items-center gap-2  font- text-base px-4  h-full content-center"
                  >
                    Sign In
                  </motion.h2>
                </div>
              </div>
            )}
            {!isAuthenticated && (
              <div className="flex">
                {/* Mobile Menu Toggle Button */}
                <IconButton
                  variant="text"
                  color="blue-gray"
                  className="lg:hidden my-auto"
                  onClick={() => setOpenNav(!openNav)}
                >
                  {openNav ? (
                    <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                  ) : (
                    <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                  )}
                </IconButton>

                {/* Mobile Menu Items */}

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openNav ? "auto" : 0,
                    opacity: openNav ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-16 left-0 w-full bg-coal shadow-md rounded-none overflow-hidden"
                >
                  <>
                    <div onClick={() => setOpenRegistration!(true)}>
                      <h2 className="text-white h-full p-4 space-y-2  cursor-pointer flex items-center gap-2  px-4 font-light text-base  content-center">
                        Register
                      </h2>
                    </div>
                    <div onClick={() => setOpenLogin!(true)}>
                      <h2 className="text-white cursor-pointer p-4 space-y-2  flex items-center gap-2  px-4 content-center">
                        Sign in
                      </h2>
                    </div>
                  </>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {!isAuthenticated && (
          <>
            <ModalRegistration
              suppliedEmail={suppliedEmail}
              isRegistration
              onOpen={!!(openRegistration || suppliedEmail)}
              onClose={() => {
                setOpenRegistration!(false);
                setSupplyEmail && setSupplyEmail(undefined);
              }}
              alreadyRegisteredClicked={() => setOpenLogin!(true)}
            />
            <ModalRegistration
              isRegistration={false}
              onOpen={!!openLogin}
              onClose={() => setOpenLogin!(false)}
            />
          </>
        )}
      </div>
      {/* <div className="bg-gradient-to-l from-purple-700/80 to-purple-900/70 h-[2px] w-full" /> */}
    </>
  );
}
