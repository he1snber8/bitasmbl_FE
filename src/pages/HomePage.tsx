import {
  useGetProjectCategoriesQuery,
  useGetProjectRequirementsQuery,
  useGetProjectsQuery,
} from "../api/ProjectsApi";
import SearchBar from "../components/SearchBar";
import ProjectViewCard from "../components/Project/Views/ProjectClientView";
import React, { useEffect } from "react";
import CheckBox from "../components/CheckBox";
import { Checkbox, ListItem, ListItemPrefix } from "@material-tailwind/react";
import * as io from "socket.io-client";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

export default function HomePage() {
  const socket = io.connect("http://localhost:3001");

  const {
    data: projects,

    isLoading: projectsLoading,
  } = useGetProjectsQuery();

  const { data: categories } = useGetProjectCategoriesQuery();

  const { data: requirements } = useGetProjectRequirementsQuery();

  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = React.useState(false);
  const [isRequirementssMenuOpen, setIsRequirementsMenuOpen] =
    React.useState(false);

  return (
    <>
      <div className="flex md:flex-row flex-col gap-6 h-screen">
        <div className="md:w-1/4  my-2 p-4">
          <SearchBar className="p-2 " />
          <h2
            onClick={() => setIsCategoriesMenuOpen((prev) => !prev)}
            className="cursor-pointer flex items-center gap-2 mt-4 font-thin"
          >
            Filter by Category{" "}
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`block h-3 w-3 transition-transform  ${
                isCategoriesMenuOpen ? "rotate-180" : ""
              }`}
            />
          </h2>
          <AnimatePresence>
            {isCategoriesMenuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className=" md:flex flex-col max-h-64  overflow-y-scroll mt-3"
              >
                {categories?.map((category) => {
                  return (
                    <li className="  flex items-center">
                      <Checkbox
                        className="rounded-none "
                        defaultChecked={false}
                        size={12}
                        color="purple"
                        label={category.name}
                        labelProps={{
                          className: "text-sm  text-ash",
                        }}
                      />
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
          <h2
            onClick={() => setIsRequirementsMenuOpen((prev) => !prev)}
            className="cursor-pointer flex items-center gap-2 mt-4 font-thin"
          >
            Filter by Requirement
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`block h-3 w-3 transition-transform  ${
                isRequirementssMenuOpen ? "rotate-180" : ""
              }`}
            />
          </h2>
          <AnimatePresence>
            {isRequirementssMenuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className=" md:flex flex-col max-h-64  scroll-n overflow-y-scroll mt-3"
              >
                {requirements?.map((requirement) => {
                  return (
                    <ListItemPrefix className="flex">
                      <Checkbox
                        className="rounded-none text-red-500"
                        defaultChecked={false}
                        color="purple"
                        label={requirement.name}
                        labelProps={{ className: "text-ash text-sm" }}
                      />
                    </ListItemPrefix>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        {/* <div className=" "> */}
        {/* <div className="min-h-64 border  border-ash">
            <h1>You can view projects here</h1>
          </div> */}

        <div className="md:w grid md:grid-cols-3 gap-4 h-3/4">
          {projects?.map((project) => (
            <div key={project.id}>
              <ProjectViewCard
                projectsLoading={projectsLoading}
                project={project}
              />

              {/* <div className="w-full h-[1px] bg-gradient-to-l from-purple-700/80 to-purple-900/70" /> */}
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
