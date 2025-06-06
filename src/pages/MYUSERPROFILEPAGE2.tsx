import React, { useState } from "react";

import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import ProfileAvatar from "../components/ProfileAvatar";
import { useGetProfileQuery } from "../api/UsersApi";
import { skillStyles } from "../utils/skillStyles";
import { AnimatePresence } from "framer-motion";
import PROJECTCLIENTVIEW2 from "../components/Project/Views/PROJECTCLIENTVIEW2";
import { ClientProjectResponse } from "../interfaces/projects/client-specific-projects/GetClientProjectModel";
import { GetUserProjectModel } from "../interfaces/projects/user-specific-projects/GetUserProjectModel";
import PROJECTUSERVIEW from "../components/Project/Views/PROJECTUSERVIEW";
import { motion } from "framer-motion";
import { IoIosLink, IoMdCheckmark, IoMdClose } from "react-icons/io";
import { PiCrownSimpleDuotone, PiHardHatDuotone } from "react-icons/pi";
import { Tooltip } from "@material-tailwind/react";
import { FaSlack } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { GetProjectSubmissionModel } from "../interfaces/projects/projectTypes";

export default function MYUSERPROFILEPAGE2() {
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
    refetch,
  } = useGetProfileQuery();

  const [projectModalOpened, setProjectModalOpened] = useState(false);

  const [selectedProject, setSelectedProject] =
    useState<GetUserProjectModel | null>(null);

  const [selectedProjectApplicationId, setSelectedProjectApplicationId] =
    useState<number>(0);

  const [selectedProjectSubmissions, setSelectedProjectSubmissions] = useState<
    GetProjectSubmissionModel[] | null
  >(null);

  return (
    <div className="max-w-5xl  mx-auto p-6 flex flex-col gap-8">
      {/* Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
        {user?.imageUrl ? (
          <img
            src={user?.imageUrl}
            alt="User Avatar"
            className="size-48 my-auto mr-3 cursor-pointer rounded-full"
          />
        ) : (
          <ProfileAvatar
            className="size-48 text-7xl"
            userName={user?.userName}
          />
        )}

        <div className="sm:col-span-2">
          <h1 className="text-3xl font-bold text-white">{user?.userName}</h1>
          <p className="text-gray-400">{user?.bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          // whileHover={{ backgroundColor: "red", scale: 1.05 }}
          className="border  rounded-xl text-center content-center border-concrete bg-gradient-to-br from-gray-900 to-black cursor-pointer"
        >
          <h2 className="text-2xl font-bold  text-white">
            {user?.applicationMemberships.length}
          </h2>
          <p className="text-sm text-gray-400">Projects Applied</p>
        </motion.div>
        <div className="border  rounded-xl text-center content-center border-concrete bg-gradient-to-br from-gray-900 to-black cursor-pointer">
          <h2 className="text-2xl font-bold text-white">
            {/* {dummyUser.stats.contributed} */}
            {
              user?.applicationMemberships.filter(
                (membership) =>
                  membership.userMembership === "Collaborator" &&
                  membership.projectApplication.projectSubmissions.length > 0
              ).length
            }
          </h2>
          <p className="text-sm text-gray-400">Contributions</p>
        </div>
        <div className="border  rounded-xl text-center content-center border-concrete bg-gradient-to-br from-gray-900 to-black cursor-pointer">
          <h2 className="text-2xl font-bold text-white">0</h2>
          <p className="text-sm text-gray-400">Teammates</p>
        </div>
        <div className="border  rounded-xl text-center content-center border-concrete bg-gradient-to-br from-gray-900 to-black p-4 cursor-pointer">
          <h2 className="text-2xl font-bold text-white">0</h2>
          <p className="text-sm text-gray-400">Endorsements</p>
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Tech Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user?.skills?.map((skill, idx) => {
            const stackName = skill ?? "Unknown";
            const appliedStyle =
              skillStyles[stackName] ?? "bg-grape/50 text-white";
            return (
              <span
                key={idx}
                className={` px-2 py-1 rounded-md ${appliedStyle}`}
              >
                {stackName}
              </span>
            );
          })}
        </div>
      </div>

      {user?.userSocials?.map((url, index) => (
        <div key={index}>
          {url.platform.includes("slack") ? (
            <FaSlack fill="#cac6bf" size={18} />
          ) : url.platform.includes("GitHub") ? (
            <a
              className="flex items-center gap-2"
              href={url.urlValue}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{url.platform}</p>
              <FaGithub size={18} />
            </a>
          ) : // </div>
          url.platform.includes("LinkedIn") ? (
            <a
              className="flex items-center gap-2"
              href={url.urlValue}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{url.platform}</p>
              <RiLinkedinFill size={18} />
            </a>
          ) : (
            <IoIosLink size={18} />
          )}
        </div>
      ))}

      {/* Projects Tabs Placeholder */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Projects</h2>
        <div className=" rounded-lg py-6 text-gray-300">
          {/* Replace with actual tabbed content or component */}
          <div className="flex items-center flex-wrap gap-2">
            {user?.applicationMemberships.map((applicationMembership) => {
              return (
                <div className="border p-2 flex items-center gap-2 rounded-md text-center content-center border-concrete bg-gradient-to-br from-gray-900 to-black cursor-pointer">
                  <motion.h1
                    whileTap={{ y: 2 }}
                    onClick={() => {
                      setSelectedProject(
                        applicationMembership.projectApplication.project
                      );
                      setSelectedProjectApplicationId(
                        applicationMembership.projectApplication.id
                      );
                      setProjectModalOpened(true);
                    }}
                    className="p-2 flex items-center gap-2 rounded-md text-center  cursor-pointer"
                  >
                    {applicationMembership.projectApplication.project.name}
                    <div>
                      {applicationMembership.userMembership === "Principal" ? (
                        <Tooltip content="Project Owner">
                          <div>
                            <PiCrownSimpleDuotone />
                          </div>
                        </Tooltip>
                      ) : (
                        <Tooltip content="Project Contributor">
                          <div>
                            <PiHardHatDuotone />
                          </div>
                        </Tooltip>
                      )}
                    </div>
                    {applicationMembership.projectApplication.projectSubmissions.some(
                      (submission) =>
                        submission.projectApplicationId !== null &&
                        submission.isValid
                    ) ? (
                      <Tooltip content="Approved">
                        <div>
                          <IoMdCheckmark fill="green" />
                        </div>
                      </Tooltip>
                    ) : applicationMembership.projectApplication.projectSubmissions.some(
                        (submission) =>
                          submission.projectApplicationId !== null &&
                          submission.isValid === false
                      ) ? (
                      <Tooltip content="Rejected">
                        <div>
                          <IoMdClose fill="red" />
                        </div>
                      </Tooltip>
                    ) : null}
                  </motion.h1>

                  <motion.p
                    whileHover={{ y: 2 }}
                    className="text-sm underline underline-offset-4 decoration-1 decoration-light-blue-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(
                        applicationMembership.projectApplication.project
                      );
                      setSelectedProjectSubmissions(
                        applicationMembership.projectApplication
                          .projectSubmissions
                      );
                    }}
                  >
                    Show History
                  </motion.p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Endorsements Placeholder */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Endorsements</h2>
        <div className="bg-gray-900 rounded-lg p-6 text-gray-300">
          <p>No endorsements yet. Collaborate to build your reputation!</p>
        </div>
      </div>

      <AnimatePresence>
        {projectModalOpened && selectedProject && (
          <PROJECTUSERVIEW
            userMembership={
              user?.applicationMemberships.find(
                (membership) =>
                  membership.projectApplication.id ===
                  selectedProjectApplicationId
              )?.userMembership ?? "N/A"
            }
            project={selectedProject}
            selectedProjectApplicationId={selectedProjectApplicationId}
            onClose={() => setProjectModalOpened(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProjectSubmissions &&
          selectedProjectSubmissions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            >
              <motion.div
                className="bg-[#171717] rounded-2xl shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    Project Submissions
                    <span className="text-ash text-lg ml-4">
                      #{selectedProject?.name}
                    </span>
                  </h2>
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => setSelectedProjectSubmissions(null)}
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {selectedProjectSubmissions.map((submission, index) => (
                    <div
                      key={submission.projectApplicationId ?? index}
                      className="border border-gray-800 p-4 rounded-lg bg-[#171717]"
                    >
                      <div className="mb-2 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Submission #{index + 1}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            submission.isValid
                              ? "bg-green-100 text-green-700"
                              : "bg-red-700/50 text-red-200"
                          }`}
                        >
                          {submission.isValid ? "Valid" : "Needs Improvement"}
                        </span>
                      </div>

                      <p className="whitespace-pre-line text-ash text-sm">
                        <strong>AI Review Answer:</strong>
                        <br />
                        {submission.answer}
                        <br />
                        <p className="text-red-500">Reason:</p>
                        {submission.reason}

                        {submission.recommendation && (
                          <>
                            <p className="text-green-500">Recommendation:</p>
                            {submission.recommendation}
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Footer / Social */}
      <div className="flex justify-center gap-6 text-white text-2xl">
        <a href="#" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="#" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="#" aria-label="Website">
          <FaGlobe />
        </a>
      </div>
    </div>
  );
}
