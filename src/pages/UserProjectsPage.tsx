import React, { useEffect, useState } from "react";
import { useGetUserProjectsQuery } from "../api/ProjectsApi";
import { AnimatePresence, motion } from "framer-motion";
import ModalApplicationsView from "../components/ModalApplicationsView";
import { GetUserProjectModel } from "../interfaces/projects/user-specific-projects/GetUserProjectModel";
// import { useGetGithubRepoQuery } from "../api/UsersApi";

export default function UserProjectsPage() {
  const [selectedProject, setSelectedProject] =
    useState<GetUserProjectModel | null>(null);

  const { data: projects } = useGetUserProjectsQuery();

  // useEffect(() => {}, projects);

  return (
    <>
      <table className="mt-5 p-12 hidden lg:block">
        <thead className="hidden md:table-header-group">
          <tr className="bg-[#1E201E] ">
            <th className="p-4">Name</th>
            <th className="p-4">Description</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date Created</th>
            <th className="p-4">Applications</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project) => (
            <tr key={project.name}>
              <td className="p-6">{project.name}</td>
              <td className="p-6">
                {project.description && project.description.length > 80
                  ? project.description.substring(0, 80) + "..."
                  : project.description}
              </td>
              <td className="px-4 py-2 w-max mx-auto">
                <h1
                  className={`px-4 py-2 w-max mx-auto ${
                    project.status === "Active"
                      ? "bg-[#035E3E] text-[#B8FFD7]"
                      : project.status === "Filled"
                      ? "bg-[#F5A623] text-[#FFECB8]"
                      : project.status === "Deleted"
                      ? "bg-[#D0021B] text-[#FFABA2]"
                      : ""
                  }`}
                >
                  {project.status}
                </h1>
              </td>
              <motion.td
                whileHover={{ backgroundColor: "#1E201E" }}
                className="p-6"
              >
                {project.dateCreated
                  ? new Date(project.dateCreated).toLocaleDateString()
                  : "N/A"}
              </motion.td>
              <td className="p-6 flex">
                <motion.div className="mx-auto flex gap-2">
                  <h1
                    className="underline cursor-pointer decoration-[#5800EF] underline-offset-8"
                    onClick={() => setSelectedProject(project)}
                  >
                    View
                  </h1>
                  ({project.applications})
                </motion.div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="lg:hidden flex flex-col gap-4 mt-5 p-6">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="bg-[#1E201E] p-4 rounded-none shadow-md"
          >
            {/* Project Name */}
            <h2 className="text-lg font-bold text-white">{project.name}</h2>

            {/* Project Description */}
            <p className="text-gray-300 mt-2">
              {(project.description ?? "").length > 80
                ? (project.description ?? "").substring(0, 80) + "..."
                : project.description}
            </p>

            {/* Status */}
            <span
              className={`mt-2 inline-block px-4 py-1 text-sm font-semibold rounded-none ${
                project.status === "Active"
                  ? "bg-[#035E3E] text-[#B8FFD7]"
                  : project.status === "Filled"
                  ? "bg-[#F5A623] text-[#FFECB8]"
                  : project.status === "Deleted"
                  ? "bg-[#D0021B] text-[#FFABA2]"
                  : ""
              }`}
            >
              {project.status}
            </span>

            {/* Date Created & Applications */}
            <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">
              <p>
                {project.dateCreated
                  ? new Date(project.dateCreated).toLocaleDateString()
                  : "N/A"}
              </p>
              <button
                className="underline cursor-pointer decoration-[#5800EF] underline-offset-8"
                onClick={() => setSelectedProject(project)}
              >
                View ({project.applications})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Render the modal only when a project is selected */}
      <AnimatePresence>
        {/* {selectedProject && (
          <ModalApplicationsView
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            // projectApplications={selectedProject.projectApplications}
            project={selectedProject}
          />
        )} */}
      </AnimatePresence>
    </>
  );
}
