// import {
//   Button,
//   Dialog,
//   DialogBody,
//   DialogFooter,
//   DialogHeader,
//   IconButton,
//   Typography,
// } from "@material-tailwind/react";
// import React, { useRef, useState } from "react";
// import MyButton from "../../MyButton";
// import {
//   useApplyToProjectMutation,
//   useGetProjectRequirementTestQuery,
// } from "../../../api/ProjectsApi";
// import ProjectRequirementTest from "./ProjectRequirementTest";
// import { ApplyToProjectRequest } from "@/src/interfaces/projects/projectTypes";
// import { MdArrowBack } from "react-icons/md";
// import { motion } from "framer-motion";
// import { ClientProjectRequirementResponse } from "@/src/interfaces/projects/client-specific-projects/GetClientProjectModel";

// export default function ProjectApplicationModal({
//   isOpen,
//   onClose,
//   selectedRequirements,
//   clientProjectId,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedRequirements: ClientProjectRequirementResponse[];
//   clientProjectId: number;
// }) {
//   const enabledRequirements = selectedRequirements.filter(
//     (sr) => sr.isTestEnabled
//   );

//   const { data: requirementTests } = useGetProjectRequirementTestQuery({
//     requirementNames: enabledRequirements.map((sr) => sr.requirement.description),
//   });

//   const [step, setStep] = useState(0);
//   const [correctAnswers, setCorrectAnswers] = useState(0);

//   const coverLetterRef = useRef<HTMLTextAreaElement>(null);

//   const handleNext = () => {
//     if (requirementTests && step < requirementTests.length) {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     setStep((prev) => prev - 1);
//   };

//   // console.log(step);

//   const [applyToProject, { isLoading, error }] = useApplyToProjectMutation();

//   const handleApply = async (projectId: number) => {
//     if (selectedRequirements.length === 0) {
//       return alert("Please select a requirement to apply to this project!");
//     }
//     try {
//       const projectApplicationCommand: ApplyToProjectRequest = {
//         coverLetter: coverLetterRef.current?.value || "",
//         projectId,
//         requirementIds: selectedRequirements.map((req) => req.requirementId),
//         selectedAndAppliedRequirements: selectedRequirements.map(
//           (req) => req.requirement.description
//         ),
//         // correctAnswers: correctAnswers,
//         // totalQuestions: requirementTests ? requirementTests.length : 0,
//       };

//       // console.log(projectApplicationCommand);

//       // Call the mutation and handle the response
//       const response = await applyToProject(projectApplicationCommand).unwrap();

//       console.log(response);

//       alert("Application submitted successfully!");
//     } catch (err: any) {
//       console.error("Failed to apply to project:", err);
//       alert(
//         err.data?.message || "There was an error submitting your application."
//       );
//     }
//   };
//   return (
//     <>
//       <motion.div
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose} // Close modal when clicking outside
//       >
//         <motion.div
//           className="bg-coal border border-coal/60 p-6 shadow-lg w-1/3 h-1/2"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: -50, opacity: 0 }}
//           onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//         >
//           <DialogHeader className="flex  justify-between bg-concrete/10">
//             {/* <Typography className="grow text-center" color="white">
//               {requirementTests && step >= requirementTests.length
//                 ? "Create a cover letter!"
//                 : "Take a quiz to show your expertize!"}
//             </Typography> */}
//             <IconButton onClick={onClose} variant="text" color="white">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={4}
//                 stroke="currentColor"
//                 className="size-5"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </IconButton>
//           </DialogHeader>
//           <DialogBody className="">
//             {requirementTests && step < requirementTests.length && (
//               <ProjectRequirementTest
//                 question={requirementTests[step].question}
//                 questionCount={requirementTests.length}
//                 answers={requirementTests[step].answers}
//                 correctAnswer={requirementTests[step].correctAnswer}
//                 handleNext={handleNext}
//                 setCorrectAnswers={setCorrectAnswers}
//                 correctAnswers={correctAnswers}
//               />
//             )}

//             {step === requirementTests?.length && (
//               <textarea
//                 ref={coverLetterRef}
//                 placeholder="Tell about yourself to the project creator"
//                 className="border w-full border-concrete grow min-h-44 max-h-96 bg-transparent rounded-none px-2 py-3 focus:!border-raisin placeholder:text-concrete text-white focus:outline-none"
//               />
//             )}
//           </DialogBody>

//           <DialogFooter>
//             <Button onClick={() => handleApply(clientProjectId)}>Apply</Button>
//           </DialogFooter>
//         </motion.div>
//       </motion.div>
//     </>
//   );
// }

import React from "react";

export default function ProjectApplicationModal() {
  return <div></div>;
}
