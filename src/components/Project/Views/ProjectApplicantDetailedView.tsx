// import React from "react";
// import {
//   Dialog,
//   DialogBody,
//   DialogHeader,
//   IconButton,
//   Typography,
// } from "@material-tailwind/react";
// import { GetProjectApplicationModel } from "../../../interfaces/projects/user-specific-projects/GetUserProjectModel";
// import { FaDocker } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { PiEnvelopeSimpleDuotone } from "react-icons/pi";
// import { SiDotnet, SiTypescript, SiCss3 } from "react-icons/si";
// import { AiOutlineDotNet } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

// export default function ProjectApplicantDetailedView({
//   setApplicantView: onClose,
//   applicantViewOpen: applicationsOpen,
//   projectApplication,
// }: {
//   setApplicantView: React.Dispatch<React.SetStateAction<number | null>>;
//   applicantViewOpen: boolean;
//   projectApplication: GetProjectApplicationModel;
// }) {
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={() => onClose(null)} // Close modal when clicking outside
//     >
//       <motion.div
//         className="bg-coal border relative border-concrete  shadow-lg w-1/3"
//         initial={{ opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//       >
//         <DialogHeader className="flex justify-between bg-concrete/10">
//           <Typography className="grow" color="white">
//             <p className="text-ash flex items-center">
//               {projectApplication.applicant.imageUrl ? (
//                 <img
//                   onClick={() => {
//                     navigate(
//                       `/home/profile/${projectApplication.applicant.id}`
//                     );
//                   }}
//                   className="size-12 rounded-full"
//                   src={projectApplication.applicant.imageUrl}
//                   alt=""
//                 />
//               ) : (
//                 <div
//                   onClick={() => {
//                     navigate(
//                       `/home/profile/${projectApplication.applicant.id}`
//                     );
//                   }}
//                   className="size-12 my-auto mr-3 cursor-pointer rounded-full flex items-center justify-center bg-grape/50"
//                 >
//                   <p className="text-purple-100 text-2xl">
//                     {projectApplication.applicant?.userName
//                       ?.charAt(0)
//                       ?.toUpperCase() || ""}
//                   </p>
//                 </div>
//               )}
//               <span className="ml-2">
//                 {projectApplication.applicant.userName}
//               </span>
//               's application
//             </p>
//           </Typography>
//           <IconButton
//             onClick={() => onClose(null)}
//             variant="text"
//             className="outline-none rounded-none"
//             color="white"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={4}
//               stroke="currentColor"
//               className="size-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </IconButton>
//         </DialogHeader>
//         <DialogBody>
//           <div className="flex items-center gap-4">
//             <p>Score: </p>
//             <p
//               className={`content-center border border-coal bg-opacity-50 h-full px-2 py-1 ${
//                 projectApplication.quizScore >= 0.75
//                   ? "bg-[#035E3E] text-[#B8FFD7]" // High score
//                   : projectApplication.quizScore >= 0.5
//                   ? "bg-[#F5A623] text-[#FFECB8]" // Medium score
//                   : "bg-[#D0021B] text-[#FFABA2]" // Low score
//               }`}
//             >
//               {(projectApplication.quizScore * 100).toPrecision(3)}%
//             </p>
//           </div>
//           <div className="flex flex-col  items-center gap-4">
//             <div className="w-full flex items-center gap-1">
//               <PiEnvelopeSimpleDuotone />
//               <p className="text-sm">Cover letter:</p>

//               <p className="text-sm">{projectApplication.coverLetter}</p>
//             </div>
//             <div className="w-full">
//               <p>Selected Requirements: </p>
//               {projectApplication.selectedAndAppliedRequirements?.map(
//                 (appliedRequirement, index) => (
//                   <div className="flex items-center gap-2" key={index}>
//                     <p>{appliedRequirement}</p>
//                     {appliedRequirement === "TypeScript" && <SiTypescript />}
//                     {appliedRequirement === "ASP.NET Core" && (
//                       <SiDotnet size={28} />
//                     )}
//                     {appliedRequirement === "CSS" && <SiCss3 />}
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </DialogBody>
//       </motion.div>
//     </motion.div>
//   );
// }

// // import React from "react";

// // export default function ProjectApplicantDetailedView() {
// //   return <div></div>;
// // }

import React from "react";

export default function ProjectApplicantDetailedView() {
  return <div></div>;
}
