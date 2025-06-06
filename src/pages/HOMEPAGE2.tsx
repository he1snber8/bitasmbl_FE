import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FaAngular, FaReact, FaVuejs } from "react-icons/fa";
import { RiSvelteFill } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";
import PROJECTCLIENTVIEW2 from "../components/Project/Views/PROJECTCLIENTVIEW2";
import { useGetProjectsQuery } from "../api/ProjectsApi";
import { ClientProjectResponse } from "../interfaces/projects/client-specific-projects/GetClientProjectModel";
import { skillStyles } from "../utils/skillStyles";
import { PAGINATION2 } from "../components/PAGINATION2";
import AIChatInterface from "../components/AiChatInterface";
import { Tooltip } from "@material-tailwind/react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../components/AnimatedTooltip";

export default function HOMEPAGE2() {
  const [projectModalOpened, setProjectModalOpened] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ClientProjectResponse | null>(null);

  const [active, setActive] = useState<number>(1);

  const { data: projects, isLoading: projectsLoading } = useGetProjectsQuery({
    page: active,
    pageSize: 12,
  });

  const [run, setRun] = useState(true);

  const steps = [
    {
      target: '[data-tour="tech-filters"]',
      content: "Click on these tags to filter projects by technology.",
    },
    {
      target: '[data-tour="xp-dots"]',
      content: "These show how much XP you can earn by completing the project.",
    },
    {
      target: '[data-tour="search-input"]',
      content:
        "Use this search bar to quickly find projects by name or keyword.",
    },
    {
      target: '[data-tour="project-card"]',
      content: "Each card here represents a project you can view or apply to.",
    },
    {
      target: '[data-tour="pagination"]',
      content: "Use these buttons to explore more projects.",
    },
    {
      target: '[data-tour="view-project"]',
      content: "Click here to view project details and apply.",
    },
    {
      target: '[data-tour="tech-stacks"]',
      content: "These are the technologies required to complete the project.",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };

  return (
    <div className="h-full grid  grid-cols-[250px_1fr] ">
      {/* Left Sidebar - Filters */}
      <div className="p-4 border-r border-concrete">
        {/* data-tour="filter-sidebar" */}
        <p className="text-white">Filters</p>
      </div>

      {/* Main Content */}
      <div className="p-8 overflow-y-auto flex flex-col">
        {/* List of items here */}
        <div className="border border-concrete rounded-xl grid grid-rows-[auto_1fr_auto] h-full">
          {/* Tech Filters */}
          <div className="flex flex-wrap gap-2 p-4 border-b border-concrete text-sm">
            <div className="flex gap-2 " data-tour="tech-filters">
              {[
                "All topics",
                <div className="flex items-center text-sm">
                  <FaReact fill="#4ED7F1" className="inline mr-1" />
                  React
                </div>,
                <div className="flex items-center text-sm">
                  <FaVuejs fill="#90D1CA" className="inline mr-1" />
                  Vue
                </div>,
                <div className="flex items-center text-sm">
                  <RiSvelteFill fill="#E55050" className="inline mr-1" />
                  Svelte
                </div>,
                <div className="flex items-center text-sm">
                  <FaAngular fill="#CB0404" className="inline mr-1" />
                  Angular
                </div>,
                <div className="flex items-center text-sm">
                  <SiNextdotjs fill="white" className="inline mr-1" />
                  Next.js
                </div>,
              ].map((tech, idx) => (
                <button
                  key={typeof tech === "string" ? tech : idx}
                  className="px-4 py-2 rounded-full border border-concrete hover:bg-gray-900 transition-colors duration-200"
                >
                  {tech}
                </button>
              ))}
            </div>
            <div
              className="flex items-center gap-4 grow justify-end"
              data-tour="xp-dots"
            >
              <Tooltip content="+100 xp">
                <div className="size-4 rounded-full bg-green-500" />
              </Tooltip>
              <Tooltip content="+300 xp">
                <div className="size-4 rounded-full bg-orange-500" />
              </Tooltip>
              <Tooltip content="+600 xp">
                <div className="size-4 rounded-full bg-red-500" />
              </Tooltip>
            </div>
          </div>
          <Joyride
            steps={steps}
            disableCloseOnEsc
            run={run}
            continuous
            showProgress
            scrollToFirstStep
            showSkipButton
            disableOverlayClose
            callback={handleJoyrideCallback}
            styles={{
              options: {
                zIndex: 10000,
                primaryColor: "#171717",
                backgroundColor: "#171717",
                textColor: "#fff",
                arrowColor: "#171717",
              },
              beaconOuter: {
                backgroundColor: "#5800ef",
                boxShadow: "0 0 0 2px rgba(94, 53, 177, 0.5)",
              },
              buttonBack: {
                color: "white", // <-- change to your desired back button color
                marginRight: 10,
              },
            }}
          />

          {/* Scrollable Projects List */}
          <div className="overflow-y-auto py-4 px-2 flex flex-col gap-2">
            <div className="overflow-y-auto py-4 px-2 flex flex-col gap-2">
              <input
                data-tour="search-input"
                type="text"
                placeholder="Search..."
                className="px-3 py-1 bg-concrete/20 mb- border border-concrete rounded-lg outline-none w-max"
              />
            </div>

            {projects?.map((project, index) => (
              <div
                key={project.id}
                data-tour="project-card"
                className={`flex flex-col justify-between ${
                  index % 2 === 0 ? "bg-[#0F0E0E]" : ""
                } rounded-md px-4 py-1 w-full`}
              >
                <div className="flex justify-between items-center">
                  <h1 className="text-white text-sm grow">
                    <span className="text-gray-400 mr-2">{index + 1}.</span>
                    {project.name}
                  </h1>

                  <div
                    className="flex items-center justify-between text-left w-1/2"
                    data-tour="tech-stacks"
                  >
                    <div className="flex flex-wrap gap-2">
                      {project.projectTechStacks?.map((stack, idx) => {
                        const name = stack.techStack.name ?? "Unknown";
                        const appliedStyle =
                          skillStyles[name] ?? "bg-gray-600/30 text-white";
                        return (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-md ${appliedStyle}`}
                          >
                            {name}
                          </span>
                        );
                      })}
                    </div>
                    {/* <p className="w-1/3 text-ash">{project.applications}</p> */}
                  </div>

                  <div className="w-1/4 flex items-center justify-between gap-4">
                    <span
                      className={`text-sm font-medium ${
                        project.difficulty === "Beginner"
                          ? "text-green-500"
                          : project.difficulty === "Intermediate"
                          ? "text-orange-500"
                          : "text-red-500"
                      }`}
                    >
                      {project.difficulty}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setProjectModalOpened(true);
                      }}
                      className="px-3 py-1 rounded hover:bg-gray-900 transition text-sm"
                      data-tour="view-project"
                    >
                      View
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {projectModalOpened && selectedProject && (
                    <PROJECTCLIENTVIEW2
                      // project={selectedProject}
                      onClose={() => setProjectModalOpened(false)}
                      project={selectedProject}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className=" flex mx-auto" data-tour="pagination">
            <PAGINATION2 active={active} setActive={setActive} />
          </div>
          {/* Sticky Bottom Pagination */}
        </div>
      </div>
    </div>
  );
}
