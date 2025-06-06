// import { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { ApplyToProjectRequest } from "../../../interfaces/projects/projectTypes";

// import { RiCloseLargeFill } from "react-icons/ri";
// import MyButton from "../../MyButton";
// import ProjectApplicationModal from "../ProjectApplication/ProjectApplicationModal";
// import { useApplyToProjectMutation } from "../../../api/ProjectsApi";
// import { useNavigate } from "react-router-dom";
// import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";
// import ClientProfileDrawer from "../../ClientProfileDrawer";
// import * as io from "socket.io-client";
// import SelectedRequirements from "../ProjectCreation/SelectedRequirements";
// import {
//   ClientProjectRequirementResponse,
//   ClientProjectResponse,
// } from "@/src/interfaces/projects/client-specific-projects/GetClientProjectModel";

// export default function ProjectClientDetailedView({
//   isOpen,
//   onClose,
//   clientProject,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   clientProject: ClientProjectResponse;
// }) {
//   const [profileHovered, setProfileHovered] = useState<boolean>();
//   const [clientProfileView, setClientProfileView] = useState<boolean>(false);

//   const socket = io.connect("http://localhost:3001");

//   const [projectRequirements, setProjectRequirements] = useState<
//     ClientProjectRequirementResponse[]
//   >(clientProject.requirements);

//   const [openCoverLetter, setOpenCoverLetter] = useState<boolean>(false);

//   const [selectedRequirementIds, setSelectedRequirementIds] = useState<
//     number[]
//   >([]);

//   const [initialValues, setInitialValues] = useState(() =>
//     projectRequirements.map((req) => req.currentApplications)
//   );

//   const toggleRequirementCount = (requirementIndex: number) => {
//     setProjectRequirements((requirements) => {
//       const updatedRequirements = requirements.map((requirement, index) => {
//         if (index === requirementIndex) {
//           const initialValue = initialValues[index];
//           return {
//             ...requirement,
//             currentApplications:
//               requirement.currentApplications === initialValue
//                 ? requirement.currentApplications + 1
//                 : initialValue,
//           };
//         }
//         return requirement;
//       });
//       return updatedRequirements;
//     });
//   };

//   return (
//     <>
//       <motion.div
//         className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose} // Close modal when clicking outside
//       >
//         <motion.div
//           className="bg-black border relative border-concrete  shadow-lg w-5/6"
//           initial={{ opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//         >
//           <div className="relative flex flex-col max-h-[46rem] overflow-y-auto">
//             <div className="sticky flex md:flex-row flex-col justify-between p-8 bg-coal bg-opacity-60 backdrop-blur-md z-50  top-0 left-0 w-full  border-b border-concrete">
//               <div className="sm:items-center flex md:flex-col  justify-between">
//                 <h2 className="text-2xl">{clientProject.name}</h2>
//                 <h2 className="text-sm text-ash font-thin hidden md:block">
//                   Published on{" "}
//                   {new Date(
//                     clientProject.dateCreated ?? "Unknown"
//                   ).toLocaleDateString()}
//                 </h2>
//                 <motion.div
//                   onClick={onClose}
//                   whileTap={{ scale: 1.1 }}
//                   className="p-3 cursor-pointer md:hidden"
//                   whileHover={{ backgroundColor: "rgba(202,198,191,0.3)" }}
//                 >
//                   <RiCloseLargeFill size={28} />
//                 </motion.div>
//               </div>
//               <div className="md:flex hidden justify-between items-center w-max gap-4  ">
//                 <motion.div
//                   onHoverEnd={() => setProfileHovered(false)}
//                   onHoverStart={() => setProfileHovered(true)}
//                   className="flex items-center"
//                 >
//                   <motion.div
//                     animate={{
//                       borderColor: profileHovered
//                         ? "#ffffff"
//                         : "rgb(202,198,191)",
//                     }}
//                     className="cursor-pointer text-ash font-thin p-3 flex items-center"
//                   >
//                     View
//                     <motion.p
//                       onClick={() => {
//                         // navigate(`/home/profile/${clientProject.user.id}`)
//                         setClientProfileView(true);
//                       }}
//                       className="mx-1 font-thin"
//                       animate={{
//                         color: profileHovered ? "#ffffff" : "rgb(202,198,191)",
//                       }} // Use hex values
//                     >
//                       {clientProject.user.userName}'s
//                     </motion.p>
//                     profile
//                   </motion.div>
//                 </motion.div>
//                 <motion.div
//                   onClick={onClose}
//                   whileTap={{ scale: 1.1 }}
//                   className="p-3 cursor-pointer"
//                   whileHover={{ backgroundColor: "rgba(202,198,191,0.3)" }}
//                 >
//                   <RiCloseLargeFill size={28} />
//                 </motion.div>
//               </div>
//             </div>

