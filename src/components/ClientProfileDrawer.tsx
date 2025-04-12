import { Drawer, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserModel, UserProfile } from "../interfaces/userTypes";

export default function ClientProfileDrawer({
  client,
  open,
  setOpen,
}: {
  client?: UserProfile;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //   const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Drawer
        open={open}
        size={900}
        transition={{ type: "tween", duration: 0.5 }}
        onClose={closeDrawer}
        className="bg-[#151515] border-y-[1px] border-l-[1px] overflow-y-hidden  border-concrete"
        placement="right"
      >
        <div className="p-4 flex items-center bg-coal justify-between">
          <h1 className="text-lg">
            You are viewing {client?.userName}'s page!
          </h1>
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
        <div className="bg-gray-900 p-8 h-full">
          <img src={client?.imageUrl} className="h-24 rounded-full" alt="" />
          {client?.userSocials?.map((social) => {
            return <div>{social.socialUrl}</div>;
          })}
          <div className="\">
            Date joined:
            {client?.dateJoined
              ? new Date(client.dateJoined).toLocaleDateString()
              : "Date not available"}
          </div>
          <div>Bio: {client?.bio}</div>
          <div>
            last log in:
            {client?.lastLogin
              ? new Date(client.dateJoined).toLocaleDateString()
              : "Date not available"}
          </div>
          <div>total projects: {client?.projects.length}</div>
          Projects:
          {client?.projects?.map((project) => {
            return (
              <div>
                <div>{project.name}</div>
                <div>{project.applications}</div>
                <div>{project.githubRepo}</div>
                <div>{project.status}</div>
              </div>
            );
          })}
        </div>
      </Drawer>
    </>
  );
}
