import React, { useEffect, useState } from "react";
import {
  useApplyToProjectMutation,
  useGetPublicProjectApplicationsQuery,
} from "../api/ProjectsApi";
import { AnimatePresence } from "framer-motion";
import {
  GetClientProjectModel,
  ProjectStatus,
} from "../interfaces/PROJECTS2/getClientProjectModel";
import { skillStyles } from "../utils/skillStyles";

import {
  ApplyToProjectRequest,
  TechStack,
} from "../interfaces/projects/projectTypes";

import PROJECTCOLLABCLIENTVIEW from "./Project/Views/PROJECTCOLLABCLIENTVIEW";
import { useGetProfileQuery } from "../api/UsersApi";
import { motion } from "framer-motion";
import ProfileAvatar from "./ProfileAvatar";
import { Tooltip } from "@material-tailwind/react";

export default function CollaborationPage() {
  const {
    data: profile,
    error: profileError,
    isLoading: profileLoading,
  } = useGetProfileQuery();

  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  const { data: projects, isLoading: projectsLoading } =
    useGetPublicProjectApplicationsQuery();

  const [applyToProject, { isLoading: applyingToProjectLoading, error }] =
    useApplyToProjectMutation();

  // useEffect(() => {
  //   projects?.forEach((project) => {
  //     filterUserSelectedTechStack(project);
  //   });
  // }, [projects]);

  const getUnselectedTechStackNames = (
    project: GetClientProjectModel
  ): number[] => {
    const alreadySelectedStackIds = new Set<number>();

    project.projectApplications?.forEach((app) => {
      app.applicationMemberships?.forEach((member) => {
        member.applicationMemberSelectedTechStacks?.forEach((tech) => {
          if (tech.techStackId != null) {
            alreadySelectedStackIds.add(tech.techStackId);
          }
        });
      });
    });

    return (project.projectTechStacks ?? [])
      .map((pts) => pts.techStack?.id)
      .filter((id): id is number => id != null)
      .filter((id) => !alreadySelectedStackIds.has(id));
  };

  const [selectedProject, setSelectedProject] =
    useState<GetClientProjectModel | null>(null);

  const [filteredTechStacks, setFilteredTechStacks] = useState<string[]>([]);

  const [projectModalOpened, setProjectModalOpened] = useState(false);

  const [selectedStacks, setSelectedStacks] = useState<
    Record<number, number[]>
  >({});

  if (projectsLoading) return <div>Loading...</div>;

  // const filterUserSelectedTechStack = (project: GetClientProjectModel) => {
  //   // Get first projectApplication or find by specific criteria
  //   const selectedProjectApplication = project.projectApplications?.[0]; // or find by some condition

  //   // const selectedNames = new Set(
  //   //   selectedProjectApplication?.?.map((s) => s.name) ||
  //   //     []
  //   // );

  //   const filtered = (project.projectTechStacks || [])
  //     .map((pts) => pts?.techStack?.name)
  //     .filter((name): name is string => !!name) // remove undefined
  //     .filter((name) => !selectedNames.has(name));

  //   setFilteredTechStacks(filtered);
  // };

  const toggleStack = (projectApplicationId: number, tech: TechStack) => {
    setSelectedStacks((prev) => {
      const current = prev[projectApplicationId] || [];

      // Reset all other selections if switching to a different project application
      // const isSwitching = !current.includes(tech.id) && Object.keys(prev).some((id) => parseInt(id) !== projectApplicationId && prev[parseInt(id)].length > 0);

      const updated = current.includes(tech.id)
        ? current.filter((id) => id !== tech.id)
        : [...current, tech.id];

      console.log(updated, "updated stacks");
      console.log(projectApplicationId);

      return {
        [projectApplicationId]: updated, // override everything to only keep current project's selection
      };
    });

    setActiveProjectId(projectApplicationId);
  };

  console.log(selectedStacks);

  const handleApply = async (projectApplicationId: number) => {
    console.log(projectApplicationId, "project id selected");
    // console.log(selectedStacks, " selected stackos");
    if (
      !selectedStacks[projectApplicationId] ||
      selectedStacks[projectApplicationId].length === 0
    ) {
      return alert("Please select a requirement to apply to this project!");
    }
    try {
      const projectApplicationCommand: ApplyToProjectRequest = {
        projectApplicationId,
        collaboratorId: profile?.id ?? "",
        techStackRequirementIds: selectedStacks[projectApplicationId] || [],
      };

      console.log(projectApplicationCommand);
      // Call the mutation and handle the response
      const response = await applyToProject(projectApplicationCommand).unwrap();

      window.alert("succesfully applied collaboration!");
      console.log(response);

      // alert("Application submitted successfully!");
    } catch (err: any) {
      console.error("Failed to apply to project:", err);
      alert(
        err.data?.message || "There was an error submitting your application."
      );
    }
  };

  return (
    <div className="p-2">
      <div className="flex flex-col gap-4">
        {projects?.map((project) =>
          project.projectApplications?.map((app, i) => (
            <div
              key={`${project.id}-${app.id}`}
              className="flex items-center justify-between gap-4 bg-[#171717] rounded-md px-4 py-3 w-full"
            >
              <p className="text-sm">Contributors:</p>
              <div className="flex -space-x-4">
                {app.applicationMemberships?.map((membership, index) => (
                  <div key={membership.user.id} className="z-10">
                    {membership.user.imageUrl ? (
                      <Tooltip
                        content={membership.user.userName}
                        placement="bottom"
                      >
                        <img
                          className="size-8 rounded-full cursor-pointer shadow-md hover:border hover:border-ash"
                          src={membership.user.imageUrl}
                          alt=""
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        content={membership.user.userName}
                        placement="bottom"
                      >
                        <ProfileAvatar
                          tooltipContent={membership.user.userName}
                          className="size-8  hover:border hover:border-ash"
                          userName={membership.user.userName}
                        />
                      </Tooltip>
                    )}
                  </div>
                ))}
              </div>
              {/* Project Name */}
              <div className="w-1/6 text-white text-sm font-semibold">
                {project.name}
              </div>
              {/* Tech Stack */}
              <div className="flex items-center justify-between text-left w-1/3 ">
                <div className="flex flex-wrap gap-2">
                  {project.projectTechStacks?.map((pts, idx) => {
                    const stackName = pts?.techStack?.name ?? "Unknown";

                    const filteredTechStackIds =
                      getUnselectedTechStackNames(project);

                    // console.log( ,filteredTechStacks);

                    const isSelectable = filteredTechStackIds.includes(
                      pts.techStack?.id ?? -1
                    );

                    const appliedStyle = isSelectable
                      ? skillStyles[stackName] ?? "bg-gray-500"
                      : "bg-gray-800/30 text-concrete opacity-60 cursor-not-allowed";

                    const isToggled = (selectedStacks[app.id] || []).includes(
                      pts.techStackId
                    );

                    return (
                      <motion.button
                        key={pts.techStack?.id}
                        onClick={() => {
                          if (isSelectable && pts.techStack) {
                            toggleStack(app.id, pts.techStack);
                          }
                        }}
                        whileTap={{ y: 3 }}
                        disabled={!isSelectable}
                        className={` ${appliedStyle} ${
                          isToggled ? "opacity-100" : "opacity-70"
                        } text-sm px-3 py-1 rounded-md`}
                      >
                        {stackName}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              {/* Difficulty + Action Buttons */}
              <div className="w-1/4 flex items-center justify-end gap-4">
                <span
                  className={`text-sm font-medium ${
                    project.difficulty === "Easy"
                      ? "text-green-500"
                      : project.difficulty === "Medium"
                      ? "text-orange-400"
                      : "text-red-500"
                  }`}
                >
                  {project.difficulty}
                </span>

                <motion.button
                  style={{ borderColor: "#4f46e5" }}
                  onClick={() => {
                    handleApply(app.id);
                  }}
                  whileHover={{
                    boxShadow: "0 0 20px #4f46e5",
                  }}
                  className="bg-[#18161b] rounded-md border px-5 py-1 text-sm text-white"
                >
                  Join
                </motion.button>

                <motion.button
                  style={{ borderColor: "#4f46e5" }}
                  onClick={() => {
                    setSelectedProject(project);
                    setProjectModalOpened(true);
                  }}
                  whileHover={{
                    boxShadow: "0 0 20px #4f46e5",
                  }}
                  className="bg-[#18161b] rounded-md border px-5 py-1 text-sm text-white"
                >
                  View Project
                </motion.button>
              </div>
              {/* Modal */}
              <AnimatePresence>
                {projectModalOpened && selectedProject?.id === project.id && (
                  <PROJECTCOLLABCLIENTVIEW
                    project={selectedProject}
                    onClose={() => setProjectModalOpened(false)}
                    handleApply={handleApply}
                  />
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
