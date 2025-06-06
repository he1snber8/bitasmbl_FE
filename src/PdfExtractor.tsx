import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { useAIAnalyze } from "./hooks/useAiAnalyzeTool";
import { motion } from "framer-motion";
import { SocialLink } from "./interfaces/userTypes";
import { platform } from "os";
import { title } from "process";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js";

type PDFTextExtractorProps = {
  file: File | null;
  handleNext: () => void;
  setThirdPartyLinks: React.Dispatch<React.SetStateAction<[] | SocialLink[]>>;
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export default function PDFTextExtractor({
  file,
  setTitle,
  handleNext,
  setThirdPartyLinks,
  setSkills,
}: PDFTextExtractorProps) {
  const [pdfText, setPdfText] = useState<string[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [extractedUrls, setExtractedUrls] = useState<string[]>([]);
  const [lastAnalyzedFileName, setLastAnalyzedFileName] = useState<
    string | null
  >(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!file) {
      setPdfText([]);
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const typedarray = new Uint8Array(reader.result as ArrayBuffer);

      try {
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        const textArray: string[] = [];
        const urlArray: string[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          textArray.push(...strings);

          const annotations = await page.getAnnotations();
          annotations.forEach((ann: any) => {
            if (ann.url) urlArray.push(ann.url);
          });
        }

        setPdfText(textArray);
        setExtractedUrls(urlArray);
      } catch (err) {
        console.error("Error reading PDF:", err);
      }
    };

    reader.readAsArrayBuffer(file);
  }, [file]);

  const aiResponse = useAIAnalyze<string, any>({
    dataItems: pdfText,
    customPromptBuilder: (items) =>
      `You are an AI that extracts structured resume data.

Analyze the following resume content:
${items.join("\n")}


Return JSON object that matches structure  
{
  name: string;
  title: string; (if not available, generate a title based on the content, e.g., "3D Gaming geek, passionate about unity and physics", "Full stack developer with 5 years of experience in web development", "Software Engineer with expertise in Python and JavaScript")
  location: string; (geographic location, e.g., "San Francisco, CA")

  skills?: {
    techstack: string; (e.g., { techstack: "Java" },
  { techstack: "C++" },
  { techstack: "Html" }) 
  }[]; 

 skill rules:
 1.Do not include different skills into one object like "Figma/PS", rather [ techstack: "figma", techstack: "PS" ], each skill should be a separate object in the array
 2 Only extract  programming languages/frameworks , not tools, desing patterns or elementary libraries.

  third_party_links?: {
    platform: string; (e.g., "LinkedIn", "GitHub")
    urlValue: string;
  }[];
}


 Do not rename object fields, invent new ones, or omit existing ones.
 Fill in values as accurately as possible from the resume.
If data is missing, use empty strings or empty arrays.

Below might be some URLs extracted from the PDF,
insert only unique urls (do not duplicate) into the 'third_party_links' properties repsectively, based on the platform name.

Extracted URLs: ${extractedUrls.join(", ")}
If a URL is not relevant to the resume, do not include it in the response.

Only return valid JSON. Extracted URLs: ${extractedUrls.join(", ")}`,
    trigger,
    onComplete: () => setTrigger(false),
    apiUrl: "http://localhost:3002/ask",
  });

  useEffect(() => {
    if (
      file &&
      pdfText.length > 0 &&
      !trigger &&
      file.name !== lastAnalyzedFileName
    ) {
      setTrigger(true);
      setLastAnalyzedFileName(file.name);
    }
  }, [pdfText, file, trigger, lastAnalyzedFileName]);

  useEffect(() => {
    if (aiResponse) {
      // Update states
      if (aiResponse.third_party_links) {
        console.log("AI Response:", aiResponse.third_party_links);
        setThirdPartyLinks(
          aiResponse.third_party_links.map((link: SocialLink) => ({
            platform: link.platform,
            urlValue: link.urlValue,
          }))
        );
      }

      if (aiResponse.skills) {
        setSkills(aiResponse.skills.map((skill: any) => skill.techstack));
      }

      if (aiResponse.title) {
        setTitle(aiResponse.title);
      }

      // Show done message briefly, then go next
      setDone(true);
      setTimeout(() => handleNext(), 2000); // 2s delay before proceeding
    }
  }, [aiResponse]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {trigger && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg font-medium animate-pulse">
            Analyzing Resume...
          </div>
        </div>
      )}

      {done && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-xl font-semibold"
          >
            ✅ All done! Proceeding...
          </motion.div>
        </div>
      )}
    </div>
  );
}
