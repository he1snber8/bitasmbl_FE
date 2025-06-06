// import {
//   Badge,
//   Button,
//   Drawer,
//   IconButton,
//   Tooltip,
// } from "@material-tailwind/react";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useGetProfileQuery } from "../api/UsersApi";
// import { useGetAppliedProjectsQuery } from "../api/ProjectsApi";
// import { RiVipCrownFill } from "react-icons/ri";
// import { PiBellDuotone, PiHardHatDuotone } from "react-icons/pi";
// import { HiMiniBell } from "react-icons/hi2";
// import ChatPopUp from "./ChatPopUp";
// import { useNavigate } from "react-router-dom";
// import * as signalR from "@microsoft/signalr";
// import { ApplyToProjectRequest } from "../interfaces/projects/projectTypes";
// import { GetProjectApplicationModel } from "../interfaces/projects/user-specific-projects/GetUserProjectModel";
// import * as io from "socket.io-client";

// export default function NotificationsDrawer({
//   setRoomId,
//   setProjectApplicants,
//   projectApplicants,
// }: {
//   setRoomId: (roomId: number) => void;
//   projectApplicants: GetProjectApplicationModel[];
//   setProjectApplicants: React.Dispatch<
//     React.SetStateAction<GetProjectApplicationModel[]>
//   >;
// }) {
//   // const socket = io.connect("http://localhost:3001");

//   const {
//     data: profile,
//     error: profileError,
//     isLoading: profileLoading,
//   } = useGetProfileQuery();

//   const { data: appliedProjects } = useGetAppliedProjectsQuery();

//   const navigate = useNavigate();

//   const [projectName, setProjectName] = useState<string>("");

//   const [signalRConnection, setConnection] =
//     useState<signalR.HubConnection | null>(null);

//   // const [appliedProjectsList, setAppliedProjectsList] = useState<
//   // GetProjectApplicationModel[]
//   // >([]);

//   useEffect(() => {
//     if (!profile || profile === undefined) return;

//     if (signalRConnection) {
//       console.log("🔌 Disconnecting old SignalR connection...");
//       signalRConnection
//         .stop()
//         .then(() => console.log("✅ Previous connection stopped."));
//     }

//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl(`http://localhost:5057/projects-hub?principalId=${profile?.id}`)
//       .withAutomaticReconnect() // ✅ Enables automatic reconnecting
//       .build();

//     connection
//       .start()
//       .then(() => {
//         console.log(profile?.userName, "✅ Connected to SignalR");

//         if (profile) {
//           connection
//             .send("SendMessage", `Hello from user: ${profile.userName}!`)
//             .then(() => console.log("✅ Message sent successfully"))
//             .catch((err) => console.error("❌ Error sending message:", err));
//         }

//         connection.on("ReceiveMessage", (message) => {
//           console.log("📩 New message from SignalR:", message);
//         });

//         // 🔥 Listen for "ProjectCreated" event
//         connection.on("ProjectCreated", (projectId) => {
//           console.log("🆕 New project created:", projectId);
//         });

//         connection.on(
//           "ProjectApplied",
//           (applyToProjectModel: GetProjectApplicationModel) => {
//             console.log("🆕 Applied to project!!:", applyToProjectModel);

//             setProjectApplicants((prev) => {
//               console.log("🔄 Previous State:", prev);
//               return [...prev, applyToProjectModel]; // ✅ Ensure React updates state correctly
//             });
//           }
//         );
//       })
//       .catch((err) => console.error("❌ SignalR connection failed:", err));

//     // 🔥 Handle connection close
//     connection.onclose((error) => {
//       console.warn("SignalR connection closed:", error);
//     });

//     setConnection(connection);

//     // ✅ Cleanup function to stop connection when component unmounts
//     return () => {
//       connection.stop().then(() => console.log("Disconnected from SignalR"));
//     };
//   }, [profile]);

//   // useEffect(() => {
//   //   console.log("🔄 appliedProjectsList updated:", appliedProjectsList);
//   // }, [appliedProjectsList]);

