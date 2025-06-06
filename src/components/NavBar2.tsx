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
import { MdOutlineLeaderboard, MdOutlineSpaceDashboard } from "react-icons/md";
import { VscTools } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";
import { GetClientProjectApplicationModel } from "../interfaces/PROJECTS2/getClientProjectModel";

export function NavBar2() {
  // const [drop, setDrop] = useState<boolean>(false);
  // const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [balanceViewOpen, setBalanceViewOpen] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<number>(0);
  const [appliedProjectsList, setAppliedProjectsList] = useState<
    GetClientProjectApplicationModel[]
  >([]);

  const [tab, setTab] = useState<
    "home" | "projects" | "leaderboard" | "collaborate"
  >("home");

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
        <div className="sticky p-4   top-0 flex justify-between bg-[#151515] h-12 z-10 ">
          <div className="ml-4  flex items-center gap-8">
            <h1 onClick={() => navigate("/home/projects")} className="text-xl">
              Bitasmbl
            </h1>
            <ul className="flex gap-2 h-full items-center">
              {[
                {
                  label: "Projects",
                  icon: <MdOutlineSpaceDashboard fill="#3D90D7" />,
                  key: "projects",
                },
                {
                  label: "Leaderboard",
                  icon: <MdOutlineLeaderboard fill="#06D001" />,
                  key: "leaderboard",
                },
                {
                  label: "Join others",
                  icon: <FaUsers fill="#5409DA" />,
                  key: "collab",
                },
                {
                  label: "User projects",
                  icon: <VscTools fill="#FF9F00" />,
                  key: "userprojects",
                },
              ].map(({ label, icon, key }) => (
                <motion.li
                  key={key}
                  onClick={() => {
                    setTab(
                      key as "home" | "projects" | "leaderboard" | "collaborate"
                    );
                    navigate(key.toLowerCase());
                  }}
                  whileHover={{ color: "#F5F5F5" }}
                  className={`h-full relative text-ash my-auto text-center flex items-center cursor-pointer px-2`}
                >
                  <div className="flex items-center gap-1 min-w-[120px] justify-center">
                    {icon}
                    <p
                      className={` font-light text-sm ${
                        tab === key ? "text-[#F5F5F5]" : ""
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="px-2 flex items-center gap-6">
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
            <div className="flex items-center gap-4">
              <Tooltip content="My XP points">
                <motion.p
                  style={{ borderColor: "#4f46e5" }}
                  whileHover={{
                    boxShadow: "0 0 20px #4f46e5",
                    // backgroundColor: "rgb(126, 24, 145, 0.1)",
                  }}
                  className="bg-[#18161b]  rounded-full cursor-pointer border my-auto size-10 text-center text-sm content-center"
                  // className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  {" "}
                  {profile?.xp ?? 0}
                </motion.p>
              </Tooltip>
              <Drawer />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-concrete h-[1px] w-full" />
    </>
  );
}
