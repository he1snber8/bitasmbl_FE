// import { useGetProfileQuery } from "../api/UsersApi";
// import ProfileDetails from "../components/ProfileDetails";
// import { useEffect, useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import { GetUserProjectModel } from "../interfaces/projects/user-specific-projects/GetUserProjectModel";
// import { motion } from "framer-motion";
// import ModalApplicationsView from "../components/ModalApplicationsView";
// // import { ProjectsUserProfileView } from "../components/Project/Views/ProjectsUserProfileView";
// import { Button } from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";

// export default function MyUserProfilePage() {
//   const [openProfileDetails, setOpenProfileDetails] = useState<boolean>(false);
//   const [open, setOpen] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const {
//     data: user,
//     error: userError,
//     isLoading: userLoading,
//     refetch,
//   } = useGetProfileQuery();

//   useEffect(() => {
//     refetch();
//   }, [user?.projects, refetch]);

//   const [selectedProjectApplications, setSelectedProjectApplications] =
//     useState<GetUserProjectModel | null>(null);

//   const [selectedProjectView, setSelectedProjectView] =
//     useState<GetUserProjectModel | null>(null);

//   return (
//     <motion.div
//       initial={{ x: -20, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="flex mt-4  flex-col lg:flex-row justify-between h-screen"
//     >
//       <div className="flex p-6 gap-4  border-ash flex-col grow ">
//         <div className="flex  justify-between">
//           <div>
//             <h1 className="text-xl">{user?.userName}</h1>
//             <h1 className="text-lg font-thin">your personale account</h1>
//           </div>
//           {user?.imageUrl ? (
//             <div className="flex justify-center relative w-max ">
//               <img
//                 src={user?.imageUrl}
//                 alt={`${user?.userName}'s profile`}
//                 className="size-24 rounded-full object-cover border-4 border-transparent"
//               />
//               <p className="absolute cursor-pointer bottom-0 right-0  bg-coal py-1 px-2 border border-concrete">
//                 Edit
//               </p>
//             </div>
//           ) : (
//             <div className="mx-auto size-24  mb-4  cursor-pointer rounded-full flex bg-grape/50">
//               <p className="items-center m-auto text-5xl text-purple-100">
//                 {user?.userName
//                   ? user.userName?.charAt(0).toUpperCase() ?? ""
//                   : ""}
//               </p>
//             </div>
//           )}
//         </div>
//         <Button
//           onClick={() => setOpenProfileDetails((prev) => !prev)}
//           className="  rounded-none text-center mt-8 normal-case text-base font-normal  bg-gradient-to-r from-coal to-gray-900 py-2 px-4  "
//         >
//           Edit Profile Details
//         </Button>
//         <AnimatePresence>
//           {openProfileDetails && (
//             <ProfileDetails
//               user={user}
//               onClose={() => setOpenProfileDetails(false)}
//             />
//           )}
//         </AnimatePresence>
//       </div>
//       <div className="flex flex-col bg-coal mr-4  rounded-xl border-ash/20  gap-4  grow  h-screen p-8">
//         <h1 className="text-xl font-light">My Projects</h1>
//         <div
//           className={`${
//             user?.projects && user.projects.length > 0
//               ? "grid  grid-cols-2"
//               : ""
//           }  gap-4`}
//         >
//           {user?.projects && user.projects.length > 0 ? (
//             user.projects.map((userProject) => (
//               <motion.div
//                 onClick={() => {
//                   setSelectedProjectView(userProject);
//                   setOpen(!open);
//                 }}
//                 // whileHover={{ backgroundColor: "#0e1118" }}
//                 key={userProject.id}
//                 className="flex flex-col bg-[#1a1919]  rounded-xl border-ash/20 cursor-pointer z-0 gap-8 border  p-2"
//               >
//                 <div className="flex justify-between items-center grow">
//                   <AnimatePresence>
//                     {/* {open && selectedProjectView && (
//                       <ProjectsUserProfileView
//                         userProject={selectedProjectView}
//                         setOpen={setOpen}
//                       />
//                     )} */}
//                   </AnimatePresence>

//                   <h1 className="text-ash  hover:text-blue-400 w-max cursor-pointer hover:underline hover:decoration-1 ">
//                     {userProject.name}
//                   </h1>
//                   <h1>
//                     {userProject.githubRepo && (
//                       <motion.div
//                         // animate={{ scale: 1.1 }}
//                         transition={{ duration: 0.3 }}
//                         whileHover={{
//                           boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.5)",
//                         }}
//                         className="flex shadow-lg border  md:gap-2  border-concrete cursor-pointer hover:border-ash p-1 md:p-2"
//                       >
//                         <img
//                           className="size-6 shadow-lg rounded-full"
//                           src="/github-mark-white.png"
//                           alt=""
//                         />
//                         <a
//                           className="font-light"
//                           href={`https://github.com/${
//                             user.userName
//                           }/${userProject.githubRepo.split("/").pop()}`}
//                           target="#"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <h1 className="hidden md:inline-block">
//                             {userProject.githubRepo.split("/").pop()}
//                           </h1>
//                         </a>
//                       </motion.div>
//                     )}
//                   </h1>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <div className="text-sm">
//                     <p
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setSelectedProjectApplications(userProject);
//                       }}
//                       className="text-ash z-10 font-light text-xs md:text-base hover:text-purple-400 w-max cursor-pointer hover:underline hover:decoration-1 "
//                     >
//                       Applications: {userProject.applications}
//                     </p>
//                     <p className="font-thin text-xs md:text-base">
//                       Created on:{" "}
//                       {userProject?.dateCreated
//                         ? new Date(userProject.dateCreated).toLocaleDateString()
//                         : "No date available"}
//                     </p>
//                   </div>
//                   <div className="h-full content-end">
//                     <h1
//                       className={`text-xs p-[2px] md:p-2 md:text-sm bg-opacity-50 ${
//                         userProject.status === "Active"
//                           ? "bg-[#035E3E] text-[#B8FFD7]"
//                           : userProject.status === "Filled"
//                           ? "bg-[#F5A623] text-[#FFECB8]"
//                           : userProject.status === "Deleted"
//                           ? "bg-[#D0021B] text-[#FFABA2]"
//                           : userProject.status === "Launched"
//                           ? "bg-[#3e4be0] text-[#86a6e1]"
//                           : ""
//                       }
//               `}
//                     >
//                       {userProject.status}
//                       {userProject.status === "Launched" ? " 🚀" : ""}
//                     </h1>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <div className="text-center  p-12 md:p-24 text-gray-500">
//               <div className="flex flex-col">
//                 <h1 className="text-lg md:text-lg">
//                   Create your first Bitasmbl project{" "}
//                 </h1>
//                 <h1 className="text-sm md:text-base text-ash font-thin">
//                   Projects are a customizable, flexible tool for planning and
//                   tracking your work.
//                 </h1>
//                 <Button
//                   onClick={() => navigate("/home/projects/create")}
//                   className="w-max mx-auto font-normal p-2 mt-8 rounded-none normal-case text-sm bg-gradient-to-r  from-raisin to-purple-800"
//                 >
//                   Create new project
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* <AnimatePresence>
//             {selectedProjectApplications && (
//               <ModalApplicationsView
//                 isOpen={!!selectedProjectApplications}
//                 onClose={() => setSelectedProjectApplications(null)}
//                 project={selectedProjectApplications}
//               />
//             )}
//           </AnimatePresence> */}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

import React from "react";

export default function MyUserProfilePage() {
  return <div></div>;
}