//   const userProjects = [
//     ...(profile?.projects?.map((proj) => ({
//       applications: proj.applications,
//       projectId: proj.id,
//       name: proj.name, // Ensure proj has a 'name' field
//       type: "owned", // Optional: Mark if it's an owned project
//     })) || []),

//     ...(appliedProjects?.map((appliedProj) => ({
//       applications: appliedProj.project.applications,
//       projectId: appliedProj.project.id,
//       name: appliedProj.project.name, // Adjust based on actual field names
//       type: "applied", // Optional: Mark if it's an applied project
//     })) || []),
//   ];

//   const clientApplications = [
//     ...(profile?.projects?.flatMap((proj) =>
//       proj.projectApplications.filter(
//         (application) => application.applicationStatus === "Pending"
//       )
//     ) || []),
//     ...projectApplicants, // Make sure this is also an array
//   ];

//   const [open, setOpen] = React.useState(false);
//   const [tab, setTab] = useState<"chats" | "notifications">("chats");

//   const openDrawer = () => setOpen(true);
//   const closeDrawer = () => setOpen(false);

//   // const drawerItems = [
//   //   {
//   //     text: "Chats",
//   //     onClick: () => {
//   //       closeDrawer();
//   //     },
//   //   },
//   //   {
//   //     text: "Notifications",
//   //     onClick: () => {
//   //       closeDrawer();
//   //     },
//   //   },
//   // ];

//   return (
//     <>
//       <div
//         className="hidden text-white w-max  justify-between  h-full md:flex items-center gap-2  content-center"
//         onClick={openDrawer}
//       >
//         {/* Notifications */}
//         <Tooltip
//           className="bg-[#171717] text-wheat rounded-none"
//           content="View notifications"
//           placement="bottom"
//         >
//           <Badge
//             className={`hidden  ${projectApplicants.length > 0 && "flex"}`}
//           >
//             <motion.h2
//               whileHover={{
//                 backgroundColor: "#171717",
//                 borderColor: "#cac6bf",
//               }}
//               className="text-ash h-full  px-2 hover:text-white flex items-center gap-2 font-medium text-sm "
//             >
//               Notifications
//               {/* <LiaPlusSolid /> */}
//             </motion.h2>
//           </Badge>
//         </Tooltip>
//       </div>

//       <Drawer
//         size={300}
//         open={open}
//         onClose={closeDrawer}
//         className="bg-transparent/50 border-y-[1px] border-l-[1px]  border-concrete"
//         placement="right"
//       >
//         <div className="p-4 flex items-center justify-between">
//           <h1 className="text-lg">Notifications</h1>
//           <IconButton variant="text" color="white" onClick={closeDrawer}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="h-5 w-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </IconButton>
//         </div>
//         <div>
//           <ul className="flex ">
//             <motion.li
//               onClick={() => setTab("chats")}
//               className={`p-1 text-sm w-full text-center ${
//                 tab === "chats" ? "text-white " : "text-ash"
//               }`}
//               whileHover={{
//                 backgroundColor: "#212121",
//               }}
//             >
//               My chats
//             </motion.li>
//             <div className="h-4 my-auto bg-concrete w-[1px]" />
//             <motion.li
//               onClick={() => setTab("notifications")}
//               className={`p-1 w-full text-sm text-center ${
//                 tab === "notifications" ? "text-white " : "text-ash"
//               }`}
//               whileHover={{
//                 backgroundColor: "#212121",
//               }}
//             >
//               Notifications
//             </motion.li>
//           </ul>
//         </div>
//         <div className="h-[1px] w-full bg-concrete" />

