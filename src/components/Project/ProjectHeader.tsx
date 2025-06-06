import { ProjectImageModel } from "@/src/interfaces/projects/projectTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoExpandSharp } from "react-icons/io5";
import ProjectClientDetailedView from "./Views/ProjectClientDetailedView";
import { ClientProjectResponse } from "@/src/interfaces/projects/client-specific-projects/GetClientProjectModel";

interface ProjectHeaderProps {
  projectName?: string;
  projectCreator?: string;
  creatorImageUrl?: string;
  status?: string;
  githubRepo?: string;
  projectImages: ProjectImageModel[];
  clientProject: ClientProjectResponse;
}

export default function ProjectHeader({
  projectCreator,
  projectName,
  status,
  creatorImageUrl,
  githubRepo,
  projectImages,
  clientProject,
}: ProjectHeaderProps) {
  const [projectImagesOpened, setProjectImagesOpened] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col  justify-between">
      <div>
        {/* {projectImages.length > 0 && (
          <>
            <div onClick={() => setProjectImagesOpened(true)} className="">
              <div className="cursor-pointer  border-ash mb-4 relative flex justify-center items-center overflow-hidden">
                <img
                  src={projectImages[0].imageUrl}
                  className="w-auto mx-auto size-48"
                  alt=""
                />
                <motion.div
                  whileHover={{ scale: 1.2, opacity: 1 }}
                  className="left-50 absolute"
                >
                  <IoExpandSharp
                    size={56}
                    style={{ opacity: 0.5 }} // Initial opacity
                  />
                </motion.div>
              </div>
            </div>
          </>
        )} */}
      </div>
      <div className="flex items-center  w-full gap-2 cursor-pointer">
        {creatorImageUrl ? (
          <img
            src={creatorImageUrl}
            className="size-10 rounded-full"
            alt="pic"
          />
        ) : (
          <div className="size-10 my-auto rounded-full flex bg-grape/50">
            <p className="text-center m-auto text-purple-100">
              {projectCreator ? projectCreator.charAt(0).toUpperCase() : ""}
            </p>
          </div>
        )}

        <div className="flex flex-col   grow ">
          <div className="flex  gap-2">
            <div>
              <h1 className="text-base text-ash">{projectName}</h1>
              <h2 className="text-ash/50 text-sm">by {projectCreator}</h2>
            </div>
            {githubRepo && (
              <motion.div
                transition={{ duration: 0.3 }}
                whileHover={{
                  boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.5)",
                }}
                className="flex shadow-lg items-center rounded-full cursor-pointer hover:border-ash p-1 md:p-1"
              >
                <img
                  className="size-6 shadow-lg rounded-full"
                  src="/github-mark-white.png"
                  alt="GitHub Logo"
                />
                <a
                  className="font-light"
                  href={`https://github.com/${projectCreator}/${githubRepo
                    ?.split("/")
                    .pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* <h1 className="hidden md:inline-block">
                {githubRepo?.split("/").pop()}
              </h1> */}
                  <IoIosCheckmark size={24} />
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="flex  items-center"></div>
      <AnimatePresence>
        {projectImagesOpened && (
          <ProjectClientDetailedView
          // isOpen={projectImagesOpened}
          // onClose={() => setProjectImagesOpened(false)}
          // clientProject={clientProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
