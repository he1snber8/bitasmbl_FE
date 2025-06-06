// import { AnimatePresence, motion } from "framer-motion";
// import MyButton from "../../MyButton";
// import { useEffect, useRef, useState } from "react";
// import ProjectClientDetailedView from "./ProjectClientDetailedView";
// import ProjectFooter from "../ProjectFooter";
// import ProjectHeader from "../ProjectHeader";
// import { IoExpandSharp } from "react-icons/io5";
// import { Card } from "../../Card/Card";
// import {
//   ClientProjectRequirementResponse,
//   ClientProjectResponse,
// } from "@/src/interfaces/projects/client-specific-projects/GetClientProjectModel";
// import ProjectClientTestView from "./ProjectClientTestView";

// interface ProjectViewCardProps {
//   project: ClientProjectResponse;
//   projectsLoading: boolean;
// }

// export default function ProjectViewCard({
//   project: clientProject,
//   projectsLoading,
// }: ProjectViewCardProps) {
//   const [projectRequirements, setProjectRequirements] = useState<
//     ClientProjectRequirementResponse[]
//   >(clientProject.requirements);

//   const [projectImagesOpened, setProjectImagesOpened] =
//     useState<boolean>(false);

//   useEffect(() => {
//     setProjectRequirements(clientProject.requirements);
//   }, [clientProject.requirements]);

//   return (
//     <motion.div className="flex flex-col md:flex-row gap-4 cursor-pointer rounded-xl bg-[#191919]/90 border border-ash/20 mx-4">
//       <motion.div className="flex md:h-max flex-col p-4 grow  m-4 md:py-4 md:m-0  gap-2">
//         <ProjectHeader
//           projectCreator={clientProject.user.userName}
//           projectName={clientProject.name}
//           status={clientProject.status}
//           creatorImageUrl={clientProject.user.imageUrl}
//           githubRepo={clientProject.githubRepo}
//           projectImages={clientProject.projectImages}
//           clientProject={clientProject}
//         />

//         <div className="flex   md:gap-6 p-2  h-full">
//           <div className="flex flex-col w-full">
//             <div className="gro">
//               <p className="text-xs  md:text-sm text-ash">
//                 {clientProject.description.length > 300
//                   ? clientProject.description.slice(0, 300) + "..."
//                   : clientProject.description}
//               </p>
//             </div>

//             <ProjectFooter
//               projectLinks={clientProject.projectLinks.filter(
//                 (link) =>
//                   link.urlName.trim() !== "" && link.urlValue.trim() !== ""
//               )}
//               dateCreated={clientProject.dateCreated ?? new Date()}
//               status={clientProject.status}
//             />
//           </div>

//           <AnimatePresence>
//             {projectImagesOpened && (
//               <ProjectClientTestView
//                 clientProject={clientProject}
//                 projectRequirements={projectRequirements}
//                 onClose={() => setProjectImagesOpened(false)}
//                 setProjectRequirements={setProjectRequirements}
//               />
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//       <motion.img
//         onClick={() => setProjectImagesOpened(true)}
//         whileHover={{ borderColor: "#4f46e5", boxShadow: "0 0 10px #4f46e5" }}
//         src={clientProject.projectImages[0].imageUrl ?? ""}
//         className="w-32 h-32 md:size-44 rounded-xl object-cover "
//         alt="project"
//       />
//     </motion.div>
//   );
// }

import React from "react";

export default function ProjectClientView() {
  return <div></div>;
}