//         <div>
//           {/* ✅ Check tab first */}
//           {tab === "chats" ? (
//             userProjects?.length > 0 ? (
//               userProjects.map((project) => (
//                 <motion.li
//                   key={project.projectId}
//                   onClick={() => {
//                     setRoomId(project.projectId);
//                     setProjectName(project.name ?? "");
//                     closeDrawer();
//                   }}
//                   whileHover={{ backgroundColor: "#2C3333" }}
//                   className="p-2 z-50 flex justify-between"
//                 >
//                   <div className="flex  text-sm justify-between w-2/3 items-center gap-2">
//                     <p className="">{project.name?.slice(0, 25)}</p>
//                     <Tooltip
//                       className="bg-[#171717] text-wheat z-[9999] rounded-none"
//                       content={
//                         project.type === "owned"
//                           ? "Project owner"
//                           : "Project member"
//                       }
//                       placement="top"
//                     >
//                       <span className="mr-">
//                         {project.type === "owned" ? (
//                           <RiVipCrownFill fill="gold" />
//                         ) : (
//                           <PiHardHatDuotone fill="#6EACDA" />
//                         )}
//                       </span>
//                     </Tooltip>
//                   </div>
//                   <div>
//                     <Tooltip
//                       placement="top"
//                       content={projectApplicants?.map(
//                         (app) => app.applicant.userName
//                       )}
//                       className="bg-[#171717] text-wheat z-[9999] rounded-none"
//                     >
//                       <h2 className="font-thin text-sm">
//                         Members: {project.applications}
//                       </h2>
//                     </Tooltip>
//                   </div>
//                 </motion.li>
//               ))
//             ) : (
//               <div className="flex items-center gap-2 mt-2">
//                 <p className="p-2 font-thin text-sm">
//                   Your chat inbox is empty
//                 </p>
//                 <Button
//                   onClick={() => {
//                     navigate("/home/projects/create");
//                     closeDrawer();
//                   }}
//                 >
//                   Create
//                 </Button>
//               </div>
//             )
//           ) : tab === "notifications" ? (
//             clientApplications?.length > 0 ? (
//               <ul>
//                 {clientApplications.map((app, index) => (
//                   <div>
//                     <li key={index}>
//                       <div>
//                         <div className="flex flex-col gap-4 w-full p-4">
//                           <div className="flex gap-4">
//                             <Tooltip
//                               className="bg-[#171717] text-wheat z-[9999] rounded-none"
//                               content={app.applicant.userName}
//                               placement="top"
//                             >
//                               {app.applicant.imageUrl ? (
//                                 <img
//                                   onClick={() => {
//                                     navigate(
//                                       `/home/profile/${app.applicant.id}`
//                                     );
//                                     closeDrawer();
//                                   }}
//                                   className="size-8 rounded-full"
//                                   src={app.applicant.imageUrl}
//                                   alt=""
//                                 />
//                               ) : (
//                                 <div
//                                   onClick={() => {
//                                     navigate(
//                                       `/home/profile/${app.applicant.id}`
//                                     );
//                                     closeDrawer();
//                                   }}
//                                   className="w-8 h-8 flex items-center justify-center rounded-full bg-grape/50"
//                                 >
//                                   <p className="text-purple-100 text-base font-medium">
//                                     {app.applicant?.userName
//                                       ?.charAt(0)
//                                       .toUpperCase() ?? ""}
//                                   </p>
//                                 </div>
//                               )}
//                             </Tooltip>
//                             {/* <div className=" w-full flex"> */}
//                             <div className="text-xs">
//                               <p>You've got a new application!</p>
//                               <div className="my-2 h-[0.5px] bg-concrete " />
//                               <p className="text-xs text-ash">
//                                 {app.coverLetter}
//                               </p>
//                             </div>
//                           </div>
//                           {/* </div> */}
//                           <div className="flex gap-2  justify-end">
//                             <Button className="rounded-none p-1  normal-case bg-transparent border border-concrete text-xs font-light">
//                               Deny
//                             </Button>
//                             <Button className=" p-1 rounded-none normal-case bg-transparent bg-grape text-xs font-light">
//                               Approve
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </li>

//                     <div className=" h-[0.5px] bg-concrete mx-3" />
//                   </div>
//                 ))}
//               </ul>
//             ) : (
//               <p className="p-2 font-thin text-sm">
//                 No notifications available
//               </p>
//             )
//           ) : (
//             <p className="p-2 font-thin text-sm">No data available</p>
//           )}
//         </div>
//       </Drawer>
//     </>
//   );
// }

import React from "react";

export default function NotificationsDrawer() {
  return <div></div>;
}
