// import { useGetUserProjectsQuery } from "src/api/ProjectsApi";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { MdArrowBackIos } from "react-icons/md";
// import { AnimatePresence, motion } from "framer-motion";
// import { BiSolidGroup } from "react-icons/bi";
// import { MdOutlineSpaceDashboard } from "react-icons/md";
// import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
// import ProfileAvatar from "../ProfileAvatar";
// import { GetUserProjectModel } from "@/src/interfaces/projects/user-specific-projects/GetUserProjectModel";
// import { LiaCrossSolid, LiaPlusSolid, LiaPlusSquare } from "react-icons/lia";
// import { InputField } from "../InputField";
// import { Button } from "@material-tailwind/react";

// export default function ManageProjectPage() {
//   const { projectId } = useParams();

//   const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState<boolean>(false);
//   const [isMembersMenuOpen, setIsMembersMenuOpen] = useState<boolean>(false);
//   const [isTasksDropdownOpen, setIsTasksDropdownOpen] =
//     useState<boolean>(false);
//   const [isTaskChildOpen, setIsTaskChildOpen] = useState<boolean>(false);
//   const [subtasks, setSubtasks] = useState<string[]>([]);
//   const [subtaskInput, setSubtaskInput] = useState<string>("");

//   const [isTaskTitleSaved, setIsTaskTitleSaved] = useState<boolean>(false);

//   const [titleInput, setTitleInput] = useState<string>("");

//   const { data: userProjects } = useGetUserProjectsQuery();

//   const [userProject, setUserProject] = useState<
//     GetUserProjectModel | undefined
//   >(userProjects?.find((project) => project.id === parseInt(projectId || "0")));

//   const navigate = useNavigate();

//   return (
//     <div className="h-screen flex">
//       <div className="w-1/5 flex flex-col bg-[#221629]/50 h-full">
//         <div className="h-14 border-b-[1px] flex items-center justify-between border-concrete">
//           <h2 className="my-auto mx-4">{userProject?.name}</h2>
//           <motion.span
//             onClick={() => navigate("/home/profile")}
//             className="cursor-pointer"
//             initial={{ x: 0 }}
//             whileHover={{ x: -6 }}
//           >
//             <MdArrowBackIos className="mx-4" />
//           </motion.span>
//         </div>

//         <motion.div
//           onClick={() => setIsMembersMenuOpen((prev) => !prev)}
//           whileHover={{ backgroundColor: "#212121" }}
//           className="flex px-4 py-2 items-center gap-2 cursor-pointer"
//         >
//           <BiSolidGroup fill="#cac6bf" />
//           <p className="text-sm text-ash">Members</p>
//           <ChevronDownIcon
//             strokeWidth={2.5}
//             className={`block h-3 w-3 transition-transform  ${
//               isMembersMenuOpen ? "rotate-180" : ""
//             }`}
//           />
//         </motion.div>
//         <AnimatePresence>
//           {isMembersMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="flex flex-col"
//             >
//               {userProject?.projectApplications.map((projectApplication) => (
//                 <motion.div
//                   className="flex gap-2  cursor-pointer items-center px-4"
//                   key={projectApplication.id}
//                   whileHover={{ backgroundColor: "#212121" }}
//                 >
//                   {projectApplication.applicant.imageUrl ? (
//                     <img
//                       src={projectApplication.applicant.imageUrl}
//                       className="size-6 rounded-full"
//                       alt=""
//                     />
//                   ) : (
//                     <ProfileAvatar
//                       userName={projectApplication.applicant.userName}
//                       className="size-6 text-sm"
//                     />
//                   )}

//                   <motion.h1 className="p-2 text-ash text-sm">
//                     {projectApplication.applicant.userName}
//                   </motion.h1>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <motion.div
//           onClick={() => setIsProjectsMenuOpen((prev) => !prev)}
//           whileHover={{ backgroundColor: "#212121" }}
//           className="flex px-4 py-2 items-center gap-2 cursor-pointer"
//         >
//           <MdOutlineSpaceDashboard fill="#cac6bf" />
//           <p className="text-sm text-ash">Projects</p>
//           <ChevronDownIcon
//             strokeWidth={2.5}
//             className={`block h-3 w-3 transition-transform  ${
//               isProjectsMenuOpen ? "rotate-180" : ""
//             }`}
//           />
//         </motion.div>
//         <AnimatePresence>
//           {isProjectsMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="flex flex-col"
//             >
//               {userProjects
//                 ?.filter(
//                   (userProj) => userProj.name !== (userProject?.name || "")
//                 )
//                 .map((filteredProject) => (
//                   <motion.h1
//                     onClick={() => {
//                       setUserProject(
//                         userProjects?.find(
//                           (project) => project.id === filteredProject.id
//                         )
//                       );
//                     }}
//                     whileHover={{ backgroundColor: "#212121" }}
//                     key={filteredProject.id}
//                     className="p-2 px-4 cursor-pointer  text-ash text-sm"
//                   >
//                     {filteredProject.name}
//                   </motion.h1>
//                 ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//       <div className="flex flex-col grow bg-gradient-to-br  from-[#4D0D9C] to-purple-700 ">
//         <div className="h-14 w-full flex items-center bg-[#3E0877]/80 ">
//           <h2 className="my-auto mx-4 text-2xl">{userProject?.name}</h2>
//         </div>

