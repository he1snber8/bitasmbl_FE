import {
  GetProjectApplicationModel,
  GetUserProjectModel,
} from "../interfaces/projects/user-specific-projects/GetUserProjectModel";
import { AnimatePresence, motion } from "framer-motion";
import ProjectApplicantDetailedView from "./Project/Views/ProjectApplicantDetailedView";
import { useEffect, useState } from "react";
import {
  useApproveApplicationMutation,
  useGetUserProjectApplicationsQuery,
  useRejectApplicationMutation,
} from "../api/ProjectsApi";
import { useNavigate } from "react-router-dom";
import ApplicationActionsDropdown from "./Project/ApplicationActions";

export default function ModalApplicationsView({
  isOpen,
  onClose,
  project,
}: {
  isOpen: boolean;
  onClose: () => void;
  project: GetUserProjectModel;
}) {
  const [applicationDropdownById, setApplicationDropdownById] = useState<
    number | null
  >(null);

  const toggleApplicationDropdown = (id: number) => {
    setApplicationDropdownById((prevId) => (prevId === id ? null : id));
  };

  const [selectedApplicantView, setSelectedApplicantView] = useState<
    number | null
  >(null);

  const {
    data: userProjectsApps,
    error: userProjectsError,
    isLoading: userProjectsLoading,
  } = useGetUserProjectApplicationsQuery(project.id);

  const [projectApplications, setProjectApplication] = useState<
    GetProjectApplicationModel[] | null
  >();

  const navigate = useNavigate();

  useEffect(() => {
    if (userProjectsApps) {
      setProjectApplication(userProjectsApps);
    }
  }, [userProjectsApps, project]);

  const [rejectApplication] = useRejectApplicationMutation();

  const [approveApplication] = useApproveApplicationMutation();

  const handleApplicationApproval = async (id: number) => {
    const result = await approveApplication({
      applicationId: id,
      projectId: project.id,
    });

    if ("data" in result) {
      setProjectApplication((prevApps) =>
        prevApps
          ? prevApps.map((app) =>
              app.id === id
                ? { ...app, applicationStatus: result.data.applicationStatus }
                : app
            )
          : null
      );
    }
  };

  const handleApplicationRejection = async (id: number) => {
    const result = await rejectApplication({
      applicationId: id,
      projectId: project.id,
    });

    if ("data" in result) {
      setProjectApplication((prevApps) =>
        prevApps
          ? prevApps.map((app) =>
              app.id === id
                ? { ...app, applicationStatus: result.data.applicationStatus }
                : app
            )
          : null
      );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close modal when clicking outside
    >
      <motion.div
        className="bg-coal border border-gray-700 p-6  shadow-lg w-1/2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="md:block hidden text-white text-lg">
            Check out applications for {project.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition"
          ></button>
        </div>

        <motion.div className="max-h-64">
          {projectApplications && projectApplications.length > 0 ? (
            projectApplications.map((projApplication) => (
              <div
                key={projApplication.id}
                className="flex flex-col md:flex-row items-center relative  justify-between gap-4 p-2  hover:bg-gray-800 transition"
              >
                <div className="flex items-center  w-1/3 gap-4">
                  {projApplication.applicant?.imageUrl ? (
                    <div
                      onClick={() =>
                        navigate(
                          `/home/profile/${projApplication.applicant.id}`
                        )
                      }
                      className="w-12 h-12 cursor-pointer flex-shrink-0"
                    >
                      <img
                        src={projApplication.applicant.imageUrl}
                        alt={`${projApplication.applicant?.userName}'s profile`}
                        className="w-full h-full rounded-full object-cover border border-transparent"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-grape/50">
                      <p className="text-purple-100 text-lg font-medium">
                        {projApplication.applicant?.userName
                          ?.charAt(0)
                          .toUpperCase() ?? ""}
                      </p>
                    </div>
                  )}

                  {/* User Info */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <p className="text-white text-sm md:text-base font-semibold truncate">
                      {projApplication.applicant.userName}
                    </p>
                    <p className="text-gray-300 text-xs md:text-sm truncate">
                      {(projApplication.coverLetter?.length ?? 0) > 30
                        ? projApplication.coverLetter?.slice(0, 30) + "..."
                        : projApplication.coverLetter}
                    </p>
                  </div>
                </div>

                <p
                  onClick={() => setSelectedApplicantView(projApplication.id)}
                  className="text-sm text-ash  w-1/3  hover:text-white cursor-pointer "
                >
                  View Details
                </p>

                <div className="flex">
                  <span
                    className={`bg-opacity-50 border text-xs md:text-sm border-coal px-2 py-1 mr-4 ${
                      projApplication?.applicationStatus === "Approved"
                        ? "bg-[#035E3E] text-[#B8FFD7]"
                        : projApplication?.applicationStatus === "Pending"
                        ? "bg-[#F5A623] text-[#FFECB8]"
                        : projApplication?.applicationStatus === "Rejected"
                        ? "bg-[#D0021B] text-[#FFABA2] mx-auto"
                        : ""
                    }
                  `}
                  >
                    {/* {projectApplication?.applicationStatus} */}
                    {projApplication.applicationStatus}
                  </span>
                </div>

                <motion.h2
                  onClick={() => toggleApplicationDropdown(projApplication.id)}
                  className="text-ash  relative cursor-pointer text-sm  px-4 hover:text-white h-full content-center"
                >
                  Edit
                </motion.h2>

                <AnimatePresence>
                  {applicationDropdownById === projApplication.id && (
                    <ApplicationActionsDropdown
                      isOpen={true} // Always true when rendered
                      onApprove={() =>
                        handleApplicationApproval(projApplication.id)
                      }
                      onReject={() =>
                        handleApplicationRejection(projApplication.id)
                      }
                      onClose={() => setApplicationDropdownById(null)}
                      projectApplication={projApplication}
                    />
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {selectedApplicantView === projApplication.id && (
                    <ProjectApplicantDetailedView
                      applicantViewOpen={true}
                      setApplicantView={() => setSelectedApplicantView(null)} // Close when needed
                      projectApplication={projApplication}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No applications yet.</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
