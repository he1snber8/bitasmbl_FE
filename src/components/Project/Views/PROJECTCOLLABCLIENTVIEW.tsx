import { useApplyToProjectMutation } from "../../../../src/api/ProjectsApi";
import { ApplyToProjectRequest } from "@/src/interfaces/projects/projectTypes";
import { GetClientProjectModel } from "@/src/interfaces/PROJECTS2/getClientProjectModel";
import { skillStyles } from "../../../utils/skillStyles";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";

export default function PROJECTCOLLABCLIENTVIEW({
  onClose,
  project,
  handleApply,
}: {
  onClose: () => void;
  project: GetClientProjectModel;
  handleApply: (projectId: number) => Promise<void>;
}) {
  //   const [applyToProject, { isLoading, error }] = useApplyToProjectMutation();

  //   const [selectedStacks, setSelectedStacks] = useState<number[]>([]);

  //   const toggleStack = (techId: number) => {
  //     setSelectedStacks((prev) =>
  //       prev.includes(techId)
  //         ? prev.filter((item) => item !== techId)
  //         : [...prev, techId]
  //     );
  //   };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-11/12 max-w-5xl bg-[#151515] border border-concrete rounded-xl text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 z-10 rounded-md hover:bg-white/10 transition"
        >
          <RiCloseLargeFill size={24} />
        </button>

        {/* Scrollable Content Wrapper */}
        <div className="max-h-[85vh] overflow-y-auto p-6 space-y-6 pr-4">
          {/* Title & Meta Info */}
          <div className="flex flex-col gap-1 borde">
            <h2 className="text-2xl font-semibold">{project.name}</h2>

            {project.difficulty && (
              <p className="text-base">
                Difficulty:{" "}
                <span
                  className={`text-sm font-medium ${
                    project.difficulty === "easy"
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

          {/* Overview */}
          {project.overview && (
            <div>
              <h3 className="font-medium text-lg mb-2">Overview</h3>
              <p className="text-gray-300">{project.overview}</p>
            </div>
          )}

          {/* Tech Stacks */}
          {project.projectTechStacks?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.projectTechStacks.map((projectTechStack) => {
                  if (!projectTechStack) return null;

                  const baseStyle =
                    skillStyles[projectTechStack.techStack?.name ?? ""] ??
                    "bg-gray-600/30 text-white";

                  return (
                    <motion.button
                      key={projectTechStack.techStackId}
                      //   onClick={() => toggleStack(projectTechStack.techStackId)}
                      className={` ${baseStyle}  text-sm px-3 py-1 rounded-md`}
                    >
                      {projectTechStack.techStack?.name}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Requirements */}
          {project.requirements?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {project.requirements.map((req, i) => (
                  <div className="" key={i}>
                    <li>{req?.description}</li>
                    <li>Code example: {req?.codeExample}</li>
                    <li>Hint💡{req?.hint}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {/* Implementation Steps */}
          {project.implementationSteps?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Implementation Steps</h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-6 w-1/2">
                {project.implementationSteps.map((step, i) => (
                  <li key={i}>
                    <strong>{step?.header}</strong>:
                    <p>{step?.implementationSteps}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Project Links */}
          {project.projectLinks?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Links</h3>
              <ul className="space-y-1 text-blue-400 underline underline-offset-2 decoration-1">
                {project.projectLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link?.urlValue}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link?.urlName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="sticky bottom-0  justify-end flex items-center gap-4 p-4 z-10">
            {/* <AnimatePresence mode="wait">
                  {anySkillsSelected && !allSkillsSelected && (
                    <>
                      <motion.div
                        key="invite-button"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Menu dismiss={{ itemPress: false }}>
                          <MenuHandler>
                            <Button className="normal-case text-sm p-1 px-4">
                              Invite a friend
                            </Button>
                          </MenuHandler>
    
                          <MenuList className="bg-coal   text-white border border-gray-700 shadow-lg">
                            <Input
                              label="Search"
                              containerProps={{
                                className: "mb-4 text-red-500",
                              }}
                              className="text-white placeholder-gray-400"
                              labelProps={{ className: "text-white" }}
                            />
                            <MenuItem className="hover:bg-black">
                              Menu Item 1
                            </MenuItem>
                            <MenuItem className="hover:bg-black">
                              Menu Item 2
                            </MenuItem>
                            <MenuItem className="hover:bg-red-800">
                              Menu Item 3
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </motion.div>
    
                      <motion.p
                        key="or-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-white"
                      >
                        or
                      </motion.p>
                    </>
                  )}
                </AnimatePresence> */}

            {/* <motion.div
              key="main-action-button"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={() => handleApply(project.id)}
                className="normal-case text-sm p-1 text-black bg-orange-500 w-[240px] text-center justify-center"
              >
                Join
              </Button>
            </motion.div> */}
          </div>

          {/* Categories */}
          {/* {project.categories?.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="bg-white/10 text-white text-xs px-3 py-1 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              )} */}

          {/* Images */}
          {/* {project.projectImages?.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.projectImages.map((img, i) => (
                      <img
                        key={i}
                        src={img?.imageUrl}
                        alt="projectImage"
                        className="rounded-lg border border-white/10 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )} */}
        </div>
      </motion.div>
    </motion.div>
  );
}
