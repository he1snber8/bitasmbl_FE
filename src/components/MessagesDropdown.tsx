import { motion } from "framer-motion";
import { useGetProfileQuery } from "../api/UsersApi";
import { useGetAppliedProjectsQuery } from "../api/ProjectsApi";
import ChatPopUp from "./ChatPopUp";
import { useState } from "react";

export default function MessagesDropdown({ onClose }: { onClose: () => void }) {
  const {
    data: profile,
    error: profileError,
    isLoading: profileLoading,
  } = useGetProfileQuery();

  const { data: appliedProjects } = useGetAppliedProjectsQuery();

  const [roomId, setRoomId] = useState<number>(0);
  const [projectName, setProjectName] = useState<string>("");
  // const [projectName, setProjectName] = useState<string>("");

  // console.log(appliedProjects);

  const allProjects = [
    ...(profile?.projects?.map((proj) => ({
      projectId: proj.id,
      name: proj.name, // Ensure proj has a 'name' field
      type: "owned", // Optional: Mark if it's an owned project
    })) || []),

    ...(appliedProjects?.map((appliedProj) => ({
      projectId: appliedProj.project.id,
      name: appliedProj.project.name, // Adjust based on actual field names
      type: "applied", // Optional: Mark if it's an applied project
    })) || []),
  ];

  return (
    <>
      <motion.ul
        className="absolute top-full w-[100%] h-max border-x border-b border-concrete bg-coal"
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0, y: 10 }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        {allProjects?.length > 0 ? (
          allProjects.map((project) => (
            <motion.li
              key={project.projectId} // Always add a key when mapping lists in React
              onClick={() => {
                setRoomId(project.projectId);
                setProjectName(project.name ?? "");
              }}
              whileHover={{ backgroundColor: "#2C3333" }}
              className="p-2 font-thin text-sm"
            >
              {project.name?.slice(0, 25)}
              {project.type === "owned" ? " (o)" : " (a)"}
            </motion.li>
          ))
        ) : (
          <p className="p-2 font-thin text-sm">Your inbox is empty</p> // Message for empty list
        )}
      </motion.ul>
      {roomId > 0 && <ChatPopUp roomId={roomId} onClose={onClose} />}
    </>
  );
}
