import { AnimatePresence, motion } from "framer-motion";
import MyButton from "../../MyButton";
import {
  GetClientProjectModel,
  GetClientProjectRequirement,
} from "../../../interfaces/projects/client-specific-projects/GetClientProjectModel";
import { useEffect, useRef, useState } from "react";
import ProjectClientDetailedView from "./ProjectClientDetailedView";
import ProjectFooter from "../ProjectFooter";
import ProjectHeader from "../ProjectHeader";
import { IoExpandSharp } from "react-icons/io5";
import { Card } from "../../Card/Card";

interface ProjectViewCardProps {
  project: GetClientProjectModel;
  projectsLoading: boolean;
}

export default function ProjectViewCard({
  project: clientProject,
  projectsLoading,
}: ProjectViewCardProps) {
  const [projectRequirements, setProjectRequirements] = useState<
    GetClientProjectRequirement[]
  >(clientProject.requirements);

  const [projectImagesOpened, setProjectImagesOpened] =
    useState<boolean>(false);

  useEffect(() => {
    setProjectRequirements(clientProject.requirements);
  }, [clientProject.requirements]);

  return (
    <Card className="flex md:h-3/4 bg-[#191919]/60  flex-col p-4 m-4 md:p-0 md:m-0  gap-2">
      <ProjectHeader
        projectCreator={clientProject.user.userName}
        projectName={clientProject.name}
        status={clientProject.status}
        creatorImageUrl={clientProject.user.imageUrl}
        githubRepo={clientProject.githubRepo}
        projectImages={clientProject.projectImages}
        clientProject={clientProject}
      />

      <div className="flex md:gap-6 p-2  h-full bg-yellow-00">
        <div className="flex flex-col  w-full">
          <div className="grow">
            <p className="text-xs  md:text-sm text-ash">
              {clientProject.description.length > 230
                ? clientProject.description.slice(0, 230) + "..."
                : clientProject.description}
            </p>
          </div>

          <ProjectFooter
            projectLinks={clientProject.projectLinks.filter(
              (link) =>
                link.urlName.trim() !== "" && link.urlValue.trim() !== ""
            )}
            dateCreated={clientProject.dateCreated ?? new Date()}
            status={clientProject.status}
          />
        </div>

        <AnimatePresence>
          {projectImagesOpened && (
            <ProjectClientDetailedView
              isOpen={projectImagesOpened}
              onClose={() => setProjectImagesOpened(false)}
              clientProject={clientProject}
            />
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
