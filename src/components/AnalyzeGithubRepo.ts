import React, { useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "../ui/PlaceHolderInput";
import { motion } from "framer-motion";
import {
  useDecodeGithubFileContentMutation,
  // useGetGithubRepoFilesQuery,
} from "../api/UsersApi";
import { GithubFileContent } from "../interfaces/github/commits";

interface DecodedFile {
  name: string;
  content: string;
}

interface AIResponse {
  answer: string;
  isValid: boolean;
  reason: string;
  recommendation: string;
}

interface AIChatInterfaceProps {
  username: string;
  repoName: string;
  customPromptBuilder?: (files: GithubFileContent[]) => string;
  postProcessResponse?: (response: string) => string;
  trigger: boolean;
  onComplete: () => void;
}

export function useAnalyzeGithubRepo({
  username,
  repoName,
  customPromptBuilder,
  postProcessResponse,
  trigger,
  onComplete,
}: AIChatInterfaceProps): AIResponse | null {
  const [accessToken, setAccessToken] = React.useState<string>("");
  const [response, setResponse] = React.useState<AIResponse | null>(null);

  const [decodeFilesApi] = useDecodeGithubFileContentMutation();

  // const { data: repoFiles } = useGetGithubRepoFilesQuery({
  //   accessToken,
  //   username,
  //   repoName,
  // });

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setAccessToken(token);
  }, []);

  // console.log("Access TOKKKEN", accessToken);

  React.useEffect(() => {
    const fetchAIResponse = async () => {
      // if (!trigger || !repoFiles) return;
      if (!trigger) return;

      console.log("sending request with", accessToken, username, repoName);

      try {
        const decoded = await decodeFilesApi({
          accessToken,
          username,
          repoName,
          // filenames: repoFiles.map((f) => f.name),
        }).unwrap();

        // console.log("decoded fileeees", decoded);

        const prompt = customPromptBuilder
          ? customPromptBuilder(decoded)
          : "Please analyze these files.";

        const res = await fetch("http://localhost:3002/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();

        let cleaned = data.content.trim();

        // Try to quote all keys (e.g., answer: -> "answer":)
        cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

        try {
          const parsed = JSON.parse(cleaned) as AIResponse;
          parsed.answer = postProcessResponse
            ? postProcessResponse(parsed.answer)
            : parsed.answer;
          setResponse(parsed);
        } catch (err) {
          console.error("Failed to parse AI response:", err);
          setResponse(null);
        }
      } catch (err) {
        console.error("Error decoding or asking AI:", err);
        setResponse(null);
      } finally {
        onComplete();
      }
    };

    fetchAIResponse();
  }, [trigger]);

  return response;
}

// import React, { useEffect, useState } from "react";
// import { useDecodeGithubFileContentMutation } from "../api/UsersApi";

// interface DecodedFile {
//   name: string;
//   content: string;
// }

// interface AIChatInterfaceProps {
//   username: string;
//   repoName: string;
//   customPromptBuilder?: (files: DecodedFile[]) => string;
//   postProcessResponse?: (response: string) => string;
//   trigger: boolean;
//   onComplete: () => void;
// }

// export function useAnalyzeGithubRepo({
//   username,
//   repoName,
//   trigger,
//   onComplete,
//   customPromptBuilder,
//   postProcessResponse,
// }: AIChatInterfaceProps): null {
//   const [accessToken, setAccessToken] = useState<string>("");
//   const [decodeFilesApi] = useDecodeGithubFileContentMutation();

//   // Load token from localStorage on mount
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       console.log("Access token loaded ✅:", token);
//       setAccessToken(token);
//     } else {
//       console.warn("No access token found in localStorage ❌");
//     }
//   }, []);

//   // Trigger fetch when token and `trigger` are ready
//   useEffect(() => {
//     const fetchDecodedFiles = async () => {
//       console.log("🔁 Triggered with:", { accessToken, username, repoName });

//       try {
//         const decoded = await decodeFilesApi({
//           accessToken,
//           username,
//           repoName,
//         }).unwrap();

//         console.log("✅ Decoded file contents:");
//         console.log(JSON.stringify(decoded, null, 2)); // Pretty print
//       } catch (err) {
//         console.error("❌ Error fetching decoded files:", err);
//       } finally {
//         onComplete();
//       }
//     };

//     if (trigger && accessToken) {
//       fetchDecodedFiles();
//     }
//   }, [trigger, accessToken]);

//   return null;
// }
