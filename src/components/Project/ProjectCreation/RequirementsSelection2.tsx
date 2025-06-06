// import { useState } from "react";
// import { useGetProjectRequirementsQuery } from "src/api/ProjectsApi";
// import { motion } from "framer-motion";
// import { useAlterRequirements } from "src/hooks/useAlterRequirements";
// import { ProjectRequirement } from "@/src/interfaces/projects/projectTypes";
// import { Button } from "@material-tailwind/react";

// export default function RequirementsSelection2({
//   handleNext,
//   handleBack,
//   selectedRequirements,
//   addRequirement,
// }: {
//   handleNext: () => void;
//   handleBack: () => void;
//   selectedRequirements: ProjectRequirement[];
//   addRequirement: (requirement: ProjectRequirement) => void;
// }) {
//   const { data: requirements } = useGetProjectRequirementsQuery();
//   const [projectDescription, setProjectDescription] = useState(""); // User input for project description
//   const [chatResponse, setChatResponse] = useState(""); // Response from AI chat

//   const handleSubmitDescription = async () => {
//     setChatResponse("");

//     try {
//       const response = await fetch("http://localhost:3002/ask", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           prompt: generateChatPrompt(projectDescription),
//         }),
//       });

//       if (!response.body) {
//         throw new Error("Response body is null");
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder("utf-8");
//       let done = false;
//       let streamResponse = "";

//       // Read and process the stream as it arrives
//       while (!done) {
//         const { value, done: doneReading } = await reader.read();
//         done = doneReading;

//         // Decode the chunk and process each line
//         const chunkValue = decoder.decode(value, { stream: true });

//         // Ensure words are split properly
//         const lines = chunkValue.split("\n");
//         let localResponse = streamResponse; // Use a local variable to avoid unsafe references
//         lines.forEach((line) => {
//           if (line.startsWith("data: ")) {
//             const text = line.replace("data: ", "").trim();
//             if (text !== "[DONE]") {
//               // Add a space between the previous and current chunk if needed
//               if (localResponse && !localResponse.endsWith(" ")) {
//                 localResponse += " ";
//               }
//               localResponse += text;
//               setChatResponse(localResponse); // Update state with the streamed content
//             }
//           }
//         });
//         streamResponse = localResponse; // Update the outer variable after processing
//       }
//     } catch (error) {
//       console.error("Error with AI response:", error);
//       setChatResponse("Error: Unable to get AI response");
//     }
//   };

//   // Generate the prompt for OpenAI based on selected requirements and project description
//   const generateChatPrompt = (description: string) => {
//     // const requirementsList = requirements.map((req) => req.name).join(", ");
//     return `
//       You are an AI assistant helping a user describe their project.
//       The user has described their project as: "${description}".Please recommend the best technologies and frameworks
//        for this project, to find the right team members or collaborators.
//        if user has not provided a description or is irrelevant, ask them to provide a description of their project.
//     `;
//   };

//   return (
//     <div className="flex  flex-col gap-6 ">
//       <div className="flex flex-col gap-2">
//         <h1 className="text-xl flex items-center gap-4">
//           Requirements <span className="text-concrete text-sm">required</span>
//         </h1>
//         <h3 className="text-sm text-ash">
//           Create a clear roadmap for finding the right team members or
//           collaborators.
//         </h3>
//       </div>

//       {/* Requirements Selection */}
//       <div className="flex gap-2 flex-wrap border-concrete">
//         {requirements?.map((requirement, index) => (
//           <motion.div
//             whileTap={{ scale: 1.1 }}
//             onClick={() =>
//               addRequirement({
//                 requirementId: requirement.id,
//                 name: requirement.name,
//                 maxApplicationLimit: 1,
//               })
//             }
//             whileHover={{
//               backgroundColor: "rgb(126, 24, 145, 1)",
//               color: "white",
//             }}
//             className={`content-center p-1 text-sm md:text-base rounded-none md:p-2 cursor-pointer shadow-md border ${
//               selectedRequirements.some(
//                 (req) => req.requirementId === requirement.id
//               )
//                 ? "bg-[#2D0740]  border-[#9c27b0]"
//                 : "bg-transparent border-concrete text-ash"
//             }`}
//             key={index}
//           >
//             {requirement.name}
//           </motion.div>
//         ))}
//       </div>

//       {/* Project Description and Chat */}
//       <motion.div
//         className="flex p-4 right-0 top-0 absolute w-1/4 bg-coal flex-col gap-4 mt-4"
//         animate={{
//           opacity: 1,
//           y: 10, // Float effect: move up slightly then back
//         }}
//         initial={{ opacity: 0, y: 0 }}
//         transition={{
//           duration: 2,

//           ease: "easeInOut",
//         }}
//       >
//         <textarea
//           value={projectDescription}
//           onChange={(e) => setProjectDescription(e.target.value)}
//           placeholder="Describe your project..."
//           className="p-2 border bg-coal rounded outline-none"
//           rows={4}
//         />
//         <Button onClick={handleSubmitDescription} className="btn-primary">
//           Get Recommendations
//         </Button>

//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">AI's Recommendations:</h3>
//           <p>{chatResponse}</p>
//         </div>
//       </motion.div>

//       {/* Navigation */}
//       <div className="flex justify-end gap-4  w-full">
//         <h1 className="p-4 cursor-pointer" onClick={() => handleBack()}>
//           Back
//         </h1>
//         <motion.h1
//           initial={{ opacity: 0, y: 11 }}
//           animate={{
//             opacity: selectedRequirements.length > 0 ? 1 : 0,
//             y: selectedRequirements.length > 0 ? 0 : 11,
//           }}
//           transition={{ duration: 0.3 }}
//           className="self-end p-4 cursor-pointer"
//           style={{
//             pointerEvents: selectedRequirements.length > 0 ? "auto" : "none",
//           }}
//           onClick={() => handleNext()}
//         >
//           Next
//         </motion.h1>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function RequirementsSelection2() {
  return <div></div>;
}
