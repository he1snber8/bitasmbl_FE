import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiCloseLargeFill } from "react-icons/ri";
import { GetUserProjectModel } from "@/src/interfaces/projects/user-specific-projects/GetUserProjectModel";
import { skillStyles } from "../../../utils/skillStyles";
import {
  useGetUserProjectSubmissionsQuery,
  useSubmitProjectMutation,
} from "src/api/ProjectsApi";
import GithubReposDropdown from "../../GithubReposDropdown";
import { GithubRepo } from "@/src/interfaces/users/githubUserTypes";
import { useAnalyzeGithubRepo } from "../../AnalyzeGithubRepo";
import {
  useAuthorizeGithubUserMutation,
  useDecodeGithubFileContentMutation,
  useGetGithubReposQuery,
} from "src/api/UsersApi";
import { useAskAI } from "@/src/hooks/useAskAi";
import { useDecodedFileAIReview } from "src/hooks/useGithubFilesAIReview";

export default function PROJECTUSERVIEW({
  onClose,
  project,
  selectedProjectApplicationId,
  userMembership,
}: {
  onClose: () => void;
  project: GetUserProjectModel;
  selectedProjectApplicationId: number;
  userMembership: string;
}) {
  const [selectedStacks, setSelectedStacks] = useState<number[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [trigger, setTrigger] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [submitApplication] = useSubmitProjectMutation();

  const { data: projectSubmissions } = useGetUserProjectSubmissionsQuery(
    selectedProjectApplicationId
  );

  const { data: repos } = useGetGithubReposQuery({
    accessToken: accessToken,
    username: "he1snber8",
  });

  const handleSubmitClick = () => {
    setIsAnalyzing(true);
    setTrigger(true);
  };

  const toggleStack = (techId: number) => {
    setSelectedStacks((prev) =>
      prev.includes(techId)
        ? prev.filter((item) => item !== techId)
        : [...prev, techId]
    );
  };

  const query = new URLSearchParams(window.location.search);
  const code = query.get("code");

  const [authorizeGithubUser, { data, isLoading, isError, error }] =
    useAuthorizeGithubUserMutation();

  // Pull code from URL once
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const codeFromUrl = urlParams.get("code");
  //   // setCode(codeFromUrl);
  // }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  // Authorizes & Returns github user access token through back-end,
  useEffect(() => {
    if (code) {
      authorizeGithubUser({ code, isRegistration: false })
        .unwrap()
        .then((response) => {
          // console.log("GitHub Auth Response:", response);
          if (response.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);
            setAccessToken(response.accessToken);
          } else {
            console.error("No access token received from GitHub");
          }
        })
        .catch((err) => {
          console.error("GitHub Auth Error:", err);
        });
    }
  }, [code, authorizeGithubUser]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  //   const aiResponse = useAnalyzeGithubRepo({
  //     username: "he1snber8",
  //     repoName: selectedRepo?.name || "",
  //     customPromptBuilder: (files) =>
  //       `
  // You are a senior full-stack engineer reviewing a student-submitted GitHub project implementation.

  // Here is the intended project overview:
  // - Name: ${project.name}
  // - Overview: ${project.overview}
  // - Description: ${project.description || "N/A"}
  // - Difficulty: ${project.difficulty}
  // - Required tech stack: ${project.projectTechStacks
  //         .map((p) => p.techStack.name)
  //         .join(", ")}

  // Project Requirements:
  // ${project.requirements
  //   .map(
  //     (r) =>
  //       `- ${r.description}${
  //         r.codeExample ? `\n  Code Example: ${r.codeExample}` : ""
  //       }${r.hint ? `\n  Hint: ${r.hint}` : ""}${
  //         r.isOptional ? " (optional)" : ""
  //       }`
  //   )
  //   .join("\n")}

  // Implementation Steps:
  // ${project.implementationSteps
  //   .map((s) => `- ${s.header}\n  Step: ${s.implementationStep}`)
  //   .join("\n")}

  // ---

  // Here is the file list from the GitHub repo:
  // ${files.map((f) => `- ${f.name}`).join("\n")}

  // Here are the full file contents:
  // ${files.map((f) => `\n--- ${f.name} ---\n${f.content}`).join("\n")}

  // ---

  // TASK:
  // 1. Compare the GitHub codebase to the project definition above.
  // 2. Check if the student implemented required features and followed the correct stack.
  // 3. Identify missing or unrelated functionality (e.g., chatbot code in a Tic Tac Toe game).
  // 4. Detect incomplete or placeholder logic.
  // 5. Suggest **concrete technical fixes**: file changes, structure updates, logic to implement, etc.
  // 6. Avoid vague advice. Be blunt and technically detailed.

  // RETURN JSON object:
  // {
  //   "answer": "One-line summary (<= 256 chars)",
  //   "isValid": true | false,
  //   "reason": "Why it passes or fails - brief explanation why submitted project is misaligned (<= 256 chars)",
  //   "recommendation": "List specific, technical recommendations. Be precise and actionable. (<= 512 chars)"
  // }
  // `.trim(),
  //     postProcessResponse: (res) => res.trim(),
  //     trigger,
  //     onComplete: () => {
  //       setTrigger(false);
  //       setIsAnalyzing(false);
  //     },
  //   });
  const [decodeFiles] = useDecodeGithubFileContentMutation();

  const aiResponse = useDecodedFileAIReview({
    username: "he1snber8",
    repoName: selectedRepo?.name || "",
    project,
    decodeFilesApi: decodeFiles,
    trigger,
    onComplete: () => {
      setTrigger(false);
      setIsAnalyzing(false);
    },
  });

  // console.log(aiResponse);

  useEffect(() => {
    const shouldSubmit = aiResponse && typeof aiResponse.isValid === "boolean";

    if (shouldSubmit && selectedRepo) {
      submitApplication({
        projectApplicationId: selectedProjectApplicationId,
        answer: aiResponse.answer,
        reason: aiResponse.reason,
        isValid: aiResponse.isValid,
        recommendation: aiResponse.recommendation,
      })
        .unwrap()
        .then(() => window.alert("✅ Application submitted"))
        .catch((err) => window.alert("❌ Submission failed:" + err.message));
    }
  }, [aiResponse]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-11/12 max-w-5xl p-8 overflow-hidden bg-black border border-concrete rounded-xl text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 z-10 rounded-md hover:bg-white/10 transition"
        >
          <RiCloseLargeFill size={24} />
        </button>

        <div className="max-h-[85vh] overflow-y-auto p-6 space-y-6 pr-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">{project.name}</h2>

            {project.difficulty && (
              <p className="text-base">
                Difficulty:{" "}
                <span
                  className={`text-sm font-medium ${
                    project.difficulty === "Beginner"
                      ? "text-green-500"
                      : project.difficulty === "Intermediate"
                      ? "text-orange-400"
                      : "text-red-500"
                  }`}
                >
                  {project.difficulty}
                </span>
              </p>
            )}
            {project.dateCreated && (
              <span className="text-xs text-gray-500">
                Created: {new Date(project.dateCreated).toLocaleDateString()}
              </span>
            )}
          </div>

          {project.overview && (
            <div>
              <h3 className="font-medium text-lg mb-2">Overview</h3>
              <p className="text-gray-300">{project.overview}</p>
            </div>
          )}

          {project.projectTechStacks?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.projectTechStacks.map((projectTechStack) => {
                  const isSelected = selectedStacks.includes(
                    projectTechStack.techStack.id
                  );
                  const baseStyle =
                    skillStyles[projectTechStack.techStack.name] ??
                    "bg-gray-600/30 text-white";

                  return (
                    <motion.button
                      key={projectTechStack.techStack.id}
                      onClick={() => toggleStack(projectTechStack.techStack.id)}
                      whileTap={{ y: 3 }}
                      className={`${baseStyle} text-sm px-3 py-1 rounded-md`}
                    >
                      {projectTechStack.techStack.name}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {project.implementationSteps?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Implementation Steps</h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-6 w-1/2">
                {project.implementationSteps.map((step, i) => (
                  <>
                    <li key={i}>
                      <strong>{step?.header}</strong>:
                      <p>{step?.implementationStep}</p>
                    </li>
                    {/* <div className="rounded-xl p-1 text-sm border border-dashed border-concrete dark:bg-white/5">
                      <div className="px-3 pt-0.5 flex pb-1.5 text-xs/5 text-gray-400 dark:text-white/50">
                        Terminal - (
                        <p className="text-ash">
                          {step.terminalInstruction.label}
                        </p>
                        )
                      </div>
                      <div className="p-4 py-6 border border-concrete bg-concrete/20 rounded-lg">
                        {step?.terminalInstruction.command &&
                          (() => {
                            const [first, ...rest] =
                              step..command.split(" ");
                            return (
                              <span>
                                <span className="text-purple-400">{first}</span>{" "}
                                <span className="text-blue-400">
                                  {rest.join(" ")}
                                </span>
                              </span>
                            );
                          })()}
                      </div>
                    </div> */}
                    <div className="rounded-xl p-1 text-sm border border-dashed border-concrete dark:bg-white/5">
                      <div className="px-3 pt-0.5 flex pb-1.5 text-xs/5 text-gray-400 dark:text-white/50">
                        {step.implementationStepTerminalInstructions &&
                        step.implementationStepTerminalInstructions.length >
                          0 ? (
                          step.implementationStepTerminalInstructions.map(
                            (terminalInstruction) => (
                              <div
                                key={
                                  terminalInstruction.terminalInstruction.label
                                }
                              >
                                <p className="text-ash">
                                  {
                                    terminalInstruction.terminalInstruction
                                      .label
                                  }
                                </p>
                                <div className="p-4 py-6 border border-concrete bg-concrete/20 rounded-lg">
                                  {terminalInstruction.terminalInstruction
                                    .command &&
                                    (() => {
                                      const [first, ...rest] =
                                        terminalInstruction.terminalInstruction.command.split(
                                          " "
                                        );
                                      return (
                                        <span>
                                          <span className="text-purple-400">
                                            {first}
                                          </span>{" "}
                                          <span className="text-blue-400">
                                            {rest.join(" ")}
                                          </span>
                                        </span>
                                      );
                                    })()}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <span>No terminal instructions</span>
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </ol>
            </div>
          )}

          {project.projectImages?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">
                End product should look similar to this
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.projectImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.imageUrl}
                    alt="projectImage"
                    className="rounded-lg border border-white/10 object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {projectSubmissions?.some(
            (submission) => submission.isValid === true
          ) ? (
            <div className="mt-4 rounded-md bg-green-600/30 w-max float-right p-3 text-green-800">
              ✅ You’ve already submitted a valid solution for this project.
            </div>
          ) : userMembership === "Principal" ? (
            <div className="float-right flex items-center gap-2">
              {/* <GithubReposDropdown
                  selectedRepo={selectedRepo}
                  setSelectedRepo={setSelectedRepo}
                /> */}
              {accessToken ? (
                <GithubReposDropdown
                  repos={repos || []}
                  selectedRepo={selectedRepo}
                  setSelectedRepo={setSelectedRepo}
                />
              ) : (
                <button
                  onClick={() => {
                    window.location.assign(
                      "https://github.com/login/oauth/authorize?" +
                        new URLSearchParams({
                          client_id: "Iv23lidUetpHsRCSlAaY",
                          redirect_uri: "http://localhost:3000/home/profile",
                        }).toString()
                    );
                  }}
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  Connect GitHub
                </button>
              )}

              {selectedRepo && (
                <button
                  onClick={handleSubmitClick}
                  className="bg-blue-500 p-2 text-white"
                >
                  Run AI
                </button>
              )}
            </div>
          ) : (
            <div className="text-red-500 text-sm float-right">
              You can't submit unless you're a Principal.
            </div>
          )}
        </div>

        {isAnalyzing && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="text-white text-lg animate-pulse">
              🤖 Running AI analysis...
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
