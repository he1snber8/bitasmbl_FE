import React, { useEffect, useState } from "react";
import { Drawer as DrawerDefault, IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { useGithubUserContext, useGoogleUserContext } from "../app/hooks";
import { useStandardUserContext } from "../context/StandardUserContext";
import { useAuthProviderContext } from "../context/ProviderContext";
import { useLogOutMutation } from "../api/UsersApi";
import useGoogleAuthLogic from "../hooks/useGoogleAuthLogic";

import { useGetProfileQuery } from "../api/UsersApi";
import { motion } from "framer-motion";
import ProfileAvatar from "./ProfileAvatar";

export function Drawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { provider, setProvider } = useAuthProviderContext();

  const { googleUser } = useGoogleAuthLogic();

  // const currentUser = useCurrentUser();
  // console.log("provider in drawer: ", provider);

  const {
    data: profile,
    error: profileError,
    isLoading: profileLoading,
  } = useGetProfileQuery();

  const [loading, setLoading] = useState(profileLoading);

  // const { userData: githubUser, setGithubUserData } = useGithubUserContext();
  const { setGoogleUserData } = useGoogleUserContext();
  // const { userData: standardUser, setStandardUser } = useStandardUserContext();

  const [logOut] = useLogOutMutation();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleLogOut = async () => {
    await logOut({}); // Call API logout if needed
    localStorage.removeItem("googleUser"); // Clear storage
    localStorage.removeItem("repos"); // Clear storage
    localStorage.removeItem("accessToken"); // Clear storage
    // sessionStorage.clear();
    setGoogleUserData(null); // Reset state
    setProvider(null);

    navigate("/");
  };

  const menuItems = [
    {
      text: "Profile",
      onClick: () => {
        closeDrawer();
        navigate("profile");
      },
    },

    { text: "Settings", onClick: () => {} },
  ];

  useEffect(() => {
    if (profile) {
      setLoading(false);
    }
  }, [profile]);

  return (
    <>
      {loading ? (
        <div className="size-10 block my-auto mr-3 bg-[#9c27b0] rounded-full animate-pulse" />
      ) : profile?.imageUrl ? (
        <img
          onClick={openDrawer}
          src={profile.imageUrl}
          alt="User Avatar"
          className="size-10 my-auto  cursor-pointer rounded-full"
        />
      ) : (
        <ProfileAvatar
          className="size-10 "
          onClick={openDrawer}
          userName={profile?.userName}
        />
      )}

      <DrawerDefault
        open={open}
        onClose={closeDrawer}
        className="p-4  border-y-[1px] border-l-[1px]  bg-[#191919]/90 items-center rounded-xl border-ash/20  "
        placement="right"
      >
        <div className="mb-6  flex justify-between">
          <div className="flex items-center">
            {profile?.imageUrl ? (
              <img
                onClick={openDrawer}
                src={profile?.imageUrl ?? undefined}
                alt="User Avatar"
                className="size-10 my-auto mr-3 cursor-pointer rounded-full"
              />
            ) : (
              <ProfileAvatar
                className="size-10 mr-3"
                userName={profile?.userName || "user"}
                onClick={openDrawer}
              />
            )}

            <h2 className="text-xs">
              {profile?.userName ?? googleUser?.email}
            </h2>

            {/* <h2>Hei5enber8</h2> */}
          </div>

          <IconButton variant="text" color="white" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="flex flex-col ">
          {menuItems.map((item, index) => (
            <motion.h2
              whileHover={{ backgroundColor: "#212121" }}
              key={index}
              onClick={item.onClick}
              className="text-white px-2 py-[12px] cursor-pointer  p-1 content-center"
            >
              {item.text}
            </motion.h2>
          ))}
          <motion.h2
            whileHover={{
              color: "#E52020",
              backgroundColor: "rgba(226, 62, 87, 0.2)",
            }}
            onClick={() => handleLogOut()}
            className="text-white px-2 mt-1 py-[12px]  cursor-pointer  p-1 content-center"
          >
            Log Out
            {/* <div className="w-full h-[1px] my-2 bg-gray-800" /> */}
          </motion.h2>
        </div>
      </DrawerDefault>
    </>
  );
}
