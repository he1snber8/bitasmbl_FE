import { GetUserProjectModel } from "../interfaces/projects/user-specific-projects/GetUserProjectModel";
import { motion } from "framer-motion";
import ProjectApplicantDetailedView from "./Project/Views/ProjectApplicantDetailedView";
import { useState } from "react";
import { useGetUserProjectApplicationsQuery } from "../api/ProjectsApi";

export default function ModalApplicationsView({
  isOpen,
  onClose,
  // projectApplications,
  project,
}: {
  isOpen: boolean;
  onClose: () => void;
  // projectApplications: GetProjectApplicationModel[];
  project: GetUserProjectModel;
}) {
  //   const [appHovered, setAppHovered] = useState<boolean>(false);

  const { data: userProjectsApps } = useGetUserProjectApplicationsQuery(
    project.id
  );

  // console.log("project iD:", project.id, "its items:", userProjectsApps);

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close modal when clicking outside
    >
      <motion.div
        className="bg-coal border border-gray-700 p-6 rounded-md shadow-lg w-1/2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">
            Check out applications for {project.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition"
          ></button>
        </div>
        {/* Modal Body overflow-y-auto */}
        <motion.div className="max-h-64 ">
          {userProjectsApps && userProjectsApps.length > 0 ? (
            userProjectsApps.map((projApplication) => (
              <div></div>
              //   <div
              //     key={projApplication.id}
              //     className="flex items-center relative justify-between gap-4 p-2  hover:bg-gray-800 transition"
              //   >
              //     <div className="flex gap-8 w-2/3">
              //       {projApplication.applicant?.imageUrl ? (
              //         <div className="w-12 h-12 cursor-pointer rounded-full flex">
              //           <img
              //             src={projApplication.applicant?.imageUrl}
              //             alt={`${projApplication.applicant?.userName}'s meow profile`}
              //             className="w-12 h-12 rounded-full  border-4 border-transparent"
              //           />
              //         </div>
              //       ) : (
              //         <div className="w-12 h-12 cursor-pointer rounded-full flex bg-grape/50">
              //           <p className="items-cente m-auto  text-purple-100">
              //             {projApplication.applicant?.userName
              //               ? projApplication.applicant.userName
              //                   ?.charAt(0)
              //                   .toUpperCase() ?? ""
              //               : ""}
              //           </p>
              //         </div>
              //       )}
              //       <div className="">
              //         <p className="text-white font-semibold">
              //           {projApplication.applicant.userName}
              //         </p>
              //         <p className="text-gray-300 text-sm">
              //           {projApplication.coverLetter}
              //         </p>
              //       </div>
              //     </div>
              //     <div className="flex  flex-1">
              //       <span
              //         className={`bg-opacity-50 border border-black px-2 py-1 mr-4 ${
              //           projApplication.applicationStatus === "Approved"
              //             ? "bg-[#035E3E] text-[#B8FFD7]"
              //             : projApplication.applicationStatus === "Pending"
              //             ? "bg-[#F5A623] text-[#FFECB8]"
              //             : projApplication.applicationStatus === "Rejected"
              //             ? "bg-[#D0021B] text-[#FFABA2] mx-auto"
              //             : ""
              //         }
              //         `}
              //       >
              //         {projApplication.applicationStatus}
              //       </span>
              //     </div>

              //     {/* <h2
              //         onClick={() => setAppStatus((prev) => !prev)}
              //         className="text-ash relative cursor-pointer  px-4 hover:text-white h-full content-center"
              //       >
              //         Edit
              //       </h2> */}
              //     {/* <AnimatePresence>
              //         {appStatus && (
              //           <motion.ul
              //             key={projApplication.id}
              //             className="bg-coal  absolute  top-full right-0 border-gray-700 shadow-lg "
              //             initial={{ opacity: 0 }}
              //             animate={{ y: 0, opacity: 1 }}
              //             exit={{ opacity: 0 }}
              //             onClick={(e) => e.stopPropagation()}
              //           > */}
              //     <ProjectApplicationItem projectApplication={projApplication} />
              //     {/* </motion.ul>
              //         )}
              //       </AnimatePresence> */}
              //   </div>
            ))
          ) : (
            <p className="text-gray-400">No applications yet.</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