//         <div className="h-full m-4 flex">
//           <motion.div
//             onClick={() => setIsTasksDropdownOpen(true)}
//             whileHover={{ y: -1 }}
//             whileTap={{ y: 1 }}
//             className={`${
//               isTasksDropdownOpen ? "hidden" : ""
//             } p-2 h-max cursor-pointer flex items-center gap-2 rounded-lg  w-64 bg-raisin`}
//           >
//             <LiaPlusSolid fill="#cac6bf" />
//             <p className="text-sm">Add new tasks</p>
//           </motion.div>
//           {isTasksDropdownOpen && (
//             <motion.div
//               className="
//           p-4 h-max cursor-pointer  items-center gap-2 rounded-lg  bg-black"
//             >
//               <div className="flex flex-col  gap-2 items-center">
//                 {isTaskTitleSaved && (
//                   <div className="flex flex-col gap-2 items-center">
//                     {isTaskTitleSaved && (
//                       <div className="w-64 flex flex-col gap-2">
//                         <h2>{titleInput}</h2>

//                         <div
//                           onClick={() => setIsTaskChildOpen(true)}
//                           className="flex items-center gap-2"
//                         >
//                           {subtaskInput ? (
//                             <motion.div
//                               initial={{ opacity: 0, y: -10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               className="w-full flex flex-col gap-2"
//                             >
//                               <input
//                                 value={subtaskInput}
//                                 onChange={(e) =>
//                                   setSubtaskInput(e.target.value)
//                                 }
//                                 type="text"
//                                 className="bg-transparent border p-1 border-concrete outline-none"
//                               />

//                               <div
//                                 className={`${
//                                   subtaskInput ? "" : "hidden"
//                                 } w-full flex gap-1 justify-end`}
//                               >
//                                 <Button
//                                   onClick={() => {
//                                     if (subtaskInput.trim()) {
//                                       setSubtasks((prev) => [
//                                         ...prev,
//                                         subtaskInput,
//                                       ]);
//                                       setSubtaskInput("");
//                                       setIsTaskChildOpen(false);
//                                     }
//                                   }}
//                                   className="p-2 px-4 normal-case text-sm bg-[#4635B1] rounded-md"
//                                 >
//                                   Save
//                                 </Button>
//                                 <Button
//                                   onClick={() => setSubtaskInput("")}
//                                   className="normal-case p-2 px-4 text-sm"
//                                 >
//                                   Cancel
//                                 </Button>
//                               </div>
//                             </motion.div>
//                           ) : (
//                             <motion.div
//                               whileHover={{ backgroundColor: "#212121" }}
//                               className="flex  w-full p-2 items-center gap-2"
//                               onClick={() => setSubtaskInput(" ")}
//                             >
//                               <LiaPlusSolid fill="#cac6bf" />
//                               <p className="text-sm  text-ash">Add new</p>
//                             </motion.div>
//                           )}
//                         </div>

//                         {/* 🔽 Subtasks display block goes here */}
//                         {subtasks.length > 0 && (
//                           <div className="mt-2 flex flex-col gap-1">
//                             {subtasks.map((task, idx) => (
//                               <div
//                                 key={idx}
//                                 className="bg-concrete/40 text-white p-2 rounded shadow text-sm"
//                               >
//                                 {task}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <InputField
//                   onChange={(e) => setTitleInput(e.target.value)}
//                   label=""
//                   type="text"
//                   placeholder="Add task"
//                   className={`${isTaskTitleSaved ? "hidden" : ""} border w-64`}
//                 />

//                 <div
//                   className={`${
//                     isTaskTitleSaved ? "hidden" : ""
//                   } flex gap-2 px-  w-full justify-end`}
//                 >
//                   <Button
//                     onClick={() => setIsTaskTitleSaved(true)}
//                     className="p-2 px-4 normal-case text-sm bg-deep-purple-800  rounded-md"
//                   >
//                     Save
//                   </Button>
//                   <Button
//                     onClick={() => setIsTasksDropdownOpen(false)}
//                     className="normal-case p-2 px-4 text-sm "
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//       {/* <h1>{userProject?.name}</h1>
//       <p>
//         Date of creation
//         {userProject?.dateCreated
//           ? new Date(userProject.dateCreated).toLocaleDateString()
//           : "N/A"}
//       </p>
//       <p>
//         Status: {userProject?.status ? userProject.status : "N/A"}
//         {userProject?.status === "Launched" ? " 🚀" : ""}
//       </p>

//       <p>Team members:</p>
//       <div>
//         {userProject?.projectApplications.map((projectApplication) => {
//           return (
//             <div key={projectApplication.id}>
//               <p>Applicant: {projectApplication.applicant.userName}</p>
//               <img
//                 onClick={() =>
//                   navigate(`/home/profile/${projectApplication.applicant.id}/`)
//                 }
//                 className="size-16 rounded-full cursor-pointer"
//                 src={projectApplication.applicant.imageUrl}
//                 alt=""
//               />
//               <p>
//                 Quiz Score:{" "}
//                 {(projectApplication.quizScore * 100).toPrecision(2)}%
//               </p>
//               <p>Application Status: {projectApplication.applicationStatus}</p>
//               <p>
//                 Selected Requirements:{" "}
//                 {projectApplication.selectedAndAppliedRequirements.join(", ")}
//               </p>
//             </div>
//           );
//         })}
//       </div> */}
//     </div>
//   );
// }

import React from "react";

export default function ManageProjectPage() {
  return <div></div>;
}