//             <div className="flex p-12 md:flex-row bg- flex-col relative gap-12 ">
//               <div className="md:fw-1/3 sticky w-1/2 max-h-[36rem]  top-32">
//                 <h2 className="my-4">Project Description:</h2>
//                 <p className="text-sm font-thin">{clientProject.description}</p>
//                 <h2 className="mt-4">Categories:</h2>
//                 <ul className="mt-4 flex flex-wrap gap-2">
//                   {clientProject.categories.map((category) => {
//                     return (
//                       <li className="border text-sm p-2 border-concrete">
//                         {category.name}
//                       </li>
//                     );
//                   })}
//                 </ul>
//                 <h2 className="mb-4 mt-4">Requirements:</h2>
//                 <div>
//                   <ul className="flex gap-2 bg-red-40 h-24 flex-wrap">
//                     {projectRequirements.map((projectRequirement, index) => {
//                       return (
//                         <motion.div
//                           key={index}
//                           onClick={() => {
//                             setSelectedRequirementIds((prevIds) =>
//                               prevIds.includes(projectRequirement.requirementId)
//                                 ? prevIds.filter(
//                                     (id) =>
//                                       id !== projectRequirement.requirementId
//                                   )
//                                 : [...prevIds, projectRequirement.requirementId]
//                             );
//                             if (
//                               projectRequirement.currentApplications !==
//                               projectRequirement.maxApplicationLimit
//                             ) {
//                               toggleRequirementCount(index);
//                             }
//                           }}
//                           // className={`w-full md:w-max border flex border-black py-1 px-2 md:px-6 bg-green-300 cursor-pointer`}
//                           whileTap={{ scale: 1.05 }}
//                         >
//                           <span
//                             className={`p-2 text-sm border bg-[#1d0828] bg-opacity-60
//     ${
//       selectedRequirementIds.includes(projectRequirement.requirementId)
//         ? "bg-[#2D0740] border-[#9c27b0]"
//         : projectRequirement.currentApplications ===
//           projectRequirement.maxApplicationLimit
//         ? "bg-gray-800 pointer-events-none select-none cursor-not-allowed"
//         : "cursor-pointer"
//     }`}
//                           >
//                             {projectRequirement.requirement.name}{" "}
//                             {projectRequirement.currentApplications}/
//                             {projectRequirement.maxApplicationLimit}
//                           </span>
//                         </motion.div>
//                       );
//                     })}
//                   </ul>
//                 </div>
//                 <MyButton
//                   onClick={() => {
//                     setOpenCoverLetter((prev) => !prev);
//                   }}
//                   absolute
//                 >
//                   Apply
//                 </MyButton>
//                 {/* </button> */}
//                 {openCoverLetter && (
//                   <ProjectApplicationModal
//                     selectedRequirements={projectRequirements.filter((req) =>
//                       selectedRequirementIds.includes(req.requirementId)
//                     )}
//                     isOpen={openCoverLetter}
//                     onClose={() => setOpenCoverLetter((prev) => !prev)}
//                     clientProjectId={clientProject.id}
//                   />
//                 )}
//               </div>
//               <div className="hidden md:block w-2/3">
//                 {clientProject.projectImages.map((imagesUrl, index) => (
//                   <img
//                     key={index}
//                     src={imagesUrl.imageUrl}
//                     alt=""
//                     className="mb-2 object-cover w-full"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//       <ClientProfileDrawer
//         open={clientProfileView}
//         setOpen={setClientProfileView}
//         client={clientProject.user}
//       />
//     </>
//   );
// }

import React from "react";

export default function ProjectClientDetailedView() {
  return <div></div>;
}
