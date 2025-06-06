// import React, { useEffect, useState } from "react";
// import { PlaceholdersAndVanishInput } from "../ui/PlaceHolderInput";
// import { motion } from "framer-motion";
// import { useGetProjectRequirementsQuery } from "../api/ProjectsApi";
// import {
//   useDecodeGithubFileContentMutation,
//   useGetGithubRepoFilesQuery,
// } from "../api/UsersApi";

// export default function AIChatInterface({
//   additionalPrompt,
// }: {
//   additionalPrompt?: string;
// }) {
//   const [accessToken, setAccessToken] = useState<string>("");
//   const [selectedRepo] = useState<string>("casino-microservices-app ");
//   const [decodedFiles, setDecodedFiles] = useState<
//     { name: string; content: string }[]
//   >([]);
//   const [response, setResponse] = useState<string>("");
//   const [prompt, setPrompt] = useState<string>("");

//   // const { data: requirements } = useGetProjectRequirementsQuery();
//   const { data: repoFiles } = useGetGithubRepoFilesQuery({
//     accessToken,
//     username: "he1snber8",
//     repoName: selectedRepo,
//   });

//   const [decodeFilesApi] = useDecodeGithubFileContentMutation();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) setAccessToken(token);
//   }, []);

//   const decodeFiles = async (filenames: string[]) => {
//     try {
//       const result = await decodeFilesApi({
//         accessToken,
//         username: "he1snber8",
//         repoName: selectedRepo,
//         filenames,
//       }).unwrap();
//       setDecodedFiles(result);
//       return result;
//     } catch (err) {
//       console.error("Decoding error:", err);
//       return [];
//     }
//   };

//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true); // set loading
//     setResponse(""); // reset old response

//     if (repoFiles) {
//       const decodedFiles = await decodeFiles(
//         repoFiles.map((file) => file.name)
//       );

//       const templateJson = {
//         name: "",
//         techStack: "",
//         entryPoint: "",
//         port: 0,
//         type: "",
//         dependencies: [""],
//       };

//       const promptToSend = `
// Analyze the following GitHub files and return a structured JSON like:

// ${JSON.stringify(
//   templateJson,
//   null,
//   2
// )}, only return the JSON without any additional text.

// Here are the files:
// ${decodedFiles.map((file) => `- ${file.name}`).join("\n")}

// Here are the files with their content:
// ${decodedFiles
//   .map((file) => `\n--- ${file.name} ---\n${file.content}`)
//   .join(
//     "\n"
//   )}, at the end of the analysis, please simply display the answer on this question based on above files: "would this file structure be enough to build kind of complex mixroservices app that handles casino games?" and return the answer as a simple string without any additional text like verification, and display reason as well`;

//       try {
//         const res = await fetch("http://localhost:3002/ask", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ prompt: promptToSend }),
//         });

//         const data = await res.json();
//         if (data?.content) {
//           setResponse(data.content);
//         } else {
//           throw new Error("No content returned");
//         }
//       } catch (err) {
//         console.error("AI request failed:", err);
//       }
//     }

//     setLoading(false);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setPrompt(e.target.value);

//   const placeholders = [
//     "Want to build a site to sell homemade furniture. I only know React.",
//     "Thinking of a job board for juniors. Where do I start?",
//     "Need help making a fitness tracker app. I only know HTML/CSS.",
//     "Can I build a portfolio site that auto-syncs with GitHub?",
//     "Trying to make a resume builder in vanilla JS.",
//     "I want to build a simple task app with drag and drop.",
//     "Building a learning platform with quizzes. Stuck on backend.",
//     "Want to make a browser extension that blocks sites.",
//     "Idea for a donation site for local shelters. How to start?",
//     "Trying to make a habit tracker with reminders. Any tips?",
//   ];

//   const words = response.split(" ");

//   return (
//     <div className="h-[40rem] flex flex-col justify-center items-center px-4">
//       <h2 className="mb-6 text-xl text-center sm:text-5xl">
//         Let AI help you find relevant teammates
//       </h2>
//       <h2 className="text-base text-ash mb-8">
//         Describe your current experience & knowledge in detail for most
//         appropriate answer
//       </h2>

