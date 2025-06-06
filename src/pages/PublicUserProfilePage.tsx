// import React from "react";
// import { useParams } from "react-router-dom";
// import { useGetPublicProfileQuery } from "../api/UsersApi";

// import { motion, AnimatePresence } from "framer-motion";
// import { FaSlack } from "react-icons/fa";
// import { PiInstagramLogoDuotone } from "react-icons/pi";
// import { RiLinkedinFill } from "react-icons/ri";
// import { IoIosLink } from "react-icons/io";

// export default function PublicUserProfilePage() {
//   const { userId } = useParams();
//   // console.log(userId);

//   const { data, error, isLoading } = useGetPublicProfileQuery(userId || "");

//   if (!userId) {
//     return <div>User ID is missing</div>;
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading profile</div>;
//   }

//   console.log(data?.userSocials);

//   return (
//     <>
//       <div className="flex flex-col lg:flex-row p-8 gap-8 justify-between h-screen">
//         <div className="flex flex-row grow gap-12">
//           <div className="flex gap-8 justify-between">
//             <div>
//               <h1 className="text-xl">{data?.userName}</h1>
//               {/* <h1 className="text-lg font-thin">{data?.email}</h1> */}
//               <p className="mt text-ash text-sm">
//                 {data?.bio || "No Description"}
//               </p>
//               <p className="mt-4 text-sm text-concrete">
//                 Member since:{" "}
//                 {new Date(data?.dateJoined || "").toLocaleDateString()}
//               </p>
//               <div className="mt-6">
//                 <h1 className="text-xl font-light">Social Links</h1>
//                 <div className="flex flex-col gap-2">
//                   {data?.userSocials?.map((social, index) => (
//                     <div key={index} className="flex items-center gap-2 w-max">
//                       {social.socialUrl.includes("slack") ? (
//                         <FaSlack size={18} />
//                       ) : social.socialUrl.includes("insta") ? (
//                         <PiInstagramLogoDuotone size={18} />
//                       ) : social.socialUrl.includes("linkedin") ? (
//                         <RiLinkedinFill
//                           fill="white"
//                           size={18}
//                           className="bg-blue-600"
//                         />
//                       ) : (
//                         <IoIosLink size={18} />
//                       )}
//                       <h1 className="hover:text-blue-400 hover:underline">
//                         {social.socialUrl}
//                       </h1>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             {data?.imageUrl ? (
//               <div className="flex justify-center relative w-max">
//                 <img
//                   src={data?.imageUrl}
//                   alt={`${data?.userName}'s profile`}
//                   className="size-24 rounded-full object-cover border-4 border-transparent"
//                 />
//               </div>
//             ) : (
//               <div className="mx-auto size-24 mb-4 cursor-pointer rounded-full flex bg-grape/50">
//                 <p className="items-center m-auto text-5xl text-purple-100">
//                   {data?.userName?.charAt(0).toUpperCase() ?? ""}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="grow">
//             <h1 className="text-xl font-light">{data?.userName}'s Projects</h1>
//             <div
//               className={`${
//                 data?.projects?.length ? "grid grid-cols-2 gap-4" : ""
//               }`}
//             >
//               {data?.projects && data.projects.length > 0 ? (
//                 data..map((userProject) => (
//                   <motion.div
//                     // whileHover={{ backgroundColor: "#0e1118" }}
//                     key={userProject.id}
//                     className="flex flex-col bg-[#191919] cursor-pointer z-0 gap-8 border  border-concrete  p-2"
//                   >
//                     <div className="flex justify-between items-center grow">
//                       <h1 className="text-blue-500 hover:underline cursor-pointer decoration-solid">
//                         {userProject.name}
//                       </h1>
//                       <h1>
//                         {userProject.githubRepo && (
//                           <motion.div
//                             // animate={{ scale: 1.1 }}
//                             transition={{ duration: 0.3 }}
//                             whileHover={{
//                               boxShadow:
//                                 "0px 0px 20px rgba(255, 255, 255, 0.5)",
//                             }}
//                             className="flex shadow-lg border  md:gap-2  border-concrete cursor-pointer hover:border-ash p-1 md:p-2"
//                           >
//                             <img
//                               className="size-6 shadow-lg rounded-full"
//                               src="/github-mark-white.png"
//                               alt=""
//                             />
//                             <a
//                               className="font-light"
//                               href={`https://github.com/${
//                                 data?.userName
//                               }/${userProject.githubRepo.split("/").pop()}`}
//                               target="#"
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               <h1 className="hidden md:inline-block">
//                                 {userProject.githubRepo.split("/").pop()}
//                               </h1>
//                             </a>
//                           </motion.div>
//                         )}
//                       </h1>
//                     </div>

//                     <div className="flex justify-between items-center">
//                       <div className="text-sm">
//                         <p className="text-ash z-10 font-light text-xs md:text-base hover:text-white hover:underline cursor-pointer">
//                           Applications: {userProject.applications}
//                         </p>
//                         <p className="font-thin text-xs md:text-base">
//                           Created on:{" "}
//                           {userProject?.dateCreated
//                             ? new Date(
//                                 userProject.dateCreated
//                               ).toLocaleDateString()
//                             : "No date available"}
//                         </p>
//                       </div>
//                       <div className="h-full content-end">
//                         <h1
//                           className={`text-xs p-[2px] md:p-2 md:text-base bg-opacity-50 ${
//                             userProject.status === "Active"
//                               ? "bg-[#035E3E] text-[#B8FFD7]"
//                               : userProject.status === "Filled"
//                               ? "bg-[#F5A623] text-[#FFECB8]"
//                               : userProject.status === "Feleted"
//                               ? "bg-[#D0021B] text-[#FFABA2]"
//                               : ""
//                           }
//               `}
//                         >
//                           {userProject.status}
//                         </h1>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))
//               ) : (
//                 <div className="text-center p-12 md:p-24 text-gray-500">
//                   <h1 className="text-lg">No projects available</h1>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <ActivitiesTimeline /> */}
//       {/* <DefaultStepper /> */}
//     </>
//   );
// }

import React from "react";

export default function PublicUserProfilePage() {
  return <div></div>;
}
