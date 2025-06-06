import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FaAngular, FaReact, FaVuejs } from "react-icons/fa";
import { RiSvelteFill } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";
import ProjectClientTestView from "./Project/Views/ProjectClientTestView";
import PROJECTCLIENTVIEW2 from "./Project/Views/PROJECTCLIENTVIEW2";

export default function PROJECTS() {
  const [projectModalOpened, setProjectImagesOpened] = useState<boolean>(false);

  const projects = [
    {
      name: "Portfolio Website",
      skills: ["HTML", "CSS", "JavaScript"],
      difficulty: "Easy",
    },
    {
      name: "Task Manager API",
      skills: ["Node.js", "Express", "MongoDB"],
      difficulty: "Medium",
    },
    {
      name: "Chat App",
      skills: ["React", "Socket.IO", "Firebase"],
      difficulty: "Medium",
    },
    {
      name: "E-commerce Platform",
      skills: ["Next.js", "Tailwind", "Stripe"],
      difficulty: "Hard",
    },
    {
      name: "AI Image Generator",
      skills: ["Python", "Flask", "OpenAI API"],
      difficulty: "Hard",
    },
  ];

  const skillStyles: Record<string, string> = {
    Python: "bg-blue-600/30 text-blue-200",
    Flask: "bg-green-700/30 text-green-200",
    JavaScript: "bg-orange-500/30 text-orange-300",
    HTML: "bg-red-600/30 text-red-200",
    CSS: "bg-blue-500/30 text-blue-200",
    React: "bg-cyan-500/30 text-cyan-200",
    "Node.js": "bg-green-800/30 text-green-200",
    Express: "bg-pink-700/30 text-red-200",
    MongoDB: "bg-teal-700/30 text-teal-200",
    "OpenAI API": "bg-indigo-700/30 text-indigo-200",
    "REST APIs": "bg-orange-600/30 text-orange-200",
    "Socket.IO": "bg-purple-700/30 text-purple-200",
    Firebase: "bg-yellow-500/30 text-yellow-200",
    "Next.js": "bg-gray-800/30 text-white",
    Tailwind: "bg-teal-500/30 text-teal-200",
    Stripe: "bg-indigo-800/30 text-indigo-200",
  };

  return (
    <div className="h-screen w-full bg-pi bg-t grid grid-cols-[250px_1fr]">
      {/* Left Sidebar - Filters */}
      <div className="b p-4 border-r  border-concrete">
        <p className="text-white">Filters</p>
      </div>

      {/* Main content goes here */}
      <div className="p-6 overflow-y-auto flex flex-col">
        <p className="text-white mb-6">Main Content</p>

        <div className="h-screen  bg-coal  rounded-lg">
          <div className="flex flex-wrap gap-2 p-6 ">
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

          <div className="flex flex-col gap-2 p-5">
            <div className="flex-1 flex  items-center gap-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-3  py-1 bg-concrete/20 mb-4   border border-concrete rounded-lg outline-none"
              />
            </div>
            {projects.map((project, index) => (
              <div
                key={index}
                className={`flex cursor-pointer  items-center justify-between ${
                  index % 2 === 0 ? "bg-black" : "border-concrete"
                }   rounded-md px-4 py-1 w-full`}
              >
                {/* Right: Project Details */}
                <div className="flex flex-col text-left w-1/3  ">
                  <span className="font-thin">{project.name}</span>
                </div>
                <div className=" grow ">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs mx-1 font-medium px-3 py-1 rounded-full ${
                        skillStyles[skill] || "bg-gray-700 text-white"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* <AnimatePresence>
                  {projectModalOpened && (
                    <PROJECTVIEW
                      onClose={() => setProjectImagesOpened(false)}
                    />
                  )}
                </AnimatePresence> */}

                {/* Left: View Button */}
                <div className=" w-1/5 flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      project.difficulty === "Easy"
                        ? "text-green-500"
                        : project.difficulty === "Medium"
                        ? "text-[#FF9F00]"
                        : "text-red-500"
                    }`}
                  >
                    {project.difficulty}
                  </span>

                  <button
                    onClick={() => setProjectImagesOpened(true)}
                    className="px-3 py-1  border-concrete  rounded hover:bg-gray-900 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