//       <PlaceholdersAndVanishInput
//         placeholders={placeholders}
//         onChange={handleChange}
//         onSubmit={onSubmit}
//       />

//       {loading ? (
//         <p className="text-ash">Analyzing project files...</p>
//       ) : (
//         <div className="mt-4 max-w-xl text-lg w-full p-4 rounded-lg whitespace-pre-wrap text-white">
//           {words.map((word, i) => (
//             <motion.span
//               key={i}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: i * 0.03, duration: 0.2 }}
//               className="inline-block mr-1"
//             >
//               {word}
//             </motion.span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "../ui/PlaceHolderInput";
import { motion } from "framer-motion";
import {
  useDecodeGithubFileContentMutation,
  // useGetGithubRepoFilesQuery,
} from "../api/UsersApi";

interface DecodedFile {
  name: string;
  content: string;
}

interface AIResponse {
  answer: string;
  isValid: boolean;
  reason: string;
}

interface AIChatInterfaceProps {
  username: string;
  repoName: string;
  customPromptBuilder?: (files: DecodedFile[]) => string;
  postProcessResponse?: (response: string) => string;
  trigger: boolean;
  onComplete: () => void;
}

export default function AIChatInterface({
  username,
  repoName,
  customPromptBuilder,
  postProcessResponse,
  trigger,
  onComplete,
}: AIChatInterfaceProps) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [decodedFiles, setDecodedFiles] = useState<DecodedFile[]>([]);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // const { data: repoFiles } = useGetGithubRepoFilesQuery({
  //   accessToken,
  //   username,
  //   repoName,
  // });

  const [decodeFilesApi] = useDecodeGithubFileContentMutation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setAccessToken(token);
  }, []);

  const decodeFiles = async () => {
    try {
      const result = await decodeFilesApi({
        accessToken,
        username,
        repoName,
        // filenames,
      }).unwrap();
      setDecodedFiles(result);
      return result;
    } catch (err) {
      console.error("Decoding error:", err);
      return [];
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);

    // if (!repoFiles) return;

    const decoded = await decodeFiles();

    const promptToSend = customPromptBuilder
      ? customPromptBuilder(decoded)
      : prompt;

    try {
      const res = await fetch("http://localhost:3002/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToSend }),
      });

      const data = await res.json();

      try {
        const parsed = JSON.parse(data.content) as AIResponse; // <- safely convert AI string to object
        setResponse(parsed); // convert object to string
        if (response) {
          console.log("AI answer:", parsed.answer);
          console.log("AI reason:", parsed.reason);
          console.log("Valid or nah? :", parsed.isValid ? "Yes" : "No");
        }
      } catch (parseErr) {
        console.error("Failed to parse AI response as JSON:", parseErr);
        setResponse(data.content); // fallback to raw content
      }
      // setResponse(
      //   postProcessResponse ? postProcessResponse(data.content) : data.content
      // );
    } catch (err) {
      console.error("AI request failed:", err);
    }
    onComplete();
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPrompt(e.target.value);

  // const placeholders = [
  //   "Want to build a site to sell homemade furniture. I only know React.",
  //   "Thinking of a job board for juniors. Where do I start?",
  //   "Need help making a fitness tracker app. I only know HTML/CSS.",
  // ];

  // const words = response.split(" ");

  // If you want to trigger handleSubmit when isSubmitted becomes true, use useEffect like this:
  useEffect(() => {
    if (trigger) handleSubmit();
  }, [trigger]);

  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      {/* <h2 className="mb-6 text-xl text-center sm:text-5xl">
        Let AI <h></h>elp you find relevant teammates
      </h2>
      <h2 className="text-base text-ash mb-8">
        Describe your current experience & knowledge in detail for most
        appropriate answer
      </h2> */}

      {/* <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      /> */}

      {loading ? (
        <p className="text-ash mt-4">Analyzing project files...</p>
      ) : (
        <div className="mt-4 max-w-xl text-lg w-full p-4 rounded-lg whitespace-pre-wrap text-white">
          <h1>Answer: {response?.answer}</h1>
          <h1>Reason: {response?.reason}</h1>
          <h1>isValid: {response?.isValid ? "✅" : "⛔️"}</h1>
        </div>
      )}
    </div>
  );
}
