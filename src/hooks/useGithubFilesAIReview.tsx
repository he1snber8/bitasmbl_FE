import { GithubFileContent } from "../interfaces/github/commits";
import { GetUserProjectModel } from "../interfaces/projects/user-specific-projects/GetUserProjectModel";
import { useAskAI } from "./useAskAi";

interface UseDecodedFileAIReviewProps {
  username: string;
  repoName: string;
  project: GetUserProjectModel;
  decodeFilesApi: any;
  trigger: boolean;
  onComplete: () => void;
}

export function useDecodedFileAIReview({
  username,
  repoName,
  project,
  decodeFilesApi,
  trigger,
  onComplete,
}: UseDecodedFileAIReviewProps) {
  const prompt = async () => {
    const accessToken = localStorage.getItem("accessToken") || "";

    const decodedFiles: GithubFileContent[] = await decodeFilesApi({
      accessToken,
      username,
      repoName,
    }).unwrap();

    return `
You are a senior full-stack engineer reviewing a student-submitted GitHub project implementation.

Here is the intended project overview:
- Name: ${project.name}
- Overview: ${project.overview}
- Description: ${project.description || "N/A"}
- Difficulty: ${project.difficulty}
- Required tech stack: ${project.projectTechStacks
      .map((p) => p.techStack.name)
      .join(", ")}

Project Requirements:
${project.requirements
  .map(
    (r) =>
      `- ${r.description}${
        r.codeExample ? `\n  Code Example: ${r.codeExample}` : ""
      }${r.hint ? `\n  Hint: ${r.hint}` : ""}${
        r.isOptional ? " (optional)" : ""
      }`
  )
  .join("\n")}

Implementation Steps:
${project.implementationSteps
  .map((s) => `- ${s.header}\n  Step: ${s.implementationStep}`)
  .join("\n")}

---

Here is the file list from the GitHub repo:
${decodedFiles.map((f) => `- ${f.name}`).join("\n")}

Here are the full file contents:
${decodedFiles.map((f) => `\n--- ${f.name} ---\n${f.content}`).join("\n")}

---

TASK:
1. Compare the GitHub codebase to the project definition above.
2. Check if the student implemented required features and followed the correct stack.
3. Identify missing or unrelated functionality (e.g., chatbot code in a Tic Tac Toe game).
4. Detect incomplete or placeholder logic.
5. Suggest **concrete technical fixes**: file changes, structure updates, logic to implement, etc.
6. Avoid vague advice. Be blunt and technically detailed.

RETURN JSON object:
{
  "answer": "One-line summary (<= 256 chars)",
  "isValid": true | false,
  "reason": "Why it passes or fails - brief explanation why submitted project is misaligned (<= 256 chars)",
  "recommendation": "List specific, technical recommendations. Be precise and actionable. (<= 512 chars)"
}
`.trim();
  };

  const aiResponse = useAskAI({
    prompt,
    trigger,
    onComplete,
    postProcessResponse: (res: string) => res.trim(),
  });

  return aiResponse;
}
